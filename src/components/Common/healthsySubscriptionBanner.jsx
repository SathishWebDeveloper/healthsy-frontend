import Image from "next/image";
import { useState } from "react";

import DownloadBtn from "./DownloadBtn";

const roundTick = "/assets/icons/round-tick.svg";
const bulb = "/assets/icons/bulb.svg";

const HealthsySubscriptionBanner = ({
    bannerTitle = "",
    bannerListPoints = [],
    bannerclassName = "serviceBannerTwoContent",
    titleClassName = "fs48m30fwb",
    citybanner = "",
    bannerImage,
    mobBannerimage = "",
    webImgClass = "",
    mobImgClass = "d-none",
    wrapperClass = "",
    QRcodeImg = "",
    scanText = "",
}) => {

    const [bookNowForm, setBookNowForm] = useState(false);
    return (
        <div className="bgPrimary position-relative">
            <div className={`serviceBannerTwoWrapper serviceBannerHealthsyTypeTwo ${wrapperClass} container d-flex align-items-center justify-content-between`}>
                <div className={`${bannerclassName}`}>
                    <div className={`${titleClassName} serviceBannerTitle text-white`}>
                        {bannerTitle}
                    </div>
                    <div className="healthSySubscriptionPointList">
                        <div className={`${citybanner} d-flex listPoints flex-wrap`}>
                            {bannerListPoints.map((data, inx) => {
                                return (
                                    <div className={"flexCenter"} key={inx}>
                                        <Image src={roundTick} height={16} width={16} alt="Tick Imag" />
                                        <span className="text-white fs18fw600">{data.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <DownloadBtn
                        setDownloadModal={() => setBookNowForm(true)}
                        btnText={"Download Now"}
                        btnClassName="downloadAppBtn"
                    />
                    <div className="QRcodeWrapper d-flex align-items-center w-100 desktopContent">
                        <div className="QRcode">
                            <Image src={QRcodeImg} alt="QR code" width={94} height={94} />
                        </div>
                        <div className="QRcodeContent QRCodeScanText fs18fwb ms-4 fw-bold text-white">{scanText}</div>
                    </div>
                </div>
                <div className="bannerImgWrapper">
                    <Image
                        src={bannerImage}
                        height={676}
                        width={875}
                        className={`${webImgClass} serviceBannerImgTypeTwo healthsyServiceBannerImg p-0`}
                        alt="service-banner"
                        priority
                    />
                    <Image
                        src={bulb}
                        height={44}
                        width={116}
                        className={`position-absolute chatOne healthsyBulbImg`}
                        alt="service-banner"
                        priority
                    />
                    {mobBannerimage && <Image
                        src={mobBannerimage}
                        height={620}
                        width={675}
                        className={`${mobImgClass}  serviceBannerImgTypeTwo`}
                        alt="service-banner"
                        priority
                    />}
                </div>
            </div>
        </div>
    );
};

export default HealthsySubscriptionBanner;