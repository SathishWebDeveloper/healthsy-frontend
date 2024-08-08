import Image from "next/image";

const closeIcon = "/assets/home-sidebar-close.svg";
const callCardBanner = "/assets/franchise/call-card-banner.png";

const CallCard = ({ setCallCard, setCallModel }) => {

  return (
    <div className="callCardWrapper desktopContent">
      <div className="position-relative">
        <Image
          src={closeIcon}
          width={15}
          height={15}
          alt="close icon"
          className="closeIcon cursor-pointer"
          onClick={() => setCallCard(false)}
        />
        <Image
          src={callCardBanner}
          width={350}
          height={178}
          className="cursor-pointer"
          alt="Call Card Banner"
          onClick={() => setCallModel(true)}
        />
      </div>
    </div>
  );
};

export default CallCard;