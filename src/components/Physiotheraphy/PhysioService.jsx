import Image from "next/image";
import { useState } from "react";
import useIsDesktop from "../Hooks/useIsDesktop";
import PhysioRegistrationForm from "./PhysioRegistrationForm";

const StepperImg = "/assets/Physiotheraphy/Stepper.png"
const physioServiceImg = "/assets/Physiotheraphy/physioService.webp"
const StepperMobImg = "/assets/Physiotheraphy/Step.png"
const arrow = "/assets/Physiotheraphy/book-now-arrow.svg";
const physioServiceWebImg = "/assets/Physiotheraphy/physioServiceImg.webp"

const PhysioService = ({ className = "",
    serviceClassNameTitle = "",
    citiesList, healthConditionsList = [] }) => {

    const [bookNowForm, setBookNowForm] = useState(false);
    const isDesktop = useIsDesktop()

    return (
        <div className={`${className} bookPhysioService text-white`}>
            <div className="container">
                <div className={`${serviceClassNameTitle} serviceTitle desktopContent fs40m24fwb`}>How to book Home-Based Physiotherapy Services</div>
                <div className="serviceMobTitle fs40m24fwb mobContent">How to get ready before a physiotherapy session at your home ?</div>
                <div className="flexBetween physioServiceContent">
                    <div className="d-flex flex-column physioStepImageWrapper">
                        <Image src={StepperImg} width={547} height={365} alt={"StepperImg"} className="physioStepImage desktopContent" />
                        <button
                            className="bgPrimary text-white rounded-pill physioBookBtn fs24m16fw700"
                            onClick={() => setBookNowForm(true)}
                        >
                            <span>Book Now
                                <Image src={arrow} width={12} height={12} className="bookArrow desktopContent" alt="book-arrow" /></span>
                        </button>
                    </div>
                    <div className="stepperImage mobContent">
                        <Image src={StepperMobImg} width={400} height={600} alt="serviceMobImage" className="serviceMobImage" />
                    </div>
                    <Image src={isDesktop ? physioServiceWebImg : physioServiceImg} width={636} height={487} alt="PhysioService" className="physioServiceImage" />
                </div>
            </div>
            <PhysioRegistrationForm bookNowForm={bookNowForm} setBookNowForm={setBookNowForm} citiesList={citiesList} healthConditionsList={healthConditionsList} />
        </div>
    )
}

export default PhysioService

