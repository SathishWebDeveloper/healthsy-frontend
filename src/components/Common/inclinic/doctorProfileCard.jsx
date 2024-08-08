import Image from "next/image"
import { useMemo } from "react";

const locationIcon = "/assets/location.svg";
const hospitalIcon = "/assets/icons/hospital.svg";
const verifyImg = "/assets/icons/verify.svg"
const graduation = "/assets/icons/graduation.svg"
const language = "/assets/icons/language.svg"
const experience = "/assets/icons/experience.svg"

const DoctorProfileCard = ({
  doctorDetail,
  inClinic = true,
  viewProfile = true,
  wrapperClassName,
  isWrapper = false,
  handleViewDoctorProfile = () => { },
  consultDoctor = () => { },
  isProfileCard = false
}) => {

  const currentYear = new Date().getFullYear();

  const clinicLocation = useMemo(() => {
    if (doctorDetail?.clinic_profiles?.length) {
      if (doctorDetail.clinic_profiles.length === 1) {
        return doctorDetail.clinic_profiles[0].clinic_name
      } else {
        const cityMatchedClinic = doctorDetail.clinic_profiles.filter((data) => data.city === doctorDetail.city._id)
        return cityMatchedClinic?.length ? cityMatchedClinic[0].clinic_name : doctorDetail.clinic_profiles[0].clinic_name
      }
    }
    return ""
  }, [doctorDetail])

  const ProfileCard = (
    <div className="doctorsListCard position-relative flexBetween">
      <div className="d-flex doctersListCardContainer" style={{ display: "flex", flexDirection: "column" }}>
        <div className="d-flex" >

          <div className="doctersImageContainer">
            <img src={`${process.env.NEXT_PUBLIC_APP_API_URL}profile-images/${doctorDetail?.profileImage}`} width={146} height={196} className="doctorsCardImage" alt="doctor" />
          </div>
          <div className="doctorListDetails">
            <div className="flexAlignCenter">
              {isProfileCard? (<h1 className="doctorsListContent fs22m16fwb">{doctorDetail.doctor_name}</h1>) : (<h2 className="doctorsListContent fs22m16fwb">{doctorDetail.doctor_name}</h2>)}
              <Image src={verifyImg} width={21} height={21} alt="verify" className="" />
            </div>
           {isProfileCard ? <h2 className="fs16m14 doctorsListTitle">{doctorDetail.inclinic_primary_specialization?.inclinic_doctor_specialization}</h2> : <div className="fs16m14 doctorsListTitle">{doctorDetail.inclinic_primary_specialization?.inclinic_doctor_specialization}</div>}
            <div className="d-flex">
              <Image src={graduation} width={16} height={16} alt="graduationImg" className="" />
              <div className="fs13m12 doctorsListQualification">{doctorDetail?.degree?.ug_degree}</div>
            </div>
            <div className="d-flex doctorsListLanguage">
              <Image src={language} width={19} height={19} alt="language" className="" />
              <div className="fs13m12 doctorsListQualification">{doctorDetail.languages_known?.map(item => item?.type)?.join(', ')}</div>
            </div>
            {/* todo Experience */}
            <div className="d-flex">
              <Image src={experience} width={19} height={19} alt="experience" />
              <div className="fs13m12 doctorsListQualification">Experience:  {currentYear - doctorDetail.medical_council + 1}</div>
            </div>
          </div>
        </div>
        {inClinic && (
          <div className="doctors-inclinic-location-area">
            <span className="inclinic-doctors-area">
              <Image
                src={locationIcon}
                width={14}
                height={14}
                alt="location"
                className="me-2"
              />
              {doctorDetail?.clinic_location?.locality ? `${doctorDetail.clinic_location.locality}, ` : null}{doctorDetail.city?.city}
            </span>
            <span className="inclinic-doctors-area">
              {" "}
              <Image
                src={hospitalIcon}
                width={14}
                height={14}
                alt="location"
                className="me-2"
              />{" "}
              {clinicLocation}
            </span>
          </div>
        )}
      </div>
      <div className={`d-flex doctorsListBtn ${inClinic && "inclinic-button-field"}`}
      >
        {viewProfile ? <button type="button" className="doctorsProfile" onClick={() => handleViewDoctorProfile(doctorDetail?.doctor_name_slug)}>View Profile</button> : null}
        {/* <button type="button" onClick={() => consultDoctor(doctorDetail)} className="doctorConsultation">Consult ₹{doctorDetail?.online_consultation_fee}</button> */}
      </div>
    </div>
  )

  return (
    isWrapper ?
      <div className={`doctorsList ${wrapperClassName}`}>
        {ProfileCard}
      </div> : ProfileCard
  )
}

export default DoctorProfileCard