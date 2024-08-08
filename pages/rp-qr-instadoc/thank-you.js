import Head from "next/head";

import ThankYou from "../../src/components/Common/ThankYou";

const instaDocQRImage = "/assets/success.png";

const SuccessQRCode = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <ThankYou
                image={instaDocQRImage}
                title="Download ‘HealthSy App’"
                downloadBrochure="Download Brochure - About HealthSy"
                closeNavigate="/rp-qr-instadoc/{id}"
                appCategory="user-app"
                successTxt="Thank you for sharing your details."
                subSuccessTxt="Our team will connect with you in less than 5 minutes!"
                Brochure="/assets/dowloadBrochure/HealthSy - About Us.pdf"
            />
        </>
    )

}

export default SuccessQRCode;   