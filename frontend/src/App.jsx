import React from 'react'
import {Routes, Route} from 'react-router-dom';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './Pages/CaptainLogin';
import Start from './Pages/Start';
import Home from './Pages/Home';
import UserProtectWrapper from './Pages/UserProtectWrapper';
import UserLogout from './Pages/UserLogout';
import CaptainHome from './Pages/CaptainHome';
import CaptainProtectWrapper from './Pages/CaptainProtectWrapper';
import Riding from './Pages/Riding';
import CaptainLogout from './Pages/CaptainLogout';
import CaptainRiding from './Pages/CaptainRiding';
import CaptainSignup from './Pages/CaptainSignup';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path= "/CaptainSignup" element={<CaptainSignup/>}/>
        <Route path='/captain-riding' element = {<CaptainRiding/>}/>
        <Route path='/captain-logout' element = {<CaptainLogout/>}/>
        <Route path="/CaptainLogin" element={<CaptainLogin/>} />
        <Route path="/Signup" element={<UserSignup/>} />
        <Route path="/riding" element={<Riding/>} />
        <Route path="/Login" element={<UserLogin/>} /> 
        <Route path='/home' element = {
          <UserProtectWrapper>
            <Home/>
          </UserProtectWrapper>
        }/>
        <Route path='/logout' element = { 
          <UserProtectWrapper>
            <UserLogout/>
          </UserProtectWrapper>
          
        }/>
        
        <Route path='/captain-home' element = {
        <CaptainProtectWrapper>
          <CaptainHome/>
        </CaptainProtectWrapper>
        } />

        <Route path= '/captain-logout' element = {
          <CaptainProtectWrapper>
            <CaptainLogout/>
          </CaptainProtectWrapper>
        } />

      </Routes>
    </div>
  )
}

export default App
