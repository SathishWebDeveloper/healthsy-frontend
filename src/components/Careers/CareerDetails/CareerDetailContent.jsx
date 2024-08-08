const CareerDetailContent = ({ jobDetails }) => {

  return (
    <div className="container careerDetailWrapper mb-0">
      <div className="careerDetailSubheader mt-4">Description</div>
      <div className="car-particular-desc" dangerouslySetInnerHTML={{ __html: jobDetails?.job_Description }}></div>
      <div className="careerDetailSubheader mb-3">About HealthSy</div>
      <div className="careerDetailDescription">
        HealthSy is a health-tech startup with the objective of creating a simplified
        healthcare ecosystem in our country by offering all the recurring and immediate
        healthcare services under one platform to the public on one hand and build a
        network of healthcare partners namely doctors, clinics, retail pharmacies and
        home healthcare service providers on the other along with providing them with
        necessary tools and solutions to grow their practice or business.
      </div>
      <div className="careerDetailSubheader mt-4 mb-3">Our Mission and Vision:</div>
      <div className="careerDetailDescription">
        Our mission is to constantly bring in improvements that will enhance or simplify
        the way that these recurring and immediate healthcare needs are done by people
        on a daily basis. In simple terms we want to be everyone’s daily healthcare
        partner. Our vision is to build a sustainable health-tech ecosystem or business
        that would provide solutions to both users in general and the various important
        stakeholders of the healthcare industry such as doctors, clinics, retail pharmacies,
        home healthcare service providers. We want HealthSy to be placed in the top 10
        health-tech start-ups in India.
      </div>
    </div>
  );
};

export default CareerDetailContent;
