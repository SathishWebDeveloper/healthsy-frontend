import parse from "html-react-parser";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

import apiCall from "../../../../src/api";
import Breadcrumb from "../../../../src/components/Common/breadcrumb";
import MobileSearchField from "../../../../src/components/Common/mobileSelectField";
import InclinicDoctorsList from "../../../../src/components/DoctorListing/InclinicDoctorsList";
import Page404 from "../../../../src/components/Fallback/404";
import useIsDesktop from "../../../../src/components/Hooks/useIsDesktop";
import InclinicLocationSpclBanner from "../../../../src/components/InclinicDoctorListing/InclinicDoctorListBanner";
import FormPageHeader from "../../../../src/components/Layouts/Header/FormPageHeader";
import { convertToTitleCase } from "../../../../src/constants";

const DoctorFilteredData = ({ records, pageType, metaRecord = {}, ...props }) => {
  const {
    query: { city_slug, slug_level_2 }
  } = useRouter();
  const navigate = useRouter().push;
  const isDesktop = useIsDesktop();
  const [selectTagValue, setselectTagValue] = useState(true);
  const handleChange = () => {
    setselectTagValue(() => !selectTagValue);
  };

  return (pageType ?
    <>
      {selectTagValue ? (
        <>
          <Head>
            <title>{metaRecord?.meta_title}</title>
            <meta name="description" content={metaRecord?.meta_description} />
            <meta name="keywords" content={metaRecord?.meta_keyword} />
            {metaRecord?.others ? parse(metaRecord?.others) : null}
          </Head>
          <FormPageHeader setDownloadModal={props?.setDownloadModal} />
          <Breadcrumb
            className="inClinicAppointmentsBreadcrumb"
            Href={"/in-clinic-appointments"}
            breadcrumbText="In-Clinic Appointments"
            nestedLevel={true}
            nestedBreadcrumbText={convertToTitleCase(city_slug)}
            nestedLevelTwo={true}
            nestedBreadcrumbTextTwo={convertToTitleCase(slug_level_2)}
          />
          <InclinicLocationSpclBanner
            city_slug={city_slug}
            slug_level_2={slug_level_2}
            handleChange={handleChange}
          />
          <InclinicDoctorsList
            inClinic={"inClinic"}
            records={records}
            pageType={pageType}
          />
        </>
      ) : (
        <>
          <div className="search_field_mobileContainer">
            <div className="expanding-container expanded">
              {/* <p>covers entire page</p> */}
              <MobileSearchField
                handleChange={handleChange}
                isDesktop={isDesktop}
                city_slug={city_slug}
                slug_level_2={slug_level_2}
              />
            </div>
          </div>
        </>
      )}
    </> : <Page404 />
  );
};
export default DoctorFilteredData;

export async function getServerSideProps({ params, query }) {
  try {
    let records = [];
    let metaRecord = {}
    if (query.type === "specialization") {
      try {
        records = await apiCall("partnered-doctor/list", "POST", {
          city_slug: query.city_slug,
          specialization: query.slug_level_2,
          profile_mode: "InClinic",
          populateClinics: true,
          getSplMeta: true
        });
        metaRecord = records?.data?.metaRecord ?? {};
        records = records?.data?.rows ?? [];
      } catch (err) {
        console.log("err while getting the partnered doctor list -", err);
      }
    } else if (query.type === "symptoms") {
      try {
        records = await apiCall("partnered-doctor/list", "POST", {
          city_slug: query.city_slug,
          symptom: query.slug_level_2,
          profile_mode: "InClinic",
          populateClinics: true,
          getSplMeta: true
        });
        metaRecord = records?.data?.metaRecord ?? {};
        records = records?.data?.rows ?? [];
      } catch (err) {
        console.log("err while getting the partnered doctor list -", err);
      }
    }
    return {
      props: { records, pageType: query?.type ?? null, metaRecord },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        records: {},
      },
    };
  }
}
