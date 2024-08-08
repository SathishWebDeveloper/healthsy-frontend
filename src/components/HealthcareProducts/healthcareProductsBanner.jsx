import { useEffect, useState } from "react";
const arrowleft = "/assets/arrow-left.svg";
const home = "/assets/home-icon.svg";
const QRcode = "/assets/qrCode/products-banner-qr.png";
const bag = "/assets/healthcareProducts/heroSlider/Bag.webp";
const pampers = "/assets/healthcareProducts/heroSlider/Pampers.webp";
const odonil = "/assets/healthcareProducts/heroSlider/Odonil.webp";
const multiVitamin = "/assets/healthcareProducts/heroSlider/multi-vitamin.webp";
const pediaSure = "/assets/healthcareProducts/heroSlider/Pedia-Sure.webp";
const vicks = "/assets/healthcareProducts/heroSlider/Vicks.webp";
const durex = "/assets/healthcareProducts/heroSlider/Durex.webp";
const neemFaceWash = "/assets/healthcareProducts/heroSlider/neem-face-wash.webp";

const Splash1 = "/assets/healthcareProducts/heroSlider/Splash/Splash1.svg";
const Splash2 = "/assets/healthcareProducts/heroSlider/Splash/Splash2.svg";
const Splash3 = "/assets/healthcareProducts/heroSlider/Splash/Splash3.svg";
const Splash4 = "/assets/healthcareProducts/heroSlider/Splash/Splash4.svg";
const Splash5 = "/assets/healthcareProducts/heroSlider/Splash/Splash5.svg";
const Splash6 = "/assets/healthcareProducts/heroSlider/Splash/Splash6.svg";

const HealthCareProductsBanner = () => {

    const images = [
        { src: pampers, zoomed: false, className: 'healthcareProductsPampersImg' },
        { src: odonil, zoomed: false, className: 'healthcareProductsOdonilImg' },
        { src: multiVitamin, zoomed: false, className: 'healthcareProductsMultiVitaminImg' },
        { src: pediaSure, zoomed: false, className: 'healthcareProductsPediaSureImg' },
        { src: vicks, zoomed: false, className: 'healthcareProductsVicksImg' },
        { src: durex, zoomed: false, className: 'healthcareProductsDurexImg' },
        { src: neemFaceWash, zoomed: false, className: 'healthcareProductsNeemFaceWashImg' },

    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(currentIndex => (currentIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="HealthCareProductsBannerContainer ">
            <div className="padding-section consultationBreadcrumb container pt-3">
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                    <img src={home} alt="home" />
                </a>{" "}
                <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
                <a href="#"> Healthcare Products </a>
            </div>
            <div className="healthcareProductsBannerContent container d-flex justify-content-between align-items-start mt-5">
                <div className="healthcareProductsContentWrapper">
                    <h1 className="healthcareProductsBannerFirstContent">
                        Buy Healthcare Products on <span> HealthSy </span>
                    </h1>
                    <div className="healthcareProductsBannerSecondContent mt-4">
                        Widest range and Attractive prices
                    </div>
                    <div className="healthcareProductsBannerButton mt-5 mb-5">
                        <button className="btn btn-learnMore">Get started</button>
                    </div>
                    <div className="QRcodeWrapper d-flex align-items-center w-100 pb-5">
                        <div className="QRcode">
                            <img src={QRcode} alt='QR code'></img>
                        </div>
                        <div className="QRcodeContent ms-4">
                            Scan the QR code to download the HealthSy App
                        </div>
                    </div>
                </div>
                <div className="healthcareProductsBannerImageContainer position-relative ">
                    <img src={bag} className="healthcareProductsBagImg position-absolute " alt='Bag'></img>
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            className={`productImage ${currentIndex === index ? 'zoom-in' : 'zoom-out'} ${image.className} position-absolute `}
                            alt="image"
                        />
                    ))}
                    <img src={Splash1} className="healthcareProductsSplash1Img position-absolute" alt='Splash1'></img>
                    <img src={Splash2} className="healthcareProductsSplash2Img position-absolute " alt='Splash2'></img>
                    <img src={Splash3} className="healthcareProductsSplash3Img position-absolute " alt='Splash3'></img>
                    <img src={Splash4} className="healthcareProductsSplash4Img position-absolute " alt='Splash4'></img>
                    <img src={Splash5} className="healthcareProductsSplash5Img position-absolute" alt='Splash5'></img>
                    <img src={Splash6} className="healthcareProductsSplash6Img position-absolute " alt='Splash6'></img>
                </div>
            </div>
        </div>
    )
}
export default HealthCareProductsBanner