import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
// import Link from 'next/link';
// import Header from "../Layouts/Header/Header";
import ContactUsBanner from "./contactUsBanner";
import CustomerSupport from "./customerSupport";
import ContactUsForm from "./contactUsForm";
import AddressSection from "./addressSection";
import SubscribtionSection from "./subscribtionSection";
// import Footer from "../Layouts/Footer/Footer";
// import home from "../../assets/home-icon.svg";
// import arrowleft from "../../assets/arrow-left.svg";

const ConnectSocialMedia = () => {

  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");

  useEffect(() => {
    getSocialMediaData();
  }, []);

  const getSocialMediaData = () => {
    axios
        .post(`${process.env.NEXT_PUBLIC_APP_API_URL}social-media-links/list`)
        .then((res) => {
            setLinkedinUrl(res.data.rows[res.data.rows.length - 1].linkedin);
            setInstagramUrl(res.data.rows[res.data.rows.length - 1].instagram);
            setTwitterUrl(res.data.rows[res.data.rows.length - 1].twitter);
        });
  };
  return (
    <div className="contactUsSocialMedia container">
      <div className="text-center connectWithUs">Connect with us</div>
        <div className="d-flex w-100 justify-content-around fw-bold socialMediaTexts mt-4 flex-wrap container">
            <div className="cursor-pointer" onClick={() => {window.open(linkedinUrl)}}>LinkedIn</div>
            <div className="cursor-pointer" onClick={() => {window.open(instagramUrl)}}>Instagram</div>
            <div className="cursor-pointer" onClick={() => {window.open(twitterUrl)}}>Twitter</div>
        </div>
    </div>
  )
}
const ContactUs = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="contactUsContainer">
        <ContactUsBanner />
        <CustomerSupport />
        <ContactUsForm />
        {/* <AddressSection /> 
        <SubscribtionSection />
        <ConnectSocialMedia /> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};
export default ContactUs;
