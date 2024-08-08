
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

const DoctorListing = ({
    currentSpecialisation, ...props
}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const { query: { specialization } } = useRouter()

    // useEffect(() => {
    //     getDoctorSpecialisation()
    // }, [])

    // const getDoctorSpecialisation = () => {
    //     axios
    //         .post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-listing/list`, {
    //             active: true,
    //         })
    //         .then((response) => {
    //             setCurrentSpecialisation(response.data.rows.find((spcl) => spcl?.specialization === convertToTitleCase(specialization)))
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             alert("Some error");
    //         });
    // };

    return (
        <>
            {/* todo check */}
            <Head>
                <title>
                    {currentSpecialisation?.meta_title}
                </title>
                <meta
                    name="description"
                    content={currentSpecialisation?.meta_description}
                />
                <meta
                    name="keywords"
                    content={currentSpecialisation?.meta_keyword}
                />
                {currentSpecialisation?.others ? parse(currentSpecialisation?.others) : null}
            </Head>
            <FormPageHeader setDownloadModal={props?.setDownloadModal} />
            <Breadcrumb
                className="onlineConsultationBreadcrumb"
                Href={'/online-doctor-consultations'}
                breadcrumbText="Online Doctor Consultations"
                nestedLevel={true}
                nestedBreadcrumbText={convertToTitleCase(specialization)}
            // nestedBreadcrumbText="General Physicians"
            />
            <DoctorListingBanner selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <DoctorsList selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </>
    )
}

export default DoctorListing;

export async function getServerSideProps({ params }) {
    try {
        const specializationList = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}doctor-listing/list`, {
            active: true,
        })
        let currentSpecialisation = {}
        if (specializationList?.data?.rows?.length) {
            currentSpecialisation = specializationList.data.rows.find((spcl) => spcl?.specialization?.online_doctor_specialization?.trim() === convertToTitleCase(params?.specialization)) ?? {}
        }
        return {
            props: { currentSpecialisation }
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                currentSpecialisation: {},
            },
        };
    }
};