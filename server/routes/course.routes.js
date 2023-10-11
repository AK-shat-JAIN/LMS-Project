import express from 'express'
import { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, addLectureToCOurseById, removeLecture } from '../controllers/course.controller.js'
import { isLoggedin, authorizedRoles, authorizedSubscriber} from '../middlewares/auth.middleware.js'
import upload from '../middlewares/multer.middleware.js'

const router = express.Router()

router.route('/')
    .get(getAllCourses)
    .post(
        isLoggedin,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse
    )

router.route('/:id')
    .get(
        isLoggedin,
        authorizedSubscriber,
        getCourseById
    )
    .put(
        isLoggedin,
        authorizedRoles('ADMIN'),
        updateCourse
    )
    .delete(
        isLoggedin,
        authorizedRoles('ADMIN'),
        deleteCourse
    )
    .post(
        isLoggedin,
        authorizedRoles('ADMIN'),
        upload.single('lecture'),
        addLectureToCOurseById
    )

router.route('/:id/:lecture_id')
    .delete(
        isLoggedin,
        authorizedRoles('ADMIN'),
        removeLecture
    )

export default router