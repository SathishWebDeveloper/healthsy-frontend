import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "react-bootstrap";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const closeIcon = "/assets/home-sidebar-close.svg";
const QRcode = "/assets/qrCode/userQR.png";
const pharmaciesQR = "/assets/qrCode/pharmacy-bottom-qr.png";
const doctorQR = "/assets/qrCode/doctor-bottom-qr.png";
const homeBannerQR = "/assets/qrCode/home-banner-qr.png";
const consultaionBannerQR = "/assets/qrCode/online-consulation-banner-qr.png";
const inClinicQR = "/assets/qrCode/in-clinic-qr.png";
const HHSQR = "/assets/qrCode/hhs-qr.png";
const HHSPQR = "/assets/qrCode/hhsp-bottom-qr.png";
const instaDocQR = "/assets/qrCode/instadoc-bottom-qr.png";
const apple = "/assets/apple.svg";
const playstore = "/assets/google_playstore.svg";
const instaDocAndroid = "/assets/instaDoc/InstaDoc_Android.svg";
// const instaDocWebApk = "https://healthsy.app/for-instadoc-partners-andriod-app";
const instaDocWebApk = "https://healthsy.app/assets/apk/instadoc.apk";

const DownloadModal = ({
    downloadAppName,
    downloadModal,
    setDownloadModal,
    pathname = "/",
    bannerQrImg,
    setBannerQrImg,
    androidLogo,
    setAndroidLogo,
}) => {

    const navigate = useRouter().push

    const [activeStatus, setActiveStatus] = useState("")

    const getCategoty = () => {
        if (pathname === "/for-doctors") {
            return "doctor-app"
        } else if (pathname === "/for-home-healthcare-service-providers") {
            return "home-healthcare-app"
        } else if (pathname === "/for-retail-pharmacies") {
            return "pharmacy-app"
        } else {
            return "user-app"
        }
    }

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: getCategoty() })
            .then((response) => {
                setActiveStatus(response.data.rows.filter((appLink) => appLink.active))
            });
    }, [])

    const QRImage = () => {
        if (pathname === "/for-doctors") {
            return doctorQR
        } else if (pathname === "/for-home-healthcare-service-providers") {
            return HHSPQR
        } else if (pathname === "/for-retail-pharmacies") {
            return pharmaciesQR
        } else if (pathname === "/for-insta-doc") {
            return instaDocQR
        } else if (pathname === "/" && (bannerQrImg === "home")) {
            return homeBannerQR
        } else if (pathname === "/online-doctor-consultations" && (bannerQrImg === "online-consultaion")) {
            return consultaionBannerQR
        } else if (pathname === "/in-clinic-appointments" && (bannerQrImg === "in-clinic-appointment")) {
            return inClinicQR
        } else if (pathname === "/home-healthcare-services" && (bannerQrImg === "home-healthcare-service")) {
            return HHSQR
        } else {
            return QRcode
        }
    }

    const onModalClose = () => {
        setBannerQrImg("")
        setDownloadModal(false)
        setAndroidLogo(false)
    }

    return (
        <Modal
            show={downloadModal}
            dialogClassName=""
            className="downloadModalContainer"
            centered
            onHide={() => onModalClose()}
        >
            <div className="wholeConatiner">
                <div className="d-flex justify-content-end p-3 ">
                    <div className=" closeIcone flexCenter cursor-pointer">
                        <img src={closeIcon} onClick={() => onModalClose()}></img>
                    </div>
                </div>
                <div className="qrcodeWrapper flexCenter flex-column">
                    <div className="text-center mt-5">
                        <Image src={QRImage()} width={256} height={256} alt="QR code" />
                    </div>
                    <div className="qrcodeContent mt-4">
                        Scan the QR code to download the {downloadAppName} app
                    </div>
                    {androidLogo ? (
                        <div className="mt-4 mb-3">
                            <Link href={instaDocWebApk} target="_blank">
                                <Image src={instaDocAndroid} width={64} height={64} alt="instaDocAndroidImg" />
                            </Link>
                        </div>
                    ) : (
                        <div className="app d-flex container mt-4 mb-3">
                            {pathname !== "/for-retail-pharmacies" && <div className="appleIcon flexCenter">
                                <Link href={activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"} target="_blank">
                                    <Image src={apple} width={64} height={64} alt="App store" />
                                </Link>
                            </div>}
                            <div className="playstore flexCenter">
                                <Link href={activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"} target="_blank"><Image src={playstore} width={64} height={64} alt="Play store" /></Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default DownloadModal;
