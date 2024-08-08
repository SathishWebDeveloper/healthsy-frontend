import React, {useEffect} from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import BookADemo from '../BookADemo/BookADemo'
import Careers from '../Careers'
import CareersDetails from '../Careers/CareerDetails'
import Home from '../Home'
import PharmacyRegistration from '../PharmacyRegistration/PharmacyRegistration'
import SellwithUs from '../SellwithUs/index'
import OtherRegistration from '../OtherRegistration'
import PartneredDoctors from '../PartneredDoctors'
import HealthCare from '../HealthCare'
import DoctorRegistrationForm1 from '../DoctorRegistration/Form/DoctorRegistrationForm1'
import HealthCareRegistration from '../HealthCareRegistration/Form/HealthCareRegistration'
import BlogCategories from '../Blog'
import BlogDetails from '../BlogDetails'

import DetailContent from '../Careers/CareerDetails/DetailContent/detailcontent'
import Articlebanner from '../BlogDetails/Banner/Articlebanner'
import DetailBanner from '../Careers/CareerDetails/DetailBanner/DetailBanner'
import Terms from '../TermsandConditions/index'
import Privacy from '../Privacy/index'
import ScrolltoTop from '../ScrollToTop/ScrolltoTop'
import AllCategoryBanner from '../Blog/AllCategories/Banner'
import UnderConstruction from '../Fallback/UnderConstruction'
import Page404 from "../Fallback/404"
import { HelmetProvider, Helmet } from 'react-helmet-async';
import InClinicAppoinments from '../In-ClinicAppointments';
import HomeHealthcare from '../HomeHealthcare'
import OnlineConsultation from '../onlineConsultation'
import OrderMedicine from '../orderMedicine'
import ReturnRefund from '../ReturnRefund/index'
import CustomerGrievancePolicy from '../CustomerGrievancePolicy/index'
import PlusMembership from '../PlusMembership'
import ContactUs from '../ContactUs'
import AboutUsPage from '../AboutUs'
import HealthcareProducts from '../HealthcareProducts'

const AllRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top:0,
      behavior: 'instant',
    });
  }, [location.pathname]);
  return (
    <div>
       <Helmet>
          <link rel="canonical" href={`${process.env.NEXT_PUBLIC_WEB_URL}${location.pathname}`} />
        </Helmet>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/book-demo' element={<BookADemo />} />
            <Route path='/join-us' element={<Careers />} />
            {/* <Route path='/career-detail/:id' element={<CareersDetails /> } /> */}
            <Route path='/career-detail/:slugurl/:id' element={<CareersDetails /> } />
            {/* <Route path='/career-detail/:slugurl/:id' element={<DetailBanner /> } /> */}
            <Route path='/sell-with-us' element={<SellwithUs /> } />
            <Route path='/pharmacy-registration' element={<PharmacyRegistration /> } />
            <Route path='/other-form' element={<OtherRegistration /> } />
            <Route path='/register/doctor' element={<DoctorRegistrationForm1 /> } />
            <Route path='/register/health-care' element={<HealthCareRegistration /> } />
            <Route path='/for-doctors' element={<PartneredDoctors />} />
            <Route path='/health-care' element={< HealthCare />}></Route>
            <Route path='/blogs' element={< BlogCategories/>} />
            <Route path='/blog/articles/details' element={<BlogDetails />}></Route>
            <Route path='/all-category-blog/:slugurl' element={<Articlebanner />} />
            {/* <Route path='/breadcrumb/:id' element={<AllCategoryBanner />} /> */}
            {/* <Route path='/careerView/:id' element={<DetailContent />} /> */}
            <Route path='/terms-and-conditions' element={<Terms />} />
            <Route path="/in-clinic-appointments" element={<InClinicAppoinments />} />
            <Route path='/privacy-policy' element={<Privacy />} />
            <Route path="/online-consultation" element={<OnlineConsultation />} />
            <Route path="/order-medicines" element={<OrderMedicine />} />
            <Route path="/healthcare-products" element={<HealthcareProducts />} />
            <Route path="/online-doctor-consultations" element={<UnderConstruction />} />
            {/* <Route path="/in-clinic-appoinments" element={<UnderConstruction />} /> */}
            <Route path="/home-healthcare" element={<HomeHealthcare />} />
            <Route path="/memberships" element={<PlusMembership />} />
            <Route path="/return-refund-and-cancellation-policy" element={<ReturnRefund />} />
            <Route path="/customer-grievance-redressal-policy" element={<CustomerGrievancePolicy />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/faqs" element={<UnderConstruction />} />
            <Route path="/life-at-healthsy" element={<UnderConstruction />} />
            <Route path="/*" element={<Page404 />} />

        </Routes>
    </div>
  )
}

export default AllRoutes
