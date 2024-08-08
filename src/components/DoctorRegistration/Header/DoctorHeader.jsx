import React from 'react'
import "../doctorregistration.css"
import healthsyLogo from "../../../assets/healthsy-logo.png";
import { useNavigate } from 'react-router-dom';

const DoctorHeader = () => {

  const navigate = useNavigate()

  return (
    <div className='doctorregisterheader'>
      <div className='doctorregisterheader-logo'>
        <img style={{ cursor: "pointer" }} onClick={() => {
          navigate("/")
        }} src={healthsyLogo} alt="healthsyLogo" className="logo-img" />
      </div>
    </div>
  )
}

export default DoctorHeader