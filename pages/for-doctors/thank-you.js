import ThankYouTwo from '../../src/components/Common/ThankYouTwo';
import FormPageHeader from '../../src/components/Layouts/Header/FormPageHeader';

const SuccessImage = "/assets/FormSuccess.webp"

const SuccessModal = () => {
    return (
        <>
            <FormPageHeader />
            <ThankYouTwo
                image={SuccessImage}
                title="Download ‘HealthSy - Doctors App’"
                downloadBrochure="Download Brochure"
                Brochure="/assets/dowloadBrochure/HealthSy Partnered Doctors Network Programme Brochure.pdf"
                closeNavigate="/for-doctors"
                appCategory="doctor-app"
                successTxt="You have registered successfully"
                subSuccessTxt="Our team will contact you shortly"
                iMac={true}
            />
        </>
    )
}

export default SuccessModal;