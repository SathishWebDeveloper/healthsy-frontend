import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import CountUp from "react-countup";
import axios from "axios";

import VideoModal from "../Common/videoModal";
import useIsDesktop from "../Hooks/useIsDesktop";

const homeBannerImg = "/assets/homepage/home-banner.webp";
const homeBannerImgMob = "/assets/homepage/home-banner-mob.webp";
const playBtn = "/assets/icons/watch-video-play-button.svg";
const plusIcon = "/assets/icons/plus-icon.svg"
const liveChat = "/assets/homepage/live-chat.gif";

const HomeBanner = ({ isiOS, setDownloadModal = () => { }, setBannerQrImg = () => { } }) => {

    const isDesktop = useIsDesktop()
    const [videoModal, setVideoModal] = useState(false)
    const [homeCounterList, setHomeCounterList] = useState("")

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APP_API_URL}home-counter/home-counter-list`)
            .then((response) => {
                setHomeCounterList(response?.data?.rows[0])
            });
    }, [])

    const bannerContent = [
        {
            title: <><CountUp start={1} end={homeCounterList?.mediacl_bills_count} duration={10} /> Lakhs</>,
            image: plusIcon,
            desc: "Saved on monthly medical bills"
        },
        {
            title: <><CountUp start={1} end={homeCounterList?.doctor_count} duration={5} /></>,
            image: plusIcon,
            desc: "Partnered Doctors"
        },
    ]

    const showDownloadModal = () => {
        setDownloadModal(true)
        setBannerQrImg("home")
    }

    return (
        <>
            <div className="bg-primary text-white">
                <div className="container homeBanner flexBetween position-relative">
                    <div>
                        <h1 className="fs48m27fw800 fst-italic homeBannerTitle">All-in-one Healthcare App</h1>
                        <div className="fs18m16 homeBannerSubTitle">Look no further than HealthSy to get all your healthcare needs sorted</div>
                        <div className="homeBannerBtnsWrapper">
                            {isDesktop ? (
                                <button className="homeBannerDownloadBtn fs16fwb primaryColor bg-white" onClick={() => showDownloadModal()}>Download App</button>
                            ) : (
                                <Link href={isiOS()} target="_blank">
                                    <button className="homeBannerDownloadBtn fs16fwb primaryColor bg-white">Download App</button>
                                </Link>)}
                            <button className="homeBannerVideoBtn bg-primary" onClick={setVideoModal} >
                                <Image
                                    src={playBtn}
                                    width={24}
                                    height={24}
                                    alt="play-button"
                                    className="videoPlayImg"
                                />
                                <span className="text-white fs16fwb">Watch Video</span>
                            </button>
                        </div>
                        <div className="mobContent flexCenter">
                            <Image
                                src={homeBannerImgMob}
                                width={300}
                                height={410}
                                alt="home-banner-mob-img"
                                className="homeBannerMobImg"
                            />
                        </div>
                        <div className="d-flex homBannerCounterSection desktopContent">
                            {bannerContent.map((data, idx) => {
                                return (
                                    <div key={idx} className="homeBannerCounterWrapper">
                                        <div className="d-flex align-items-baseline">
                                            <div className="fs26m19fw800 homeBannerCount">{data.title}</div>
                                            <Image src={data.image} width={15} height={15} alt="plus-img" />
                                        </div>
                                        <div className="fs13m12fw500 text-start">{data.desc}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Image
                        src={homeBannerImg}
                        width={523}
                        height={673}
                        alt="home-banner"
                        className="desktopContent homeBannerImg"
                        priority
                    />
                    <Image
                        src={liveChat}
                        width={160}
                        height={100}
                        alt="live-chat"
                        className="liveChatImg desktopContent"
                    />
                </div>
                <div className="d-flex homBannerCounterMobSection mobContent">
                    {bannerContent.map((data, idx) => {
                        return (
                            <div key={idx} className="homeBannerCounterWrapper">
                                <div className="d-flex align-items-baseline">
                                    <div className="fs26m19fw800 homeBannerCount">{data.title}</div>
                                    <Image src={data.image} width={15} height={15} alt="plus-img" />
                                </div>
                                <div className="fs13m12fw500 text-start">{data.desc}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <VideoModal
                videoModal={videoModal}
                setVideoModal={setVideoModal}
            />
        </>
    )
}

export default HomeBanner;