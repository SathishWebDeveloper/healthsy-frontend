import ThankYou from '../../src/components/Common/ThankYou';

const SuccessImage = "/assets/thank-you-img.webp"

const Success = () => {
    return (
        <>
            <ThankYou
                image={SuccessImage}
                title="Download ‘HealthSy App’"
                downloadBrochure="Download Brochure - About HealthSy"
                closeNavigate="/ad-landing-page-users-general"
                appCategory="user-app"
                successTxt="You have registered successfully"
                subSuccessTxt="Our team will contact you shortly"
                className="fs35m22fwb"
                Brochure="/assets/dowloadBrochure/HealthSy - About Us.pdf"
            />
        </>
    )

}

export default Success;