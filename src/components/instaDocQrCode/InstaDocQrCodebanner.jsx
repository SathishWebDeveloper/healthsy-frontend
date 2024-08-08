import Image from "next/image"

const InstaDocQrCodebanner = ({
    title = "",
    sub_title = "",
    QRCodeBanner = [],
    bannerImage = "",
    className = "",
    fontClassName = "",
}) => {

    const sidePointerImage = "/assets/Pills.svg"

    return (
        <>
            <div className={`${className} instaDocQrCodeBanner bg-primary position-relative`}>
                <div className={`${fontClassName} fs48m24fw800 instaQrBannerTitle`}>
                    {title}
                </div>
                <div className="fs18m13fw500 instaQrBannerSubTitle">
                    {sub_title}
                </div>
                <Image src={sidePointerImage} alt="sidePointerImage" width="191" height="89" className="instaDocBannerImage" />
                <div className="QRcodeBanner flexCenter">
                    {QRCodeBanner.map((data, idx) => {
                        return (
                            <div key={idx} className="flexCenter instaDocSubDes">
                                <Image src={data.image} alt="image" width="18" height="18" className="qrCodeTickImage"></Image>
                                <div className="qrCodeBannerTitle fs18m15">{data.title}</div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Image src={bannerImage} alt="bannerImage" width="439" height="514" className="qrCodeBannerImage" />
                </div>
                <Image src={sidePointerImage} alt="sidePointerImage" width="245" height="114" className="qrCodePointerImage" />
            </div>
        </>
    )
}

export default InstaDocQrCodebanner;