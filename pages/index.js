import { useState, useEffect } from "react";
import axios from "axios";

import Ordering from "../src/components/Home/Ordering/Ordering";
import HomeHealthCare from "../src/components/Home/HomeHealthCare/HomeHealthCare";
import Appointments from "../src/components/Home/Appointments/Appointments";
import Consultation from "../src/components/Home/Consultation/Consultation";
import Instadoc from "../src/components/Home/InstaDoc/Instadoc";
import ScrolltoTop from '../src/components/ScrollToTop/ScrolltoTop'
import Articles from '../src/components/Home/Articles/Articles'
import WidestRange from "../src/components/Home/widestRange/widestRange";
import CTAMobileFooter from "../src/components/Common/ctaMobileFooter";
import AdvantagesOfSubscription from "../src/components/Home/AdvantagesOfSubscription"
import HealthsyPlusMembership from "../src/components/Home/HealthsyPlusMembership";
import InstaDocApp from "../src/components/InstaDoc/InstaDocApp";
import Medicine from "../src/components/UserGeneralWeb/Medicine";
import HomeBanner from "../src/components/Home/HomeBanner";

const QrImg = "/assets/qrCode/home-bottom-qr.png";

const HomePage = (props) => {
  const [showCTAcard, setShowCTAcard] = useState(true);
  const [activeStatus, setActiveStatus] = useState("")

  useEffect(() => {
    // todo add condition for unwanded pages 
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: "user-app" })
      .then((response) => {
        setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
      });
  }, [])

  const isiOS = () => {
    const iOS = /iPhone|iPad|iPod|Macintosh/i.test(global?.navigator?.userAgent);
    if (iOS) {
      return activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"
    } else {
      return activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"
    }
  }

  return (
    <>
      <ScrolltoTop />
      <HomeBanner
        isiOS={isiOS}
        setDownloadModal={props.setDownloadModal}
        setBannerQrImg={props.setBannerQrImg}
      />
      <Medicine
        className="homePageMedicine"
        titleFontStyle="fs40m24fwb"
        medicalServiceFontStyle="fs18m14fw600"
      />
      <Ordering />
      <AdvantagesOfSubscription />
      <Consultation />
      <WidestRange />
      <Appointments />
      <HomeHealthCare />
      <HealthsyPlusMembership />
      <Instadoc />
      <Articles />
      <InstaDocApp
        subTitle="Get all your recurring and immediate healthcare needs sorted"
        instaDoc="instaDocContentWrapper"
        className="homeInstaDoc"
        QrImg={QrImg}
      />
      {showCTAcard && (
        <CTAMobileFooter
          ctxBannerText="Download our app to experience our services"
          setShowCTAcard=
          {setShowCTAcard}
          isLink={true}
          hrefValue={isiOS}
        />)}
    </>
  )
}

export default HomePage

// todo
// export async function getServerSideProps() {
//     try {
//         const fetchAppLinks = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: "user-app" })

//         return {
//             props: {
//                 appLinks: fetchAppLinks?.data?.rows.filter((userAppLink) => userAppLink?.active)
//             }, // will be passed to the page component as props
//         }
//     } catch (error) {
//         console.error(error);
//         return { props: { appLinks: [] } };
//     }
// }