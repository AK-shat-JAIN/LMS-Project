import User from '../models/user.model.js'
import AppError from '../utils/error.util.js'
import Payment from '../models/payment.model.js'
import { razorpay } from '../server.js'
import crypto from 'crypto'
import asyncHandler from '../middlewares/asyncHandler.middleware.js'

const getRazorpayApiKey = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: 'Razorpay API key fetched successfully',
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch (error) {
        return next(new AppError(error.message || "Server issue", 500))
    }
}

const getAllPlans = async (req, res, next) => {
    try {
        const plans = await razorpay.plans.all()
        return res.status(200).json({
            success: true,
            message: 'Plans fetched successfully',
            plans
        })
    } catch (error) {
        return next(new AppError(error.message || "Server issue", 500))
    }
}

const buySubscription = async (req, res, next) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId)      
        
        if (!user) {
            return next(new AppError('User not found', 404))
        }
        
        if(user.role === 'ADMIN'){
            return next(new AppError('Admin cannot buy subscription', 403))
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,                                // 1 - notify customer by email when subscription is created     
            total_count: 12,                                   // 12 - total number of charges to be made on the customer before the subscription ends
        })

        user.subscription.id = subscription.id
        user.subscription.status = subscription.status

        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Subscription created successfully',
            subscription_id: subscription.id,
            // subscription_status: subscription.status              not required to send this
        })
    } catch (error) {
        return next(new AppError(error.message || "Server issue", 500))
    }
}

const verifySubscription = async (req, res, next) => {
    try {
        const {id} = req.user
        const {razorpay_payment_id, razorpay_subscription_id, razorpay_signature} = req.body

        const user = await User.findById(id)
        if(!user){
            return next(new AppError('User not found', 404))
        }

        if(!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature){
            return next(new AppError('Invalid request, Please provide all fields', 400))
        }

        const subscriptionID = user.subscription.id
        
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${subscriptionID}`)
            .digest('hex')

        // Generating a signature with SHA256 for verification purposes
        // Here the subscriptionId should be the one which we saved in the DB
        // razorpay_payment_id is from the frontend and there should be a '|' character between this and subscriptionId
        // At the end convert it to Hex value
        if(generatedSignature !== razorpay_signature){
            return next(new AppError('Payment not verified, Invalid signature', 400))
        }

        const payment = await Payment.create({
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature
        })
        await payment.save()

        user.subscription.status = 'active'
        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Payment verified successfully',
            payment
        })        
    } catch (error) {
        return next(new AppError(error.message, 500))
    }   
}

const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.user

        const user = await User.findById(id)
        if(!user){
            return next(new AppError('User not found', 404))
        }

        if(user.role === 'ADMIN'){
            return next(new AppError('Admin cannot cancel subscription', 403))
        }
        
        const subscriptionID = user.subscription.id

        const subscription = await razorpay.subscriptions.cancel(subscriptionID)

        user.subscription.status = subscription.status
        await user.save()

        return res.status(200).json({
            success: true,
            message: 'Subscription cancelled successfully'
        })
    } catch (error) {
        return next(new AppError(error.message, 500))
    }
}

const allPayments = asyncHandler(async (req, res, next) => {
    
    const { count, skip } = req.query;

    try {

        const allPayments = await razorpay.subscriptions.all({
            count: count || 10,                  // 10 - default value
            skip: skip || 0                     // 0 - default value
        })

        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];
        const finalMonths = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        };

        const maothlyWisePayments = allPayments.items.map((payment) => {
            // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
            const date = new Date(payment.start_at * 1000);
            return monthNames[date.getMonth()];
        }) 

        maothlyWisePayments.map((month) => {
            Object.keys(finalMonths).forEach((objMonth) =>{
                if(objMonth === month){
                    finalMonths[objMonth] += 1;
                }
            });
        });

        const monthlySalesRecord = [];

        Object.keys(finalMonths).forEach((monthName) => {
            monthlySalesRecord.push(finalMonths[monthName])
        })

        return res.status(200).json({
            success: true,
            message: 'Subscriptions fetched successfully',
            allPayments,
            finalMonths,
            monthlySalesRecord,
        })
    } catch (error) {
        return next(new AppError(error.message, 500))
    }

})

export {
    getRazorpayApiKey,
    getAllPlans,
    buySubscription,
    verifySubscription,
    cancelSubscription,
    allPayments
}