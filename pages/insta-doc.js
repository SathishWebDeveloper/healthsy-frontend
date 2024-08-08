import Breadcrumb from "../src/components/Common/breadcrumb"
import FAQ from "../src/components/Common/faq"
import InstaDocServiceBanner from "../src/components/Common/serviceBannerInstaDoc"
import useIsDesktop from "../src/components/Hooks/useIsDesktop"
import AdvantagesofInstaDoc from "../src/components/InstaDoc/AdvantagesofInstaDoc"
import InstaDocApp from "../src/components/InstaDoc/InstaDocApp"
import InstaDocSteps from "../src/components/InstaDoc/InstaDocSteps"
import InstaDocUsers from "../src/components/InstaDoc/InstaDocUsers"
import InstaDocNote from "../src/components/InstaDoc/InstaDocNote"

const bannerImage = "/assets/instaDocBannerImage.webp";
const InstaDocBannerImg = "/assets/mobInstaDocImg.webp"
const userQR = "/assets/qrCode/instaDocQR.png";

const bannerListPoints = [
    { text: "24*7 Service", className: "col-6" },
    { text: "Audio, Video & Chat", className: "col-6" }
]

const InstaDoc = () => {

    const isDesktop = useIsDesktop();
    const staticData = [
        {
            question: "What is InstaDoc ?",
            answer: "InstaDoc is a online consultation platform within HealthSy where patients can consult with a general physician anytime at just INR 199."
        },
        {
            question: " What is cost of doing a InstaDoc consultation on HealthSy?",
            answer: "The cost of doing a InstaDoc consultation on HealthSy with a general physician is INR 199"
        },
        {
            question: "Where should I take InstaDoc consultation?",
            answer: "You should download the HealthSy app either from Play Store or App Store and login. Once logged-in head to InstaDoc section, fill the details in the form and make payment to take a InstaDoc consultation"
        },
        {
            question: "Can I consult with doctors of any  specialisation through InstaDoc?",
            answer: "No, you can consult only with a general physician through InstaDoc. However, you can consult with 25+ other specialisation doctors from here."
        },
        {
            question: "Can I consult via chat, audio and video for a InstaDoc consultation?",
            answer: "Yes, you can consult using chat, audio and video method as per your choice."
        },
        {
            question: "Is it safe to use this platform?",
            answer: "Yes, taking any service on HealthSy is 100% safe and secured as we are compliant according to the latest guidelines and laws."
        },
        {
            question: "Are the doctors providing consultations in the platform your own?",
            answer: "No, the doctors that provide online consultation on our platform are not our own. They are called Partnered Doctors of HealthSy"
        }
    ]
    return (
        <>
            <Breadcrumb className="orderMedicineBreadcrumb" breadcrumbText="InstaDoc" />
            <InstaDocServiceBanner
                btnText="Download Now"
                bannerTitle="Consult with a Doctor Instantly "
                wrapperClass="newInstaDocBanner"
                bannerListPoints={bannerListPoints}
                bannerImage={isDesktop ? bannerImage : InstaDocBannerImg}
                QRcodeImg={userQR}
                scanText="Scan the QR code to download the HealthSy App "
            // setDownloadModal={props?.setDownloadModal}
            />
            <AdvantagesofInstaDoc />
            <InstaDocNote />
            <InstaDocSteps />
            <InstaDocUsers />
            <InstaDocApp
                subTitle="Consult with a General Physician Instantly"
            />
            <FAQ
                isStatic={true}
                section={false}
                staticData={staticData}
                className="bg-white"
                pageName="InstaDoc"
            />
        </>
    )
}

export default InstaDoc