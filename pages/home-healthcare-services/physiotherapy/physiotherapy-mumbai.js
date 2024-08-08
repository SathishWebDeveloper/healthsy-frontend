import axios from "axios";

import Breadcrumb from "../../../src/components/Common/breadcrumb";
import FAQ from "../../../src/components/Common/faq";
import Physiotherpy from "../../../src/components/Common/Physiotherapy";
import ServiceBannerTypeTwo from "../../../src/components/Common/serviceBannerTypeTwo";
import TextContent from "../../../src/components/Common/textContent";
import PhysioHeader from "../../../src/components/Layouts/Header/PhysioHeader";
import CityLanding from "../../../src/components/Physiotheraphy/CityLanding";
import MajorCities from "../../../src/components/Physiotheraphy/majorCities";
import OtherHomeHealthCareService from "../../../src/components/Physiotheraphy/OtherHomeHealthCareService";
import PhysioService from "../../../src/components/Physiotheraphy/PhysioService";
import CityTestimonial from "../../../src/components/PhysiotherapyCities/CityTestimonial";

const Ankle = "/assets/Physiotheraphy/ankle-and-foot-related-pain.svg";
const Back = "/assets/Physiotheraphy/back-related-pain.svg";
const Dislocation = "/assets/Physiotheraphy/dislocations.svg";
const Fractures = "/assets/Physiotheraphy/fractures.svg";
const Knee = "/assets/Physiotheraphy/knee-related-pain.svg";
const Neck = "/assets/Physiotheraphy/neck-related-pain.svg";
const Neurological = "/assets/Physiotheraphy/neurological-related-conditions.svg";
const PostSurgery = "/assets/Physiotheraphy/post-surgery-rehab.svg";
const Shoulder = "/assets/Physiotheraphy/shoulder-related-pain.svg";
const inclinicBanner = "/assets/Cities/Mumbai.webp";
const mobBannerImg = "/assets/Cities/MumbaiCity.webp"

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
        desc: "Individuals who are recovering from an injury or surgery usually spend an extended period of time confined to bed. Therefore, it may take some time for them to regain their normal gait. If you are experiencing pain, it may be difficult to move and impossible to complete daily tasks. However, our skilled physiotherapist can help you regain strength, increase mobility and flexibility, and improve coordination. ",
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

const MumbaiCity = ({ healthConditionsList = [] }) => {
    return (
        <>
            <PhysioHeader healthConditionsList={healthConditionsList} />
            <Breadcrumb
                className="physiotherapyBreadcrumb"
                breadcrumbText="Home Healthcare Services"
                nestedLevel={true}
                nestedBreadcrumbText="Physiotherapy"
                nestedLevelTwo={true}
                nestedBreadcrumbTextTwo="Mumbai"
                Href="/home-healthcare-services/"
                nestedLevelHref="/home-healthcare-services/physiotherapy"
            // nestedLevelTwoHref=""
            />
            <ServiceBannerTypeTwo
                bannerTitle="Home Based Physiotherapy Services in Mumbai"
                bannerListPoints={bannerListPoints}
                bannerclassName="cityBanner"
                titleClassName="fs48m30fwb"
                cityBanner="cityBannerList"
                bannerImage={inclinicBanner}
                mobBannerimage={mobBannerImg}
                mobImgClass="mobContent"
                webImgClass="desktopContent"
                wrapperClass="physioCitiesBanner"
                healthConditionsList={healthConditionsList}
            />
            <TextContent
                title={<>Qualified and <h2 className="primaryColor fs42m24fwb d-inline"> Top Physiotherapist in Mumbai</h2></>}
                firstContent="The standard of medical care in metropolitan areas such as Mumbai is unparalleled. In large cities like Mumbai, severe traffic congestion can make it challenging for immobile individuals or patients to receive timely medical assistance. Moreover, the high population density in these areas can also lead to overcrowding in hospitals and clinics, resulting in longer wait times for patients."
                secondContent="Through HealthSy, individuals have the chance to engage with licensed and qualified healthcare professionals, including physiotherapists, and obtain top-notch, affordable healthcare services. In addition, our platform allows patients to easily choose their preferred physiotherapist from the listing and make a booking with them based on their convenience. This is particularly beneficial for individuals with mobility impairments, as they can access high-quality medical services without the additional challenge of traveling."
                className="fs42m24fwb contentSpacing"
            />
            <CityLanding />
            <Physiotherpy
                PhysioDetails={PhysioDetails}
                title={<>Physiotherapy Health Conditions <span className="primaryColor">treated in Mumbai</span></>}
                desc="Consult a physiotherapist if you consistently experience discomfort after executing a particular movement. In Mumbai, physiotherapy incorporates a variety of subspecialties that cater to patients with diverse health concerns. The following therapies are among the most prevalent in Mumbai:"
                className="fs42m24fwb"
                physioHealthService="physioHealthCare"
            />
            <TextContent
                title={<>Cost of Home - based <span className="primaryColor"> Physiotherapist Services in Mumbai</span></>}
                firstContent="In Mumbai, obtaining physical therapy at home is an opulent and convenient option that could help alleviate pain. Home physiotherapy costs vary and are not preset. It depends on a variety of factors, including the individual's illness, the length of treatment, and the number of required sessions. HealthSy provides a cost-effective and budget-friendly solution to people looking for physiotherapy treatment at home."
                textContenetClassName="fs42m24fwb textContentSpacing"
            />
            <PhysioService
                className="physioServiceCare"
                serviceClassNameTitle="physioServiceTitle"
                healthConditionsList={healthConditionsList}
            />
            {/* <CityTestimonial /> */}
            <FAQ className="bg-white" />
            <MajorCities />
            <OtherHomeHealthCareService />

        </>
    )
}

export default MumbaiCity

export async function getServerSideProps({ }) {
    try {
        const fetchHealthConditions = await axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}services/health-conditions/home-healthcare-bookings/physiotherapy`);
        return {
            props: {
                healthConditionsList: fetchHealthConditions?.data?.length ? fetchHealthConditions?.data?.filter((data) => data?.active) : [],
            }, // will be passed to the page component as props
        }
    } catch (error) {
        console.error(error);
        return { props: { data: null } };
    }
}