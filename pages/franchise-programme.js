import { useState } from "react";

import BannerFranchise from "../src/components/Franchise/bannerFranchise";
import AboutFranchise from "../src/components/Franchise/aboutFranchise";
import AdvantageFranchise from "../src/components/Franchise/advantageFranchise";
import OwnFranchise from "../src/components/Franchise/ownFranchise";
import RegisterYourInterest from "../src/components/Franchise/registerYourInterest";
import DoctorsFAQ from "../src/components/DoctorsAd/DoctorsFAQ";
import FranchiseProgrammeForm from "../src/components/Franchise/FranchiseProgrammeForm";
import CallCard from "../src/components/Franchise/CallCard";
import CallModel from "../src/components/Franchise/CallModel";
import CTAMobileFooter from "../src/components/Common/ctaMobileFooter";
import FranchiseOpportunities from "../src/components/Franchise/FranchiseOpportunities";

const FaqArr = [
    {
        qus: "What is HealthSy Retail Pharmacies Franchise Programme?",
        ans: "This is an exclusive programme mainly for first time entrepreneurs who are looking to make an impact in their local communities by owning and operating a branded medical superstore.",
    },
    {
        qus: "In which cities or towns is this opportunity available?",
        ans: <>We are now open to giving franchise opportunities in major cities and towns in India. To check the available opportunities <a href="#opportunities-form" className="p-0 text-dark opportunitiesNavigate">click here</a></>,
    },
    {
        qus: "Will you accept or have more than 1 franchise partner in a city / town?",
        ans: "No, we will not provide more than 1 franchise opportunity in a city or town. However, no two cities are the same. If there is a high demand for orders and the existing franchisee is unable to fulfil the needs and demands of the customers, another franchise opportunity can be given to any interested individual(s).",
    },
    {
        qus: "I have a friend/ family member who is interested in this programme as well, can we become a HealthSy franchise owners?",
        ans: "Yes, the business structure depends on your convenience, i,e it can be a sole-proprietorship, partnership, LLP or private limited.",
    },
    {
        qus: "What is cost of owning a HealthSy retail pharmacy franchise store?",
        ans: "To know more about this, kindly register your interest and our franchise programme team will connect with you shortly.",
    },
    {
        qus: "I have a licensed retail pharmacy already, can I convert it to a HealthSy retail pharmacy franchise store?",
        ans: "Yes, absolutely you can convert an existing licensed retail pharmacy to a HealthSy retail pharmacy franchise store subject to franchise availability in your respective city or town. ",
    },
    {
        qus: "If my proposal is approved, how long does it take to set up my franchise store?",
        ans: "This depends on the approval of your drug license. However in all, the entire process would be completed in 75 - 100 days, including the store’s interiors, hiring and training of your employees and other necessary procedures that is needed to make you store commence operations.",
    }
]

const FranchiseProgramme = () => {
    const [callCard, setCallCard] = useState(true)
    const [callModel, setCallModel] = useState(false)

    return (
        <>
            <BannerFranchise />
            <AboutFranchise />
            <AdvantageFranchise />
            <OwnFranchise />
            <FranchiseOpportunities />
            <RegisterYourInterest />
            <FranchiseProgrammeForm />
            <DoctorsFAQ
                FaqArr={FaqArr}
                wrapperClassName="healthsyFranchiseFAQ" />
            {callCard ? (
                <CallCard
                    setCallCard={setCallCard}
                    setCallModel={setCallModel}
                />)
                : null
            }
            {callModel && (
                <CallModel
                    callModel={callModel}
                    setCallModel={setCallModel}
                />
            )}
            {callCard && (
                <CTAMobileFooter
                    ctxBannerText="Connect with your relationship manager to know more"
                    setShowCTAcard={setCallCard}
                    isCall={true}
                    buttonText="Call Now"
                    callHref="tel: 07603-944039"
                />
            )}
        </>
    )
}

export default FranchiseProgramme;