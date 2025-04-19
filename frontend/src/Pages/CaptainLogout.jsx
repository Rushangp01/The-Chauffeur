import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const token = localStorage.getItem('token'); // Ensure the correct key is used
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Token in localStorage:', token); // Debugging log

        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            console.log('Logout response:', response.data); // Debugging log
            if (response.status === 200) {
                localStorage.removeItem('token'); // Remove token from local storage
                console.log('Navigating to CaptainLogin'); // Debugging log
                navigate('/CaptainLogin'); // Redirect to CaptainLogin
            }
        })
        .catch((error) => {
            console.error('Logout error:', error.response?.data || error.message);
            localStorage.removeItem('token'); // Ensure token is removed even if the API call fails
            navigate('/CaptainLogin'); // Redirect to CaptainLogin
        });
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default CaptainLogout;