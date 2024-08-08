import React, { useState, useEffect, useMemo } from "react";
import App from "next/app";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import parse from "html-react-parser";

import "../styles/index.scss";
import "../styles/globals.css";
import DownloadModal from "../src/components/Common/downloadModal";
import Header from "../src/components/Layouts/Header/Header";
import Footer from "../src/components/Layouts/Footer/Footer";

function MyApp({ Component, pageProps, pageMetaData, siteMapSettings }) {
  const router = useRouter();
  const { pathname, asPath } = router;
  const [downloadModal, setDownloadModal] = useState(false);
  const [bannerQrImg, setBannerQrImg] = useState("");
  const [androidLogo, setAndroidLogo] = useState(false);
  const nonCustomHeaders =
    [
      "/for-doctors/book-demo",
      "/join-us",
      "/healthsy-life",
      "/for-doctors",
      "/for-retail-pharmacies",
      "/for-home-healthcare-service-providers",
      "/others-registration",
      "/blogs",
      "/home-healthcare-services/physiotherapy",
      "/home-healthcare-services/physiotherapy/physiotherapy-mumbai",
      "/for-insta-doc",
      "/ad-landing-page-partners-doctors",
      "/ad-landing-page-partners-doctors/register",
      "/ad-landing-page-partners-doctors/thank-you",
      "/adv-landing-terms",
      "/adv-landing-privacy",
      "/rp-qr-instadoc/[id]",
      "/instadoc-android-app-for-doctors",
      "/rp-qr-instadoc/thank-you",
      "/ad-landing-page-users-general/register",
      "/ad-landing-page-users-general/thank-you",
      "/ad-landing-page-users-general",
      "/franchise-programme",
      "/for-doctors/register-your-interest",
      "/for-doctors/thank-you",
      "/for-retail-pharmacies/thank-you",
      "/for-retail-pharmacies/register-your-interest",
      "/for-home-healthcare-service-providers/thank-you",
      "/for-home-healthcare-service-providers/register-your-interest",
      "/online-doctor-consultations/[specialization]",
      "/online-doctor-consultations/health-concern/[slug]",
      "/online-doctor-consultations/[specialization]/[doctor_profile]",
      "/in-clinic-appointments/[city_slug]/[slug_level_2]",
      "/in-clinic-appointments/[city_slug]/[slug_level_2]/[slug_level_3]",
      "/in-clinic-appointments/[city_slug]/[slug_level_2]/[slug_level_3]/[slug_level_4]",
      "/for-insta-doc/thank-you",
      "/for-insta-doc/register-your-interest",
      "/[id]/-my-pharmacy-ratings",
      "/rp-qr-ratings/thank-you",
      "/doctor-listing",
      "/doctor-details",
    ].includes(pathname) || pathname.includes("career-detail");
  const nonCustomFooters = [
    "/ad-landing-page-partners-doctors",
    ,
    "/ad-landing-page-partners-doctors/register",
    "/ad-landing-page-partners-doctors/thank-you",
    "/adv-landing-terms",
    "/adv-landing-privacy",
    "/rp-qr-instadoc/[id]",
    "/rp-qr-instadoc/thank-you",
    "/instadoc-android-app-for-doctors",
    "/ad-landing-page-users-general/register",
    "/ad-landing-page-users-general/thank-you",
    "/ad-landing-page-users-general",
    "/rp-qr-ratings/thank-you",
    "/rp-qr-ratings/[id]",
    "/[id]/-my-pharmacy-ratings",
  ].includes(pathname);

  const downloadAppTitle = () => {
    if (pathname === "/for-doctors") {
      return "Doctors";
    } else if (pathname === "/for-home-healthcare-service-providers") {
      return "HHSP";
    } else if (pathname === "/for-retail-pharmacies") {
      return "Pharmacy";
    } else if (pathname === "/for-insta-doc") {
      return "InstaDoc";
    } else {
      return "";
    }
  };

  useEffect(() => {
    (async () => {
      try {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_APP_API_URL}site-map-settings/get-file/robots.txt`,
            {
              responseType: "blob",
            }
          )
          .then((response) => {
            const reader = new FileReader();
            reader.readAsText(response.data);
            reader.onload = () => {
              axios.post("/api/robots", { fileContent: reader?.result });
            };
          });
      } catch (error) {
        console.log("robots err", error);
      }

      try {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_APP_API_URL}site-map-settings/get-file/sitemap.xml`,
            {
              responseType: "blob",
            }
          )
          .then((res) => {
            const siteMapReader = new FileReader();
            siteMapReader.readAsText(res.data);
            siteMapReader.onload = () => {
              axios.post("/api/sitemap", {
                fileContent: siteMapReader?.result,
              });
            };
          });
      } catch (err) {
        console.log("sitemap err", err);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        {pageMetaData?.others
          ? parse(pageMetaData?.others)
          : pageMetaData?.registration_others
          ? parse(pageMetaData?.registration_others)
          : null}
        {siteMapSettings[0]?.facebook_pixel_code
          ? parse(siteMapSettings[0]?.facebook_pixel_code)
          : null}
        {siteMapSettings[0]?.others ? parse(siteMapSettings[0]?.others) : null}
        {[
          "/online-doctor-consultations/health-concern/[slug]",
          "/online-doctor-consultations/[specialization]",
          "/online-doctor-consultations/[specialization]/[doctor_profile]",
        ].includes(pathname) ||
        pathname?.includes("all-category-blog") ? null : (
          <>
            <title>
              {pageMetaData?.metaTitle
                ? pageMetaData?.metaTitle
                : "HealthSy | Order Medicines Online, Online Doctor Consultations, Home Healthcare Services, Healthcare Products, In-Clinic Appointments"}
            </title>
            <meta
              name="description"
              content={
                pageMetaData?.metaDescription
                  ? pageMetaData?.metaDescription
                  : "HealthSy in an innovative healthcare platform that prioritises your health over anything else."
              }
            />
            <meta name="keywords" content={pageMetaData?.metaKeywords} />
          </>
        )}
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_WEB_URL}${asPath}`}
        />
      </Head>
      {nonCustomHeaders ? null : (
        <Header
          setDownloadModal={setDownloadModal}
          nonMobCustomHeader={["/blogs"].includes(pathname)}
        />
      )}
      <Component
        {...pageProps}
        setDownloadModal={setDownloadModal}
        setBannerQrImg={setBannerQrImg}
        setAndroidLogo={setAndroidLogo}
      />
      {downloadModal && (
        <DownloadModal
          downloadModal={downloadModal}
          setDownloadModal={setDownloadModal}
          androidLogo={androidLogo}
          setAndroidLogo={setAndroidLogo}
          pathname={pathname}
          downloadAppName={downloadAppTitle()}
          bannerQrImg={bannerQrImg}
          setBannerQrImg={setBannerQrImg}
        />
      )}
      {nonCustomFooters ? null : <Footer />}
    </>
  );
}

MyApp.getInitialProps = async (context) => {
  const { router } = context;
  const { pathname } = router;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}meta-tags/list`
    );
    const metalist = res?.data?.rows;
    let pageMetaData = {};

    metalist?.length &&
      Object.keys(metalist[0]).forEach((ele) => {
        if (metalist[0][ele]?.page_name === pathname) {
          pageMetaData = metalist[0][ele];
        } else if (
          pathname.includes(metalist[0][ele]?.page_name) &&
          metalist[0][ele]?.page_name
        ) {
          pageMetaData = metalist[0][ele];
        }
      });

    if (!pageMetaData?.metaTitle) {
      pageMetaData = metalist?.length && metalist[0].common_page;
    }

    const res2 = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_API_URL}site-map-settings/list`
    );
    const siteMapSettings = res2?.data?.rows;

    return { pageMetaData, siteMapSettings };
  } catch (err) {
    console.log("err -", err);
    return { metalist: [] };
  }
};

export default MyApp;
