import axios from "axios";
import parse from "html-react-parser";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

import apiCall from "../../../../../src/api";
import Breadcrumb from "../../../../../src/components/Common/breadcrumb";
import MobileSearchField from "../../../../../src/components/Common/mobileSelectField";
import DoctorDetails from "../../../../../src/components/DoctorListing/DoctorDetails";
import InclinicDoctorsList from "../../../../../src/components/DoctorListing/InclinicDoctorsList";
import Page404 from "../../../../../src/components/Fallback/404";
import useIsDesktop from "../../../../../src/components/Hooks/useIsDesktop";
import InclinicDoctorListBanner from "../../../../../src/components/InclinicDoctorListing/InclinicDoctorListBanner";
import FormPageHeader from "../../../../../src/components/Layouts/Header/FormPageHeader";
import { convertToTitleCase } from "../../../../../src/constants";

const InclinicDoctorProfile = ({ records, pageType, metaRecord = {}, ...props }) => {
  const {
    query: { city_slug, slug_level_2, slug_level_3 },
  } = useRouter();
  const [selectTagValue, setselectTagValue] = useState(true);
  const isDesktop = useIsDesktop();

  const handleChange = () => {
    setselectTagValue(() => !selectTagValue);
  };
  // useEffect(() => {
  //   // Use replace to trigger full page reload on component mount
  //   replace(window.location.pathname);
  // }, []);

  if (pageType === "specialization" || pageType === "symptoms") {
    return selectTagValue ? (
      <div>
        <Head>
          <title>{metaRecord?.meta_title}</title>
          <meta name="description" content={metaRecord?.meta_description} />
          <meta name="keywords" content={metaRecord?.meta_keyword} />
          {metaRecord?.others ? parse(metaRecord?.others) : null}
        </Head>
        <FormPageHeader setDownloadModal={props?.setDownloadModal} />
        <Breadcrumb
          className="inClinicAppointmentsBreadcrumb"
          Href={'/in-clinic-appointments'}
          breadcrumbText="In-Clinic Appointments"
          nestedLevel={true}
          nestedBreadcrumbText={convertToTitleCase(city_slug)}
          nestedLevelTwo={true}
          nestedBreadcrumbTextTwo={convertToTitleCase(slug_level_2)}
          nestedLevelHrefFour={"#"}
          nestedBreadcrumbTextFour={convertToTitleCase(slug_level_3)}
        />
        <InclinicDoctorListBanner
          city_slug={city_slug}
          locality_slug={slug_level_2}
          slug_level_2={slug_level_3}
          handleChange={handleChange}
        />
        <InclinicDoctorsList inClinic={"inClinic"} records={records} pageType={pageType} />
      </div>) : (
      <div className="search_field_mobileContainer">
        <div className="expanding-container expanded">
          {/* <p>covers entire page</p> */}
          <MobileSearchField
            handleChange={handleChange}
            isDesktop={isDesktop}
            city_slug={city_slug}
            locality_slug={slug_level_2}
            slug_level_2={slug_level_3}
          />
        </div>
      </div>
    )
  }
  return records?._id ? (
    <>
      <Head>
        <title>{records?.meta_title}</title>
        <meta name="description" content={records?.meta_description} />
        <meta name="keywords" content={records?.meta_keyword} />
        {records?.others ? parse(records?.others) : null}
      </Head>
      <FormPageHeader setDownloadModal={props?.setDownloadModal} />
      <Breadcrumb
        className="DoctorConsultationBreadCrumbs"
        breadcrumbText="In-clinic-appointments"
        nestedLevel={true}
        nestedBreadcrumbText={convertToTitleCase(city_slug)}
        nestedLevelTwo={true}
        nestedBreadcrumbTextTwo={convertToTitleCase(slug_level_2)}
        nestedLevelThree={true}
        nestedBreadcrumbTextThree={records?.doctor_name}
        Href="/in-clinic-appointments"
        nestedLevelHref={`/in-clinic-appointments/${slug_level_2}`}

      //work on here

      //   nestedLevelTwo={true}
      //   nestedBreadcrumbTextTwo={doctorDetail?.doctor_name}
      />
      <DoctorDetails
        doctor_profile={slug_level_3}
        specialization={slug_level_2}
        doctorDetail={records}
        inClinic={true}
        isProfileCard={true}
      />
    </>
  ) : (
    <Page404 />
  );
};
export default InclinicDoctorProfile;

export async function getServerSideProps({ params, query }) {
  try {
    let records = []
    let metaRecord = {}
    if (query?.type === "specialization") {
      records = await apiCall("partnered-doctor/list", "POST", {
        city_slug: query.city_slug,
        locality_slug: query.slug_level_2,
        specialization: query.slug_level_3,
        profile_mode: "InClinic",
        populateClinics: true,
        getSplMeta: true
      })
      metaRecord = records?.data?.metaRecord ?? {};
      records = records?.data?.rows ?? []
    } else if (query.type === "symptoms") {
      try {
        records = await apiCall("partnered-doctor/list", "POST", {
          locality_slug: query.slug_level_2,
          city_slug: query.city_slug,
          symptom: query.slug_level_3,
          profile_mode: "InClinic",
          populateClinics: true,
          getSplMeta: true
        })
        metaRecord = records?.data?.metaRecord ?? {};
        records = records?.data?.rows ?? []
      } catch (err) {
        console.log('err while getting the partnered doctor list -', err);
      }
    } else {
      records = await axios.get(
        `${process.env.NEXT_PUBLIC_APP_API_URL}partnered-doctor/get-doctor-details/${params?.slug_level_3}`
      );
      records = records?.data
    }

    return {
      props: {
        records,
        pageType: query?.type ?? "doctor",
        metaRecord
        // doctorDetail: doctorDetail?.data ?? {} 
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        doctorDetail: {},
      },
    };
  }
}
