import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../Context/CaptainProvider';

function CaptainLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const captainData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captainData);

            if (response.status === 200) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                navigate('/captain-home');
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
        }

        setEmail('');
        setPassword('');
    };

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-3' src="/MyChauffeur_Logo.png" alt="Chauffeur Logo" />
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h3 className='text-lg mb-2 font-medium '>Enter your email id</h3>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        type="email"
                        className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base" placeholder="Email" />

                    <h3 className="text-lg mb-2 font-medium">Enter your password</h3>

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
                        required type="password" placeholder="Password" />

                    <button className="bg-[#111] text-white mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base">Login</button>

                    <p className='text-center'>Ready to take a ride? <Link to='/CaptainSignup' className='text-blue-600 mb-3'>Register as a Captain</Link></p>
                </form>
            </div>
            <div>
                <Link to='/Login'
                    className='bg-[#d5622d] flex items-center justify-center text-white mb-7 rounded px-2 py-2 border w-full text-lg placeholder:text-base'>Sign as a User</Link>
            </div>
        </div>
    );
}

export default CaptainLogin;