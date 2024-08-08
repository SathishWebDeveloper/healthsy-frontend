import Image from "next/image";
import React, { memo } from "react";

const healthcareImg = "/assets/homepage/home-healthcare.gif";

const HomeHealthCare = () => {

    return (
        <div className="health-care-section">
            <div className="container health-care-padding">
                <div className="health-care-align">
                    <div className="mob-text-content homeHealthCareContentWrapper">
                        <div className="sub-title fs16fw600">Qualified Professionals | 6+ Categories</div>
                        <div className="title fs36m22fwb">Home Healthcare Services</div>
                        <div className="health-care-image mobContent">
                            <Image
                                width={350}
                                height={338}
                                src={healthcareImg}
                                alt="mobile_screen_healthcare"
                                loading="lazy"
                            />
                        </div>
                        <div>
                            <p className="fs18m16fw500m400">HealthSy will provide you with the quality home-based healthcare services at your doorstep. Book now and get your services done from the environment you love - Your home!</p>
                        </div>
                        <div className='home_page_learn_more'>
                            <a className='btn-learnMore flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/home-healthcare-services`}>Learn More</a>
                        </div>
                    </div>
                    <div className="health-care-image desktopContent">
                        <Image
                            width={536}
                            height={518}
                            src={healthcareImg}
                            alt="mobile_screen_healthcare"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(HomeHealthCare);
