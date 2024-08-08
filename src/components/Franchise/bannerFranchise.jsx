import Image from "next/image";

const franchiseBanner = "/assets/franchise/franchiseBanner.webp"
const franchiseMobBanner = "/assets/franchise/franchiseMobBanner.webp"
const bannerTick = "/assets/franchise/banner-tick.svg"
const whiteLogo = "/assets/white-logo.svg"

const bannerPoints = [
    { text: "Easy set-up" },
    { text: "Minimum Investment" },
    { text: "Branded Pharmacy" },
];

const bannerFranchise = () => {
    return (
        <>
            <div className="bannerFranchiseSections">
                <div className="desktopContent">
                    <Image
                        src={franchiseBanner}
                        fill
                        className="franchiseBannerImg"
                        alt="Franchise Banner" />
                </div>
                <div className="mobContent">
                    <Image
                        src={franchiseMobBanner}
                        fill
                        className="franchiseBannerImg"
                        alt="Franchise Mobile Banner" />
                </div>
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`} className="p-0">
                    <Image
                        src={whiteLogo}
                        width={170}
                        height={46}
                        alt="white-logo"
                        className="franchiseWhiteLogo"
                    />
                </a>
                <div className="franchiseBannerText flexColumnCenter w-100">
                    <h1 className="text-white fs48m26fw800"><span className="primaryColor">HealthSy</span> Retail Pharmacies Franchise Programme</h1>
                    <div className="d-flex franchiseBannerPointsWrapper">
                        {
                            bannerPoints.map((val, ind) => {
                                return (
                                    <div className="flexAlignCenter franchiseBannerPoint" key={ind}>
                                        <Image
                                            src={bannerTick}
                                            height={16}
                                            width={16}
                                            alt="tick"
                                            className="franchiseBannerTick"
                                        />
                                        <span className="text-white franchiseBannerPointTxt fs18m16fwb">{val.text}</span>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <a href="#franchise-programme-form" className="p-0">
                        <button className="franchiseBannerBtn bg-primary text-white fs18m16fwb">Register Now</button>
                    </a>
                </div>
            </div>
        </>
    )
}

export default bannerFranchise;