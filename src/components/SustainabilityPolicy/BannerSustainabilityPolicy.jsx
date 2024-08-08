import Image from "next/image";

import useIsDesktop from "../Hooks/useIsDesktop"

const home = "/assets/home-icon.svg";
const arrowleft = "/assets/arrow-left.svg";
const bannerGif = "/assets/sustainability-policy/sustainability-banner.gif";
const bannerGifMob = "/assets/sustainability-policy/sustainability-banner-mob.gif";

const BannerSustainabilityPolicy = () => {
    const isDesktop = useIsDesktop()

    return (
        <>
            <div className="sustainabilityBanner position-relative">
                <div className="container">
                    <div className="sustainabilityBreadcrumb">
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                            <img src={home} alt="home" />
                        </a>{" "}
                        <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
                        <a href="#"> Sustainability Policy </a>
                    </div>
                    <div className="sustainabilityBannerContentWrapper">
                        <div className="fs48m32fwb sustainabilityBannerTitle">Leading the Way in <span className="SustainableGreen">Sustainable</span> Healthcare Excellence</div>
                        <div className="fs18m14fw500 sustainabilityBannerDesc">From urban to rural, we strive to create a culture of sustainability and make healthcare more accessible and resilient!</div>
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/contact-us`} className="p-0">
                            <button className="sustainabilityBannerBtn fs16fwb">Contact us</button>
                        </a>
                    </div>
                    <Image
                        src={isDesktop ? bannerGif : bannerGifMob}
                        width={isDesktop ? 500 : 390}
                        height={isDesktop ? 560 : 375}
                        className="sustainabilityBannerGif"
                        alt="banner-gif"
                    />
                </div>
            </div>
        </>
    )
}

export default BannerSustainabilityPolicy;