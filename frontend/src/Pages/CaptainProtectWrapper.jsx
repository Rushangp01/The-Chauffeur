import React, { useContext, useEffect, useState } from 'react';
import { CaptainDataContext } from '../Context/CaptainProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { setCaptain } = useContext(CaptainDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            console.log('No token found, navigating to /CaptainLogin');
            navigate('/CaptainLogin');
            return;
        }

        console.log('Fetching captain profile with token:', token);

        axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Captain profile response:', response);
            if (response.status === 200) {
                setCaptain(response.data);
                console.log('Captain data set:', response.data);
            } else {
                console.error('Failed to fetch captain profile:', response.status);
                localStorage.removeItem('token');
                navigate('/CaptainLogin');
            }
        })
        .catch(error => {
            console.error('Error fetching captain profile:', error);
            localStorage.removeItem('token');
            navigate('/CaptainLogin');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [token, navigate, setCaptain]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return children;
};

export default CaptainProtectWrapper;