import axios from "axios";

import AboutCTO from "../src/components/AboutUs/aboutCTO.jsx";
import AboutHealthsy from "../src/components/AboutUs/aboutHealthsy.jsx";
import AboutTeamMembers from "../src/components/AboutUs/aboutTeamMembers.jsx";
import AboutUsBanner from "../src/components/AboutUs/aboutUsBanner.jsx";
import AboutUsCorePrinciple from "../src/components/AboutUs/aboutUsCorePrinciple.jsx";

const home = "/assets/home-icon.svg";
const arrowleft = "/assets/arrow-left.svg";

const AboutUsPage = ({ employee }) => {
    return (
        <>
            <>
                <div className="container mt-2 aboutUsBannerSection">
                    <div className="padding-section">
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                            <img src={home} alt="home" />
                        </a>{" "}
                        <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
                        <a href="#"> About Us </a>
                    </div>
                </div>
                <div className="container-fluid pl0 pr0">
                    <AboutUsBanner />
                </div>
                <div className="container">
                    <AboutHealthsy />
                    <AboutUsCorePrinciple />
                    <AboutCTO />
                    <AboutTeamMembers employee={employee} />
                </div>
            </>
        </>
    )
}
export default AboutUsPage

export async function getServerSideProps() {
    try {
        const employeeList = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}insiders/insidersList`);
        const employee = employeeList?.data || [];
        return {
            props: {
                employee,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                employee: [],
            },
        };
    }
};