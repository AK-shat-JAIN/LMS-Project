import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import sendEmail from "../utils/sendEmail.js";


const contactUs = async (req, res, next) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message){
        return next(new AppError('Please fill in all fields', 400))
    }

    const subject = 'Contact Us Form Submission'
    const textMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    try {
        await sendEmail(process.env.CONTACT_US_EMAIL, subject, textMessage)
    } catch (error) {
        return next(new AppError(error.message, 400))
    }

    res.status(200).json({
        success: true,
        message: 'Your request has been submitted successfully'
    })
}

const userStats = asyncHandler(async (req, res, next) => {
    const allUsersCount = await User.countDocuments();

    const subscribedUsersCount = await User.countDocuments({
        'subscription.status': 'active'                       // This is how we query a nested field in MongoDB using mongoose 
    })

    res.status(200).json({
        success: true,
        message: 'User stats fetched successfully',
        allUsersCount,
        subscribedUsersCount
    })
});

export { contactUs, userStats }