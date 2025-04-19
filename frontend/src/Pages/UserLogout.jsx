import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); //  Call the function

    useEffect(() => {
        if (!token) {
            navigate('/Login'); //  Redirect if no token
            return;
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        })
        .then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/Login'); //  Redirect after logout
            }
        })
        .catch((error) => {
            console.error('Logout error:', error.response?.data || error.message);
        });
    }, [navigate, token]); // ✅ Added dependencies

    return <div>Logging out...</div>;
};

export default UserLogout;
