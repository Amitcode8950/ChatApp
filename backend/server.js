import dotenv from "dotenv"
dotenv.config()
import dns from "dns"
dns.setServers(["8.8.8.8", "8.8.4.4"])
import app from "./app.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 3000;


connectDB()
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
 