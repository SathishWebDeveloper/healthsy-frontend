import axios from 'axios';

import CareerDetailBanner from "../../../src/components/Careers/CareerDetails/CareerDetailBanner";
import CareerDetailContent from "../../../src/components/Careers/CareerDetails/CareerDetailContent";
import CareerJobForm from "../../../src/components/Careers/CareerDetails/CareerJobForm";


const CareerDetails = ({ fetchCareerJobDetails }) => {

    return (
        < >
            <CareerDetailBanner jobDetails={fetchCareerJobDetails} />
            <CareerDetailContent jobDetails={fetchCareerJobDetails} />
            <CareerJobForm jobDetails={fetchCareerJobDetails} />
        </>
    )
}

export default CareerDetails


export async function getServerSideProps({ params }) {
    try {
        const fetchCareerJobDetails = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}career-add-job-post/get-jop-post/${params?.slugurl}/${params?.id}`)
        return {
            props: {
                fetchCareerJobDetails: fetchCareerJobDetails?.data ?? [],
            }, // will be passed to the page component as props
        }
    } catch (error) {
        console.error(error);
        return { props: { data: null } };
    }
}