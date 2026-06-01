import jwt from "jsonwebtoken"

const genToken = async(id)=>{
   try {
    const token =await jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"7d"})
    return token
   } catch (error) {
    console.log(error)
    console.log("token not generated")
   }
}

export default genToken
