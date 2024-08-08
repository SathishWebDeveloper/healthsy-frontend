import { Modal } from "react-bootstrap";
import Image from "next/image";

const successgif = "/assets/thumbs-up.gif";
const closeIcon = "/assets/home-sidebar-close.svg";

const CtaSuccessModal = ({ successModal, setSuccessModal }) => {
    return (
        <>
            <Modal
                show={successModal}
                dialogClassName=""
                className='ctaSuccessModalContainer'
                centered
                onHide={() => setSuccessModal(false)}
            >
                <div className="modal-body text-center ctaSuccessModalSection">
                    <div className="d-flex justify-content-end">
                        <Image
                            src={closeIcon}
                            width={21}
                            height={21}
                            alt="Close Icon"
                            className="ctaCloseIcon"
                            onClick={() => setSuccessModal(false)}
                        />
                    </div>
                    <img src={successgif} alt="successgif" className="success-gif-pict" />
                    <h4 className="text-center ctaSuccessModelThanks">Thank You ! </h4>
                    <p className="ctaSuccessModelText">Our team will revert back shortly </p>
                </div>
            </Modal>
        </>
    );
};

export default CtaSuccessModal;