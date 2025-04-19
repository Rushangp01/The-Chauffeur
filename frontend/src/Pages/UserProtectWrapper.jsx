import React, { Children, useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../Context/UserProvider'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';


const UserProtectWrapper = ({
    children
}) => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  
    const {user, setUser} = useContext(UserDataContext)
    const[isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if (!token) {
        navigate("/Login");
        return;
      }
    
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            setUser(response.data);
            setIsLoading(false);
          }
        } catch (err) {
          console.error("Profile Fetch Error:", err);
          localStorage.removeItem("token");
          navigate("/Login");
        }
      };
    
      fetchProfile();
    }, [token]);
    
   
    if(isLoading){
      return (
          <div>Loading...</div>
      )
    }

  return (
    <div>
        {children}           
    </div>
  )
}

export default UserProtectWrapper
