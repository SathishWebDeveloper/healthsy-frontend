import Image from "next/image";

const tick = "/assets/tick-img.svg";
const ownFranchiseImg = "/assets/franchise/own-franchise.webp";

const ownFranchisePoints = [
    {
        img: tick,
        imgWidth: 24,
        imgHeight: 24,
        text: "Any person who has the basic computing and business operations knowledge",
        title: "icon"
    },
    {
        img: tick,
        imgWidth: 24,
        imgHeight: 24,
        text: "Any person who has the required investment amount",
        title: "icon"
    },
    {
        img: tick,
        imgWidth: 24,
        imgHeight: 24,
        text: "Any person who is excited and enthusiast about entrepreneurship ",
        title: "icon"
    },
    {
        img: tick,
        imgWidth: 24,
        imgHeight: 24,
        text: "Any person above the age of 21",
        title: "icon"
    },
]

const ownFranchise = () => {
    return (
        <>
            <div className="ownFranchiseWrapper">
                <div className="container ownFranchiseSection position-relative">
                    <div className="d-flex align-items-end ownFranchiseContentWrapper">
                        <div className="ownFranchiseTitle">
                            <h2 className="fs36m24fwb desktopContent">Who can own a HealthSy <span className="primaryColor">Retail Pharmacy Franchise Store :</span></h2>
                            <h2 className="fs36m24fwb mobContent primaryColor text-center">“HealthSy Retail Pharmacy Franchise Store”</h2>
                            {ownFranchisePoints.map((val, ind) => {
                                return (
                                    <div className="flexAlignCenter ownFranchisepts" key={ind}>
                                        <Image
                                            src={val.img}
                                            width={val.imgWidth}
                                            height={val.imgHeight}
                                            alt={val.title}
                                            className="advImg"
                                        />
                                        <div className="content fs18m16fw500">{val.text}</div>
                                    </div>
                                );
                            }
                            )}
                        </div>
                        <div className="">
                            <Image
                                src={ownFranchiseImg}
                                width={466}
                                height={500}
                                alt="Own Franchise Img"
                                className="ownFranchiseImg"
                            />
                        </div>
                        <div className="healthsyFranchiseStore text-white text-center flexJusCenter">
                            <div className="franchiseStoreContentWrapper">
                                <div className="healthsyFranchiseTitle fs36m18fwb">You can be the next person to own a HealthSy Franchise Store</div>
                                <div className="fs20m14 healthsyFranchiseContent">Don’t wait anymore. Start your entrepreneurship journey now</div>
                                <div className="healthsyFranchiseBtn">
                                    <a href="#franchise-programme-form" className="p-0">
                                        <button className="btn fs16fwb primaryColor">Register Now</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ownFranchise;