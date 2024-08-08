// import bannerImage from "../../assets/plus-membership.png";
// import tick_without_outline from "../../assets/tick_without_outline.svg";
const bannerImage = "/assets/plus-membership.png";
const tick_without_outline = "/assets/tick_without_outline.svg";

const MembershipPlans = () => {
  const MembershipPlansExplanation = [
    " Free Online Doctor Consultations across all specialisation",
    "2% Extra Cashback on all medicines",
    "10% Extra OFF on Home Health Servicesacross all Categories",
    "2% Extra Cashback on all Healthcare Products",
    "Free Delivery on all medicines & Healthcare products orders above ₹",
  ];

  return (
    <div className="MembershipPlansContainer container mb-5">
      <div className="MembershipPlansContentwrapper d-flex align-items-center">
        <div className="d-flex flex-column">
          <img src={bannerImage} alt={"bannerImage"} className="d-none d-md-block"></img>
          <div className="MembershipPlansTitle">HealthSy Plus Membership</div>
          <div className="MembershipPlansDesc mt-4 ">
            Choose any membership plan that fits into your needs and{" "}
            <span>
              timeline thus enabling you to save more on your medical and
              healthcare bills…{" "}
            </span>
          </div>
        </div>
        <div className=" MembershipPlansExplanationConatiner  ms-5">
          {Array(3)
            .fill()
            .map((data, idx) => {
              return (
                <div className="MembershipPlansExplanation p-5  mb-5 ms-5" key={idx}>
                  <div className="MembershipPlanAmount mb-3">
                    ₹ {idx === 0 ? 499 : idx === 1 ? 999 : 1499}
                  </div>
                  <div className="MembershipPlanAmountDetail">
                    <p className="mb-4">
                      {idx === 0 ? 3 : idx === 1 ? 6 : 12} Months saving upto ₹{" "}
                      {idx === 0 ? "2,999" : idx === 1 ? "5,999" : "11,999"}*
                    </p>
                  </div>
                  {MembershipPlansExplanation.map((explanation, index) => {
                    return (
                      <div className=" MembershipPlanAmountExplanation d-flex flex-row align-items-start mt-4" key={index}>
                        <div className="me-3">
                          <img src={tick_without_outline} alt={"tick_without_outline"}></img>
                        </div>
                        <div className="MembershipPlanAmountExplanationContent">
                          {`${index === 0 && idx === 0
                              ? 3
                              : index === 0 && idx === 1
                                ? 6
                                : index === 0 && idx === 2
                                  ? 12
                                  : ""
                            }
                            ${explanation} 
                            ${index === 4 && idx === 2
                              ? 99
                              : index === 4 &&
                                idx <= 1
                                ? 199
                                : ""
                            }`}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default MembershipPlans;
