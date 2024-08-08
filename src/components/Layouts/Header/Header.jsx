import React, { Fragment, useEffect, useState, useRef } from "react";
import Link from 'next/link';
import { useRouter } from "next/router";
import axios from "axios";
import { Menu, Transition, Popover } from '@headlessui/react'
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";

import HealthsyLifeMobHeader from './HealthsyLifeMobHeader'
import { SkeletonLoading } from "../../Common/skeletonLoading";

const healthsyLogo = "/assets/white-logo.svg";
const sidebarClose = "/assets/home-sidebar-close-white.svg";
const mobile_home_sidebar = "/assets/homepage/mobile-home-sidebar.svg";
const instaDocLogo = "/assets/instaDoc/insta-doc-logo.svg";
// const logo = "/assets/pink-logo.svg";
const sustainabilityLogo = "/assets/sustainability-policy/green-logo.svg";
const explore = "/assets/explore.gif";

const seviceMenuList = [
  { menuName: "Order Medicines", menuLink: "order-medicines" },
  { menuName: "Healthcare Products", menuLink: "healthcare-products" },
  { menuName: "Online Doctor Consultations", menuLink: "online-doctor-consultations" },
  { menuName: "In-Clinic Appointments", menuLink: "in-clinic-appointments" },
  { menuName: "Home Healthcare Services", menuLink: "home-healthcare-services" },
  // { menuName: "Memberships", menuLink: "memberships" },
  { menuName: "InstaDoc", menuLink: "insta-doc" },
]

const healthSynergyMenuList = [
  { menuName: "For Doctors", menuLink: "for-doctors" },
  { menuName: "For Retail Pharmacies", menuLink: "for-retail-pharmacies" },
  { menuName: "For Home Healthcare Serivce Providers", menuLink: "for-home-healthcare-service-providers" },
  { menuName: "For InstaDoc", menuLink: "for-insta-doc" },
  { menuName: "For Pharmacy Franchise", menuLink: "franchise-programme" },
  { menuName: "Others", menuLink: "others-registration" },
]

const companyMenuList = [
  { menuName: "About Us", menuLink: "about-us" },
  { menuName: "Health Articles and Guides", menuLink: "blogs" },
  { menuName: "Careers", menuLink: "join-us" },
  { menuName: "HealthSy Life", menuLink: "healthsy-life" },
  { menuName: "Sustainability Policy", menuLink: "sustainability-policy" },
  { menuName: "Contact Us", menuLink: "contact-us" },
]

const homeHealthcareMenuList = [
  { menuName: "Physiotherapy", menuLink: "physiotherapy" },
  { menuName: "Speech Therapy", menuLink: "#" },
  { menuName: "Mental Wellness Therapy", menuLink: "#" },
  { menuName: "Nursing Services", menuLink: "#" },
  { menuName: "Nursing Support Services", menuLink: "#" },
  { menuName: "Caretakers", menuLink: "#" },
]

const HealthSynergyMenuArr = [
  { name: "For Doctors", link: "/for-doctors" },
  { name: "For Retail Pharmacies", link: "/for-retail-pharmacies" },
  { name: <span className="healthsySubMenu">For Home Healthcare<br />Service Providers</span>, link: "/for-home-healthcare-service-providers" },
  { name: "For InstaDoc", link: "/for-insta-doc" },
  { name: "For Pharmacy Franchise", link: "/franchise-programme" },
  { name: "Others", link: "/others-registration" },
]

const CompanyMenuArr = [
  { name: "About Us", link: "/about-us" },
  { name: "Health Articles and Guides", link: "/blogs" },
  { name: "Careers", link: "/join-us" },
  { name: "Sustainability Policy", link: "/sustainability-policy" },
  { name: "Contact Us", link: "/contact-us" },
]

