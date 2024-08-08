import { Modal } from "react-bootstrap";

const closeIcon = "/assets/home-sidebar-close.svg";

const VideoModal = ({ videoModal, setVideoModal }) => {
    return (
        <Modal
            show={videoModal}
            className="videoModalContainer"
            centered
            onHide={() => setVideoModal(false)}
        >
            <div className="wholeConatiner">
                <div className="d-flex justify-content-end p-3 ">
                    <div className=" closeIcone flexCenter cursor-pointer">
                        <img src={closeIcon} onClick={() => setVideoModal(false)}></img>
                    </div>
                </div>
                <div className="flexCenter homeVideoWrapper">
                    <iframe
                        src={`https://player.vimeo.com/video/866249237`}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                    >
                    </iframe>
                </div>
            </div>
        </Modal>
    );
};

export default VideoModal;