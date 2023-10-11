import { model, Schema } from 'mongoose'

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please enter course title'],
        minlength: [6, 'Course title must be at least 6 characters long'],
        maxlength: [100, 'Course title cannot exceed 100 characters'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please enter course description'],
        minlength: [8, 'Course description must be at least 8 characters long'],
        maxlength: [500, 'Course description cannot exceed 500 characters'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Please enter course category']
    },
    thumbnail: {
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    lectures: [
        {
            title: String,
            description: String,
            lecture: {
                public_id: {
                    type: String,
                    required: true
                },
                secure_url: {
                    type: String,
                    required: true
                }
            }
        }
    ],
    numberOfLecture: {
        type: Number,
        default: 0
    },
    createdBy: {
        type: String,
        required: [true, 'Please enter course creator']
    }
},{
    timestamps: true
})

const Course = model('Course', courseSchema)

export default Course