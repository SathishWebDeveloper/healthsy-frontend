import Image from "next/image";
import { RiPlayCircleFill } from "react-icons/ri";

const steps = "/assets/insta-doc/web-insta-doc-steps.webp"
const stepsMob = "/assets/insta-doc/mob-insta-doc-steps.webp"

const instaDocStepsList = [
    {
        title: "Download the App",
        desc: "Download the HealthSy app from Play Store or App Store"
    },
    {
        title: "Submit your Details",
        desc: "Fill the details in the form such as patient name, symptoms, age & gender"
    },
    {
        title: "Payment",
        desc: "Ensure to review the details after submission and make your payment."
    },
    {
        title: "Consult & Get Diagnosed",
        desc: "Connect with a general physician instantly within 90 seconds of payment."
    },
]

const InstaDocSteps = () => {
    return (
        <>
            <div className="instaDocStepsSection container">
                <div className="flexBetween align-items-center">
                    <div className="instaDocStepsHeadingWrapper">
                        <div className="fs36m24fwb instaDocStepsheading">Is It Easy to Consult with a <h2 className="fs36m24fwb d-inline">General Physician</h2> Using InstaDoc?</div>
                        <div className="fs18m16"> Find and consult general physicians at any time on InstaDoc.</div>
                    </div>
                    <button className="watchVideoBtn flexCenter desktopContent"><RiPlayCircleFill size={30} className="pe-1" />Watch Video</button>
                </div>
                <div className="flexBetween align-items-end instaDocStepsContainer">
                    <div className="instaDocStepsContentWrapper">
                        <div className="instaDocstepsWrapper fs16m14fw600 flexCenter fw-bold">4 - Step Process</div>
                        <div className="instaDocStepGrid">
                            {instaDocStepsList.map((data, inx) => {
                                return (
                                    <div className="instaDocStepGridBox">
                                        <div className="stepNoWrapper flexCenter fs12m16fw600">{`0${inx + 1}`}</div>
                                        <div className="instaDocStepsTitle fs18fwb">{data.title}</div>
                                        <h2 className="fs15m16">{data.desc}</h2>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <Image
                        src={steps}
                        width={510}
                        height={608}
                        className="desktopContent"
                        alt="steps"
                    />
                </div>
                <button className="watchVideoBtn flexCenter mobContent"><RiPlayCircleFill size={30} className="pe-1" />Watch Video</button>
                <div className="flexCenter">
                    <Image
                        src={stepsMob}
                        width={300}
                        height={357}
                        className="mobContent"
                        alt="steps"
                    />
                </div>
            </div>
        </>
    )
}

export default InstaDocSteps;