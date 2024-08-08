import { useEffect } from 'react'
import Head from "next/head";
import ThankYou from "../../src/components/Common/ThankYou";

const SuccessImage = "/assets/FormSuccess.webp"

const Success = () => {
    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('event', 'conversion', {'send_to': 'AW-11095492414/cQ4mCMTV09QYEL6O36op'})
      })
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <ThankYou
                image={SuccessImage}
                title="Download ‘HealthSy - Doctors App’"
                downloadBrochure="Download Brochure"
                closeNavigate="/ad-landing-page-partners-doctors"
                appCategory="doctor-app"
                successTxt="You have registered successfully"
                subSuccessTxt="Our team will contact you shortly"
            />
        </>
    )

}

export default Success;