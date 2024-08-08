import AdFormFooter from "../../src/components/DoctorsAd/adFormFooter"
import InstaDocQrCodebanner from "../../src/components/instaDocQrCode/InstaDocQrCodebanner"
import UserGeneralForm from "../../src/components/UserGeneralWeb/UserGeneralForm"

const TickImage = "/assets/Doctors-Ads-Tick.svg";
const instaDocORCodeFormImg = "/assets/ad-landing-form-img.webp"

const QRCodeBanner = [
    {
        image: TickImage,
        title: "100% Safe & Secured"
    },
    {
        image: TickImage,
        title: "Available on App Store and Play Store"
    },
]

const Register = () => {
    return (
        <>
            <InstaDocQrCodebanner
                title="We want to be your daily healthcare partner"
                sub_title="Download the HealthSy app now!"
                QRCodeBanner={QRCodeBanner}
                bannerImage={instaDocORCodeFormImg}
                className="userGeneralFormBanner"
                fontClassName="fs40m24fw800"
            />
            <UserGeneralForm />
            <AdFormFooter />
        </>
    )
}

export default Register;