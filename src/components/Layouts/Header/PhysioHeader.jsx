import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Menu, Transition } from '@headlessui/react'
import { MdKeyboardArrowDown } from "react-icons/md";

import Header from "./Header";
import useIsDesktop from "../../Hooks/useIsDesktop";
import PhysioRegistrationForm from "../../Physiotheraphy/PhysioRegistrationForm";

const healthsyLogo = "/assets/healthsy-logo.png"

const homeHealthcareMenuList = [
    { menuName: "Physiotherapy", menuLink: "physiotherapy" },
    { menuName: "Speech Therapy", menuLink: "#" },
    { menuName: "Mental Wellness Therapy", menuLink: "#" },
    { menuName: "Nursing Services", menuLink: "#" },
    { menuName: "Nursing Support Services", menuLink: "#" },
    { menuName: "Caretakers", menuLink: "#" },
]

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

const PhysioHeader = ({citiesList, cc,showMenu, healthConditionsList}) => {
    const isDesktop = useIsDesktop()
    const [bookNowForm, setBookNowForm] = useState(false);
    return (
        <>
            {isDesktop ? (
                <header className="header physioHeaderSection">
                    <div className="container">
                        <div className="col-md-12 contents">
                            <div className="row d-flex align-items-center">
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
                                <div className="col-8 text-end mt-3 d-flex justify-content-end">
                                    {/* <a
                                    href={`${process.env.NEXT_PUBLIC_WEB_URL}/${router.pathname}/register-your-interest`}
                                > */}   
                                    {(cc === undefined || showMenu === true) && (
                                        <ServiceCategories />
                                    )}
                                    <button
                                        className={`headerBtn rounded-pill ms-4 mb-3 bookNow`}
                                        onClick={() => setBookNowForm(true)}
                                    >
                                        Book Now
                                    </button>
                                    {/* </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            ) : (
                <Header />
            )}
            <PhysioRegistrationForm bookNowForm={bookNowForm} setBookNowForm={setBookNowForm} citiesList={citiesList} healthConditionsList={healthConditionsList} />
        </>
    );
};

export default PhysioHeader;
