// import verified from "../../assets/verified.svg";
// import refund from "../../assets/refund.svg";
// import reachOut from "../../assets/reach-out.svg";
// import reachOut1 from "../../assets/reach-out1.svg";
// import easyCancell from "../../assets/easy-cancell.svg";
// import pay from "../../assets/pay.svg";
const verified = "/assets/verified.svg";
const refund = "/assets/refund.svg";
const reachOut = "/assets/reach-out.svg";
const reachOut1 = "/assets/reach-out1.svg";
const easyCancell = "/assets/easy-cancell.svg";
const pay = "/assets/pay.svg";

const InClinicAdvantages = () => {
  const advantageswithImages = [
    {
      image: refund,
      desc: `100% refund in case of ‘No Show’ or appointment cancellation by doctor / clinic`,
    },
    {
      image: reachOut,
      desc: (
        <div>
          <div className="desktopContent">30+ specialisations for In-</div>
          <div className="desktopContent"> Clinic appointment on </div>
          <div className="desktopContent">HealthSy</div>
          <span className="mobContent">
            30+ specialisations for In-Clinic appointment on HealthSy{" "}
          </span>
        </div>
      ),
    },
    {
      image: easyCancell,
      desc: `Easy cancellation and rescheduling of your In-Clinic appointment on the app`,
    },
    {
      image: reachOut1,
      desc: (
        <div>
          Reach out to our support
          <div className="desktopContent"> team via call, mail or chat</div>
          <span className="mobContent">&nbsp; team via call, mail or chat</span>
        </div>
      ),
    },
    {
      image: pay,
      desc: (
        <div>
          Pay Online or option to{" "}
          <div className="desktopContent">‘Pay directly at Clinic’</div>
          <span className="mobContent">‘Pay directly at Clinic’</span>
        </div>
      ),
    },
    {
      image: verified,
      desc: (
        <div>
          Experienced and verified <div className="desktopContent">doctors</div>
          <span className="mobContent"></span>
        </div>
      ),
    },
  ];
  return (
    <div className="advantagesSection container mb-2 pb-3">
      <div className=" d-flex justify-content-center pt-5 pb-5">
        <div className="advantagesHeading">
          <span className="desktopContent">
            Advantages of Booking In-Clinic Appointments on HealthSy
          </span>
          <span className="mobContent">
            Instant Payments Made Possible by Click of a Link
          </span>
        </div>
      </div>
      <div className="d-flex justify-content-around  flex-wrap mb-2">
        {advantageswithImages.map((data, idx) => {
          return (
            <div className="text-center advantageAndImage" key={idx}>
              <div className="m-5 mt-0 advantagesContentWrapper">
                <img src={data.image} className="advantageImage" alt='In-clinic Advantage'></img>
                <div className="advantageDescription">{data.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InClinicAdvantages;
