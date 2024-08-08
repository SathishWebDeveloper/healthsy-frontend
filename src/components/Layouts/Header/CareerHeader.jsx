import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

import Header from "./Header";
const twitter_logo = "/assets/X.svg";

const healthsyLogo = "/assets/healthsy-logo.png";
const headerMenu = [
  {
    text: "Careers",
    pathname: "/join-us",
  },
  {
    text: "HealthSy Life",
    pathname: "/healthsy-life",
  },
];

const CareerHeader = (props) => {
  const router = useRouter();
  const [isDesktop, setIsDesktop] = useState(false);
  const [socialMediaLinks, setSocialMediaLinks] = useState({});

  useEffect(() => {
    getSocialMediaData();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const getSocialMediaData = () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}social-media-links/list`)
      .then((res) => {
        setSocialMediaLinks(res.data.rows[res.data.rows.length - 1]);
      });
  };

  return (
    <>
      {isDesktop ? (
        <header className="header careerHeaderSection">
          <div className="container">
            <div className="col-md-12 contents">
              <div className="row align-items-baseline">
                <div className="col-3">
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
                <div className="col-5 text-end mt-3 menuContent">
                  {headerMenu.map((menu, id) => {
                    return (
                      <a
                        href={`${process.env.NEXT_PUBLIC_WEB_URL}${menu.pathname}`}
                        key={id}
                      >
                        <span
                          className={`${router.pathname === menu.pathname ? "" : "border-0"
                            } careerHeaderMenu`}
                        >
                          {menu.text}
                        </span>
                      </a>
                    );
                  })}
                </div>
                <div className="col-4 career-detail-header text-end mt-3">
                  <Link href={socialMediaLinks?.linkedin ?? "#"} target="_blank">
                    <FaLinkedinIn size={20} className="me-4 text-black" />
                  </Link>
                  <Link href={socialMediaLinks?.facebook ?? "#"} target="_blank">
                    <FaFacebookF size={20} className="me-4 text-black" />
                  </Link>
                  <Link href={socialMediaLinks?.instagram ?? "#"} target="_blank">
                    <FaInstagram size={20} className="me-4 text-black" />
                  </Link>
                  <Link href={socialMediaLinks?.twitter ?? "#"} target="_blank">
                    {/* <FaTwitter size={20} className="text-black" /> */}
                    <img
                      src={twitter_logo}
                      alt="twitter_logo"
                      className="adTwitterLogo"
                    />
                  </Link>
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

export default CareerHeader;
