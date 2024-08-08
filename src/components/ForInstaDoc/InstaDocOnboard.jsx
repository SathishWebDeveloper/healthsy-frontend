import Image from "next/image";
import DownloadBtn from "../Common/DownloadBtn";

const instaDocOnboardImg = "/assets/instaDoc/insta-onboard.webp"

const InstaDocOnboard = ({ setDownloadModal, setAndroidLogo }) => {
  return (
    <div className="instaDocOnboardWrapper container">
      <div className="instaDocOnboard">
        <div className="formOnboardTitle fs40m24fwb">Get ‘InstaDoc’ app now</div>
        <div className="formOnboardDesc fs18m16">Manage your profession seamlessly on the go!</div>
        <DownloadBtn
          setDownloadModal={setDownloadModal}
          btnClassName={"getStartedBtn fs24m16fwb"}
          pageName="for-insta-doc"
          instaDocApk={true}
          setAndroidLogo={setAndroidLogo}
        />
      </div>
      <Image
        src={instaDocOnboardImg}
        width={294}
        height={424}
        alt="instaDocOnboardImg"
        className="instaDocOnboardImg"
      />
    </div>
  );
};

export default InstaDocOnboard;
