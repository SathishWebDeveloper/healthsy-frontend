import Head from "next/head";
import FormPageHeader from "../src/components/Layouts/Header/FormPageHeader";
import Privacy from "../src/components/Privacy/Privacy"

const PrivacyPolicy = () => {

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <FormPageHeader />
            <Privacy className="doctorAdPrivacy" />
        </>
    )
}

export default PrivacyPolicy;