import jwt from "jsonwebtoken"
const isAuthenticated = (req,res,next)=>{
    try {
        let token = req.cookies.token
        if(!token){
            return res.status(401).json({message:"Unauthorized"})
        }
        let decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decodedToken.userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal server error"})
    }
}
export default isAuthenticated