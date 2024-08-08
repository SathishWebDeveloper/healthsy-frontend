import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const Mockup = "/assets/healthcareProducts/Mockup.webp";
const logo_google_playstore_outline = "/assets/homepage/logo-google-playstore-outline.svg";
const logo_app_playstore_outline = "/assets/homepage/logo-app-playstore-outline.svg";

const HealthcareProductsStep = () => {

  const [activeStatus, setActiveStatus] = useState("")

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: "user-app" })
      .then((response) => {
        setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
      });
  }, [])

  return (
    <div
      className={`bookingStep1 healthcareProductStepContainer m-5 mb-0 py-4 pb-0 d-flex justify-content-around align-items-center flex-row`}
    >
      <div className="bookingStep1ContentWrapper mb-5">
        <div className="healthcareProductStepTitle mb-4">
          Get all your Healthcare and <h2 class="healthcareProductStepTitle d-inline"> Wellness Products</h2> with HealthSy
        </div>
        <div className="healthcareProductStepExplanation stepExplanation ">
          Available on both iOS & Android
        </div>
        <div className="appLink d-flex justify-content-between align-items-center mt-5">
          <Link href={activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"} target="_blank"><button className="btn px-4 py-3 googlePlayStoreBtn">
            <Image src={logo_google_playstore_outline} width={30} height={32} className="googlePlayStoreImg" alt='Play store' />
            Google Play
          </button></Link>
          <Link href={activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"} target="_blank"><button className="btn px-4 py-3 googleAppStoreBtn">
            <Image src={logo_app_playstore_outline} width={30} height={35} className="googleAppStoreImg" alt='apple store' />
            App Store
          </button></Link>
        </div>
      </div>
      <div className="healthcareProductStepsImageWrapper">
        <img
          src={Mockup}
          className={`healthcareProductStepsImage`}
          alt={`Healthcare products image`}
        ></img>
      </div>
    </div>
  );
};

export default HealthcareProductsStep;
