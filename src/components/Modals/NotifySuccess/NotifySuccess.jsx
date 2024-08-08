import React from "react";
// import thumbsup from "../../../assets/homepage/thumbsup.gif"
// import "./notify.css"
import { useEffect } from 'react';
import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';

const thumbsup = "/assets/homepage/thumbsup.gif"

const NotifySuccess = (props) => {
  const { closeModal } = props || {}

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 960px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);

  const navigate = useRouter().push

  return (
    <>
      <div
        className="modal fade show blogsuccess"
        id="blogsuccess"
        tabIndex="-1"
        aria-labelledby="blogsuccessModal"
        aria-hidden="true"
        onClick={() => window.location.reload()}
      >
        <div className="modal-dialog modal-box" >

          <div
            className="modal-content"
            style={{ borderRadius: "8px" }}
          >
            <div className="modal-body">
              <div className='blogsuccessicon'>
                <img src={thumbsup} alt="thumbsup" />
              </div>
              {
                isDesktop
                  ?
                  <div
                    style={{
                      textAlign: "center",
                      height: "10vh",
                      fontSize: "32px",
                      fontWeight: "700"
                    }}
                  >
                    Thank You!
                  </div>
                  :
                  <div
                    style={{
                      textAlign: "center",
                      fontSize: "24px",
                      fontWeight: "700",
                      marginTop: "5%",
                      marginBottom: "5%"
                    }}
                  >
                    Thank You!
                  </div>
              }
              {
                isDesktop
                  ?
                  <div
                    className="launchpara"
                    style={{
                      textAlign: "center",
                      height: "10vh",
                      fontWeight: "500",
                      fontSize: "24px"
                    }}
                  >
                    You will be notified of our launch <span> 🚀</span>
                  </div>
                  :
                  <div
                    className="blogsuccesspara-mob"
                    style={{
                      textAlign: "center",
                      height: "6vh",
                      fontWeight: "500",
                      fontSize: "18px"
                    }}
                  >
                    You will be notified of our launch <span> 🚀</span>
                  </div>
              }
              {/* {
                isDesktop
                ?
                ""
                :
                <div className='blog-gohome-mob'>
                  <button onClick={()=>navigate("/")}>Go to Home</button>
                </div>
              } */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotifySuccess;
