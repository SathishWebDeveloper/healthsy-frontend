import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
const closeIcon = "/assets/icons/circle-close-icon.svg";
const rightArrow = "/assets/circle-right-arrow.png";
const leftArrow = "/assets/circle-left-arrow.png";

function MyVerticallyCenteredModal(props) {
  const [count, setCount] = useState(0);
  const getsrcValue = (value) => {
    // if (typeof value === "string" && value.length)
    return process.env.NEXT_PUBLIC_APP_API_URL + "clinic-profile/" + value;
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="photoviewModal"
    >
      <Image
        src={closeIcon}
        width={30}
        height={30}
        alt="Close Icon"
        className="clinicCloseIcon"
        onClick={props?.onHide}
      />
      <Modal.Body>
        <Image
          src={leftArrow}
          width={35}
          height={35}
          alt="Close Icon"
          className={`prevArrowIcon ${count === 0 && "Arrow-notAllowed"}`}
          onClick={() => count > 0 && setCount((prev) => prev - 1)}
        />

        <img
          src={getsrcValue(props?.clinicImages[count])}
          alt="Close Icon"
          className="clinicProfileReviewImg"
        />
        <Image
          src={rightArrow}
          width={35}
          height={35}
          alt="Close Icon"
          className={`nextArrowIcon ${
            count === props?.clinicImages?.length - 1 && "Arrow-notAllowed"
          }`}
          // className='nextArrowIcon'
          onClick={() =>
            count < props?.clinicImages.length - 1 &&
            setCount((prev) => prev + 1)
          }
        />
      </Modal.Body>
    </Modal>
  );
}

import React, { useState } from "react";
import Image from "next/image";

const ViewPhotoModal = ({
  openPhotoModal,
  setopenPhotoModal,
  clinicImages,
}) => {
  return (
    <>
      <MyVerticallyCenteredModal
        show={openPhotoModal}
        onHide={() => setopenPhotoModal(false)}
        clinicImages={clinicImages}
      />
    </>
  );
};
export default ViewPhotoModal;
