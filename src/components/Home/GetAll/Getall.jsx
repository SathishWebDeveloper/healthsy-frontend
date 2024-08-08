import React, { memo } from "react";

const widest_mob_img = "/assets/homepage/health-care-products.webp";
const mob_widest_mob_img = "/assets/homepage/mob-health-care-products.webp";
const tick = "/assets/ticks.svg";
const resp_getall_all = "/assets/homepage/resp-getall-img.png";

const Getall = () => {
  return (
    <div className="get-health-care-section">
      <div className="container get-health-care-padding">
        <div className="row get-health-care-align">
          <div className="col-md-6 mob-text-content">
            <div className="sub-title">WIDEST RANGE AND ATTRACTIVE PRICES</div>
            <div className="title">
              Get all your Healthcare Products on HealthSy
            </div>
            <div className="col-md-12 get-health-care-products-list">
              <ul>
                <li>
                  <img src={tick} alt="tick" className="features-ticks" /> 15+
                  Categories
                </li>
                <li>
                  <img src={tick} alt="tick" className="features-ticks" /> 30+
                  Sub-Categories
                </li>
                <li>
                  <img src={tick} alt="tick" className="features-ticks" /> Top
                  Brands
                </li>
                <div className='mt-3 home_page_learn_more'>
                  <a className='btn btn-learnMore' href={`${process.env.NEXT_PUBLIC_WEB_URL}/healthcare-products`}>Learn More</a>
                </div>
              </ul>
            </div>
          </div>
          <div className="col-md-6">
            <div className="bannerImageDesktop get-health-care-image img-show-on-hover">
              <img
                src={widest_mob_img}
                alt="widest_mob_img"
                className=" get-health-care-mockup "
              />
              <img
                src={resp_getall_all}
                alt="resp_getall_all"
                className="get-health-care-gif-mob content-mobile"
              />
            </div>
            <div className="bannerImageMob">
              <img
                src={mob_widest_mob_img}
                alt="mob_widest_mob_img"
                className="getAll_mob_device_img bannerImageMob "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Getall);
