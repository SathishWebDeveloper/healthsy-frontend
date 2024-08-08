import Image from "next/image";

const tick = "/assets/icons/tick.svg";
const membershiplogo = "assets/homepage/membership_logo.svg"
const membershipImg = "assets/homepage/mem_rotate.svg"
const membershipImage = "assets/homepage/mem_logo.svg"
const membership = "assets/homepage/membership.svg"

const healthsyPlusMembershipPlans = [
    {
        period: "3 Month",
        price: "₹ 499",
        savings: "3 Month saving upto ₹ 2,999*",
        points: [
            "3 Free Online Doctor Consultations across all specialization*",
            "2% Extra Cashback on all Medicines",
            "10% Extra OFF on Home Healthcare Services across all Categories",
            "2% Extra Cashback on all Healthcare Products",
            "Free Delivery on all Medicines & Healthcare Products orders above ₹ 199",
        ]
    },
    {
        period: "6 Month",
        price: "₹ 999",
        savings: "6 Month saving upto ₹ 5,999*",
        points: [
            "6 Free Online Doctor Consultations across all specialization*",
            "2% Extra Cashback on all Medicines",
            "10% Extra OFF on Home Healthcare Services across all Categories",
            "2% Extra Cashback on all Healthcare Products",
            "Free Delivery on all Medicines & Healthcare Products orders above ₹ 199",
        ]
    },
    {
        period: "12 Month",
        price: "₹ 1499",
        savings: "12 Month saving upto ₹ 11,999*",
        points: [
            "12 Free Online Doctor Consultations across all specialization*",
            "2% Extra Cashback on all Medicines",
            "10% Extra OFF on Home Healthcare Services across all Categories",
            "2% Extra Cashback on all Healthcare Products",
            "Free Delivery on all Medicines & Healthcare Products orders above ₹ 99",
        ]
    },
]

const HealthsyPlusMembership = () => {

    return (
        <>
            <div className="container position-relative">
                <div className="d-flex membershipServiceImg">
                    <Image src={membership} width={235} height={46} alt="membership" className="healthsyMembership" />
                </div>
            </div>
            <div className="healthsyPlusMembertship bg-primary position-relative">
                <div className="desktopContent">
                    <Image src={membershipImg} width={137} height={196} alt="membership_img" className="membershipImg" />
                    <Image src={membershipImage} width={56} height={87} alt="membership_img" className="membershipImage" />
                </div>
                <div className="container p-0">
                    <div className="text-white d-flex membershipContentWrapper">
                        <div className="d-flex align-items-center healthsyPlusMembership">
                            <Image src={membershiplogo} width={132} height={146} alt="membership_logo" className="healthsyMembershipImg" />
                            <div className="healthsyMembershipWrapper">
                                <div className="fs36m22fw800m700">HealthSy Plus Membership</div>
                                <div className="fs18m16 healthsyMembershipSubTitle">It’s never too late to start saving more !</div>
                            </div>
                        </div>
                        <div className="desktopContent">
                            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/memberships`}>
                                <button className="membershipLearnMoreBtn p-0 fs16fwb">Learn More</button>
                            </a>
                        </div>
                    </div>
                    <div className="plansWrapper">
                        {
                            healthsyPlusMembershipPlans.map((plan, inx) => {
                                return (
                                    <div key={inx} className="healthsyPlusPlans">
                                        <div className="text-center">
                                            <div className="planPeriod flexCenter text-white fs16m18">{plan.period}</div>
                                            <div className="fs42m35fw800">{plan.price}</div>
                                            <div className="fs14m12 planSavings">{plan.savings}</div>
                                            {/* <button className="planBtn primaryColor fs16m14fwb">Learn More</button> */}
                                            <div className="membershipLine" />
                                        </div>
                                        <div className="fs13fw800 planBenefits text-center">Benefits in HealthSy plus:</div>
                                        <div>
                                            {plan.points.map((point, idx) => {
                                                return (
                                                    <div key={idx} className="flexAlignCenter planPointsWrapper">
                                                        <Image
                                                            src={tick}
                                                            width={11}
                                                            height={9}
                                                            className="planPointsTickImg"
                                                            alt="tick"
                                                        />
                                                        <div className="planPoints fs14m12">{point}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="mobContent text-center">
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/memberships`}>
                            <button className="membershipLearnMoreBtn fs16fwb">Learn More</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HealthsyPlusMembership;