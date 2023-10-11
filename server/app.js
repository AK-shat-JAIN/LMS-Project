// require('dotenv').config()
import {config} from 'dotenv'
config()
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import errorMiddleware from './middlewares/error.middleware.js'
// Import all routes
import userRoutes from './routes/user.routes.js'
import courseRoutes from './routes/course.routes.js'
import paymentRoutes from './routes/payment.routes.js'
import miscRouter from './routes/miscellaneous.routes.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))
app.use(cookieParser())
app.use(morgan('dev'))                   // Logs all the requests to the console for debugging purposes only

app.use('/ping', function(req, res){
    res.send('Response: Pong')
})

// Routes of all 3 models will be defined here

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payment', paymentRoutes)
app.use('/api/v1', miscRouter)

app.all('*', (req, res) => {
    res.status(404).send('OOPS!! 404 page Not Found')
})

app.use(errorMiddleware)

export default app