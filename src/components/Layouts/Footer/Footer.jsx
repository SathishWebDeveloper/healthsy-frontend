import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import GetNotifiedRed from "../../Home/GetNotified/GetNotifiedRed";
import Image from "next/image";

const logo = "/assets/footer-logo.svg";
const linkedin_logo = "/assets/linkedin_logo.svg";
const facebook_logo = "/assets/facebook_logo.svg";
const instagram_logo = "/assets/instagram_logo.svg";
const twitter_logo = "/assets/Twitter Logo.svg";

const service = [
    { menuName: "Order Medicines", menuLink: "order-medicines" },
    { menuName: "Online Doctor Consultations", menuLink: "online-doctor-consultations" },
    { menuName: "In-Clinic Appointments", menuLink: "in-clinic-appointments" },
    { menuName: "Home Healthcare Services", menuLink: "home-healthcare-services" },
    { menuName: "Healthcare Products", menuLink: "healthcare-products" },
    { menuName: "InstaDoc", menuLink: "insta-doc" },
    // { menuName: "HealthSy Advantage Subscription", menuLink: "healthsy-advantage-subscription" }
]

const healthsyenergy = [
    { menuName: "For Doctors", menuLink: "for-doctors" },
    { menuName: "For Retail Pharmacies", menuLink: "for-retail-pharmacies" },
    { menuName: "For Home Healthcare Service Providers", menuLink: "for-home-healthcare-service-providers" },
    { menuName: "For InstaDoc", menuLink: "for-insta-doc" },
    { menuName: "For Pharmacy Franchise", menuLink: "franchise-programme" },
    { menuName: "Others", menuLink: "others-registration" },
]

const legalPages = [
    { menuName: "Terms and Conditions", menuLink: "terms-and-conditions" },
    { menuName: "Privacy Policy", menuLink: "privacy-policy" },
    { menuName: "Return Refund and Cancellation Policy", menuLink: "return-refund-and-cancellation-policy" },
    { menuName: "Customer Grievance Redressal Policy", menuLink: "customer-grievance-redressal-policy" },
]

const company = [
    { menuName: "About Us", menuLink: "about-us" },
    { menuName: "Health Articles and Guides", menuLink: "blogs" },
    { menuName: "Careers", menuLink: "join-us" },
    { menuName: "Sustainability Policy", menuLink: "sustainability-policy" },
    { menuName: "Contact Us", menuLink: "contact-us" }
]

