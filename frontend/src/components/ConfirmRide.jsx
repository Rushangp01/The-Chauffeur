import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div>
       <h5 className=' w-[93%] p-3 text-center absolute top-0' onClick={() =>{
       props.setConfirmRidePanel(false)
       }}> <i className=" text-3xl text-gray-200 ri-arrow-down-wide-fill"></i></h5>
       <h3 className='text-lg font-semibold mb-5'>Confirm your ride</h3>
       
       <div className="flex gap-2 justify-between flex-col items-center">
        <img className="h-20" src="https://www.freeiconspng.com/thumbs/car-icon-png/compact-car-icon-5.png" alt="ride" />

       <div className='w-ful mt-5'>
    <div className='flex items-center gap-5 border-b-2 '>    
       <i className=" ri-map-pin-3-fill"></i>
        <div>
            <h3 className='text-lg font-medium'>562/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600 '>{props.pickup}</p>
        </div>
    </div>    
        
    <div className='flex items-center gap-5 border-b-2 '>
        <i className="ri-map-pin-2-fill"></i>
        <div>
            <h3 className='text-lg font-medium '>562/11-A</h3>
            <p className='text-sm -mt-1 text-gray-600 '>{props.destination}</p>
        </div>        
    </div>

     <div className='flex items-center gap-5'>
       <i className="ri-money-rupee-circle-fill"></i>
        <div>
            <h3 className='text-lg font-medium'>{props.fare[props.vehicleType]}</h3>
            <p className='text-sm -mt-1 text-gray-600 '> <i className="ri-money-rupee-circle-fill"></i>Cash</p>
        </div>
     </div>
    </div>
       
       <button onClick={() =>{
           props.setvehicleFound(true)
           props.setConfirmRidePanel(false)
           props.createRide()
       }} 
       className=' mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg w-full'>Confirm</button>       
       
    </div>
   
    </div>
  )
}

export default ConfirmRide
