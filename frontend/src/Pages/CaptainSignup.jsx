import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../Context/CaptainProvider'

const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')
    
  const { setCaptain } = useContext(CaptainDataContext)
  const navigate = useNavigate()  

    const handleSubmit = async (e) => {
        e.preventDefault()

        const captainData = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, captainData)

            if (response.status === 201) {
                const data = response.data
                setCaptain(data.captain)
                localStorage.setItem('token', data.token)
                navigate('/CaptainLogin')  // Correct way to redirect
            }
        } catch (error) {
            console.error('Signup failed:', error.response?.data || error.message)
        }

        // Clear form fields
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-3' src="/MyChauffeur_Logo.png" alt="Chauffeur Logo" />
                <form onSubmit={handleSubmit}>
                    <h3 className='text-lg mb-2 font-medium text-base'>Enter your Name</h3>
                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-2 py-2 border w-full text-base placeholder:text-sm"
                            placeholder="Firstname"
                        />
                        <input
                            required
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-2 py-2 border text-base placeholder:text-sm"
                            placeholder="Lastname"
                        />
                    </div>

                    <h3 className='text-base mb-2 font-medium '>Enter your email id</h3>
                    <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#eeeeee] w-full mb-6 rounded px-2 py-2 border text-base placeholder:text-sm"
                        placeholder="Email"
                    />

                    <h3 className="text-base mb-2 font-medium">Enter your password</h3>
                    <input
                        required
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-base placeholder:text-sm"
                        placeholder="Password"
                    />

                    <h3 className='text-lg mb-2 font-medium text-base'>Vehicle Details</h3>
                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            type="text"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-2 py-2 border text-base placeholder:text-sm"
                            placeholder="Vehicle Color"
                        />
                        <input
                            required
                            type="text"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-2 py-2 border text-base placeholder:text-sm"
                            placeholder="Vehicle Plate Number"
                        />
                    </div>

                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            type="number"
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-2 py-2 border text-base placeholder:text-sm"
                            placeholder="Vehicle Capacity"
                        />
                        <select
                            required
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="bg-[#eeeeee] mb-2 w-1/2 rounded px-2 py-2 border text-base"
                        >

                         <option value="">Select Vehicle Type</option>
                         <option value="car">Car</option>
                         <option value="Auto">Auto</option> {/* Change from "auto" to "Auto" */}
                         <option value="motorcycle">Motorcycle</option> {/* Change from "bike" to "motorcycle" */}
                        </select>
                    </div>

                    <button className="bg-[#111] text-white mb-10 rounded px-2 py-2 border w-full text-base">
                        Create Captain account
                    </button>

                    <p className='text-center'>
                        Already Have an Account? <Link to='/CaptainLogin' className='text-blue-600'>Login Here</Link>
                    </p>
                </form>
            </div>
            <div>
                <p className='text-[10px] leading-tight'>
                    This site is protected by reCAPTCHA and <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply.</span>
                </p>
            </div>
        </div>
    )
}

export default CaptainSignup
