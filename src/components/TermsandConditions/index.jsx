import React from "react";
// import Header from "../Layouts/Header/Header";
// import Footer from "../Layouts/Footer/Footer";
import Terms from "./terms";
import TermsBanner from "./termsBanner";
import ScrolltoTop from "../ScrollToTop/ScrolltoTop";

const TermsCondition = () => {
    return ( 
       <>
       <ScrolltoTop />
        {/* <Header /> */}
        <TermsBanner />
        <Terms />
        {/* <Footer/> */}
       </>
     );
}
 
export default TermsCondition;