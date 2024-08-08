import axios from "axios";
import parse from 'html-react-parser';
import Head from "next/head";
import { useRouter } from "next/router";

import Breadcrumb from "../../../src/components/Common/breadcrumb";
import DoctorDetails from "../../../src/components/DoctorListing/DoctorDetails";
import FormPageHeader from "../../../src/components/Layouts/Header/FormPageHeader";
import { convertToTitleCase } from "../../../src/constants";
import Page404 from "../../../src/components/Fallback/404"

const DoctorBioData = ({ doctorDetail, ...props }) => {
  const { query: { doctor_profile, specialization } } = useRouter();
  // const [doctorDetail, setDoctorDetail] = useState({});
  // const getDoctorDetails = () => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_APP_API_URL}partnered-doctor/get-doctor-details/${doctor_profile}`,)
  //     .then((response) => {
  //       setDoctorDetail(response.data)
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       alert("Some error");
  //     });
  // };
  // useEffect(() => {
  //   getDoctorDetails()
  // }, [])
  return (
    doctorDetail?._id ? <>
      <Head>
        <title>
          {doctorDetail?.meta_title}
        </title>
        <meta
          name="description"
          content={doctorDetail?.meta_description}
        />
        <meta
          name="keywords"
          content={doctorDetail?.meta_keyword}
        />
        {doctorDetail?.others ? parse(doctorDetail?.others) : null}
      </Head>
      {console.log('sathish',props?.setDownloadModal)}
      <FormPageHeader setDownloadModal={props?.setDownloadModal} />
      <Breadcrumb
        className="DoctorConsultationBreadCrumbs"
        breadcrumbText="Online Doctor Consultations"
        nestedLevel={true}
        nestedBreadcrumbText={convertToTitleCase(specialization)}
        nestedLevelTwo={true}
        nestedBreadcrumbTextTwo={doctorDetail?.doctor_name}
        Href="/online-doctor-consultations"
        nestedLevelHref={`/online-doctor-consultations/${specialization}`}
      />
      <DoctorDetails
        doctor_profile={doctor_profile}
        specialization={specialization}
        doctorDetail={doctorDetail}
      />
    </> : <Page404 />
  )
}

export default DoctorBioData

export async function getServerSideProps({ params }) {
  try {
    const doctorDetail = await axios
      .get(`${process.env.NEXT_PUBLIC_APP_API_URL}partnered-doctor/get-doctor-details/${params?.doctor_profile}`,)

    return {
      props: { doctorDetail: doctorDetail?.data ?? {} }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        doctorDetail: {},
      },
    };
  }
};