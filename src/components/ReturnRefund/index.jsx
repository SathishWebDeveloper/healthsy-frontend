import React from "react";
// import Header from "../Layouts/Header/Header";
// import Footer from "../Layouts/Footer/Footer";
import ReturnRefunds from "./ReturnRefunds";
import ReturnRefundBanner from "./ReturnRefundBanner";
import ScrolltoTop from "../ScrollToTop/ScrolltoTop";

const RefundIndex = () => {
    return ( 
       <>
       <ScrolltoTop />
        {/* <Header /> */}
        <ReturnRefundBanner />
        <ReturnRefunds />
        {/* <Footer/> */}
       </>
     );
}
 
export default RefundIndex;