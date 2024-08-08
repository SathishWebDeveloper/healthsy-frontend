import { useState } from "react"
import BookingDetailsModal from "../Common/bookingDetailsModal"
import DoctorProfileCard from "../Common/inclinic/doctorProfileCard"
import useIsDesktop from "../Hooks/useIsDesktop"
import DoctorGeneralInfo from "./DoctorGeneralInfo"
import DownloadApp from "./DownloadApp"
import InclinicDoctorGeneralInfo from "./InclinicDocterGeneralInfo"


const DoctorDetails = ({ doctor_profile, specialization, doctorDetail, inClinic = false, isProfileCard = false }) => {

  const [popup, setPopup] = useState(false)
  const desktop = useIsDesktop()

  return (
    <>
      <div className="container doctorDetailsWrapper">
        <div className="flexBetween doctorDetailsBannerWrapper">
          <div className="doctercardDetails_Area">
            <DoctorProfileCard
              doctorDetail={doctorDetail}
              viewProfile={false}
              wrapperClassName="p-0"
              isWrapper={true}
              isProfileCard={isProfileCard}
            />

            {inClinic ? (
              <InclinicDoctorGeneralInfo
                doctorDetail={doctorDetail}
              />) : <DoctorGeneralInfo specialization={specialization} doctorDetail={doctorDetail} />}
          </div>
          <DownloadApp
            className="doctorDownloadApp"
          />
        </div>
        {popup &&
          <BookingDetailsModal
            successModal={popup}
            setSuccessModal={setPopup}
            doctorDetail={doctorDetail}
            specialization={specialization}
          />
        }
      </div>
    </>
  )
}

export default DoctorDetails