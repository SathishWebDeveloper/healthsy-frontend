import { useState, useEffect, Fragment, memo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";

import Header from "./Header";

const mobile_home_sidebar = "/assets/homepage/mobile-home-sidebar.svg";
const healthsyLogo = "/assets/healthsy-logo.png";

const BlogHeader = (props) => {
  const [showModal, setShowModal] = useState({ healthSynergy: false });

  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const HealthSynergy = () => {
    return (
      <>
        <div className="header-menu">
          <div className="dropdown text-end">
            <button
              className="d-md-none bg-transparent border-0"
              onClick={(e) => setShowSideBar(true)}
            >
              <img src={mobile_home_sidebar} alt="mobile_home_sidebar" />
            </button>
          </div>
        </div>
        <Menu className="header-menu" value={"service"}>
          <div className="dropdown text-end">
            <Menu.Button
              className="btn header-buttons blogHeaderBtn"
              open={true}
            >
              HealthSynergy <BsChevronDown size={16} className="ms-2" />
            </Menu.Button>
            <Transition
              // show={show?.service}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="dropdown-items border-0 dropdown-menu dropdown-menu-end  show bg-white shadow-lg">
                <div className="p-1">
                  <HealthSynergyMenus mobile_menu="false" />
                </div>
              </Menu.Items>
            </Transition>
          </div>
        </Menu>
      </>
    );
  };

  const HealthSynergyMenus = (props) => {
    return (
      <ul>
        <li className="content-desktop fw-bold partnerWithUS">
          Partner With Us
        </li>
        <li id="header-menu-item-1" className="healthsySubMenu">
          <a
            href={`${process.env.NEXT_PUBLIC_WEB_URL}/for-doctors`}
            className="healthsynergyMenu"
          >
            <span className="content healthsySubMenu">
              <span className="healthsySubMenu">For Doctors</span>
            </span>
          </a>
        </li>
        <li id="header-menu-item-2" className="healthsySubMenu">
          <a
            href={`${process.env.NEXT_PUBLIC_WEB_URL}/for-retail-pharmacies`}
            className="healthsynergyMenu"
          >
            <span className="content healthsySubMenu">
              <span className="healthsySubMenu">For Retail Pharmacies</span>
            </span>
          </a>
        </li>
        <li id="header-menu-item-3" className="healthsySubMenu">
          <a
            href={`${process.env.NEXT_PUBLIC_WEB_URL}/for-home-healthcare-service-providers`}
            className="healthsynergyMenu"
          >
            <span className="content healthsySubMenu">
              <span className="healthsySubMenu">
                For Home Healthcare
                <br />
                Service Providers
              </span>
            </span>
          </a>
        </li>
        <li id="header-menu-item-5" className="healthsySubMenu">
          <a
            href={`${process.env.NEXT_PUBLIC_WEB_URL}/others-registration`}
            className="healthsynergyMenu"
          >
            <span className="content healthsySubMenu">
              <span className="healthsySubMenu">Others</span>
            </span>
          </a>
        </li>
      </ul>
    );
  };

  return (
    <>
      {isDesktop ? (
        <header className="header">
          <div className="container">
            <div className="col-md-12 contents">
              <div className="row d-flex align-items-center justify-content-between">
                <div className="col-4">
                  <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                    <Image
                      src={healthsyLogo}
                      width={169}
                      height={48}
                      alt="logo"
                      className="logo-img"
                    />
                  </a>
                </div>
                <div className="col-2 text-end mt-3">
                  <HealthSynergy show={showModal} setShow={setShowModal} />
                </div>
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

export default memo(BlogHeader);
