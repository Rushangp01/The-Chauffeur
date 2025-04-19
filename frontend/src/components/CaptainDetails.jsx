import React, { useContext } from 'react';
import { CaptainDataContext } from '../Context/CaptainProvider';

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext);

    if (!captain) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                    <img
                        className="h-10 w-10 rounded-full object-cover"
                        src="https://plus.unsplash.com/premium_photo-1689539137236-b68e436248de?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                    <h4 className="text-lg font-medium capitalize">
                        {captain?.fullname?.firstname + " " + captain?.fullname?.lastname}
                    </h4>
                </div>
                <div>
                    <h4 className="text-xl font-semibold">$87.9</h4>
                    <p className="text-sm text-gray-600">Earned</p>
                </div>
            </div>
            <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5 items-start">
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
                    <h5 className="text-lg font-medium">6.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
                    <h5 className="text-lg font-medium">6.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
                    <h5 className="text-lg font-medium">6.2</h5>
                    <p className="text-sm text-gray-600">Hours Online</p>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;