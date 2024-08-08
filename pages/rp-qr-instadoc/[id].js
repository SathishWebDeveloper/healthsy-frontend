import Head from "next/head";

import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader";
import InstaDocQrCodebanner from "../../src/components/instaDocQrCode/InstaDocQrCodebanner";
import InstaDocQrCodeForm from "../../src/components/instaDocQrCode/InstaDocQrCodeForm";
import AdFormFooter from "../../src/components/DoctorsAd/adFormFooter";

const TickImage = "/assets/Doctors-Ads-Tick.svg";
const bannerImage = "/assets/QrcodeBanner.png";

const QRCodeBanner = [
    {
        image: TickImage,
        title: "100% Safe and Secured"
    },
    {
        image: TickImage,
        title: "Consult via audio, video & chat"
    },
    {
        image: TickImage,
        title: "Get Digital Prescription"
    }
]

const instaDocQrCode = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <FormPageHeader instaDoc={true} />
            <InstaDocQrCodebanner
                title="Connect with a General Physician Instantly!"
                sub_title="Takes less than 5 minutes to connect with doctor!"
                QRCodeBanner={QRCodeBanner}
                bannerImage={bannerImage}
            />
            <InstaDocQrCodeForm />
            <AdFormFooter />
        </>
    )
}

export default instaDocQrCode;