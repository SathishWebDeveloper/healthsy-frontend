
import Breadcrumb from "../../src/components/Common/breadcrumb";
import ServiceBanner from "../../src/components/Common/serviceBannerOnlineDC";
import ServiceAdvantages from "../../src/components/Common/serviceAdvantages";
import { onlineConsultationeAdvantageArr } from "../../src/constants"
import FAQ from "../../src/components/Common/faq";
import OnlineConsultationSteps from "../../src/components/onlineConsultation/onlineConsultationSteps";
import ServiceGridCarousel from "../../src/components/Common/serviceGridCarousel";
import useIsDesktop from "../../src/components/Hooks/useIsDesktop";

const onlineConsultationBannerImg = '/assets/onlineConsultation/online-consultation-banner.webp'
const onlineConsultationBannerImgMob = '/assets/onlineConsultation/mobile-online-consultation-banner.webp'

const bannerListPoints = [
    { text: "100% Safe and Secured", className: "col-6" },
    { text: "Digital and Contactless", className: "col-6" },
];

const OnlineConsultationPage = (props) => {
    const isDesktop = useIsDesktop();

    return (
        <>
            <Breadcrumb className="onlineConsultationBreadcrumb" breadcrumbText="Online Doctor Consultations" />
            <ServiceBanner
                bannerTitle="Book Online Doctor Consultations on HealthSy"
                bannerListPoints={bannerListPoints}
                className="onlineConsultationBanner"
                bannerImage={isDesktop ? onlineConsultationBannerImg : onlineConsultationBannerImgMob}
                setDownloadModal={props?.setDownloadModal}
                setBannerQrImg={props.setBannerQrImg}
                pageName={"online-consultation"}
            />
            <ServiceAdvantages advantageArr={onlineConsultationeAdvantageArr} />
            <OnlineConsultationSteps />
            <ServiceGridCarousel
                title={<>Online <h2 className="fs38m28fwb d-inline"> Doctor Consultation </h2> Specializations on HealthSy</>}
                subTitle="Book Online Consultations with Experienced Doctors"
            />
            <FAQ pageName="online Consultaion" section="online-doctor-consultations" />
        </>
    )
}
export default OnlineConsultationPage