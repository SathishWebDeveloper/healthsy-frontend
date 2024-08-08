import axios from "axios";

import PhysioHeader from "../../../src/components/Layouts/Header/PhysioHeader"
import Breadcrumb from "../../../src/components/Common/breadcrumb";
import ServiceBannerTypeTwo from "../../../src/components/Common/serviceBannerTypeTwo"
import TextContent from "../../../src/components/Common/textContent"
import AdvantagesGrid from "../../../src/components/Common/advantagesGrid"
import Physiotherpy from "../../../src/components/Common/Physiotherapy";
import Testimonials from "../../../src/components/Physiotheraphy/testimonials";
import HowToReady from "../../../src/components/Physiotheraphy/HowToReady";
import Cities from "../../../src/components/Physiotheraphy/cities";
import PhysioService from "../../../src/components/Physiotheraphy/PhysioService";
import HealthsyHelp from "../../../src/components/Physiotheraphy/HealthsyHelp";
import FAQ from "../../../src/components/Common/faq";
import MajorCities from "../../../src/components/Physiotheraphy/majorCities";

const Ankle = "/assets/Physiotheraphy/ankle-and-foot-related-pain.svg";
const Back = "/assets/Physiotheraphy/back-related-pain.svg";
const Dislocation = "/assets/Physiotheraphy/dislocations.svg";
const Fractures = "/assets/Physiotheraphy/fractures.svg";
const Knee = "/assets/Physiotheraphy/knee-related-pain.svg";
const Neck = "/assets/Physiotheraphy/neck-related-pain.svg";
const Neurological = "/assets/Physiotheraphy/neurological-related-conditions.svg";
const PostSurgery = "/assets/Physiotheraphy/post-surgery-rehab.svg";
const Shoulder = "/assets/Physiotheraphy/shoulder-related-pain.svg";
const inclinicBanner = "/assets/Physiotheraphy/physiotherapy-hero-slider.webp";

const PhysioDetails = [
    {
        Image: Ankle,
        title: "Ankle and Foot Related Pain",
        desc: "Physiotherapists can provide effective treatment for foot and ankle pain. This may consist of manual therapy, manipulation, and strengthening exercises.",
    },
    {
        Image: Knee,
        title: "Knee Related Pain",
        desc: "Physiotherapy is an effective method for reducing knee pain and enhancing strength. Enhancing your mobility can make it simpler for you to walk, rise from a seated position, and use the staircases."
    },
    {
        Image: Back,
        title: "Back Related Pain",
        desc: "Back pain has become a prevalent problem among people today. Lower back pain is primarily caused by poor posture. Physiotherapy is the most effective treatment for this issue, as it can alleviate pain, improve posture, and strengthen the body."
    },
    {
        Image: Neck,
        title: "Neck Related Pain",
        desc: "Neck pain is a common issue that affects a large number of people. Physiotherapy has been found to be an effective treatment option for those who suffer from chronic neck pain. It helps alleviate pain and stiffness and improves motion in the head and neck. "
    },
    {
        Image: Shoulder,
        title: "Shoulder Related Pain",
        desc: "Joint discomfort, especially in the shoulders, can be brought on by heavy weightlifting or other traumas. It can be alleviated by strengthening and enhancing the shoulder. Painkillers can provide immediate pain alleviation, but consistent physiotherapy can assist in treating the underlying causes of pain."
    },
    {
        Image: Neurological,
        title: "Neurological Related Conditions",
        desc: "Neurological Physiotherapy is a specialized branch of physiotherapy that focuses on providing treatment to individuals who are suffering from neurological conditions like Stroke, Multiple Sclerosis (MS), Spinal Cord Injury, and Parkinson’s."
    },
    {
        Image: PostSurgery,
        title: "Post Surgery Rehab",
        desc: "Individuals who are recovering from an injury or surgery usually spend an extended period of time confined to bed. Therefore, it may take some time for them to regain their normal gait. If you are experiencing pain, it may be difficult to move and impossible to complete daily tasks. However, our skilled physiotherapist can help you regain strength, increase mobility and flexibility, and improve coordination. "
    },
    {
        Image: Dislocation,
        title: "Dislocations",
        desc: "Dislocation of joints can happen when a sudden impact causes the bones in the joint to shift from their usual position. Based on the examination results, your physiotherapist will focus on restoring your mobility, strength, joint awareness, and sport-specific abilities."
    },
    {
        Image: Fractures,
        title: "Fractures ",
        desc: "Physiotherapy is essential in the treatment of a fracture. Physiotherapy manipulation, electrotherapy, joint mobilization methods, and exercises will help strengthen the bone and the tissues around it."
    },
]

const bannerListPoints = [
    { text: "Easy", className: "" },
    { text: "Patient-Friendly", className: "" },
    { text: "Effective", className: "" },
];

const ForPhysiotherapist = ({ citiesList = [], healthConditionsList = [] }) => {
    return (
        <>
            <PhysioHeader citiesList={citiesList} healthConditionsList={healthConditionsList} />
            <Breadcrumb
                className="physiotherapyBreadcrumb"
                breadcrumbText="Home Healthcare Services"
                nestedLevel={true}
                nestedBreadcrumbText="Physiotherapy"
                Href="/home-healthcare-services/"
            />
            <ServiceBannerTypeTwo
                bannerTitle="Home Based Physiotherapy Services on HealthSy"
                bannerListPoints={bannerListPoints}
                className="physiotherapyBanner"
                bannerImage={inclinicBanner}
                citiesList={citiesList}
                healthConditionsList={healthConditionsList}
            />
            <TextContent
                title={<>What is <span className="primaryColor">Physiotherapy?</span></>}
                firstContent="Physiotherapy is a highly effective form of treatment that aims to restore, maintain, and improve strength, function, movement, and overall well-being. Using a combination of exercise and advanced technology, physiotherapists can assist patients in regaining muscle strength, joint mobility, and joint position sense after an injury or during rehabilitation from conditions such as Parkinson's disease and stroke."
                secondContent="Physical therapy (PT) is helpful to people of all ages and can be beneficial at any age. Though physiotherapy is most associated with musculoskeletal difficulties, it can be beneficial even if you have not been injured. Physiotherapy is not limited to treating injuries; it can also aid in managing chronic medical conditions such as asthma, preparing for athletic competitions, and even childbirth."
            />
            <AdvantagesGrid />
            <Physiotherpy
                PhysioDetails={PhysioDetails}
                title={<>Physiotherapy <span className="primaryColor">Health Conditions</span></>}
                desc="We recommend that you consult a physiotherapist if you consistently experience discomfort after performing a certain movement. Physiotherapy has a wide range of specialities, and people go to it for different health problems."
            />
            <HealthsyHelp />
            <PhysioService citiesList={citiesList} healthConditionsList={healthConditionsList} />
            <HowToReady />
            <Testimonials />
            <Cities />
            <FAQ className="bg-white" />
            <MajorCities />
        </>
    )
}

export default ForPhysiotherapist

export async function getServerSideProps({ }) {
    try {

        const fetchCities = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}services/cities/home-healthcare-bookings/physiotherapy`);

        const fetchHealthConditions = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}services/health-conditions/home-healthcare-bookings/physiotherapy`);
        return {
            props: {
                citiesList: fetchCities?.data?.length ? fetchCities?.data?.filter((data) => data?.active) : [],
                healthConditionsList: fetchHealthConditions?.data?.length ? fetchHealthConditions?.data?.filter((data) => data?.active) : [],
            }, // will be passed to the page component as props
        }
    } catch (error) {
        console.error(error);
        return { props: { data: null } };
    }
}