const ServiceMenus = () => {
  let timeout // NodeJS.Timeout
  const timeoutDuration = 400
  const navigate = useRouter().push
  const buttonRef = useRef(null)
  const [openState, setOpenState] = useState(false)

  // Open the menu after a delay of timeoutDuration
  const handleClick = (open) => {
    setOpenState(!open) // toggle open state in React state
    clearTimeout(timeout) // stop the hover timer if it's running
    navigate("/home-healthcare-services")
  }

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      event.stopPropagation()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  const toggleMenu = (open) => {
    // log the current open state in React (toggle open state)
    setOpenState((openState) => !openState)
    // toggle the menu by clicking on buttonRef
    buttonRef?.current?.click() // eslint-disable-line
  }

  const onHover = (open, action) => {
    // if the modal is currently closed, we need to open it
    // OR
    // if the modal is currently open, we need to close it
    if (
      (!open && !openState && action === "onMouseEnter") ||
      (open && openState && action === "onMouseLeave")
    ) {
      // clear the old timeout, if any
      clearTimeout(timeout)
      // open the modal after a timeout
      timeout = setTimeout(() => toggleMenu(open), timeoutDuration)
    }
  }

  return (
    <ul className="serviceMenuContent">
      {seviceMenuList.map((data, inx) => {
        return (
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data?.menuLink}`} key={inx}>
            <li className="header-menu-list">
              <span className="content">
                <span>{data?.menuName}</span>
              </span>
            </li>
          </a>
        )
      })}
      {/* <Popover className="relative mx-auto w-48">
        {({ open }) => (
          <div
            onMouseEnter={() => onHover(open, "onMouseEnter")}
            onMouseLeave={() => onHover(open, "onMouseLeave")}
            className="position-relative "
          >
            <Popover.Button ref={buttonRef} className={"border-0 bg-white p-0 w-100 homeHealthcareMenuBtn"}>
              <div
                onClick={() => handleClick(open)}
                className="homeHealthcareMenu header-menu-list"
              >
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/home-healthcare-services`}>
                  <li id="header-menu-item-5" className="p-0 header-menu-list">
                    <div className="content flexCenter">
                      <span>Home Healthcare Service</span>
                      <MdKeyboardArrowRight size={18} />
                    </div>
                  </li>
                </a>
              </div>
            </Popover.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel static className="z-10 w-48 mx-auto popoverPanel">
                <div>
                  {homeHealthcareMenuList.map((data, inx) => {
                    return (
                      <a key={inx} href={`${process.env.NEXT_PUBLIC_WEB_URL}/home-healthcare-services/${data.menuLink}`}>
                        <li className="home-healthcare-menu-item header-menu-list">
                          <span className="content">
                            <span>{data.menuName}</span>
                          </span>
                        </li>
                      </a>
                    )
                  })}
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        )}
      </Popover> */}
    </ul>
  );
};

