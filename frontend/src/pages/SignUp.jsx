import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Server_URl } from '../main.jsx'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setUserData } from '../redux/userSlice.js'
const SignUp = () => {
    let navigate = useNavigate()
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState('')
    let dispatch = useDispatch()
    let handleSingUp= async (e)=>{
        e.preventDefault()
        setLoading(true)
     try {
        let result =await axios.post(`${Server_URl}/api/auth/signup`,{
           username,
           email,
           password
        },{withCredentials:true})
        dispatch(setUserData(result.data))
        setEmail('')
        setPassword('')
        setUsername('')
        setLoading(false)
        setError('')
     } catch (error) {
        console.log(error)
        setLoading(false)
        setError(error?.response?.data?.message)
       
     }   
    }
    return (
        <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
            <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
                <div className='w-full h-[200px] bg-[#4a4ad6] rounded-b-[30%]  shadow-gray-400 shadow-lg flex justify-center   items-center'>
                    <h1 className='text-gray-600 text-[30px] font-bold'>WelCome in <span className='text-white'>ChatApp</span></h1>
                </div>
                <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleSingUp}>
                    <input type="text" placeholder='Username' className='w-[90%]  h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg  shadow-gray-200 shadow-lg text-gray-700 text-[19px]' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    <input type="email" placeholder='Email' className='w-[90%]  h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg  shadow-gray-200 shadow-lg text-gray-700 text-[19px]' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder='password' className='w-[90%]  h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg  shadow-gray-200 shadow-lg text-gray-700 text-[19px]' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    {error && <p className='text-red-500'>{error}</p>}      
        <button className='w-[]  h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[#20c7ff] rounded-lg  shadow-gray-200 shadow-lg text-gray-700 text-[19px] w-[200px] mt-[20px] hover:shadow-inner font-bold-600' disabled={loading}>{loading?"Loading...":"Sign Up"}</button>
        <p className='cursor-pointer'>Already have an account? <span className='text-[#20c7ff] cursor-pointer font-bold ' onClick={()=>{navigate('/login')}}>Login</span></p>
                </form>
            </div>
        </div>
    )
}

export default SignUp