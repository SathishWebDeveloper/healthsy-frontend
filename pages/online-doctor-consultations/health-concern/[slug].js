
import Head from "next/head"
import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import axios from "axios";
import parse from 'html-react-parser';

import Breadcrumb from "../../../src/components/Common/breadcrumb"
import DoctorListingBanner from "../../../src/components/DoctorListing/DoctorListingBanner"
import DoctorsList from "../../../src/components/DoctorListing/DoctorsList "
import FormPageHeader from "../../../src/components/Layouts/Header/FormPageHeader"
import { convertToTitleCase } from "../../../src/constants";

const HealthConcernDoctorListing = ({
    healthConcernDetail, ...props
}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    // const [healthConcernDetail, setHealthConcernDetail] = useState(null)

    const { query: { slug } } = useRouter()

    // useEffect(() => {
    // getHealthConcernDeatil()
    // }, [])

    // const getHealthConcernDeatil = () => {
    //     axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-health-concern/get-by-slug/${slug}`)
    //         .then((response) => {
    //             setHealthConcernDetail(response?.data)
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             // alert("Some error");
    //         });
    // };

    return (
        <>
            {/* todo check */}
            <Head>
                <title>
                    {healthConcernDetail?.meta_title}
                </title>
                <meta
                    name="description"
                    content={healthConcernDetail?.meta_description}
                />
                <meta
                    name="keywords"
                    content={healthConcernDetail?.meta_keyword}
                />
                {healthConcernDetail?.others ? parse(healthConcernDetail?.others) : null}
            </Head>
            <FormPageHeader setDownloadModal={props?.setDownloadModal} />
            <Breadcrumb
                className="onlineConsultationBreadcrumb"
                Href={'/online-doctor-consultations'}
                breadcrumbText="Online Doctor Consultations"
                nestedLevel={true}
                nestedBreadcrumbText={convertToTitleCase(slug)}
            />
            <DoctorListingBanner selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <DoctorsList selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </>
    )
}

export default HealthConcernDoctorListing


export async function getServerSideProps({ params }) {
    try {
        const healthConcernDetail = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-health-concern/get-by-slug/${params?.slug}`)

        return {
            props: { healthConcernDetail: healthConcernDetail?.data ?? {} }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                healthConcernDetail: {},
            },
        };
    }
};