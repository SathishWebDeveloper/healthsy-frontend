


import Head from "next/head"
import Breadcrumb from "../../../src/components/Common/breadcrumb"
import DoctorDetails from "../../../src/components/DoctorListing/DoctorDetails"
import FormPageHeader from "../../../src/components/Layouts/Header/FormPageHeader"

const DoctorBioData = () => {

    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <Breadcrumb
                className="DoctorConsultationBreadCrumbs"
                breadcrumbText="Online Doctor Consultations"
                nestedLevel={true}
                nestedBreadcrumbText="General Physician"
                nestedLevelTwo={true}
                nestedBreadcrumbTextTwo="Dr. Narendhranath Sarkar"
                Href="#"
            />
            <FormPageHeader />
            <DoctorDetails />
        </>
    )
}

export default DoctorBioData