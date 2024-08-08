import { memo } from "react";

const mobile_membership = "/assets/homepage/resp-membership.webp";
const resp_mobile_membership = "/assets/homepage/mob-resp-membership.webp";
const circlebg = "/assets/homepage/circle-bg.svg";
const tick = "/assets/ticks.svg";


const Membership = (props) => {
    return (
        <div className="membership-section">
            <div className="container">
                <div className="row membership-section-content">
                    <div className="col-md-6">
                        <div className="membership-image-section">
                            <img src={circlebg} alt="circlebg" />
                            <img src={mobile_membership} alt="mobile_membership" className="position-absolute animate-up-down membership-image bannerImageDesktop" />
                            <img src={resp_mobile_membership} alt="resp_mobile_membership" className="mob_device_img position-absolute animate-up-down content-mobile bannerImageMob" />
                        </div>
                    </div>
                    <div className="col-md-6 mob-text-content">
                        <div className="membership-content-section">
                            <div className="sub-title">It’s never too late to start saving more !</div>
                            <div className="title">HealthSy Plus Membership</div>
                            <div className="membership-lists">
                                <ul>
                                    <li><img src={tick} alt="tick" /> 2% Extra Cashback On Medicine Orders</li>
                                    <li><img src={tick} alt="tick" /> Free Online Doctor Consultations </li>
                                    <li><img src={tick} alt="tick" /> 2% Extra cashback on Healthcare Products</li>
                                    <li><img src={tick} alt="tick" /> Extra Discount on Home Healthcare Services</li>
                                    <li><img src={tick} alt="tick" /> Free Deliveries</li>
                                    <div className='mt-3 home_page_learn_more btn-learnMore-wrapper'>
                                        <a className='btn btn-learnMore' href={`${process.env.NEXT_PUBLIC_WEB_URL}/memberships`}>Learn More</a>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Membership);