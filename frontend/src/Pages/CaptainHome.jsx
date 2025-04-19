// CaptainHome.jsx
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { SocketContext } from "../Context/SocketProvider";
import { useContext, useEffect } from "react";
import { CaptainDataContext } from "../Context/CaptainProvider";
import axios from "axios";

const CaptainHome = () => {
    const [RidePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const [ride, setRide] = useState(null);

    const confirmRidePopupRef = useRef(null);
    const RidePopupPanelRef = useRef(null);
    const socket = useContext(SocketContext);
    const captain = useContext(CaptainDataContext);

    useEffect(() => {
        socket.emit('join', {
            userType: 'captain',
            userId: captain.captain._id,
        });

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain.captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                    });
                });
            }
        };

        updateLocation();
        const locationInterval = setInterval(() => {
            updateLocation();
        }, 10000);

        socket.on('new-ride', (ride) => {
            console.log('New Ride Notification:', ride);
            setRide(ride);
            setRidePopupPanel(true);
        });

        return () => {
            clearInterval(locationInterval);
            socket.off('new-ride');
        };
    }, [socket, captain.captain._id]);

    async function confirmRide() {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
            {
                rideId: ride._id,
                otp: ride.otp || "1234", // Use a default OTP if not available
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }
        );

        setRidePopupPanel(false);
        setConfirmRidePopupPanel(true);
    }

    useGSAP(() => {
        if (RidePopupPanel) {
            gsap.to(RidePopupPanelRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(RidePopupPanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [RidePopupPanel]);

    useGSAP(() => {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(confirmRidePopupRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [confirmRidePopupPanel]);

    return (
        <div className="h-screen">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img
                    className="w-12 absolute left-5 top-5 rounded-full object-cover"
                    src="/MyChauffeur_Logo.png"
                    alt="logo"
                />
                <Link
                    to="/CaptainLogin"
                    className="fixed block right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-10"
                >
                    <i className="text-xl font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className="h-3/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="map-gif"
                />
            </div>
            <div className="h-2/5 p-6">
                <CaptainDetails />
            </div>
            <div ref={RidePopupPanelRef} className="fixed w-full z-10 bottom-0 bg-white pt-12 py-8 px-3">
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    confirmRide={confirmRide}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                />
            </div>
            <div ref={confirmRidePopupRef} className="fixed z-10 bottom-0 h-screen translate-y-full px-3 bg-white w-full py-6 pt-12">
                <ConfirmRidePopUp 
                ride={ride}
                setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    );
};

export default CaptainHome;