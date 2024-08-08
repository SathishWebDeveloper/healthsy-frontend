import React from "react";
// import Header from "../Layouts/Header/Header";
// import Footer from "../Layouts/Footer/Footer";
import CustomerGrievance from "./CustomerGrievance";
import CustomerGrievanceBanner from "./CustomerGrievanceBanner";
import ScrolltoTop from "../ScrollToTop/ScrolltoTop";

const CustomerGrievanceIndex = () => {
    return ( 
       <>
       <ScrolltoTop />
        {/* <Header /> */}
        <CustomerGrievanceBanner />
        <CustomerGrievance />
        {/* <Footer/> */}
       </>
     );
}
 
export default CustomerGrievanceIndex;