const HealthSynergyMenus = () => {

  return (
    <ul className="healthSyMenuContent">
      <li className="content-desktop fw-bold partnerWithUS">Partner With Us</li>
      {HealthSynergyMenuArr.map((data, inx) => {
        return (
          <li id="header-menu-item-1" key={inx} className="healthsySubMenu">
            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}${data.link}`} className="healthsynergyMenu">
              <span className="content healthsySubMenu">
                <span className="healthsySubMenu">{data.name}</span>
              </span>
            </a>
          </li>
        )
      })}
    </ul>
  );
};

const CompanyMenus = () => {

  return (
    <ul className="comapanyMenuList">
      {CompanyMenuArr.map((data, inx) => {
        return (
          <a key={inx} href={`${process.env.NEXT_PUBLIC_WEB_URL}${data.link}`}>
            <li id="header-menu-item-1">
              <span className="content">
                <span>{data.name}</span>
              </span>
            </li>
          </a>
        )
      })}
    </ul>
  );
};

const HealthSynergyMobileMenus = (props) => {
  const [accordian, setAccordian] = useState('')
  const [activeStatus, setActiveStatus] = useState("")
  const [HHSsubMenu, setHHSsubMenu] = useState('')

  const router = useRouter();

  const PhysioMobHeader = ["/home-healthcare-services", "/home-healthcare-services/physiotherapy", "/home-healthcare-services/physiotherapy/physiotherapy-mumbai"].includes(router.pathname)

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, {
        category: 'user-app',
      })
      .then((response) => {
        setActiveStatus(
          response.data.rows.filter((userAppLink) => userAppLink.active)
        );
      });
  }, []);

  const isiOS = () => {
    const iOS = /iPhone|iPad|iPod|Macintosh/i.test(global?.navigator?.userAgent);
    if (iOS) {
      return activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"
    } else {
      return activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"
    }
  }

  return (
    <ul>
      {!PhysioMobHeader ? (
        <>
          <div className="headerSectionTitles fw-bold">
            <div className="flexBetweenCenter">
              <span className="pb-3">Services</span>
              {/* {
                accordian !== 'Services' ?
                  <FaChevronDown size={16} />
                  :
                  <FaChevronUp size={16} />
              } */}
            </div>
            {
              <div className="d-block ">
                {seviceMenuList.map((data, inx) => {
                  return (
                    <div className="header-sub-menu">
                      <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data?.menuLink}`}>{data?.menuName}</a>
                    </div>
                  )
                })}
                {/* <div className="header-sub-menu flexBetweenCenter homeHealthcareSubMenu" onClick={() => setHHSsubMenu(HHSsubMenu === 'homeHealthcareService' ? '' : 'homeHealthcareService')}>
              <span className={HHSsubMenu ? "primaryColor" : ""}>Home Healthcare Service</span>
              {
                HHSsubMenu !== 'homeHealthcareService' ?
                  <FaChevronDown size={14} />
                  :
                  <FaChevronUp size={14} />
              }
            </div>
            {
              HHSsubMenu === 'homeHealthcareService' &&
              <>
                <div className="d-block ">
                  {homeHealthcareMenuList.map((data, inx) => {
                    return (
                      <div className="header-sub-menu HHS-header-sub-menu">
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/home-healthcare-services/${data?.menuLink}`}>{data?.menuName}</a>
                      </div>
                    )
                  })}
                </div>
              </>
            } */}
              </div>
            }
          </div>
          <div className="headerSectionTitles fw-bold ">
            <div className="flexBetweenCenter" onClick={() => setAccordian(accordian === 'Healthsynergy' ? '' : 'Healthsynergy')}>
              <span className={accordian === 'Healthsynergy' ? "mobHeaderMenu primaryColor" : ""}>HealthSynergy</span>
              {accordian !== 'Healthsynergy' ? <FaChevronDown size={16} /> : <FaChevronUp size={16} />}
            </div>
            {
              accordian === 'Healthsynergy' &&
              <>
                <div className="d-block ">
                  {healthSynergyMenuList.map((data, inx) => {
                    return (
                      <div key={inx} className="header-sub-menu">
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data?.menuLink}`}>{data?.menuName}</a>
                      </div>
                    )
                  })}
                </div>
              </>
            }
          </div>

          <div className="headerSectionTitles fw-bold">
            <div className="flexBetweenCenter" onClick={() => setAccordian(accordian === 'Company' ? '' : 'Company')}>
              <span className={accordian === 'Company' ? "mobHeaderMenu primaryColor" : ""}>Company</span>
              {
                accordian !== 'Company' ?
                  <FaChevronDown size={16} />
                  :
                  <FaChevronUp size={16} />
              }
            </div>
            {
              accordian === 'Company' &&
              <div className="d-block ">
                {companyMenuList.map((data, inx) => {
                  return (
                    <div className="header-sub-menu">
                      <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data?.menuLink}`}>{data?.menuName}</a>
                    </div>
                  )
                })}
              </div>
            }
          </div>
        </>
      ) :
        <>
          <a href="/" className="p-0">
            <div className="headerSectionTitles fw-bold ">
              <span className="text-black">Home</span>
            </div>
          </a>
          {homeHealthcareMenuList.map((data, inx) => {
            return (
              <a key={inx} href={`${process.env.NEXT_PUBLIC_WEB_URL}/home-healthcare-services/${data.menuLink}`} className="p-0">
                <div className="headerSectionTitles HHSMenuTitle fw-bold ">
                  <span className="text-black">{data.menuName}</span>
                </div>
              </a>
            )
          })
          }
        </>
      }
      <li className={`text-center ${props.mobile_menu === "true" ? "" : "d-none"}`}>
        <Link href={isiOS()} className="mob-pl0" target="_blank">
          <button
            className="bg-primary downloadNowBtn text-white fs16fwb"
          >Download Now</button>
        </Link>
      </li>
    </ul>
  );
};

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
      <Menu className="header-menu customHeaderMenu" value={"service"}>
        <div className="dropdown text-end">
          <Menu.Button className="btn header-buttons float-end headerDropdownBtn"
            open={true}
          >
            HealthSynergy{" "}
            <MdKeyboardArrowDown size={25} className="ms-2" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="dropdown-items border-0 dropdown-menu dropdown-menu-end  show bg-white shadow-lg p-0">
              <div className="">
                <HealthSynergyMenus mobile_menu="false" />
              </div>
            </Menu.Items>

          </Transition>
        </div>
      </Menu>
    </>
  );
};

const Service = () => {
  return (
    <>
      <Menu className="header-menu test-text-color customHeaderMenu"
        value={"service"}>
        <div className="dropdown text-end">
          <Menu.Button className="btn header-buttons headerDropdownBtn float-end"
          >
            Services{" "}
            <MdKeyboardArrowDown size={25} className="ms-2" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="dropdown-items border-0 dropdown-menu dropdown-menu-end  show bg-white shadow-lg serviceMenus">
              <div className="">
                <ServiceMenus mobile_menu="false" />
              </div>
            </Menu.Items>
          </Transition>
        </div>

      </Menu>
    </>
  );
};

