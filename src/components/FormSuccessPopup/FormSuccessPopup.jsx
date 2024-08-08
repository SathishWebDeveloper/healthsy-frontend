import React from 'react'
// import { useNavigate } from 'react-router-dom'
import "./success.css"
import successgif from "../../assets/success-icon.gif"

// todo 
const FormSuccessPopup = () => {

  // const navigate = useNavigate()

  return (
    <>
      <button
        type="button"
        className="healthcareregistration2-submit-register-button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Register
      </button>
      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-box">
          <div className="modal-content">
            <div className="modal-body">
              <div className='success-container'
              // style={{
              //    width:"100%",
              //    height:"80vh",
              // }}
              >
                <div style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}><img className='success-pop-img'
                  // style={{
                  //   width:"30%",
                  //   height:"100%"
                  // }} 
                  src={successgif} alt="successgif" /></div>
                <div style={{
                  textAlign: "center",
                  fontSize: "24px",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  width: "100%",
                  height: "20%",
                  fontWeight: "500",
                }}>Registered Successfully </div>
                <div style={{
                  width: "100%",
                  height: "10%",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                    <button
                      style={{
                        width: "40%",
                        height: "90%",
                        margin: "auto",
                        borderRadius: "8px",
                        background: "#CB1B5B",
                        border: "1px solid #CB1B5B",
                        color: "#fff",
                        fontSize: "medium"
                      }}>Go to Home</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormSuccessPopup