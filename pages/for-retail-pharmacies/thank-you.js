import ThankYouTwo from "../../src/components/Common/ThankYouTwo"
import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader"

const SuccessImage = "/assets/pharmacy-thankyou.webp"

const ThankYou = () => {

    return (
        <>
            <FormPageHeader />
            <ThankYouTwo
                image={SuccessImage}
                title="Download ‘HealthSy for Pharmacies App’"
                downloadBrochure="Download Brochure"
                closeNavigate="/for-retail-pharmacies"
                appCategory="pharmacy-app"
                successTxt="You have registered successfully"
                subSuccessTxt="Our team will contact you shortly"
                Brochure='/assets/dowloadBrochure/HealthSy Partnered Pharmacies Network Programme Brouchure.pdf'
            />
        </>
    )
}

export default ThankYou;