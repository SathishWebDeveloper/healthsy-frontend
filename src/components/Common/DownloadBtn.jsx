import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const ApkPath = "https://healthsy.app/assets/apk/instadoc.apk"

const DownloadBtn = ({
    setDownloadModal = () => { },
    setBannerQrImg = () => { },
    btnClassName = "downloadAppBtn",
    pageName = "",
    btnText = "Download App",
    setAndroidLogo = () => { },
    instaDocApk = false
}) => {

    const [activeStatus, setActiveStatus] = useState("");
    const [isDesktop, setIsDesktop] = useState(false);
    const navigate = useRouter().push

    const getCategoty = () => {
        if (pageName === "for-doctors") {
            return "doctor-app"
        } else if (pageName === "for-home-healthcare-service-providers") {
            return "home-healthcare-app"
        } else if (pageName === "for-retail-pharmacies") {
            return "pharmacy-app"
        } else {
            return "user-app"
        }
    }

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: getCategoty() })
            .then((response) => {
                setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
            });
    }, [])

    useEffect(() => {
        const media = window.matchMedia('(min-width: 769px)');
        const listener = () => setIsDesktop(media.matches);
        listener();
        window.addEventListener('resize', listener);

        return () => window.removeEventListener('resize', listener);
    }, [isDesktop]);


    const isiOS = () => {
        const iOS = /iPhone|iPad|iPod|Macintosh/i.test(global?.navigator?.userAgent);
        if (iOS) {
            return activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"
        } else {
            return activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"
        }
    }

    const showDownloadModal = () => {
        setDownloadModal(true)
        if (pageName === "online-consultation") {
            setBannerQrImg("online-consultaion")
        } else if (pageName === "in-clinic-appointment") {
            setBannerQrImg("in-clinic-appointment")
        } else if (pageName === "home-healthcare-service") {
            setBannerQrImg("home-healthcare-service")
        } else if (pageName === "for-insta-doc") {
            setAndroidLogo(true)
        }
    }

    return (
        isDesktop ? (
            <button className={`btn ${btnClassName}`} onClick={() => showDownloadModal()}>{btnText}</button>
        ) : (
            <Link href={instaDocApk ? ApkPath : isiOS()} target="_blank">
                <button className={`btn ${btnClassName}`}>{btnText}</button>
            </Link>)
    )
}

export default DownloadBtn