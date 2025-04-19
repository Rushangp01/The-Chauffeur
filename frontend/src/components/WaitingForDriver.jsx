import React from "react";

const WaitingForDriver = (props) => {
    return (
        <div className="p-4">
            {/* Close Button */}
            <h5 
                className="p-2 text-center w-full absolute top-0" 
                onClick={() => props.setWaitingForDriver(false)}
            >
                <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            </h5>

            <div className="flex items-center justify-between w-full mt-10 p-4">
                <img 
                    className="h-16" // 🚀 Made the car image larger  
                    src="https://www.freeiconspng.com/thumbs/car-icon-png/compact-car-icon-5.png" 
                    alt="Car"
                />
                <div className="text-right flex-1"> {/* Ensured proper text alignment */}
                <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
                <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                <h1 className='text-lg font-semibold'>  {props.ride?.otp} </h1>
                </div>
            </div>

            <div className="flex flex-col items-center w-full">
                <div className="w-full mt-5">
                    
                    <div className="flex items-center gap-5 p-4 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-line"></i>
                        <div>

                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
                        </div>
                    </div>

                   
                    <div className="flex items-center gap-5 p-4 border-b-2 border-gray-300">
                        <i className="text-lg ri-map-pin-fill"></i>
                        <div>
                            <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
                        </div>
                    </div>

                    {/* Fare Section */}
                    <div className="flex items-center gap-5 p-4">
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">{props.ride?.fare}</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WaitingForDriver;
