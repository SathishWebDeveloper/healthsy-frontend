import { Modal } from "react-bootstrap";
import Image from "next/image";

const closeIcon = "/assets/icons/circle-close-icon.svg";

const CallModel = ({ callModel, setCallModel }) => {
  return (
    <>
      <Modal
        show={callModel}
        dialogClassName=""
        className="callModelContainer"
        centered
        onHide={() => setCallModel(false)}
      >
        <div className="callModelWrapper">
          <div className="border-0">
            <div className="d-flex justify-content-between align-items-baseline">
              <label className={`fs19m18mfwb callModelLabel`}>
                Phone number
              </label>
              <Image
                src={closeIcon}
                width={30}
                height={30}
                alt="Close Icon"
                className="cursor-pointer"
                onClick={() => setCallModel(false)}
              />
            </div>
            <div className={`callModelNumber primaryColor fs24m26fwb`}>07603-944039</div>
            <div className="fs19m16">Call our pharmacy franchise onboarding team now!</div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CallModel;