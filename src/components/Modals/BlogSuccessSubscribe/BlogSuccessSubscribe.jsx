import React, { useEffect, useState } from 'react'
import { Modal } from "react-bootstrap";
const thumbsup = "/assets/homepage/thumbsup.gif"
const closeIcon = '/assets/home-sidebar-close.svg'

// import "./index.css"

const BlogSuccessSubscribe = ({ successModal, setSuccessModal }) => {

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 960px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);

  return (
    <>

      <Modal
        show={successModal}
        dialogClassName="w-100"
        className='downloadModalContainer'
        centered
        onHide={() => setSuccessModal(false)}
      >
        <div className='blogSubscribeContainer'>
          <div className='d-flex justify-content-end p-3 '>
            <div className=' closeIcone flexCenter cursor-pointer'>
              <img src={closeIcon} alt={"closeIcon"} onClick={() => setSuccessModal(false)}></img>
            </div>
          </div>
          <div className='blogsuccessicon'>
            <img src={thumbsup} alt="thumbsup" />
          </div>
          <div className='blogSubscribeWish text-center'>
            Thank You!
          </div>
          <div className='blogSubscribeMessage text-center mt-4 mb-4'>
            {isDesktop ? " You have subscribed successfully" : "Subscribed successfully!"}
          </div>
          {
            !isDesktop &&
            <div className='blog-gohome-mob text-center mb-3'>
              <button>
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`} className=''>
                  Go to Home
                </a>
              </button>
            </div>
          }
        </div>
      </Modal>
    </>
  );
};

export default BlogSuccessSubscribe