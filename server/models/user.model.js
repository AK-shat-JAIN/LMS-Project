import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Please enter your full name'],
        trim: true,
        maxlength: [50, 'Full name cannot exceed 50 characters'],
        minlength: [5, 'Full name must be at least 5 characters long'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ]
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Password must be at least 8 characters long'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_id: {
            type: String,
        }
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    forgortPasswordToken: String,
    forgortPasswordExpire: Date,
    subscription: {
        id: String,
        status: String
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods = {
    getJwtToken: async function(){
        return await jwt.sign(
            { id: this._id, email: this.email, role: this.role, subscription: this.subscription }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRY }
        )
    },
    comparePassword: async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password)
    },
    getResetPasswordToken: async function(){
        const resetToken = await crypto.randomBytes(20).toString('hex')

        this.forgortPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex')
        this.forgortPasswordExpire = Date.now() + 15 * 60 * 1000  // 15 minutes from now

        return resetToken
    }
}

const User = model('User', userSchema)
export default User