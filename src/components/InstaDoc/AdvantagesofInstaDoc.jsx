import Image from "next/image"

import useIsDesktop from "../Hooks/useIsDesktop";

const money = "/assets/icons/money.svg"
const call = "/assets/icons/call.svg"
const video = "/assets/icons/video.svg"
const document = "/assets/icons/document.svg"

const advantages = [
    {
        image: money,
        title: "Affordable Cost",
        content: "Consult with a general physician anywhere, anytime at INR 199 only!",
        mobContent: "Consult with a general physician anywhere, anytime at INR 199 only!"
    },
    {
        image: call,
        title: "Connect Instantly",
        content: "Connect with your doctor in less than 90 seconds post payment.",
        mobContent: "The doctor will connect with you in less than 90 seconds post payment"
    },
    {
        image: video,
        title: "Multi-Modes",
        content: "You can use audio, video, and chat to consult with your doctor. ",
        mobContent: "You can use audio, video and chat to consult with your doctor"
    },
    {
        image: document,
        title: "Digital Prescription",
        content: "Get a valid digital prescription from your doctor if needed.",
        mobContent: "You will be provided with a valid digital prescription by your doctor if needed"
    }
]

const AdvantagesofInstaDoc = () => {

    const isDesktop = useIsDesktop()

    return (
        <>
            <div className="container newInstaDoc instaDocAdvSection">
                <div className="fs36m24fwb newInstaDocTitle">Why Choose <span className="primaryColor">InstaDoc?</span></div>
                <div className="instaDocContnet fs18m16">Get to know the top benefits of InstaDoc and never have the chance to feel helpless in case you need a qualified doctor.</div>
                <div className="healthSyInstaDoc">
                    {advantages.map((data, idx) => {
                        return (
                            <div key={idx}>
                                <Image src={data.image} width={64} height={64} className="instaDocImg" alt="adv" />
                                <div className="instaDocTitle fs19m18fwb">{data.title}</div>
                                <div className="instaDocDesc fs16">{isDesktop ? data.content : data.mobContent}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default AdvantagesofInstaDoc;