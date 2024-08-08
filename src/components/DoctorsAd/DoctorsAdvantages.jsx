import Image from "next/image";

const easyCancell = "/assets/icons/vector_img.svg";
const pay = "/assets/icons/dollar_icon.svg";
const grow = "/assets/icons/grow_icon.svg";
const laptop = "/assets/icons/digital-marketing.svg";
const notepad = "/assets/icons/notes-banner-img.svg";
const doctorDedicatedApp = "/assets/icons/doctors_dedicated_app.svg";

const advantageArr = [
    {
        image: notepad,
        title: "Simple Onboarding Process",
    },
    {
        image: doctorDedicatedApp,
        title: "Dedicated App",
    },
    {
        image: pay,
        title: "Timely Payments",
    },
    {
        image: easyCancell,
        title: "Manage Online & Inclinic Practise",
    },
    {
        image: laptop,
        title: "Digital Journey",
    },
    {
        image: grow,
        title: "Grow with us",
    }
]

const DoctorsAdvantages = () => {
    return (
        <>
            <div className="doctorAdvantagesWrapper">
                <div className="container doctorsAdvantagesSection">
                    <div className="text-center">
                        <div className="fs20fwb text-white">Advantages of HealthSy “Partnered Doctor Network Programme”</div>
                    </div>
                    <div className="advantageBoxes">
                        {advantageArr.map((data, inx) => {
                            return (
                                <div className="advantageBox flexCenter flex-column" key={inx}>
                                    <div className="AdvantageImageWrapper flexCenter">
                                        <Image
                                            src={data.image}
                                            width={28}
                                            height={28}
                                            className="doctorAdvantageImage"
                                            alt="doctor-advantage"
                                        />
                                    </div>
                                    <div className="fs13fwb advanatgeDesc">{data.title}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorsAdvantages;