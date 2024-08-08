import { useState } from "react";
import Head from "next/head";

import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader";
import DoctorsAppFeatures from "../../src/components/DoctorsAd/DoctorsAppFeatures";
import DoctorsFAQ from "../../src/components/DoctorsAd/DoctorsFAQ";
import AdvertiesmentFooter from "../../src/components/Layouts/Footer/AdvertiesmentFooter";
import AdvertiesmentBanner from "../../src/components/Common/AdvertiesmentBanner";
import useIsDesktop from "../../src/components/Hooks/useIsDesktop";
import WhatsForYou from "../../src/components/DoctorsAd/WhatsForYou";
import AdAboutHealthSy from "../../src/components/DoctorsAd/aboutHealhtSy";
import LetYouDown from "../../src/components/DoctorsAd/LetYouDown";
import DoctorsAdSteps from "../../src/components/DoctorsAd/DoctorSteps";
import CTAMobileFooter from "../../src/components/Common/ctaMobileFooter";
import YourProfession from "../../src/components/DoctorsAd/YourProfession";

const forDoctorBanner = "/assets/Advertiesment/doctor-ad-banner.webp";
const subBannerImg1 = "/assets/Advertiesment/quote.webp";
const underline = "/assets/Advertiesment/underline.svg";
const subBannerImg2 = "/assets/Advertiesment/100-percentage.webp";
const forDoctorBannerMob = "/assets/Advertiesment/doctor-ad-banner.webp";
const doctorQR = "/assets/qrCode/doctorQR.png";

const bannerListPoints = [
    { text: "Consult with More Patients", className: "col-6" },
    { text: "Increase your Online Presence", className: "col-6" },
];

const FaqArr = [
    {
        qus: "What is HealthSy Partnered Doctor Network Programme?",
        ans: "HealthSy Partnered Doctor Network Programme is one of the onboarding and registration platforms which is exclusively for reputed and experienced doctors.",
    },
    {
        qus: "What is HealthSy - Doctors App?",
        ans: "HealthSy – Doctors App is a doctor-centric application where you will be able to manage all your consultations, payments, prescriptions, etc…",
    },
    {
        qus: "As a doctor how will I be benefiting from this programme? ",
        ans: "As a doctor, you can expand your service and support to more patients through this programme.",
    },
    {
        qus: "As a partnered doctor what should I do?",
        ans: "As a partnered doctor, you will be consulting patients based on your preferred date and time slots.",
    },
    {
        qus: "Will I be assigned patients for online consultations and in-clinic appointments from you?",
        ans: "Yes. We will be assigning you patients for both online consultations and in-clinic appointments according to your availabilities and time slots.",
    },
    {
        qus: "How to register?",
        ans: <>You can register by simply clicking here <a href="https://healthsy.app/for-doctors" className="p-0 text-dark forDoctorsNavigate">https://healthsy.app/for-doctors</a> or you can also send us a mail to <a className="p-0 text-dark forDoctorsNavigate" href="mailto:registrations@healthsy.in">registrations@healthsy.in</a> showing your interest.</>,
    },
    {
        qus: "Is the registration free?",
        ans: "Yes. The registration process is completely free!",
    },
    {
        qus: "How many online consultations and in-clinic appointments will I be assigned or getting in a day?",
        ans: "Though the number of consultations and appointments are of no limits, you can expect a decent number of consultations in a day.",
    }
]

const DoctorsAd = () => {
    const isDesktop = useIsDesktop()
    const [showCTAcard, setShowCTAcard] = useState(true);

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <FormPageHeader />
            <AdvertiesmentBanner
                title="Consult with More Patients & Increase your Online Presence"
                describtion="Are you looking to provide your valuable services beyond your geographical location ? Get on-board HealthSy now and provide your services to thousands more"
                scanText="Scan the QR code to download the ‘HealthSy - Doctors App’"
                bannerImage={isDesktop ? forDoctorBanner : forDoctorBannerMob}
                bannerImageAlt="Doctor Ad Banner"
                getStartedLink="/ad-landing-page-partners-doctors/register"
                QRcodeImg={doctorQR}
                bannerListPoints={bannerListPoints}
                bannerName="doctorAdBanner"
                mobText={<>Consult with More Patients &
                    <div className="patientsTextLine">{" "}Increase your Online Presence </div> </>}
                mobDesc="Get on-board HealthSy now and provide your services to thousands more."
                subBannerImg1={subBannerImg1}
                subBannerImg2={subBannerImg2}
                dashedBoxTxt="Become a HealthSy “Partnered Doctor” now !"
            />
            <DoctorsAdSteps
                registerLink="/ad-landing-page-partners-doctors/register"
                title={<><span className="primaryColor">Simple</span> & <span className="primaryColor">Hassle Free</span> Registration</>}
            />
            <WhatsForYou />
            <DoctorsAppFeatures />
            <LetYouDown />
            <YourProfession />
            <AdAboutHealthSy />
            <DoctorsFAQ
                FaqArr={FaqArr} />
            <AdvertiesmentFooter
                mobile="+91 080-46809777"
            />
            {showCTAcard && (
                <CTAMobileFooter
                    ctxBannerText="Get on-board HealthSy now!"
                    buttonText="Register Now"
                    setShowCTAcard={setShowCTAcard}
                    clickNavigate="/ad-landing-page-partners-doctors/register"
                />
            )}
        </>
    )
}

export default DoctorsAd;