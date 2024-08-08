import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Player from '@vimeo/player';
import CountUp from "react-countup";
import axios from "axios";
import Link from "next/link";

import AdsDoctorVideo from "../DoctorsAd/AdsDoctorVideo";

const closeIcon = "/assets/home-sidebar-close.svg";
const plusIcon = "/assets/icons/plus-icon.svg"

const UserGeneralBanner = ({ isiOS, setDownloadModal = () => { } }) => {
    const [show, setShow] = useState(true)
    const fileUrl = '/assets/dowloadBrochure/HealthSy - About Us.pdf';
    const [userGeneralCounterList, setuserGeneralCounterList] = useState("")

    const iframeRef = useRef(null);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APP_API_URL}user-general-counter/user-counter-list`)
            .then((response) => {
                setuserGeneralCounterList(response?.data?.rows[0])
            });
    }, [])

    const bannerContent = [
        {
            title: <><CountUp start={1} end={userGeneralCounterList?.mediacl_bills_count} duration={10} /> Lakhs</>,
            image: plusIcon,
            desc: "Saved on monthly medical bills"
        },
        {
            title: <><CountUp start={1} end={userGeneralCounterList?.doctor_count} duration={10} /></>,
            image: plusIcon,
            desc: "Partnered Doctors"
        },
    ]

    useEffect(() => {
        if (iframeRef.current) {
            const player = new Player(iframeRef.current);
            player.on("play", () => {
                setIsPlaying(true);
            });
            player.on("pause", () => {
                setIsPlaying(false);
            });
        }
    }, []);

    return (
        <div className="userGeneralBanner">
            {show && <div className="adBannerTopText w-100 row m-0">
                <span className="col-11 text-center fs14m13fwb">{<>Need to know more? <a className="primaryColor text-decoration-underline cursor-pointer topDownload" download href={fileUrl}>Download the Brochure</a></>}</span>
                <Image
                    src={closeIcon}
                    width={16}
                    height={16}
                    alt="close"
                    className="col-1 p-0 cursor-pointer"
                    onClick={() => setShow()}
                />
            </div>}
            <div className="bgPrimary">
                <div className="container healthcarebanner text-white d-flex">
                    <div className="userBannerContentWrapper">
                        <div className="fs44m26fw800 bannerTitle">All-in-one Healthcare App</div>
                        <div className="fs16 bannerDesc">Look no further than HealthSy to get all your healthcare needs sorted</div>
                        <div className="desktopContent">
                            <div>
                                <button className="downloadAppBtn fs16fwb" onClick={setDownloadModal}>Download App</button>
                            </div>
                            <div className="d-flex adsLandingUserbanner">
                                {bannerContent.map((data, idx) => {
                                    return (
                                        <div key={idx} className="userBannerCountWrapper">
                                            <div className="d-flex align-items-baseline bannerContentWrapper">
                                                <div className="fs24m20fw800 adLandingUserTitle">{data.title}</div>
                                                <Image src={data.image} width={15} height={15} alt="plus-img" />
                                            </div>
                                            <div className="fs14m13fw500">{data.desc}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <AdsDoctorVideo
                        doctorAd={false}
                        videoId="862282301"
                    />
                    <div className="mobContent">
                        <div className="userAppDownload">
                            <Link href={isiOS()} target="_blank" className="p-0">
                                <button className="downloadAppBtn fs16fwb">Download App</button>
                            </Link>
                        </div>
                        <div className="d-flex adsLandingUserbanner">
                            {bannerContent.map((data, idx) => {
                                return (
                                    <div key={idx} className="userBannerCountWrapper">
                                        <div className="d-flex align-items-baseline bannerContentWrapper">
                                            <div className="fs24m20fw800 adLandingUserTitle">{data.title}</div>
                                            <Image src={data.image} width={15} height={15} alt="plus-img" />
                                        </div>
                                        <div className="fs14m13fw500 text-start">{data.desc}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserGeneralBanner;