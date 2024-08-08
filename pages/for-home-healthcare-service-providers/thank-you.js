import ThankYouTwo from "../../src/components/Common/ThankYouTwo"
import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader"

const SuccessImage = "/assets/HHSP_thankyou.webp"

const ThankYou = () => {

    return (
        <>
            <FormPageHeader />
            <ThankYouTwo
                image={SuccessImage}
                title="Download ‘HealthSy for HHSP’ App’"
                downloadBrochure="Download Brochure"
                closeNavigate="/for-home-healthcare-service-providers"
                appCategory="home-healthcare-app"
                successTxt="You have registered successfully"
                subSuccessTxt="Our team will contact you shortly"
                iMac={true}
                Brochure="/assets/dowloadBrochure/HomeHealthcare.pdf"
            />
        </>
    )
}

export default ThankYou;