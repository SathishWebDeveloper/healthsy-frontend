import React from 'react'
import thumbsup from "../../../assets/homepage/thumbsup.gif"

const GetNotifiedSuccesModal = () => {
  return (
    <>
      <div
        className="modal fade jobshare-section"
        id="jobshare"
        tabIndex="-1"
        aria-labelledby="jobShareModal"
        aria-hidden="true"

      >
        <div className="modal-dialog modal-box launch-dialog" >

          <div
            className="modal-content launch-modal"
            style={{ borderRadius: "8px" }}
          >
            <div className="modal-body launch-body">
              <div>
                <img className="launchIcon" src={thumbsup} alt="thumbsup" />
              </div>
              <div
                className="launchTitle"
              >
                Submitted Successfully
              </div>
              <div
                className="launchpara"
              >
                Thank you for the interest in HealthSy! You will be notified
                of our updates with regards to the launch.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GetNotifiedSuccesModal