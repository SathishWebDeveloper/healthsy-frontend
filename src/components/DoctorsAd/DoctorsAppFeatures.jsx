import Image from "next/image";
import useIsDesktop from "../Hooks/useIsDesktop"

const pay = "/assets/rupee.svg";
const videoCamera = "/assets/icons/video-camera.svg";
const notes = "/assets/icons/notes.svg";
const clock = "/assets/icons/squre-clock.svg";
const rigthArrow = "/assets/icons/rigth-arrow.svg";
const mobile = "/assets/icons/mobile.svg";

const DoctorsAppFeatures = () => {
    const isDesktop = useIsDesktop()

    const featuresArr = [
        {
            image: isDesktop ? pay : mobile,
            desc: "Track all your payments and settlements from the grow section on the app"
        },
        {
            image: videoCamera,
            desc: "Consult via audio, video or chat with your patients"
        },
        {
            image: notes,
            desc: "Doctor-friendly digital prescription generator"
        },
        {
            image: clock,
            desc: "Manage your availabilities and time slots based on your convenience"
        },
    ]
    return (
        <div className="container doctorsAppFeatureSection">
            <div className="fs36m19fwb text-center text-white bgPrimary featuresHeading">Features of the HealthSy - Doctors App</div>
            <div className="flexCenter featureBoxes">
                {featuresArr.map((data, inx) => {
                    return (
                        <div className="flexCenter featureContent" key={inx}>
                            <div className="featureBox">
                                <Image
                                    src={data.image}
                                    width={30}
                                    height={30}
                                    alt="doctor-feature"
                                    className="doctorfeatureImage"
                                />
                                <div className="featureDesc">{data.desc}</div>
                            </div>
                            {inx !== 3 && <Image
                                src={rigthArrow}
                                width={24}
                                height={24}
                                alt="right-arrow"
                                className="featuresRightArrow"
                            />}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DoctorsAppFeatures;