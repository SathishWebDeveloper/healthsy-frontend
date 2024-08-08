import { useState, useEffect, memo } from "react";
import Link from 'next/link'
import axios from "axios";
import Image from "next/image";

const logo_google_playstore_outline = "/assets/homepage/logo-google-playstore-outline.svg";
const logo_app_playstore_outline = "/assets/homepage/logo-app-playstore-outline.svg";

const LaunchingShortly=()=>{

    const [activeStatus, setActiveStatus] = useState("")

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: "user-app" })
            .then((response) => {
                setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
            });
    }, [])

    return(
        <div className="launching-shortly-section">
            <div className="container launching-shortly-box">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className='title'>Download Now !</h4>
                        <p>Make us your trusted healthcare partner for your daily healthcare needs!</p>
                    </div>
                    <div className="col-md-6 launching-shortly-btn-section">
                    <Link href={activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"} target="_blank">
                         <button className='btn px-4 py-3 launching-google-btn'><Image src={logo_google_playstore_outline} alt="Google Play" width={56} height={32}/><span>Google Play</span></button>
                        </Link>
                        <Link href={activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"} target="_blank">
                         <button className='btn px-4 py-3 launching-app-btn'><Image src={logo_app_playstore_outline} alt="App Store" width={57} height={37}/><span>App Store</span></button>
                        </Link>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default memo(LaunchingShortly);