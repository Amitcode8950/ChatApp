import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Server_URl } from '../main.jsx'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice.js'

const Login = () => {
  let [show, setShow] = useState(false)
  let navigate = useNavigate()
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [loading, setLoading] = useState(false)
  let [error, setError] = useState('')
  let dispatch = useDispatch()
 
  let handleLogin= async (e)=>{
      e.preventDefault()
      setLoading(true)
   try {
      let result =await axios.post(`${Server_URl}/api/auth/login`,{
         email,
         password
      },{withCredentials:true})
      dispatch(setUserData(result.data))
      setEmail('')
      setPassword('')
      setLoading(false)
      setError('')
   } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message || 'Something went wrong. Please try again.')
      setLoading(false)
      
   }   
  }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
        <div className='w-full h-[200px] bg-[#4a4ad6] rounded-b-[30%]  shadow-gray-400 shadow-lg flex justify-center   items-center'>
          <h1 className='text-gray-600 text-[30px] font-bold'>Login  <span className='text-white'>ChatApp</span></h1>
        </div>
        <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleLogin}>
          <input type="email" placeholder='Email' className='w-[90%]  h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] rounded-lg  shadow-gray-200 shadow-lg text-gray-700 text-[19px]' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <div className='w-[90%]  h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[#ffffff] rounded-lg  shadow-gray-200 shadow-lg text-gray-700 text-[19px] flex items-center justify-between'>
            <input type={`${show ? 'text' : 'password'}`} placeholder='password' className='outline-none bg-transparent text-gray-700 text-[19px]' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <span onClick={() => setShow(!show)} className='cursor-pointer text-gray-500'>{show ? 'Hide' : 'Show'}</span>
              </div>

              {error && <p className='text-red-500'>{error}</p>}
          <button className='w-[]  h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[#20c7ff] rounded-lg  shadow-gray-200 shadow-lg text-gray-700 text-[19px] w-[200px] mt-[20px] hover:shadow-inner font-bold-600' disabled={loading}>{loading?"Loading...":"Login"}</button>
          <p className='cursor-pointer'>Don't have an account? <span onClick={() => { navigate('/signup') }} className='text-[#20c7ff] cursor-pointer font-bold '>Sign Up</span></p>
        </form>
      </div>
    </div>
  )
}

export default Login