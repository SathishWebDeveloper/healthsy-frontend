import Image from "next/image"

import useIsDesktop from "../Hooks/useIsDesktop"

const healthsy = "/assets/icons/healthsy.svg"
const subs = "/assets/icons/subs.svg"
const doctor = "/assets/icons/doctor.svg"
const message = "/assets/icons/message.svg"
const home = "/assets/icons/home.svg"

const reasonsList = [
    {
        image: healthsy,
        title: "HealthSy Plus Membership",
        desc: "Save more on your monthly medical bills, earn cashback, free medicine deliveries through HealthSy Plus Membership",
    },
    {
        image: subs,
        title: "HealthSy Advantage Subscriptions",
        desc: "Never run out of your refills with HealthSy Advantage Subscriptions",
    },
    {
        image: doctor,
        title: "Top Doctors and Clinics",
        desc: "Search and book in-clinic appointments in 30+ Cities with cancellation and rescheduling option",
    },
    {
        image: message,
        title: "Seamless Online Doctor Consulations",
        desc: "Consult online With doctors from 25+ specializations via audio, video and chat",
    },
    {
        image: home,
        title: "Quality Home Healthcare Services",
        desc: "Book qualified and experienced home healthcare professionals in 12+ major cities for 6 categories",
    },

]

const Reasons = () => {
    const isDesktop = useIsDesktop()

    return (
        <>
            <div className="reasonSection container">
                <div className="fs36m24fwb text-center">5 Reasons why you should download the HealthSy app</div>
                <div className="reasonsWrapper">
                    {
                        reasonsList.map((data, inx) => {
                            return (
                                <div key={inx} className="reason">
                                    <div className="reasonImgWrapper">
                                        <Image
                                            src={data.image}
                                            width={48}
                                            height={48}
                                            className="reasonImg"
                                            alt="reason"
                                        />
                                        <div className="fs18m16fwb primaryColor reasonTitle">{data.title}</div>
                                    </div>
                                    <div className="fs16m14 reasonsDesc">{data.desc}</div>
                                </div>
                            )
                        })
                    }
                </div>
                <buttton className="servicesNowBtn flexCenter fs16fwb">{isDesktop ? "Experience Our Services Now" : "Download Now"}</buttton>
            </div>
        </>
    )
}

export default Reasons;