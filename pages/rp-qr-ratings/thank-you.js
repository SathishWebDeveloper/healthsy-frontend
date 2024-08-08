import Page404 from "../../src/components/Fallback/404"
import useIsDesktop from "../../src/components/Hooks/useIsDesktop"
import MobileThankYou from "../../src/components/Common/MobileThankYou"
import Head from "next/head"

const ThankYou = () => {

    const IsDesktop = useIsDesktop()

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            {IsDesktop ?
                <Page404 /> :
                <MobileThankYou
                    downloadBrochure="Download Brochure - About HealthSy"
                    appCategory="user-app"
                    Brochure="/assets/dowloadBrochure/HealthSy - About Us.pdf"
                />
            }
        </>
    )
}

export default ThankYou;