
import Breadcrumb from "../src/components/Common/breadcrumb";
import ServiceBanner from "../src/components/Common/serviceBanner";
import ServiceAdvantages from "../src/components/Common/serviceAdvantages";
import { orderMedicineAdvantageArr } from "../src/constants"
import OrderMedicineSteps from "../src/components/orderMedicine/orderMedicineSteps";
import FAQ from "../src/components/Common/faq";
import useIsDesktop from "../src/components/Hooks/useIsDesktop";

const orderMedicineBannerImage = "/assets/orderMedicine/orderMedicine.webp";
const orderMedicineBannerImageMob = "/assets/orderMedicine/mobile-order-medicine.webp";

const bannerListPoints = [
    { text: "Flat 12% off", className: "col-5" },
    { text: "Safe & Quick Delivery", className: "col-7" },
    { text: "Affordable Prices", className: "col-12 mt-3" },
];

const OrderMedicinePage = (props) => {
    const isDesktop = useIsDesktop()
    
    return (
        <>
            <Breadcrumb className="orderMedicineBreadcrumb" breadcrumbText="Order Medicines" />
            <ServiceBanner
                bannerTitle="Order Medicines Online on HealthSy"
                bannerListPoints={bannerListPoints}
                className="orderMedicineBanner"
                bannerImage={isDesktop ? orderMedicineBannerImage : orderMedicineBannerImageMob}
                setDownloadModal={props?.setDownloadModal}
            />
            <ServiceAdvantages advantageArr={orderMedicineAdvantageArr} />
            <OrderMedicineSteps />
            <FAQ pageName={"ordering medicine"} section="order-medicines" className="orderMedicineFAQ" />
        </>
    )
}
export default OrderMedicinePage