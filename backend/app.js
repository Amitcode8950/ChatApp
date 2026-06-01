import express from "express"
const app =express()
import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import cors from "cors"
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


export default app