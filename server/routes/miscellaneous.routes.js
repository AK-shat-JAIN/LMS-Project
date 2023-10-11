import express from 'express'
import { contactUs, userStats } from '../controllers/miscellaneous.controller.js'
import { authorizedRoles, isLoggedin } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/contact')
    .post(contactUs)

router.route('/admin/stats/users')
    .get(
        isLoggedin,
        authorizedRoles('ADMIN'),
        userStats
    )

export default router;