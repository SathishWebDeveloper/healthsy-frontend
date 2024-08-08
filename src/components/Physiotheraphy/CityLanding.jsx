import Image from "next/image";
import { useState } from "react";

import PhysioRegistrationForm from "./PhysioRegistrationForm";

const arrows = "/assets/Physiotheraphy/book-now-arrow.svg";

const advantagesArr = [
    {
        title: "Cost Effectiveness",
        desc: "Home physiotherapy sessions are more cost-effective than clinic visits. HealthSy Home Healthcare service is affordable, accountable, and can help you avoid travel and other expenses."
    },
    {
        title: "Time Management",
        desc: "Now that your physiotherapy appointments are easier to schedule, you won't miss any of them. You can schedule your therapy session according to your routine and convenience"
    },
    {
        title: "Comfort of Home",
        desc: "Home is where the heart is, and there is no place more comfortable than your home. During the therapy in-home, our healthcare professionals give you their undivided attention and care."
    },
    {
        title: "Personalized Treatment",
        desc: "Receiving physiotherapy at home allows for personalized attention and extended session time. You and your physiotherapist can collaborate to determine the most effective approach to facilitate your quick recovery."
    },
    {
        title: "Increased Scope",
        desc: "Receiving physiotherapy at home offers the benefit of receiving more personalized attention and time during each session. You and your therapist can take the time to understand your situation"
    },
    {
        title: "Supervision by family members",
        desc: "When you schedule a physiotherapy session at home, your therapy will take place under the supervision of your family members. This can be advantageous as it avoids the need for mobility. "
    },
]       

const CityLanding = () => {
    const [bookNowForm, setBookNowForm] = useState(false);

    return (
        <div className="cityLandingSection">
            <div className="container cityServiceSection d-flex">
                <div className="d-flex flex-column">
                    <div className="cityTitle fs42m24fwb">Advantages of Opting for Home Based <span className="primaryColor">Physiotherapy in Mumbai</span></div>
                    <div className="cityDesc fs20m16">Receiving physiotherapy at home in Mumbai can offer patients personalized care, cost-effectiveness, and the convenience of avoiding transportation stress. This may result in improved outcomes and a quicker recovery for patients.</div>
                    <button 
                        className="bgPrimary text-white rounded-pill cityBookBtn fs24m16fw700" 
                        onClick={() => setBookNowForm(true)}
                    >
                        <span>Book Now
                            <Image src={arrows} width={12} height={12} className="cityBookArrow"
                                alt="book-arrow" /></span>
                    </button>
                </div>
                <div className="cityLandingContent">
                    {advantagesArr.map((data, inx) => {
                        return (
                            <div key={inx} className="d-flex">
                                <div>
                                    <div className="circleSpacing advantageNumber fs18m16fwb flexCenter">{`0${inx + 1}`}</div>
                                </div>
                                <div key={inx} className="citycontentSpacing">
                                    <div className="fs24m16fwb ">{data.title}</div>
                                    <div className="cityLandingDesc fs16m14">{data.desc}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <PhysioRegistrationForm bookNowForm={bookNowForm} setBookNowForm={setBookNowForm} />
        </div>
    )
}

export default CityLanding  