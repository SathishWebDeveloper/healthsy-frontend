// import { Link } from "react-router-dom";
// import Link from 'next/link';
// import Header from "../Layouts/Header/Header";
import InClinicBanner from "./inClinicBanner";
import InClinicAdvantages from "./inClinicAdvantages";
import InClinicAppointmentSteps from "./InClinicAppointmentSteps";
import FAQ from "../Common/faq";
// import Footer from "../Layouts/Footer/Footer";
// import home from "../../assets/home-icon.svg";
// import arrowleft from "../../assets/arrow-left.svg";
const home = "/assets/home-icon.svg";
const arrowleft = "/assets/arrow-left.svg";

const InClinicAppoinments = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="clinicAppoinmentsContainer mt-2">
        <div className="padding-section container">
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
            <img src={home} alt="home" />
          </a>{" "}
          <img src={arrowleft} alt="Arrow" className="breadcrumb-arrow-left" />{" "}
          <a href="#"> In-Clinic appointments </a>
        </div>
        <InClinicBanner />
        <InClinicAdvantages />
        <InClinicAppointmentSteps />
      </div>
      <FAQ pageName="In-Clinic appointments service booking" section="in-clinic-appointments"/>
      {/* <Footer /> */}
    </>
  );
};
export default InClinicAppoinments;
