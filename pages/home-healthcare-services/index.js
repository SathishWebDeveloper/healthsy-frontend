import Image from "next/image";

import HomeHealthcareBanner from "../../src/components/HomeHealthcare/HomeHealthcareBanner";
import ServiceAdvantages from "../../src/components/Common/serviceAdvantages";
import FAQ from "../../src/components/Common/faq";
import BookingService from "../../src/components/HomeHealthcare/bookingServices";
import ServiceGrid from "../../src/components/Common/serviceGrid";
import { homeHealthCareAdvantageArr } from "../../src/constants"
import HhspOnHealthsy from "../../src/components/HomeHealthcare/HhspOnHealthsy";

const home = "/assets/home-icon-white.svg";
const arrowleft = "/assets/arrow-left-white.svg";

const HomeHealthcarePage = (props) => {
    return (
        <>
            <div className="homeHealthcareContainer">
                <div className="homeHealthcareBreadcrumb pt-2">
                    <div className="container">
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                            <Image src={home} height={15} width={15} alt="home" />
                        </a>{" "}
                        <Image
                            src={arrowleft}
                            height={13}
                            width={13}
                            alt="arrow"
                            className="breadcrumb-arrow-left mx-0"
                        />
                        <a href="#" className="text-white breadcrumbText"> Home Healthcare Services </a>
                    </div>
                </div>
                <HomeHealthcareBanner
                    setDownloadModal={props?.setDownloadModal}
                    setBannerQrImg={props.setBannerQrImg}
                    pageName="home-healthcare-service"
                />
                <ServiceAdvantages advantageArr={homeHealthCareAdvantageArr} />
                <BookingService />
                {/* <ServiceGrid
                    title={<><h2 className="fs38m28fwb d-inline">Home Healthcare</h2> <span className="primaryColor">Service Categories on HealthSy</span></>}
                    subTitle="“ Qualified and Trained Professionals ”"
                /> */}
                <HhspOnHealthsy />
            </div>
            <FAQ pageName="home healthcare service booking" section="home-healthcare" />
        </>
    )
}
export default HomeHealthcarePage