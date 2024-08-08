import Image from "next/image";
import DownloadBtn from "./DownloadBtn";

const FormLandingOnboard = ({
  title = "",
  desc = "",
  mobTitle = "",
  mobDesc = "",
  getStartedLink = "#",
  pageName = "",
  onClickDownload = () => { }
}) => {
  return (
    <div className="container">
      <div className="formLandingOnboard">
        <div className="getOnboardContent">
          <div className="formOnboardTitle desktopContent fs36m24fwb">{title}</div>
          <div className="formOnboardDesc desktopContent">{desc}</div>
          <div className="formOnboardTitle mobContent fs36m24fwb">{mobTitle}</div>
          <div className="formOnboardDesc mobContent">{mobDesc}</div>
        </div>
        <DownloadBtn setDownloadModal={onClickDownload} btnClassName={"getStartedBtn"} pageName={pageName} />
      </div>
    </div>
  );
};

export default FormLandingOnboard;
