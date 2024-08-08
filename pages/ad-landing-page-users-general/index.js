import { useEffect, useState } from "react"
import axios from "axios"

import Medicine from "../../src/components/UserGeneralWeb/Medicine"
import LetYouDown from "../../src/components/DoctorsAd/LetYouDown"
import YourProfession from "../../src/components/DoctorsAd/YourProfession"
import DoctorsFAQ from "../../src/components/DoctorsAd/DoctorsFAQ"
import useIsDesktop from "../../src/components/Hooks/useIsDesktop"
import AdvertiesmentFooter from "../../src/components/Layouts/Footer/AdvertiesmentFooter"
import Reasons from "../../src/components/UserGeneralWeb/Reasons"
import UserGeneralMembership from "../../src/components/UserGeneralWeb/UserGeneralMembership"
import UserGeneralBanner from "../../src/components/UserGeneralWeb/UserGeneralBanner"
import UserGeneralServices from "../../src/components/UserGeneralWeb/UserGeneralServices"
import CTAMobileFooter from "../../src/components/Common/ctaMobileFooter"

const FaqArr = [
    {
        qus: "What is HealthSy?",
        ans: "HealthSy is a health-tech startup that caters to the needs of immediate and recurring healthcare services by simplifying the the way that these healthcare services or rather processes are done by people on daily basis by embracing technology."
    },
    {
        qus: "What services do you offer?",
        ans: "Our services include enabling you to buy genuine medicines online via subscription model, consulting with experienced doctors across 25+ specialisations via audio, video and chat, helping you book in-clinic appointments with top doctors in 30+ cities and providing you with quality."
    },
    {
        qus: "Why should I buy medicines on your platform?",
        ans: `You can choose HealthSy to buy your medicines online because:
              1. 100% Genuine medicines fulfilled only by licensed partnered retail pharmacies 
              2. Quick and safe doorstep delivery 
              3. Prescription validated only by licensed pharmacists
              4. Earn cashbacks on medicine orders through HealthSy Plus Membership
              5. Buy medicines on subscription model so that you never have to run out of your refills`,
        list: true,
    },
    {
        qus: "Why should I opt for online doctor consultations on your platform?",
        ans: `1. We on-board only verified doctors 
              2. 25+ online consultation specialisation 
              3. Consult via audio, video and chat 
              4. Free follow ups 
              5. Digital prescriptions
              6. Free online doctor consultations with HealthSy Plus Membership`,
        list: true,
    },
    {
        qus: "Why should I book in-clinic doctor appointments on your platform?",
        ans: `1. We on-board only verified clinics 
              2. 25+ In-clinic specialisations  
              3. Reschedule or cancel appointments on the app 
              4. Book appointments in 30* cities in India`,
        list: true,
    },
    {
        qus: "Why should I book home healthcare services on your platform?",
        ans: `1. We onboard only verified and qualified home healthcare service providers on our platform 
              2. 6+ Service categories 
              3. Reschedule or cancel bookings on the app 
              4. Flat 10% off on all home healthcare booking for HealthSy Plus members`,
        list: true,
    },
    {
        qus: "What is HealthSy Plus Membership? How does it benefit me as a customer?",
        ans: ` 1. Earn cashbacks on medicine and healthcare product orders 
               2. Free delivery of medicine orders 
               3. Free online doctor consultations 
               4. 10% off on all home healthcare bookings`,
        list: true,
    },
    {
        qus: "Is your app available on both App Store and Play Store?",
        ans: `Yes, HealthSy app is available both on App Store and Play Store.`
    },
    {
        qus: "Is it safe to download the app?",
        ans: `Yes, we are 100% safe and secured platform. Our objective is to be your daily healthcare partner.`
    }
]

const UserGeneral = (props) => {
    const isDesktop = useIsDesktop()
    const [activeStatus, setActiveStatus] = useState("")
    const [showCTAcard, setShowCTAcard] = useState(true);

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: "user-app" })
            .then((response) => {
                setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
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

    return (
        <>
            <UserGeneralBanner isiOS={isiOS} setDownloadModal={props.setDownloadModal} />
            <Medicine 
            userGeneral = {true}
            />
            <Reasons />
            <UserGeneralMembership isiOS={isiOS} setDownloadModal={props.setDownloadModal} />
            <LetYouDown />
            <YourProfession
                navigateLink={"/ad-landing-page-users-general/register"}
                isiOS={isiOS}
                userGeneral={true}
            />
            <UserGeneralServices />
            <DoctorsFAQ
                FaqArr={FaqArr}
                Classname="DoctorsAdFQA" />
            <AdvertiesmentFooter
                mobile="080-69458189"
            />

            {showCTAcard && (
                <CTAMobileFooter
                    ctxBannerText="Download our app to experience our services"
                    setShowCTAcard=
                    {setShowCTAcard}
                    isLink={true}
                    hrefValue={isiOS}
                />)}
        </>
    )
}

export default UserGeneral;