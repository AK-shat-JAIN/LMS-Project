import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js"
import cloudinary from 'cloudinary'
import fs from 'fs/promises'

const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find({}).select('-lectures')

        return res.status(200).json({
            success: true,
            message: 'All courses fetched successfully',
            courses
        })
    } catch (error) {
        return next(new AppError(error.message || 'Failed to fetch all courses', 500))
    }
    
}

const getCourseById = async (req, res, next) => {
    try {
        // const courseID = req.params.id
        const { id } = req.params
        const course = await Course.findById(id)

        if(!course){
            return next(new AppError('Course not found', 404))
        }

        return res.status(200).json({
            success: true,
            message: 'Course fetched successfully',
            lectures : course.lectures
        })
    } catch (error) {
        return next(new AppError(error.message || 'Failed to fetch the course', 500))        
    }
}

const createCourse = async (req, res, next) => {
    const { title, description, category, createdBy } = req.body

    if(!title || !description || !category || !createdBy){
        return next(new AppError('Please provide all the required fields', 400))
    }

    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        thumbnail: {
            public_id: 'DUMMY_ID',
            secure_url: 'DUMMY_URL'
        }
    })

    if(!course){
        return next(new AppError('Failed to create course, Please tr again', 500))
    }

    if(req.file){
        try {
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder: 'courses'
            })
            
            if(result){
                course.thumbnail = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                }
                // course.thumbnail.public_id = result.public_id
                // course.thumbnail.secure_url = result.secure_url
                    
                //remove file from server
                fs.rm(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            return next(new AppError(error.message || 'Problem with file upload', 500))
        }
    }
    await course.save()

    return res.status(200).json({
        success: true,
        message: 'Course created successfully',
        course
    })
}

const updateCourse = async (req, res, next) => {          // Update only provided fields of the course               // This is the way to update the course without using the mongoose middleware
    try {
        const { id } = req.params

        const course = await Course.findByIdAndUpdate(
            id,
            {
                // To update the fields that are present in the req.body
                $set: req.body
            },
            {
                runValidators: true,                          // To run the validators on the updated data
                new: true,                                    // To return the updated data
            }
        )

        if(!course){
            return next(new AppError('Course not exists', 404))
        }

                                    //OR

        // const { title, description, category, createdBy } = req.body

        // if(!title || !description || !category || !createdBy){
        //     return next(new AppError('Please provide all the required fields', 400))
        // }

        // const course = await Course.findById(id)
        // if(!course){
        //     return next(new AppError('Course not found', 404))
        // }

        // course.title = title
        // course.description = description
        // course.category = category
        // course.createdBy = createdBy

        // if(req.file){
        //     await cloudinary.v2.uploader.destroy(course.thumbnail.public_id)
        //     try {
        //         const result = await cloudinary.v2.uploader.upload(req.file.path,{
        //             folder: 'courses'
        //         })
                
        //         if(result){
        //             course.thumbnail.public_id = result.public_id
        //             course.thumbnail.secure_url = result.secure_url
                        
        //             //remove file from server
        //             fs.rm(`uploads/${req.file.filename}`)
        //         }
        //     } catch (error) {
        //         return next(new AppError(error.message || 'Problem with file upload', 500))
        //     }
        // }

        // await course.save()

        return res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            course
        })
    } catch (error) {
        return next(new AppError(error.message || 'Failed to update the course', 500))
    }
}

// const updateCourse = async (req, res, next) => {                   // Update all fields of the course               // This is the way to update the course without using the mongoose middleware
//     try {
//         const { id } = req.params

//         const course = await Course.findById(id)
//         if(!course){
//             return next(new AppError('Course not found', 404))
//         }

//         if(req.file){
//             await cloudinary.v2.uploader.destroy(course.thumbnail.public_id)
//         }

//         const { title, description, category, createdBy } = req.body

//         if(!title || !description || !category || !createdBy){
//             console.log({title, description, category, createdBy})
//             return next(new AppError('Please provide all the required fields', 400))
//         }

//         course.title = title
//         course.description = description
//         course.category = category
//         course.createdBy = createdBy

//         if(req.file){
//             try {
//                 const result = await cloudinary.v2.uploader.upload(req.file.path,{
//                     folder: 'courses'
//                 })

//                 if(result){
//                     course.thumbnail.public_id = result.public_id
//                     course.thumbnail.secure_url = result.secure_url

//                     //remove file from server
//                     fs.rm(`uploads/${req.file.filename}`)
//                 }
//             } catch (error) {
//                 return next(new AppError(error.message || 'Problem with file upload', 500))
//             }
//         }

//         await course.save()

//         return res.status(200).json({
//             success: true,
//             message: 'Course updated successfully',
//             course
//         })
//     } catch (error) {
//         return next(new AppError(error.message || 'Failed to update the course', 500))
//     }
// }

const deleteCourse = async (req, res, next) => {
    try {
        const {id} = req.params
        const course = await Course.findById(id)

        if(!course){
            return next(new AppError('Course not found', 404))
        }

        if(course.thumbnail.public_id){
            await cloudinary.v2.uploader.destroy(course.thumbnail.public_id)
        }   

        await Course.findByIdAndDelete(id)
        
        return res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        })
    } catch (error) {
        return next(new AppError(error.message || 'Failed to delete the course', 500))
    }
}

const addLectureToCOurseById = async (req, res, next) => {

    try {
        const { title, description } = req.body
        const { id } = req.params
    
        if(!title || !description){
            return next(new AppError('Please provide all the required fields', 400))
        }
        
        const course = await Course.findById(id)
        if(!course){
            return next(new AppError('Course not found', 404))
        }
    
        const lectureData = {
            title,
            description,
            lecture: {}
        }
    
        if(req.file){
            try {
                const result = await cloudinary.v2.uploader.upload(req.file.path,{
                    folder: 'lectures',
                    chunk_size: 50000000, // 50 mb size
                    resource_type: 'video',
                })
                
                if(result){
                    lectureData.lecture.public_id = result.public_id
                    lectureData.lecture.secure_url = result.secure_url
                        
                    //remove file from server
                    fs.rm(`uploads/${req.file.filename}`)
                }
            } catch (error) {
                return next(new AppError(error.message || 'Problem with file upload', 500))
            }
        }
    
        course.lectures.push(lectureData)
        course.numberOfLecture = course.lectures.length
    
        await course.save()
    
        return res.status(200).json({
            success: true,
            message: 'Lecture added successfully to the course',
            course
        })
    } catch (error) {
        return next(new AppError(error.message || 'Failed to add lecture to the course', 500))
    }

}

const removeLecture = async (req, res, next) => {
    try {
        const { id, lecture_id } = req.params

        const course = await Course.findById(id)
        if(!course){
            return next(new AppError('Course not found', 404))
        }

        const lecture = course.lectures.find(lecture => lecture._id == lecture_id)
        if(!lecture){
            return next(new AppError('Lecture not found', 404))
        }

        if(lecture.lecture.public_id){
            await cloudinary.v2.uploader.destroy(lecture.lecture.public_id)
        }

        const index = course.lectures.indexOf(lecture)
        course.lectures.splice(index, 1)
        course.numberOfLecture = course.lectures.length

        await course.save()

        return res.status(200).json({
            success: true,
            message: 'Lecture removed successfully from the course',
            course
        })
    } catch (error) {
        return next(new AppError(error.message || 'Failed to remove lecture from the course', 500))
    }
}

export {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    addLectureToCOurseById,
    removeLecture
}