import Head from "next/head";
import FormPageHeader from "../src/components/Layouts/Header/FormPageHeader";
import Terms from "../src/components/TermsandConditions/terms";

const TermsConditions = () => {

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <FormPageHeader />
            <Terms className="doctorAdTerms" />
        </>
    )
}

export default TermsConditions;