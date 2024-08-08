import { useRouter } from "next/router";
import Image from "next/image";

import Header from "./Header";
import useIsDesktop from "../../Hooks/useIsDesktop";

const healthsyLogo = "/assets/healthsy-logo.png";
const instaDocLogo = "/assets/instaDoc/insta-doc-logo.svg";

const FormPageHeader = ({ instaDoc = false, setDownloadModal = "" }) => {
  const router = useRouter();

  const isDesktop = useIsDesktop();

  const noNavigation = [
    "/adv-landing-privacy",
    "/adv-landing-terms",
    "/ad-landing-page-partners-doctors",
    "/ad-landing-page-partners-doctors/register",
    "/rp-qr-instadoc/[id]",
    "/[id]/-my-pharmacy-ratings",
  ].includes(router.pathname);

  return (
    <>
      {isDesktop ? (
        <header className="header">
          <div className="container">
            <div className="col-md-12 contents">
              <div className="row d-flex align-items-center">
                <div className="col-4">
                  <a
                    href={
                      noNavigation ? "#" : `${process.env.NEXT_PUBLIC_WEB_URL}/`
                    }
                  >
                    {instaDoc ? (
                      <Image
                        src={instaDocLogo}
                        width={160}
                        height={28}
                        alt="logo"
                        // className="logo-img"
                      />
                    ) : (
                      <Image
                        src={healthsyLogo}
                        width={169}
                        height={48}
                        alt="logo"
                        className="logo-img"
                      />
                    )}
                  </a>
                </div>
                {router.pathname === "/for-doctors" ? (
                  <div className="col-8 text-end mt-3">
                    <a
                      href={`${process.env.NEXT_PUBLIC_WEB_URL}/for-doctors/book-demo`}
                    >
                      <button
                        className={`headerBtn rounded-pill ms-4 mb-3 bookDemo`}
                      >
                        Book a Demo
                      </button>
                    </a>
                    <a
                      href={`${process.env.NEXT_PUBLIC_WEB_URL}/for-doctors/register-your-interest`}
                    >
                      <button
                        className={`headerBtn rounded-pill ms-4 mb-3 registerNow`}
                      >
                        Register Now
                      </button>
                    </a>
                  </div>
                ) : router.pathname === "/for-retail-pharmacies" ||
                  router.pathname ===
                    "/for-home-healthcare-service-providers" ||
                  router.pathname === "/for-insta-doc" ? (
                  <div className="col-8 text-end mt-3">
                    {/* || router.pathname === "/online-doctor-consultations/[specialization]" */}
                    <a
                      href={`${process.env.NEXT_PUBLIC_WEB_URL}/${router.pathname}/register-your-interest`}
                    >
                      {" "}
                      <button
                        className={`headerBtn rounded-pill ms-4 mb-3 registerNow`}
                      >
                        Register Now
                      </button>
                    </a>
                  </div>
                ) : router.pathname ===
                    "/online-doctor-consultations/[specialization]" ||
                  router.pathname ===
                    "/online-doctor-consultations/[specialization]/[doctor_profile]" ||
                  router.pathname ===
                    "/online-doctor-consultations/[specialization]/[doctor_profile]" ||
                  router.pathname ===
                    "/online-doctor-consultations/health-concern/[slug]"  ||
                    router.pathname === "/in-clinic-appointments/[city_slug]/[slug_level_2]" ||
                    router.pathname === "/in-clinic-appointments/[city_slug]/[slug_level_2]/[slug_level_3]" ||
                    router.pathname === "/in-clinic-appointments/[city_slug]/[slug_level_2]/[slug_level_3]/[slug_level_4]"

                    ? (
                  <div className="col-8 text-end mt-3">
                    <button
                      className={`getNotifiedBtn fs16fwb bg-primary text-white p-0`}
                      onClick={() => {
                        setDownloadModal(true);
                      }}
                    >
                      Download App
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </header>
      ) : (
        <Header />
      )}
    </>
  );
};

export default FormPageHeader;
