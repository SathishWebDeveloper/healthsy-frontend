import AboutSustainabilityPolicy from "../src/components/SustainabilityPolicy/AboutSustainabilityPolicy";
import Initiatives from "../src/components/SustainabilityPolicy/Initiatives";
import FAQ from "../src/components/Common/faq";
import SustainabilityFeedbackForm from "../src/components/SustainabilityPolicy/SustainabilityFeedbackForm";
import BannerSustainabilityPolicy from "../src/components/SustainabilityPolicy/BannerSustainabilityPolicy";
import SustainabilityCounter from "../src/components/SustainabilityPolicy/SustainabilityCounter";

const staticData = [
    {
        question: "Why is HealthSy concerned about environmental sustainability? ",
        answer: "HealthSy plays a crucial role in enhancing public health. By embracing environmental sustainability, we protect ecosystems and contribute to a healthier planet, supporting human well-being"
    },
    {
        question: "Can you provide examples of eco-friendly initiatives that HealthSy has implemented? ",
        answer: "Certainly! We are committed to sustainability through measures such as avoiding plastic usage, minimizing waste, maintaining gender equality, reducing paper usage, and promoting eco-friendly practices in our operations. We also prioritize sustainable order packaging through corrugated boxes. ",
    },
    {
        question: "How can customers support HealthSy's sustainability efforts? ",
        answer: "Customers can support us by choosing our eco-friendly products, services, and packaging, and even giving feedback can walk us through improving our sustainability initiatives. Their input will help us make better choices for the environment. ",
    },
    {
        question: "What is the impact of HealthSy's sustainability efforts on healthcare costs? ",
        answer: "Our sustainability efforts often lead to cost savings, which can help mitigate healthcare costs eventually. Efficiency gains, reduced energy expenses, and lower waste disposal costs are among the financial benefits. ",
    }
]

const SustainabilityPolicy = () => {
    return (
        <>
            <BannerSustainabilityPolicy />
            <AboutSustainabilityPolicy />
            <Initiatives />
            <SustainabilityCounter />
            <SustainabilityFeedbackForm />
            <FAQ
                isStatic={true}
                section={false}
                staticData={staticData}
                pageName="Sustainability Policy"
                className="bg-white"
            />
        </>
    )
}

export default SustainabilityPolicy;