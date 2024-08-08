import { memo } from "react";
import Image from "next/image";

const aboutBanner = "/assets/aboutUs/about-us-banner.png"
const aboutMobBanner = "/assets/aboutUs/about-us-mob-banner.webp"

const AboutUsBanner = () => {
    return (
        <>
            <div className="container aboutUsBannerTitle">
                <h1>Health, <span>HealthSy</span> and Health-tech!</h1>
                <p className="aboutUsBannerSubTitle">In simple terms, we just love the term ‘Health-tech’ and as one united team we are trying to revolutionise the industry through our initiatives</p>
            </div>
            <div className="desktopContent">
                <Image
                    src={aboutBanner}
                    width={1478}
                    height={1109}
                    className="img-fluid w-100"
                    alt="About Us Banner" />
            </div>
            <div className="mobContent">
                <Image
                    src={aboutMobBanner}
                    width={425}
                    height={392}
                    className="img-fluid w-100 aboutUsBannerImg"
                    alt="About Us Mobile Banner" />
            </div>
        </>
    );
};

export default memo(AboutUsBanner);