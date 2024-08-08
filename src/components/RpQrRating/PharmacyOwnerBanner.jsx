import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const location = "/assets/icons/location-white.svg"
const logo = "/assets/white-logo.svg"
const pills = "/assets/Pills.svg"

const PharmacyOwnerBanner = () => {
    const [pharmacyIDList, setPharmacyIDList] = useState([]);

    const router = useRouter()

    useEffect(() => {
        getPharmacyIDList()
    }, [])

    const queryParams = {
        pharmacy_id: router.query.id,
    };


    const getPharmacyIDList = () => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APP_API_URL}rp-qr-ratings/pharmacy-id-list`, {
                params: queryParams
            })
            .then((response) => {
                setPharmacyIDList(response?.data?.rows);
            });
    }

    return (
        <div className="bg-primary pharmacyOwnerBanner position-relative">
            <div className="container">
                <div className="d-flex pharmacyBannerContent">
                    <Image
                        src={logo}
                        width={144}
                        height={40}
                        alt="logo"
                        className="mobContent mb-4"
                    />
                    <div className="pharmacyLogoWrapper bg-white primaryColor flexCenter">{pharmacyIDList[0]?.name.charAt(0)}</div>
                    <div className="text-white">
                        <div className="pharmacyName fs48m24fw800 text-white">{pharmacyIDList[0]?.name}</div>
                        <div className="flexAlignCenter pharmacyLocation">
                            <Image src={location} alt="location" width={14} height={14} className="me-2" />
                            <div className="fs20m14">{pharmacyIDList[0]?.city}</div>
                        </div>
                        <div className="pharmacyIdWrapper fs16fw500">
                            Partner ID : {pharmacyIDList[0]?.pharmacy_id}
                        </div>
                    </div>
                </div>
            </div>
            <Image
                src={pills}
                width={190}
                height={90}
                alt="pills"
                className="topPhill"
            />
            <Image
                src={pills}
                width={190}
                height={90}
                alt="pills"
                className="bottomPhill"
            />
        </div>
    )
}

export default PharmacyOwnerBanner;