// import Fast_Delivery from "../../assets/Fast_Delivery.svg";
// import rupee from "../../assets/rupee.svg";
// import doctor from "../../assets/g2922.svg";
const Fast_Delivery = "/assets/Fast_Delivery.svg";
const rupee = "/assets/rupee.svg";
const doctor = "/assets/g2922.svg";

const MembershipBenifits = () => {
    const benifits = [
        {
            image: Fast_Delivery,
            desc: 'Get access to free deliveries'
        },
        {
            image: rupee,
            desc: 'Cash-backs on medicines & healthcare orders'
        },
        {
            image: doctor,
            desc: 'Free online doctor consultations and more'
        },
    ]
    return (
        <div className="MembershipBenifitsContainer text-center container mb-5">
            <h2 className="MembershipBenifitsTextOne pt-5">Key Benefits of HealthSy Plus Membership</h2>
            <div className="membershipBeniftMob pt-5 d-none">Key Benefits of <span className="primaryColor">HealthSy Plus</span> Membership</div>
            <div className="MembershipBenifitsContentWrapper pt-5 pb-5 d-flex  align-items-start justify-content-around">
                {
                    benifits.map((data, inx) => {
                        return (
                            <div className="d-flex  align-items-center flex-column" key={inx}>
                                <div className="membershipBenifitImage p-2 d-flex align-items-center justify-content-center">
                                    <img src={data.image} alt={"image"}></img>
                                </div>
                                <div className="MembershipBenifitsTextTwo mt-3">{data.desc}</div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
export default MembershipBenifits