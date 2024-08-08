const achievements1 = "/assets/aboutUs/achievements1.png";
const achievements2 = "/assets/aboutUs/achievements1.png";
const achievements3 = "/assets/aboutUs/achievements1.png";
const achievements4 = "/assets/aboutUs/achievements1.png";

const OurAchievements = () => {
  return (
    <>
      <div className="container aboutCTOSection">
        <div className="aboutUsCTOTitle text-center">
          <h3>
            Our <span>Achievements </span>
          </h3>
          <p>Learn about our recent achievements and milestones </p>
        </div>

        <div className="container text-center">
          <div className="row row-cols-2 row-cols-md-4 g-2 g-lg-3 our-achievements-section">
            <div className="col">
              <div className="p-5">
                <img
                  src={achievements1}
                  className="img-fluid achievements-img"
                  alt="achievements1"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={achievements2}
                  className="img-fluid achievements-img"
                  alt="achievements1"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={achievements3}
                  className="img-fluid achievements-img"
                  alt="achievements1"
                />
              </div>
            </div>
            <div className="col">
              <div className="p-5">
                <img
                  src={achievements4}
                  className="img-fluid achievements-img"
                  alt="achievements1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurAchievements;
