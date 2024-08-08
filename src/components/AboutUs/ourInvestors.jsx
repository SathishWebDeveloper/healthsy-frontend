const investor1 = "/assets/aboutUs/investor1.png";
const investor2 = "/assets/aboutUs/investor2.png";
const investor3 = "/assets/aboutUs/investor3.png";
const investor4 = "/assets/aboutUs/investor4.png";
const investor5 = "/assets/aboutUs/investor5.png";
const investor6 = "/assets/aboutUs/investor6.png";
const investor7 = "/assets/aboutUs/investor7.png";
const investor8 = "/assets/aboutUs/investor8.png";

const OurInvestors = () => {
  return (
    <>
      <div className="container aboutCTOSection">
        <div className="aboutUsCTOTitle text-center">
          <h3>
            Our <span>Investors</span>
          </h3>
          <p>Meet the back-bones of HealthSy and our pillars of strength </p>
        </div>

        <div className="container text-center">
          <div className="row row-cols-2 row-cols-md-4 g-2 g-lg-3 our-investors-section">
            <div className="col">
              <div className="p-5">
                <img
                  src={investor1}
                  className="img-fluid investors-img"
                  alt="investor1"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={investor2}
                  className="img-fluid investors-img"
                  alt="investor2"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={investor3}
                  className="img-fluid investors-img"
                  alt="investor3"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={investor4}
                  className="img-fluid investors-img"
                  alt="investor4"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={investor5}
                  className="img-fluid investors-img"
                  alt="investor5"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={investor6}
                  className="img-fluid investors-img"
                  alt="investor6"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={investor7}
                  className="img-fluid investors-img"
                  alt="investor7"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={investor8}
                  className="img-fluid investors-img"
                  alt="investor8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurInvestors;
