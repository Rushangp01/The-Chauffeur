import React from 'react'
import { Link } from 'react-router-dom'

const Start =() => {
  return (
    <div>
     <div className="h-screen pt-8 flex justify-between flex-col w-full bg-red-400 bg-[url('https://images.unsplash.com/photo-1624724126923-e2c021df1311?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"> 
        <img className = 'w-16 ml-8' src = "/MyChauffeur_Logo.png" alt = "Chauffeur Logo" />   
         <div className= 'bg-white pb-7 py-5 px-10'>
            <h2 className= 'text-3xl font-bold  text-center w-full'>Get Started With Chauffeur</h2>
            <Link to='/Login' className= 'flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
         </div>
      </div>  
    </div>
  )
}

export default Start