const Company = () => {
  return (
    <Menu className="header-menu customHeaderMenu"
      value={"company"}>
      <div className="dropdown text-end">
        <Menu.Button className="btn header-buttons headerDropdownBtn float-end"
          open={true}
        >
          Company{" "}
          <MdKeyboardArrowDown size={25} className="ms-2" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="dropdown-items border-0 dropdown-menu dropdown-menu-end  show bg-white shadow-lg p-0">
            <div className="">
              <CompanyMenus mobile_menu="false" />
            </div>
          </Menu.Items>
        </Transition>
      </div>

    </Menu>
  );
};

const HealthSynergyMobComp = ({ showSideBar, setShowSideBar }) => {
  const router = useRouter()

  const noMenu = ["/adv-landing-terms", "/adv-landing-privacy", "/rp-qr-instadoc/[id]", "/ad-landing-page-partners-doctors", "/for-doctors/register-your-interest", "/for-doctors/thank-you", "/for-retail-pharmacies/register-your-interest", "/for-retail-pharmacies/thank-you", "/for-home-healthcare-service-providers/thank-you", "/for-home-healthcare-service-providers/register-your-interest", "/rp-qr-ratings/[id]"].includes(router.pathname)

  return (
    <div className="header-menu mediumMobContent">
      {!noMenu &&
        <div className="dropdown text-end">
          <button
            className="bg-transparent border-0"
            onClick={(e) => setShowSideBar(true)}
          >
            <img src={mobile_home_sidebar} alt="mobile_home_sidebar" />
          </button>
          <div className={`dropdown-items`} id="dropdown1">
            <HealthSynergyMenus mobile_menu="false" />
          </div>
        </div>}
    </div>
  );
};

const SideBarNavigation = (props) => {
  const router = useRouter();

  return (
    <div style={{
      position: "fixed"
    }} className={`home-sidebar`}>
      <div className={`home-sidebar-content`}>
        <div className={`home-sidebar-head`}>
          <img src={healthsyLogo} className={`home-sidebar-logo`} />
          <img
            src={sidebarClose}
            className={"home-sidebar-close"}
            onClick={(e) => props.setShowSideBar(false)}
          />
        </div>
        <div className={`home-sidebar-body`}>
          <h5 className="text-primary home-sidebar-fs-18 content-mobile fw-bold partnerWithUS">Partner With Us</h5>
          {
            router.pathname === "/healthsy-life" || router.pathname === "/join-us" ?
              <HealthsyLifeMobHeader mobile_menu="true" /> :
              <HealthSynergyMobileMenus mobile_menu="true" setDownloadModal={props?.setDownloadModal} />
          }
        </div>
      </div>
    </div>
  );
};

const ServiceCategories = () => {
  return (
    <>
      <Menu className="header-menu test-text-color customHeaderMenu"
        value={"service"}>
        <div className="dropdown text-end">
          <Menu.Button className="btn header-buttons headerDropdownBtn float-end"
          >
            Service Categories{" "}
            <MdKeyboardArrowDown size={25} className="ms-2" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="dropdown-items border-0 dropdown-menu dropdown-menu-end  show bg-white shadow-lg p-0">
              <div>
                <ServiceCategoriesMenu mobile_menu="false" />
              </div>
            </Menu.Items>
          </Transition>
        </div>
      </Menu>
    </>
  );
}

const ServiceCategoriesMenu = () => {
  return (
    <ul className="ServiceCategoriesMenuContent">
      {homeHealthcareMenuList.map((data, inx) => {
        return (
          <a key={inx} href={`${process.env.NEXT_PUBLIC_WEB_URL}/home-healthcare-services/${data.menuLink}`}>
            <li className="home-healthcare-menu-item header-menu-list">
              <span className="content">
                <span>{data.menuName}</span>
              </span>
            </li>
          </a>
        )
      })}
    </ul>
  )

}

