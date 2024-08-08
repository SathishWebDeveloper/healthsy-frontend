import React from "react";
// import Header from "../Layouts/Header/Header";
// import Footer from "../Layouts/Footer/Footer";
import Privacy from "./Privacy";
import PrivacyBanner from "./PrivacyBanner";
import ScrolltoTop from "../ScrollToTop/ScrolltoTop";

const PrivacyPolicy = () => {
    return ( 
       <>
       <ScrolltoTop />
        {/* <Header /> */}
        <PrivacyBanner />
        <Privacy />
        {/* <Footer/> */}
       </>
     );
}
 
export default PrivacyPolicy;