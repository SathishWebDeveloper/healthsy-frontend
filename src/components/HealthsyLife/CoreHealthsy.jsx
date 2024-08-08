import Image from "next/image";

const customerCentric = "/assets/healthsyLife/Healthsy_Customercentric.webp";
const design = "/assets/healthsyLife/Healthsy_Design.webp";
const happiness = "/assets/healthsyLife/Healthsy_Happiness.webp";
const culture = "/assets/healthsyLife/Healthsy_DNA.webp";

const CoreHealthsy = () => {
  return (
    <div className="coreValueContent px-3">
      <div className="container py-5">
        <div>
          <h2 className="healthsy-core">Our Core Values</h2>
          <p className="healthsy-core-description my-4">
            At HealthSy, we have an ambitious ‘Vision and Mission’. To embark on
            the his journey and achieve it successfully we have formulated our
            core values that will be beneficial to us.{" "}
          </p>
        </div>
        <div className="d-flex core-value-pair w-100">
          <div className="me-4 w-50 core-customer-centric">
            <Image
              src={customerCentric}
              width={540}
              height={460}
              className="core-value-image"
              alt="Core HealthSy"
            />
            <h2 className="core-value fs32m24fwb my-4">
              Customer - Centric and their satisfaction is the key{" "}
            </h2>
            <p className="core-value-description mb-5 mb-4">
              We believe that communication with our customers or our partners
              at the right time and via the right medium is the key to growth
              and success. At the same time listening to their feedbacks, being
              transparent and making sure that we build and update our products
              that has key customer feedbacks and issues will help us connect
              with them directly.
            </p>
          </div>
          <div className="ms-4 w-50 core-design">
            <Image
              src={design}
              width={540}
              height={460}
              className="core-value-image"
              alt="Core HealthSy 2"
            />
            <h2 className="core-value fs32m24fwb my-4">
              Knowledge, Innovation and Creativity{" "}
            </h2>
            <p className="core-value-description mb-5">
              We believe that by constantly updating our knowledge about the
              ever growing health-tech and it’s associated industries, the
              expanding markets, demand, competition, innovations, technologies,
              customer and partners needs and expectations we are able to
              deliver and sustain. Innovation and innovative aspects to
              technology, design and products is very much part of HealthSy’s
              daily routine.
            </p>
          </div>
        </div>
        <div className="d-flex core-value-pair w-100">
          <div className="me-4 w-50 core-happiness">
            <Image
              src={happiness}
              width={540}
              height={460}
              className="core-value-image"
              alt="Core HealthSy 3"
            />
            <h2 className="core-value fs32m24fwb my-4">
              Happiness, Passion and Positivity all over{" "}
            </h2>
            <p className="core-value-description mb-5">
              We want to build strong relationships with our team members that
              is purely based on happiness and passion. We try and instil the
              passion in them so that they are motivated and enthusiastic about
              the work that is being done at HealthSy. This enables us to inch
              closer to our ‘Vision and Mission’ each day.
            </p>
          </div>
          <div className="ms-4 w-50 core-culture">
            <Image
              src={culture}
              width={540}
              height={460}
              className="core-value-image"
              alt="Core HealthSy 4"
            />
            <h2 className="core-value fs32m24fwb my-4">
              Team Building and Culture in our DNA{" "}
            </h2>
            <p className="core-value-description mb-5">
              At HealthSy, teams and working as teams is very much part of what
              we do daily. We try and bring in healthy competition among our
              teams which ultimately makes each member in the team feel more
              excited. We ensure that nobody remains helpless and that everyone
              grows together and delivers to the overall welfare of our
              organisation.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreHealthsy;