const Header = (props) => {
  const [logo, setLogo] = useState('');
  const [isDesktop, setIsDesktop] = useState(null);
  const [showModal, setShowModal] = useState({
    service: false,
    company: false,
    healthSynergy: false,
  });
  const [showSideBar, setShowSideBar] = useState(false);
  const [logoLoading, setLogoLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const media = window.matchMedia('(min-width: 960px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}business-settings/list`)
      .then((res) => {
        setLogo(res.data.rows[0].logo);
        setLogoLoading(false)
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = showSideBar ? 'hidden' : 'auto';
    return () => {
      document.body.style = '';
    };
  }, [showSideBar]);

  const noNavigation = ["/adv-landing-terms", "/adv-landing-privacy", "/rp-qr-instadoc/[id]", "/ad-landing-page-partners-doctors", "/rp-qr-ratings/[id]"].includes(router.pathname)

  return (
    <>
      {showSideBar && <SideBarNavigation showSideBar={showSideBar} setShowSideBar={setShowSideBar} />}
      {!isDesktop ? (
        props.nonMobCustomHeader ? null : (
          <header className="header">
            <div className="container">
              <div className="flexBetweenCenter">
                {
                  !logoLoading ?
                    <div className="logo-header pl0">
                      <a href={noNavigation ? "#" : `${process.env.NEXT_PUBLIC_WEB_URL}/`} className="pl0">
                        {
                          router.pathname === "/for-insta-doc" ||
                            router.pathname === "/rp-qr-instadoc/[id]" ||
                            router.pathname === "/instadoc-android-app-for-doctors" ?
                            (<Image src={instaDocLogo} width={140} height={25} alt="instaDocLogo" />)
                            : router.pathname === "/sustainability-policy" ?
                              (<Image src={sustainabilityLogo} width={144} height={40} className="mt-2" alt="logo" />)
                              : (<img
                                src={logo ? `${process.env.NEXT_PUBLIC_APP_API_URL}logo-images/${logo}` : ""}
                                // src={logo}
                                alt="logo"
                                className="logo-img mt-2"
                              />)
                        }
                      </a>
                    </div> :
                    <div className="d-flex mediumDesktopContent">
                      <SkeletonLoading page={'header'} data={1} />
                    </div>
                }
                <div className="d-flex mediumDesktopContent">
                  <SkeletonLoading page={'header'} data={3} />
                </div>
                {(props.cc === undefined || props.showMenu === true) && (
                  <HealthSynergyMobComp
                    showSideBar={showSideBar}
                    setShowSideBar={setShowSideBar}
                  />
                )}
              </div>
            </div>
          </header>
        )
      ) : (
        <header className="header">
          <div className="container">
            <div className="contents">
              <div className="d-flex justify-content-between">
                <div className="logo-header pl0">
                  <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`} className="pl0">
                    {
                      router.pathname === "/for-insta-doc" ||
                        router.pathname === "/rp-qr-instadoc/[id]" ||
                        router.pathname === "/instadoc-android-app-for-doctors" ?
                        (<Image src={instaDocLogo} width={140} height={25} alt="instaDocLogo" />)
                        : router.pathname === "/sustainability-policy" ?
                          (<Image src={sustainabilityLogo} width={168} height={48} className="mt-2" alt="logo" />)
                          : (<img
                            src={logo ? `${process.env.NEXT_PUBLIC_APP_API_URL}logo-images/${logo}` : ""}
                            // src={logo}
                            alt="logo"
                            className="logo-img mt-2"
                          />)
                    }
                  </a>
                </div>
                <div className="d-flex align-items-center">
                  {(props.cc === undefined || props.showMenu === true) && (
                    <>
                      {router.pathname === "/home-healthcare-services" ? (
                        <ServiceCategories show={showModal} setShow={setShowModal} />
                      ) : (
                        <>
                          <Service show={showModal} setShow={setShowModal} />
                          <HealthSynergy show={showModal} setShow={setShowModal} />
                          <Company show={showModal} setShow={setShowModal} />
                          {router.pathname !== "/memberships" && <a className="p-0" href={`${process.env.NEXT_PUBLIC_WEB_URL}/memberships`}>
                            <Image src={explore} width="179" height="48" alt="explore-img" className="exploreMembership" />
                          </a>}
                        </>
                      )}
                    </>
                  )}
                  {router.pathname === "/sustainability-policy" ?
                    (<button
                      className={`getNotifiedBtn fs16fwb sustainabilityHeaderBtn text-white`}
                      onClick={() => { props.setDownloadModal(true) }}
                    >
                      Download App
                    </button>)
                    : (<button
                      className={`getNotifiedBtn fs16fwb bg-primary text-white p-0`}
                      onClick={() => { props.setDownloadModal(true) }}
                    >
                      Download App
                    </button>)
                  }
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;