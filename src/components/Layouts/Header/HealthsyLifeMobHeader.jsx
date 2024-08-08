import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import {
    FaLinkedinIn,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";

const headings = [
    {
        heading: "Home",
        pathname: "/"
    },
    {
        heading: "Careers",
        pathname: "/join-us"
    },
    {
        heading: "HealthSy Life",
        pathname: "/healthsy-life"
    },
]


const HealthsyLifeMobHeader = (props) => {
    const [activeStatus, setActiveStatus] = useState("")
    const [socialMediaLinks, setSocialMediaLinks] = useState({});

    const navigate = useRouter().push;

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: "user-app" })
            .then((response) => {
                setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
            });
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}social-media-links/list`)
            .then((res) => {
                setSocialMediaLinks(res.data.rows[res.data.rows.length - 1]);
            });
    }, [])

    const isiOS = () => {
        const iOS = /iPhone|iPad|iPod|Macintosh/i.test(global?.navigator?.userAgent);
        if (iOS) {
            return activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"
        } else {
            return activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"
        }
    }

    return (<>
        <div className="healthsyLifeMobHeaderSection">
            <ul>
                {headings.map((data, inx) => {
                    return (
                        <div key={inx} className="headerSectionTitles fw-bold">
                            <div className="flexBetweenCenter">
                                <span
                                    onClick={() => {
                                        navigate(data.pathname);
                                    }}
                                >{data.heading}</span>
                            </div>
                        </div>
                    )
                })}
            </ul>
            <div>
                <div className={`mt-4 text-center ${props.mobile_menu === "true" ? "" : "d-none"}`}>
                    <Link href={isiOS()} className="mob-pl0" target="_blank">
                        <button
                            className="btn btn-learnMore DownloadBtn"
                        >Download Now</button>
                    </Link>
                </div>
                <div className="d-flex justify-content-center SocialMediaSection">
                    <Link href={socialMediaLinks?.linkedin ?? "#"} target="_blank">
                        <FaLinkedinIn size={20} className="me-4 text-secondary" />
                    </Link>
                    <Link href={socialMediaLinks?.facebook ?? "#"} target="_blank">
                        <FaFacebookF size={20} className="me-4 text-secondary" />
                    </Link>
                    <Link href={socialMediaLinks?.instagram ?? "#"} target="_blank">
                        <FaInstagram size={20} className="me-4 text-secondary" />
                    </Link>
                    <Link href={socialMediaLinks?.twitter ?? "#"} target="_blank">
                        <FaTwitter size={20} className="text-secondary" />
                    </Link>
                </div>
            </div>
        </div>
    </>
    );
};

export default HealthsyLifeMobHeader;