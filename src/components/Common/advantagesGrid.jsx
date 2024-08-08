
const advantagesArr = [
    {
        title: "Cost Effectiveness",
        desc: "Home physiotherapy sessions are more cost-effective than clinic visits. HealthSy Home Healthcare service is affordable, accountable, and can help you avoid travel and other expenses."
    },
    {
        title: "Time Management",
        desc: "Now that your physiotherapy appointments are easier to schedule, you won't miss any of them. You can schedule your therapy session according to your routine and convenience."
    },
    {
        title: "Comfort of Home",
        desc: "Home is where the heart is, and there is no place more comfortable than your home. During the therapy in-home, our healthcare professionals give you their undivided attention and care."
    },
    {
        title: "Personalized Treatment",
        desc: "Physiotherapy at home allows for  personalized attention and extended session time. You and your physiotherapist can collaborate for the most effective approach to facilitate your quick recovery. "
    },
    {
        title: "Increased Scope of Treatment",
        desc: "Receiving physiotherapy at home offers the benefit of receiving more personalized attention and time during each session. You and your therapist can take the time to understand your situation."
    },
    {
        title: "Supervision by family members",
        desc: "When you schedule a physiotherapy session at home, your therapy will take place under the supervision of your family members. This can be advantageous as it avoids the need for mobility. "
    },
]

const AdvantagesGrid = () => {
    return (
        <div className="physioAdvantagesSection container">
            <h2 className="fs48m24fwb advantageHeading">Advantages of Opting for <span className="primaryColor">Physiotherapy Services at Home</span></h2>
            <div className="grid-container">
                {advantagesArr.map((advantage, inx) => {
                    return (
                        <div key={inx} className="gridBox ">
                            <div className="advantageNumber fs18m16fwb flexCenter">{`0${inx + 1}`}</div>
                            <div className="advantageTitle fs36m24fwb">{advantage.title}</div>
                            <div className="fs18m16 advantageDesc">{advantage.desc}</div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default AdvantagesGrid;