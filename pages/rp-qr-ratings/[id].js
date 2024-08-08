import Head from "next/head";
import Page404 from "../../src/components/Fallback/404";
import useIsDesktop from "../../src/components/Hooks/useIsDesktop";
import RatingForm from "../../src/components/RpQrRating/RatingForm";

const RpQrRating = () => {
    const IsDesktop = useIsDesktop()
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            {IsDesktop ? <Page404 /> : <RatingForm />}
        </>
    )
}

export default RpQrRating;