import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config();

const port = process.env.PORT || 8000

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api/users', userRoutes)

app.get("/", (req,res) => {
    res.send("Server is ready")
})


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server started on port ${port}`)
})