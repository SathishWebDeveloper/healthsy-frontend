import ThankYouTwo from "../../src/components/Common/ThankYouTwo"
import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader"

const SuccessImage = "/assets/success.png"

const ThankYou = () => {

    return (
        <>
            <FormPageHeader />
            <ThankYouTwo
                image={SuccessImage}
                title="Download ‘HealthSy - Instadoc’ App"
                downloadBrochure="Download Brochure"
                closeNavigate="/for-insta-doc"
                appCategory="home-healthcare-app"
                successTxt="You have registered successfully"
                subSuccessTxt="Our team will contact you shortly"
                appDownload = {true}
                Brochure="/assets/dowloadBrochure/InstaDoc Partnered Doctors - Onboarding Document.pdf"
            />
        </>
    )
}

export default ThankYou;