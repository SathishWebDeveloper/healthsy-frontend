import Breadcrumb from "../../src/components/Common/breadcrumb";
import ServiceBanner from "../../src/components/Common/serviceBanner";
import ServiceAdvantages from "../../src/components/Common/serviceAdvantages";
import { inclinicAdvantages } from "../../src/constants";
import InClinicAppointmentSteps from "../../src/components/In-ClinicAppointments/InClinicAppointmentSteps";
import ServiceGridCarousel from "../../src/components/Common/serviceGridCarousel";
import FAQ from "../../src/components/Common/faq";
import useIsDesktop from "../../src/components/Hooks/useIsDesktop";
import ServiceBannerInClinic from "../../src/components/Common/servicebannerInclinic";
import { useEffect, useState } from "react";
import MobileSearchField from "../../src/components/Common/mobileSelectField";

const inclinicBanner = "/assets/inclinic/inclinic-banner.webp"
const inclinicBannerMOb = "/assets/inclinic/mobile-inclinic-banner.webp"

const bannerListPoints = [
    { text: "100% Safe and Secured", className: "col-6" },
    { text: "Get appointments reminders", className: "col-6" },
    { text: "Skip the queues", className: "col-6 mt-3" },
];

const InClinicAppointmentsPage = (props) => {
    const isDesktop = useIsDesktop()
    const [selectTagValue , setselectTagValue] = useState(true)
    const handleChange = () => {
        setselectTagValue(()=>!selectTagValue);
    }
    return (
        <>  {selectTagValue ? <>            <Breadcrumb className="inClinicAppointmentsBreadcrumb" breadcrumbText="In-Clinic Appointments" />
        <ServiceBannerInClinic
            bannerTitle="Book your In-Clinic Appointments with Top Doctors on HealthSy"
            bannerListPoints={bannerListPoints}
            className="inclinicBanner"
            bannerImage={isDesktop ? inclinicBanner : inclinicBannerMOb}
            setDownloadModal={props?.setDownloadModal}
            setBannerQrImg={props.setBannerQrImg}
            pageName={"in-clinic-appointment"}
            handleChange={handleChange}
        />
        <ServiceAdvantages
            advantageArr={inclinicAdvantages}
        />
        <InClinicAppointmentSteps />
        <ServiceGridCarousel
            title={<>In-Clinic <h2 className="fs38m28fwb d-inline">Doctor Specializations</h2> on Healthsy</>}
            subTitle="“ Book your In-Clinic Appointments with top doctors in your City”"
        />
        <FAQ pageName="In-Clinic appointments service booking" section="in-clinic-appointments" /></> : 

        <div className="search_field_mobileContainer">
        <div className="expanding-container expanded">
         {/* <p>covers entire page</p> */}
         <MobileSearchField handleChange={handleChange} isDesktop={isDesktop}/>
        </div>
        </div>
        }


        </>
    )
}
export default InClinicAppointmentsPage;