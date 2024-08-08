import axios from "axios";

import CareerBanner from "../src/components/Careers/CareerBanner";
import CareerHeader from "../src/components/Layouts/Header/CareerHeader";
import CareerDetails from "../src/components/Careers/CareerDetail";


const JoinUsPage = ({ fetchCareerJobList =[], groupedDepartmentList }) => {

    return (
        <>
            <CareerHeader />
            <CareerBanner />
            <CareerDetails fetchCareerJobList = {fetchCareerJobList} groupedDepartmentList={groupedDepartmentList} />
        </>
    )
}
export default JoinUsPage

export async function getServerSideProps({ params }) {
    try {
        const fetchCareerJobList = await axios.post(
            `${process.env.NEXT_PUBLIC_APP_API_URL}career-add-job-post/list`
        )
        const activeDapartments = fetchCareerJobList?.data.activeDepartments.reduce((groups, item)=>{
            return {
                ...groups,
                [item.department]: item?.department_slug
            }
        },{})  
        const groupedDepartmentList = fetchCareerJobList?.data?.rows.reduce((groups, item) => {
            const group = groups[item.department] || [];
            return {
              ...groups,
              [item.department]: [...group, {...item, department_slug: activeDapartments[item.department]}]
            };
          }, {});
        
        return {
            props: { 
                fetchCareerJobList: fetchCareerJobList?.data ?? [],
                groupedDepartmentList:groupedDepartmentList,
            }, // will be passed to the page component as props
        }
    } catch (error) {
        console.error(error);
        return { props: { data: null } };
    }
}