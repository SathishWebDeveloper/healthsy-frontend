// import verified from "../../assets/Vector2.svg";
// import refund from "../../assets/refund1.svg";
// import reachOut from "../../assets/phone-call-2.svg";
// import reachOut1 from "../../assets/g2922.svg";
// import easyCancell from "../../assets/bell-2.svg";
// import pay from "../../assets/messenger-2.svg";
const verified = "/assets/Vector2.svg";
const refund = "/assets/refund1.svg";
const reachOut = "/assets/phone-call-2.svg";
const reachOut1 = "/assets/g2922.svg";
const easyCancell = "/assets/bell-2.svg";
const pay = "/assets/messenger-2.svg";

const OnlineConsultationAdvantages = () =>{
    const consultationAdvantages = [
        {
            image: verified,
            desc: 'Experienced and Verified doctors'
        },
        {
            image: refund,
            desc: '100% refund in case of ‘ No Show ’  by the doctor'
        },
        {
            image: reachOut,
            desc: 'Reach out to our support team from the app via chat, mail or call for technical or any online doctor consultation related issues'
        },
        {
            image: reachOut1,
            desc: '30+ Doctor specializations on HealthSy'
        },
        {
            image: easyCancell,
            desc: 'Get reminder about your upcoming online doctor consultation'
        },
        {
            image: pay,
            desc: 'Free follow-up period with 40 messages valid for 48 hours post completion of consultation'
        },
    ]
    return (
        <div className="container consultationAdvantages  d-flex align-items-center flex-wrap">
        {
            consultationAdvantages.map((data, inx) => {
                return (
                    <div key={inx} className="d-flex align-items-center consultationAdvantageWrapper container">
                        <div className="flexCenter stepsImageWrapper">
                            <img src={data.image} alt='Online consultation image'></img>
                        </div>
                        <div className="consultationDesc">{data.desc}</div>
                    </div>
                )
            })
        }
    </div>
    )
}

export default OnlineConsultationAdvantages;