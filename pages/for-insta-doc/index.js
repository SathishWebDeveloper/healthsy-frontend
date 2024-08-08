import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader";
import FormLandingBanner from "../../src/components/Common/formLandingBanner";
import InstaDocOnboard from "../../src/components/ForInstaDoc/InstaDocOnboard";
import FormLandingSteps from "../../src/components/Common/formLandingSteps";
import HighlightsInstaDoc from "../../src/components/ForInstaDoc/highlightsInstaDoc";
import InstaDocAdvantages from "../../src/components/ForInstaDoc/InstaDocAdvantages";
import Note from "../../src/components/ForInstaDoc/Notes";

const instaDocBanner = "/assets/instaDoc/insta-doc-banner.webp"
const instaDocMobBanner = "/assets/instaDoc/insta-doc-mob-banner.webp"
const instaDocQR = "/assets/qrCode/instadoc-banner-qr.png";

const instaDoc = ({ setDownloadModal,
    setAndroidLogo,
}) => {
    return (
        <>
            <FormPageHeader instaDoc={true} />
            <FormLandingBanner
                breadcrumbText="InstaDoc Partnered Doctors"
                title={<>Provide Instant Online Doctor Consultations to Patients</>}
                describtion="Enhance your online presence as a doctor and offer timely care to more patients through HealthSy’s InstaDoc."
                // scanText="Scan the QR code to download the ‘InstaDoc App’ "
                bannerImage={instaDocBanner}
                bannerImageAlt="Insta Doc Banner"
                getStartedLink="#register-insta-doc"
                isQRSection={false}
                bannerName={"instaDocBanner"}
                mobBanner={instaDocMobBanner}
            />
            <InstaDocAdvantages />
            <FormLandingSteps
                getStartedLink="register-insta-doc"
                registerLink="for-insta-doc/register-your-interest"
            />
            <HighlightsInstaDoc />
            <Note />
            {/* <InstaDocOnboard
                setDownloadModal={setDownloadModal}
                setAndroidLogo={setAndroidLogo}
            /> */}
        </>
    )
}

export default instaDoc;