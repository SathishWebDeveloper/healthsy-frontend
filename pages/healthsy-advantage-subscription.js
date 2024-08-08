import AdvSubscriptionTestimonials from "../src/components/AdvantageSubscription/AdvSubscriptionTestimonials"
import BenefitsofAdvantageSubscription from "../src/components/AdvantageSubscription/BenefitsofAdvantageSubscription"
import FAQ from "../src/components/Common/faq"
import InstaDocApp from "../src/components/InstaDoc/InstaDocApp"

import HealthsySubscriptionBanner from "../src/components/Common/healthsySubscriptionBanner";
import useIsDesktop from "../src/components/Hooks/useIsDesktop"
import Breadcrumb from "../src/components/Common/breadcrumb";

const AdvantageHealthsyMobBannerImg = "/assets/AdvantageSubscriptionBannerMobImg.webp";
const AdvantageHealthsyWebBannerImg = "/assets/AdvantageSubscriptionBannerWebImg.webp";
const userQR = "/assets/qrCode/healthsySubscriptionQRCode.png";

const bannerListPoints = [
    { text: "Free of Cost", className: "" },
    { text: "Timely Delivery", className: "" },
    { text: "Auto-Reminders", className: "" },
];

const staticData = [
    {
        question: "How to subscribe to medicines on HealthSy?",
        answer: "Login into your HealthSy account and go to subscription page/section directly or even via my orders page/section. Click onto ‘Create new Subscription.’ Now choose your preferred subscription plan and proceed to search and add medicines. After adding medicines to the cart, proceed to checkout. At the payments page, choose your preferred interval time / frequencies at which you need your medicines to be delivered."
    },
    {
        question: "What is the HealthSy Advantage Subscription Programme?",
        answer: " The HealthSy Advantage Subscription Programme is a programme that allows the user to buy medicines, OTCs, and healthcare products by choosing their own delivery frequencies and quantity. The customer/ user can never run out of medicine as we will deliver the refills promptly."
    },
    {
        question: "Will I be able to change the medicine dosage limits after I subscribe?",
        answer: "Yes, you will be able to change the medicine dosage limits under the subscription plan. You can either go to ‘My Subscription’ page and change the medicine dosage limit as per your requirement or write to us with your change of medicine dosage limit with order ID to support@healthsy.in We will deliver only with the new dosage for that medicine from the delivery. The max cap cannot exceed what is mentioned in your valid prescription that was used for order processing by our partner retail pharmacy."
    },
    {
        question: "Is return available for medicines bought under the subscription plan?",
        answer: " Yes, return of medicines under the subscription plans are available as per the products ordered under normal circumstances. For mor details, check out our return and cancellation policy terms and conditions."
    },
    {
        question: "Can I simply make a reorder of the medicines that I have bought from my orders?",
        answer: `Yes, you can make a reorder of the medicines that you have bought from your   
              previous order by following the same process as ordering a fresh list of medicines.
       1.   Upload valid prescription.
       2.   Add medicine to cart and proceed to checkout.
       3.   It will be delivered to your doorstep.`
    },
    {
        question: "Can I cancel an ongoing subscription plan?",
        answer: "Yes, you can cancel an ongoing subscription plan by going to ‘My Subscriptions’ page and simple click cancel stating your reasons. However, refund will not be available if one or more delivery of medicines has taken place under that subscription plan."
    },
    {
        question: "Is Cash on delivery (COD) available for the medicines ordered through the subscription plan?",
        answer: "Yes, Cash on Delivery (COD) is available for medicines ordered through the subscription plan."
    },
    {
        question: "What happens if one or two medicines are not available?",
        answer: "If one or more medicines are not available at that point in time, you can send us your medicine need and its details to support@healthsy.in and we will do our best to deliver it for you."
    },
    {
        question: "Can I club an ongoing coupon or offer while buying medicines under the subscription plan?",
        answer: "No, an ongoing offer, promotion, discount cannot be clubbed while placing orders under a subscription plan. Only offers related to the subscription at the time of placing the order will be applicable."
    },
    {
        question: "How long is the subscription plan for?",
        answer: "It remains active as long as you cancel the entire subscription from your account."
    }
]

const AdvantageSubscription = () => {

    const isDesktop = useIsDesktop()

    return (
        <>
            <Breadcrumb className="orderMedicineBreadcrumb" breadcrumbText="HealthSy Advantage Subscription" />
            <HealthsySubscriptionBanner
                btnText="Download Now"
                bannerTitle="Get your Medicine Refills Delivered at your Doorstep!"
                wrapperClass="newHealthsyBannerSection"
                titleClassName="AdvantageHealthsySection fs48m28fw800"
                citybanner="AdvantageCityBanner"
                bannerListPoints={bannerListPoints}
                bannerImage={isDesktop ? AdvantageHealthsyMobBannerImg : AdvantageHealthsyWebBannerImg}
                QRcodeImg={userQR}
                scanText="Scan the QR code to download the HealthSy App"
            />
            <BenefitsofAdvantageSubscription />
            <AdvSubscriptionTestimonials />
            <InstaDocApp
                subTitle="Never run out of refills with HealthSy Advantage"
                className="AdvInstaDoc"
            />
            <FAQ
                isStatic={true}
                section={false}
                staticData={staticData}
                pageName="HealthSy Advantage Subscription Programme"
                className="bg-white"
            />
        </>
    )
}

export default AdvantageSubscription;