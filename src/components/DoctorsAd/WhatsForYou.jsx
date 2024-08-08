import { Image } from "react-bootstrap";

const speakerIcon = "/assets/radioIcon.svg";
const peopleIcon = "/assets/people1.svg";
const dollarIcon = "/assets/dollar.svg"

const AdsLanding = [
    {
        image: dollarIcon,
        title: "Increase in revenue"
    },
    {
        image: peopleIcon,
        title: "Access to patients"
    },
    {
        image: speakerIcon,
        title: "Gain from our marketing"
    }
]

const WhatsForYou = () => {
    return (
        <div className="container forYouSection">
            <h1 className="text-center fs36m24fwb">What’s in it for you ?</h1>
            <div className="adForms">
                {AdsLanding.map((data, idx) => {
                    return (
                        <div key={idx} className={`forYouContent runningBorder`}>
                            <Image src={data.image} width="48" height="48" className="adLandingImage" alt="icon" />
                            <div className="adLandingContent fs20m16fwb">{data.title}</div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default WhatsForYou;