import express from 'express';
import { getRazorpayApiKey, getAllPlans, buySubscription, verifySubscription, cancelSubscription, allPayments } from '../controllers/payment.controller.js';
import { authorizedRoles, authorizedSubscriber, isLoggedin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/razorpay-key')
    .get(
        isLoggedin,
        getRazorpayApiKey
    )

router.route('/plans')
    .get(
        isLoggedin,
        getAllPlans
    )

router.route('/subscribe')
    .post(
        isLoggedin,
        buySubscription
    )

router.route('/verify')
    .post(
        isLoggedin,
        verifySubscription
    )

router.route('/unsubscribe')
    .post(
        isLoggedin,
        authorizedSubscriber,
        cancelSubscription
    )

router.route('/')
    .get(
        isLoggedin,
        authorizedRoles('ADMIN'),
        allPayments
    )

export default router