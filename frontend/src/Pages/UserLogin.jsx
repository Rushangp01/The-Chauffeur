import { Input } from 'postcss'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../Context/UserProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserLogin =() => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [userData, setUserData] = React.useState({})

    const {user, setUser} = useContext(UserDataContext)

    const navigate = useNavigate()



    const handleSubmit = async(e) => {
        e.preventDefault()
        
       const userData = {
            email: email,
            password: password
        }
 
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData)
      
      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }

        setEmail('')
        setPassword('')
    }
    return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
                <img className = 'w-16 mb-10' src = "/MyChauffeur_Logo.png" alt = "Chauffeur Logo" />
      <form onSubmit = {(e) => 
        handleSubmit(e)
      }>
        <h3 className='text-lg mb-2 font-medium '>Enter your email id</h3>
        <input 
         value = {email}
            onChange = {(e) =>{
                setEmail(e.target.value)
            }} 
         required 
         type="email" 
         className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base" placeholder="Email" />
        
        <h3 className="text-lg mb-2 font-medium">Enter your password</h3>
       
        <input 
         value = {password}
         onChange = {(e) =>{
             setPassword(e.target.value)
         }} 
        className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
        required type="password" placeholder="Password" />
       
        <button className="bg-[#111] text-white mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base">Login</button>

        <p className='text-center'>New here? <Link to ='/Signup' className= 'text-blue-600 mb-3'>Create new Account</Link></p>
      </form>
      </div>
      <div>
        <Link to = '/CaptainLogin'
        className = 'bg-[#10b461] flex items-center justify-center text-white mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
 }
export default UserLogin
