import Image from "next/image" 

const instaDocAndroidAppBanner = "/assets/instadoc-android-app/instadoc-web-banner.webp"
const instaDocAndroidAppMobileBanner = "/assets/instadoc-android-app/insta-doc-mobile-banner.webp"
const roundTick = "/assets/icons/round-tick.svg"

const instaDocLists = [
    {
        image: roundTick,
        text: "Consult via audio, video or chat"
    },
    {
        image: roundTick,
        text: "Manage your practice on the go"
    },
    {
        image: roundTick,
        text: "Write easy digital prescription"
    },
    {
        image: roundTick,
        text: "Manage your check-in and check out metrics at ease"
    }
]

const instaDocBanner = () => {
    return (
        <>
            <div className="instaDocBannerSection bg-primary text-center">
                <div className="instaDocBannerpt">
                    <div className="firstTitle">Hello Doctor!</div>
                    <div className="secondTitle">Download the InstaDoc app now</div>
                </div>
                <div className="instaDocAppBanner desktopContent">
                    <Image
                        src={instaDocAndroidAppBanner}
                        width={1000}
                        height={453}
                        alt="InstaDoc Android App Banner"                    
                    />
                </div>
                <div className="instaDocAppBanner mobContent">
                    <Image
                        src={instaDocAndroidAppMobileBanner}
                        width={400}
                        height={400}
                        className="img-fluid w-100"
                        alt="InstaDoc Android App Mobile Banner"                    
                    />
                    <div className="instaDocLists">
                        {
                            instaDocLists.map((data,index) => {
                                return (
                                    <>
                                    <div key={index} className="instaDocListsPoint">
                                        <div className="points">
                                            <span><Image src={data.image} width={16} height={16} className="roundTick" alt="round-tick" /></span>
                                            {data.text}
                                        </div>
                                    </div>
                                    </>
                                )}
                            )
                        }                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default instaDocBanner