import { memo } from "react";
import Image from "next/image";

const healthsyAbout1 = "/assets/aboutUs/healthsy-about-1.webp";
const healthsyAbout2 = "/assets/aboutUs/healthsy-about-2.webp";
const healthsyAbout3 = "/assets/aboutUs/healthsy-about-3.webp";
const healthsyAbout4 = "/assets/aboutUs/healthsy-about-4.webp";
const healthsyAbout5 = "/assets/aboutUs/healthsy-about-5.webp";
const healthsyAbout6 = "/assets/aboutUs/healthsy-about-6.webp";

const AboutHealthsy = () => {
  return (
    <>
      <div className="aboutHealthsySection">
        <h2 className="aboutHealthsyTitle">
          About <span>HealthSy</span>
        </h2>
        <h2>
          We consider ourselves a one-stop solution for all your every healthcare need, starting right from getting your medicines delivered to consulting with doctors and get diagnosed effortlessly, to enabling you avail quality professional services of nurses, physiotherapists. It is in our DNA to make the healthcare system of our country great and make it stand out amongst the various countries of the world.
        </h2>
      </div>
      <div className="d-flex masonry-grid">
        <div className="d-flex">
          <div className="masonry-column flex-column">
            <div className="thumbnail">
              <Image src={healthsyAbout1} width={302} height={306} alt="healthsyabout1" className="about-img1 header-images1" />
            </div>
            <div className="thumbnail">
              <Image src={healthsyAbout2} width={302} height={198} alt="healthsyabout2" className="about-img2 header-images2" />
            </div>
          </div>
          <div className="masonry-column">
            <div className="thumbnail">
              <Image src={healthsyAbout3} width={302} height={511} alt="healthsyabout3" className="about-img3 header-images3" />
            </div>
          </div>
        </div>
        <div className="d-flex aboutHealthsyImages">
          <div className="masonry-column flex-column">
            <div className="thumbnail">
              <Image src={healthsyAbout4} width={302} height={306} alt="healthsyabout4" className="about-img1 header-images1" />
            </div>
            <div className="thumbnail">
              <Image src={healthsyAbout5} width={302} height={198} alt="healthsyabout5" className="about-img2 header-images2" />
            </div>
          </div>
          <div className="masonry-column">
            <div className="thumbnail">
              <Image src={healthsyAbout6} width={302} height={511} alt="healthsyabout6" className="about-img3 header-images3" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(AboutHealthsy);