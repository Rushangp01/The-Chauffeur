import React from "react";
import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
import { useLocation } from "react-router-dom"; 
import { useEffect, useContext } from "react";
import { SocketContext } from "../Context/SocketProvider";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";


const Riding = () => {
    const location = useLocation();
    const {ride} = location.state || {};
    const socket = useContext(SocketContext); // Changed this line
    const navigate = useNavigate();

    useEffect(() => {  // Added useEffect
        socket.on("ride-ended", () => {
            navigate('/home');
        });

        return () => {
            socket.off("ride-ended");  // Cleanup listener
        };
    }, [socket, navigate]);

    return (
        <div className="h-screen">
            <Link to='/home' className="fixed block left-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className="h-1/2">
                <LiveTracking/>
            </div>
            <div className="h-1/2 p-4">
            <div className="flex items-center justify-between">
                <img className="h-12" src="https://www.freeiconspng.com/thumbs/car-icon-png/compact-car-icon-5.png" alt="" />
                <div className="text-right">
                    <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
                    <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain.vehicle.plate}</h4>
                    <p className="text-sm text-gray-600">Honda Civic</p>
                </div>
            </div>

            <div className="flex gap-2 justify-between flex-col items-center">
            <div className="w-full mt-5">
                <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                    <i className="text-lg ri-map-pin-fill"></i>
                    <div>
                        <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare} </h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                            </div>
                 </div>
            </div>
            </div>
                
                <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">Make a Payment</button>
            </div>
        </div>
    );
}

export default Riding;