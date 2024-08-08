import Head from "next/head";
import useIsDesktop from "../../src/components/Hooks/useIsDesktop";
import AdvertiesmentFooter from "../../src/components/Layouts/Footer/AdvertiesmentFooter";
import FormPageHeader from "../../src/components/Layouts/Header/FormPageHeader";
import PharmacyOwnerBanner from "../../src/components/RpQrRating/PharmacyOwnerBanner";
import PharmacyRatingsFeedBack from "../../src/components/RpQrRating/PharmacyRatingsFeedBack";

const PharmacyRatings = () => {
    const isDesktop = useIsDesktop()

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            {isDesktop && <FormPageHeader />}
            <PharmacyOwnerBanner />
            <PharmacyRatingsFeedBack />
            <AdvertiesmentFooter
                email="partners@healthsy.in"
                mobile="080-69451169"
            />
        </>
    )
}

export default PharmacyRatings;