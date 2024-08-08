import React from 'react'
import "../healthcareregistration.css"
import healthsyLogo from "../../../assets/healthsy-logo.png";
import { useNavigate } from 'react-router-dom';

// todo
const HealthCareHeader = () => {

  const navigate = useNavigate()

  return (
    <div className='healthcareregisterheader'>
      <div className='healthcareregisterheader-logo'>
        <img style={{ cursor: "pointer" }} onClick={() => {
          navigate("/")
        }} src={healthsyLogo} alt="healthsyLogo" className="logo-img" />
      </div>
    </div>
  )
}

export default HealthCareHeader