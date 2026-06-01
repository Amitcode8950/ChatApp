import express from "express"
import {getCurrentUser} from "../controllers/user.controllers.js"
import isAuthenticated from "../middlewares/isAuth.js"
const userRouter = express.Router()



userRouter.post("/current",isAuthenticated,getCurrentUser)


export default userRouter