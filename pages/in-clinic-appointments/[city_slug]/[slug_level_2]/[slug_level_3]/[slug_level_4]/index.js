import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import FormPageHeader from "../../../../../../src/components/Layouts/Header/FormPageHeader";
import Breadcrumb from "../../../../../../src/components/Common/breadcrumb";
import DoctorDetails from "../../../../../../src/components/DoctorListing/DoctorDetails";
import Page404 from "../../../../../../src/components/Fallback/404";
import apiCall from "../../../../../../src/api";
import { convertToTitleCase } from "../../../../../../src/constants";

const InClinicSlugLevel4 = ({records, ...props}) => {
    const {
        query: { city_slug, slug_level_2, slug_level_3, slug_level_4 },
      } = useRouter();
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
            nestedBreadcrumbTextTwo={records.clinic_location.locality}
            nestedLevelThree={true}
            nestedBreadcrumbTextThree={records.inclinic_primary_specialization.inclinic_doctor_specialization}
            Href="/in-clinic-appointments"
            nestedLevelHref={`/in-clinic-appointments/${slug_level_2}`}
            nestedBreadcrumbTextFour={records?.doctor_name}
            nestedLevelHrefFour="#"
    
          //work on here
    
          //   nestedLevelTwo={true}
          //   nestedBreadcrumbTextTwo={doctorDetail?.doctor_name}
          />
          <DoctorDetails
            doctor_profile={slug_level_4}
            specialization={slug_level_3}
            doctorDetail={records}
            inClinic={true}
            isProfileCard={true}
          />
        </>
      ) : (
        <Page404 />
      );
}
export default InClinicSlugLevel4;


export async function getServerSideProps({ params, query }) {
    try {
      let records = []
      try {
        records = await apiCall(`partnered-doctor/get-doctor-details/${query.slug_level_4}`, "GET")
        records = records?.data ?? []
      } catch (err) {
        console.log('err while getting the partnered doctor list -', err);
      }
        // records = await axios.get(
        //   `${process.env.NEXT_PUBLIC_APP_API_URL}partnered-doctor/get-doctor-details/${params?.slug_level_3}`
        // );
  
      return {
        props: {
          records,
          pageType: query?.type ?? "doctor"
          // doctorDetail: doctorDetail?.data ?? {} 
        },
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return {
        props: {
            records: [],
        },
      };
    }
  }
  