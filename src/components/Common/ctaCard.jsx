import axios from "axios";
import Image from "next/image";

const closeIcon = "/assets/icons/closeIcon.svg";

const CTACard = ({ setShowCTAcard, setCtaPopupModal, ctaModal }) => {

  const onClickCTABanner = () =>{
    setCtaPopupModal(true)
    if(ctaModal[0]?._id){
      axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}cta-banner/update-banner-click-count/${ctaModal[0]._id}`)
    }
  }
  
  return (
    <div className="ctaBannerImageWrapper desktopContent">
      <div className="position-relative">
        <Image
          src={closeIcon}
          width={8}
          height={8}
          alt="close icon"
          className="bannerCloseIcon"
          onClick={() => setShowCTAcard(false)}
        />
        <img
          src={
            process.env.NEXT_PUBLIC_APP_API_URL +
            "cta-images/" +
            ctaModal[0]?.bannerImage
          }
          // width={350} height={178}
          className="ctaBannerImage"
          alt="CTA Banner"
          onClick={() => onClickCTABanner()}
        />
      </div>
    </div>
  );
};

export default CTACard;
