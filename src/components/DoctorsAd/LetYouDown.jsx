import Image from "next/image"

const musicIcon = "/assets/music.svg";
const peopleIcon = "/assets/mask.svg";

const AdsLanding = [
    {
        image: musicIcon,
        title: "Sound Help and Support",
        content: "You can reach out to us for any help and support related issues via call, chat or mail"
    },
    {
        image: peopleIcon,
        title: "Dedicated Relationship Manager",
        content: "You will be assigned a dedicated ‘Relationship Manager’ for all sorts of assistance and help"
    }
]

const LetYouDown = () => {
    return (
        <div className="container adLandingSection">
            <h1 className="adsHeaderTitle fs36m24fwb text-center">We never want to let you down !</h1>
            <div className="adsFormSection d-flex ">
                {AdsLanding.map((value, idx) => {
                    return (
                        <div key={idx} className="adsLandingBox">
                            <div className="adsLandingFormat d-flex">
                                <Image src={value.image} width="32" height="32" className="adsLandingImageIcon" alt="icon" />
                                <div className="adsLandingTitle fs20m18fwb">{value.title}</div>
                            </div>
                            <div className="adsLandingContent fs16m14">{value.content}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default LetYouDown 