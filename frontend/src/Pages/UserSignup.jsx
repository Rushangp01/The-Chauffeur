import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../Context/UserProvider';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const navigate = useNavigate();

  const { user, setUser } = useContext(UserDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser);

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);

        navigate('/home');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src='/MyChauffeur_Logo.png' alt='Chauffeur Logo' />
        <form onSubmit={handleSubmit}>
          <h3 className='text-lg mb-2 font-medium text-base'>Enter your Name</h3>
          <div className='flex gap-4 mb-5'>
            <input
              required
              type='text'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className='bg-[#eeeeee] mb-2 w-1/2 rounded px-2 py-2 border text-base placeholder:text-sm'
              placeholder='Firstname'
            />
            <input
              required
              type='text'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className='bg-[#eeeeee] mb-2 w-1/2 rounded px-2 py-2 border text-base placeholder:text-sm'
              placeholder='Lastname'
            />
          </div>

          <h3 className='text-base mb-2 font-medium'>Enter your email id</h3>
          <input
            required
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] w-full mb-6 rounded px-2 py-2 border text-base placeholder:text-sm'
            placeholder='Email'
          />

          <h3 className='text-base mb-2 font-medium'>Enter your password</h3>
          <input
            required
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-2 py-2 border w-full text-base placeholder:text-sm'
            placeholder='Password'
          />

          <button className='bg-[#111] text-white mb-10 rounded px-2 py-2 border w-full text-base placeholder:text-sm'>
            Create account
          </button>

          <p className='text-center'>
            Already Have an Account? <Link to='/Login' className='text-blue-600'>Login Here</Link>
          </p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;