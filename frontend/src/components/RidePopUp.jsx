import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
        <h5 className="p-1 text-center w-[93%] absolute top-0" onClick={()=>{
            props.setRidePopupPanel(false)           
            }}><i className=" text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
            
        </h5>
            <h3 className="text-2xl font-semibold mb-5">New Ride Available</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className=' flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' alt='userImg' src='data:image/jpeg;base64,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'/>
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2> 
                </div>
                <h5 className='text-lg font-semibold '>2.2 KM</h5>
            </div>
            

        <div className="flex gap-2 justify-between flex-col items-center">
           
            <div className="w-full mt-5">
                <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                    <i className="text-lg ri-map-pin-line"></i>
                    <div>
                        <h3 className="text-lg font-medium">562/11-A</h3>
                        <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
                    <i className="text-lg ri-map-pin-fill"></i>
                    <div>
                        <h3 className="text-lg font-medium">129/B</h3>
                        <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
                    </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
            </div>
           <div className='flex mt-5 w-full items-center justify-between'>
              <button onClick={() => {
                props.setConfirmRidePopupPanel(true)
                props.confirmRide()

              }} className="mt-1 bg-green-600 text-white font-semibold p-3 px-10 rounded-lg">Accept</button>
             
              <button onClick={() => {
               props.setRidePopupPanel(false)
              }} className=" mt-1 bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg">Ignore</button>
           </div>
        </div>
    </div>
  )
}

export default RidePopUp
