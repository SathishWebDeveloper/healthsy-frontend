import { Modal } from "react-bootstrap";
const successgif = "/assets/success-icon.gif";

const SuccessModal = ({ successModal, setSuccessModal, onHide = () => setSuccessModal(false) }) => {
    return (
        <>
            <Modal
                show={successModal}
                dialogClassName=""
                className='downloadModalContainer'
                centered
                onHide={onHide}
            >
                <div className='wholeConatiner'>
                    <div className="modal-content modal-content-sm">
                        <div className="modal-body text-center p-90">
                            <img src={successgif} alt="successgif" className="success-gif-pict" />
                            <h4 className="text-center my-4">Registered Successfully</h4>
                            <div className="d-flex justify-content-center">
                                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`} className="btn btn-primary successHomeBtn d-flex align-items-center justify-content-center">
                                    Go to Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SuccessModal;