const Footer = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [accordian, setAccordian] = useState('')

    useEffect(() => {
        getSocialMediaData();
    }, []);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 769px)");
        const listener = () => setIsDesktop(media.matches);
        listener();
        window.addEventListener("resize", listener);

        return () => window.removeEventListener("resize", listener);
    }, [isDesktop]);

    const getSocialMediaData = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}social-media-links/list`)
            .then((res) => {
                setLinkedinUrl(res.data.rows[res.data.rows.length - 1]?.linkedin);
                setFacebookUrl(res.data.rows[res.data.rows.length - 1]?.facebook);
                setInstagramUrl(res.data.rows[res.data.rows.length - 1]?.instagram);
                setTwitterUrl(res.data.rows[res.data.rows.length - 1]?.twitter);
            });
    };

    return (
        <footer className="footer-section">
            <div className="footer-bg text-white p-3">
                {
                    isDesktop ?
                        <div className="container">
                            <div className="row pt-5 pb-4 pc-bbline">
                                <div className="col mt-4 mb-4 mb-md-0 mob-mb-0 pl22">
                                    <h4 className="title mb-4 mob-title">SERVICES</h4>
                                    <div className="mob-dflex footer-links">
                                        <ul className="footer-ul">
                                            {service.map((data, idx) => {
                                                return (
                                                    <li key={idx}>
                                                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data?.menuLink}`}>
                                                            <span className="text-white">{data?.menuName}</span>
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col mt-4 mb-4 mb-md-0 mob-mb-0 pl22">
                                    <h4 className="title mb-4 mob-title">HEALTHSYNERGY</h4>
                                    <div className="mob-dflex footer-links">
                                        <ul className="footer-ul">
                                            {healthsyenergy.map((data, idx) => {
                                                return (
                                                    <li key={idx}>
                                                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data?.menuLink}`}>
                                                            <span className="text-white">{data?.menuName}</span>
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col mt-4 mb-4 mb-md-0 mob-mb-0 pl22">
                                    <h4 className="title mb-4 mob-title">LEGAL PAGES</h4>
                                    <div className="mob-dflex footer-links">
                                        <ul className="footer-ul">
                                            {legalPages.map((data, idx) => {
                                                return (
                                                    <li key={idx}>
                                                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data?.menuLink}`}>
                                                            <span className="text-white">{data?.menuName}</span>
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>

                                <div className="col mt-4 mb-4 mb-md-0 mob-mb-0 pl22">
                                    <h4 className="title mb-4 mob-title">COMPANY</h4>
                                    <div className="mob-dflex footer-links">
                                        <ul className="footer-ul">
                                            {company.map((data, idx) => {
                                                return (
                                                    <li key={idx}>
                                                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data?.menuLink}`}>
                                                            <span className="text-white">{data?.menuName}</span>
                                                        </a>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col mt-4 mb-4 mb-md-0 mob-mb-0 pl22">
                                    <h4 className="title mb-4 mob-title">NEED SUPPORT</h4>
                                    <div className="mob-dflex footer-links">
                                        <ul className="footer-ul">
                                            <li>
                                                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/faqs`} className="text-white">
                                                    FAQs
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="divider mb-4"></div>
                            <div className="d-flex justify-content-between footerBottom">
                                <div className="mb-4 mb-md-0 footerDesc mr-2">
                                    <a
                                        href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}
                                        onClick={() => {
                                            window.scrollTo(0, 0);
                                        }}
                                        className="pl0"
                                    >
                                        {" "}
                                        <Image width={168} height={61} className="logo footerLogo" src={logo} alt="logo" />
                                    </a>
                                    <p className="text-start footer-text">
                                        We are a health-tech startup that prioritises your health over
                                        anything else and thus bringing to you all the necessary
                                        healthcare services under one app.
                                    </p>
                                </div>
                                <div className="mt-4 mb-4 mb-md-0 socialMedia ml-2">
                                    <h4 className="title mb-4 mob-title">SOCIAL MEDIA</h4>
                                    <div>
                                        <p className="text-start footer-text">
                                            Follow us on social media to find out the latest updates on
                                            our progress
                                        </p>
                                    </div>
                                    <div className="social-media gap-40 mb-2p5 d-flex">
                                        {linkedinUrl && linkedinUrl.length > 0 ? (
                                            <img
                                                src={linkedin_logo}
                                                alt="linkedin_logo"
                                                className="me-3"
                                                onClick={() => {
                                                    window.open(linkedinUrl);
                                                }}
                                            />
                                        ) : null}
                                        {facebookUrl && facebookUrl.length > 0 ? (
                                            <img
                                                src={facebook_logo}
                                                alt="facebook_logo"
                                                className="me-3"
                                                onClick={() => {
                                                    window.open(facebookUrl);
                                                }}
                                            />
                                        ) : null}
                                        {instagramUrl && instagramUrl.length > 0 ? (
                                            <img
                                                src={instagram_logo}
                                                alt="instagram_logo"
                                                className="me-3"
                                                onClick={() => {
                                                    window.open(instagramUrl);
                                                }}
                                            />
                                        ) : null}
                                        {twitterUrl && twitterUrl.length > 0 ? (
                                            <img
                                                src={twitter_logo}
                                                alt="twitter_logo"
                                                onClick={() => {
                                                    window.open(twitterUrl);
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="mob_container">
                            <div className="footerSectionTitles fw-bold">
                                <div className="flexBetween" onClick={() => setAccordian(accordian === 'Services' ? '' : 'Services')}>
                                    <span>Services</span>
                                    {
                                        accordian !== 'Services' ?
                                            <FaAngleDown />
                                            :
                                            <FaAngleUp />
                                    }
                                </div>

                                {
                                    accordian === 'Services' &&
                                    <div className="d-block ">
                                        {service.map((data, inx) => {
                                            return (

                                                <div className="sub-menu" key={inx}>
                                                    <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data.menuLink}`}>{data.menuName}</a>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                            <div className="footerSectionTitles fw-bold ">
                                <div className="flexBetween" onClick={() => setAccordian(accordian === 'Healthsynergy' ? '' : 'Healthsynergy')}>
                                    <span>Healthsynergy</span>
                                    {
                                        accordian !== 'Healthsynergy' ?
                                            <FaAngleDown />
                                            :
                                            <FaAngleUp />
                                    }

                                </div>

                                {
                                    accordian === 'Healthsynergy' &&
                                    <div className="d-block ">
                                        {
                                            healthsyenergy.map((data, inx) => {
                                                return (
                                                    <div className="sub-menu" key={inx}>
                                                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data.menuLink}`}>{data.menuName}</a>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                            <div className="footerSectionTitles fw-bold ">
                                <div className="flexBetween" onClick={() => setAccordian(accordian === 'legalPages' ? '' : 'legalPages')}>
                                    <span>Legal Pages</span>
                                    {
                                        accordian !== 'Healthsynergy' ?
                                            <FaAngleDown />
                                            :
                                            <FaAngleUp />
                                    }

                                </div>

                                {
                                    accordian === 'legalPages' &&
                                    <div className="d-block ">
                                        {
                                            legalPages.map((data, inx) => {
                                                return (
                                                    <div className="sub-menu" key={inx}>
                                                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data.menuLink}`}>{data.menuName}</a>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }

                            </div>
                            <div className="footerSectionTitles fw-bold">
                                <div className="flexBetween" onClick={() => setAccordian(accordian === 'Company' ? '' : 'Company')}>
                                    <span>Company</span>
                                    {
                                        accordian !== 'Company' ?
                                            <FaAngleDown />
                                            :
                                            <FaAngleUp />
                                    }

                                </div>
                                {
                                    accordian === 'Company' &&
                                    <div className="d-block ">
                                        {
                                            company.map((data, inx) => {
                                                return (
                                                    <div className="sub-menu" key={inx}>
                                                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/${data.menuLink}`}>{data.menuName}</a>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }
                            </div>
                            <div className="footerSectionTitles fw-bold">
                                <div className="flexBetween" onClick={() => setAccordian(accordian === 'NeedSupport' ? '' : 'NeedSupport')}>
                                    <span>Need Support</span>
                                    {
                                        accordian !== 'NeedSupport' ?
                                            <FaAngleDown />
                                            :
                                            <FaAngleUp />
                                    }

                                </div>

                                {
                                    accordian === 'NeedSupport' &&
                                    <div className="d-block ">
                                        <div className="sub-menu ">
                                            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/faqs`}>FAQs</a>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="socialMedia_mob mt-4">
                                <h4 className="title mb-2 mob-title">Social Media</h4>
                                <div className="mt-4 mb-4">
                                    <p className="text-start">Follow us on social media to find out the latest updates on our progress</p>
                                </div>
                                <div className="mb-3">
                                    {linkedinUrl && linkedinUrl.length > 0 ?
                                        <img src={linkedin_logo} alt="linkedin_logo" className="me-5" onClick={() => { window.open(linkedinUrl) }} />
                                        : null}
                                    {facebookUrl && facebookUrl.length > 0 ?
                                        <img src={facebook_logo} alt="facebook_logo" className="me-5" onClick={() => { window.open(facebookUrl) }} />
                                        : null}
                                    {instagramUrl && instagramUrl.length > 0 ?
                                        <img src={instagram_logo} alt="instagram_logo" className="me-5" onClick={() => { window.open(instagramUrl) }} />
                                        : null}
                                    {twitterUrl && twitterUrl.length > 0 ?
                                        <img src={twitter_logo} alt="twitter_logo" onClick={() => { window.open(twitterUrl) }} />
                                        : null}
                                </div>
                            </div>
                            <div className="">
                                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`} onClick={() => {
                                    window.scrollTo(0, 0)
                                }} className="pl0">
                                    <Image width={168} height={46} className="mt-4 footerLogo" src={logo} alt="logo" />
                                </a>
                                <p className="text-start pb-5 pt-2 mb-0">We are a health-tech startup that prioritises your health over anything else and thus bringing to you all the necessary healthcare services under one app.</p>
                            </div>
                        </div>
                }
            </div>
            <div className="text-center my-auto py-3">
                <p className="mb-0">
                    <span className="icon">©</span> HealthSy {new Date().getFullYear()}.
                    All Rights Reserved.
                </p>
            </div>
            <GetNotifiedRed />
        </footer >
    );
};

export default Footer;
