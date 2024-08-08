import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const successgif = "/assets/success-icon.gif";
const closeIcon = "/assets/home-sidebar-close.svg";
const logo_google_playstore_outline = "/assets/homepage/logo-google-playstore-outline.svg";
const logo_app_playstore_outline = "/assets/appleIcon.svg";

const BookingSuccessModal = ({
    successModal,
    setSuccessModal,
    setBookingModal,
    appCategory = ""
}) => {

    const [activeStatus, setActiveStatus] = useState("")

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: appCategory })
            .then((response) => {
                setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
            });
    }, [])

    const handleClick = async (type) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_APP_API_URL}rating-form/click-count/${id}`,
                { type }
            );
        } catch (error) {
            console.error('Error while tracking click:', error);
        }
    };

    const close = () => {
        setSuccessModal(false)
        setBookingModal(false)
    }

    return (
        <>
            <Modal
                show={successModal}
                dialogClassName=""
                className='ctaSuccessModalContainer'
                centered
                onHide={() => close()}
            >
                <div className="modal-body text-center ctaSuccessModalSection bookingSuccessModal">
                    <div className="d-flex justify-content-end">
                        <Image
                            src={closeIcon}
                            width={21}
                            height={21}
                            alt="Close Icon"
                            className="ctaCloseIcon"
                            onClick={() => close()}
                        />
                    </div>
                    <img src={successgif} alt="successgif" className="success-gif-img" />
                    <div className="text-center bookingSuccessModelThanks fs24m20fwb">Thank You ! </div>
                    <div className="fs18m15fw500">Our team will revert back shortly </div>
                    <div className="fs16m13fw500 bookingDownloadApp">Download ‘HealthSy App’</div>
                    <Link href={activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"} target="_blank">
                        <button className="healthSyDownloadBtn" onClick={() => handleClick("android")}>
                            <span className="fs16fwb">Google Play</span>
                            <Image src={logo_google_playstore_outline} width={15} height={16} className="healthSyPlayStore" alt='Play store' />
                        </button>
                    </Link>
                    <Link href={activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"} target="_blank">
                        <button className="healthSyDownloadBtn healthSyAppleStore" onClick={() => handleClick("ios")}>
                            <span className="fs16fwb">App Store</span>
                            <Image src={logo_app_playstore_outline} width={16} height={16} className="healthSyPlayStore" alt='apple store' />
                        </button>
                    </Link>
                </div>
            </Modal>
        </>
    );
};

export default BookingSuccessModal;