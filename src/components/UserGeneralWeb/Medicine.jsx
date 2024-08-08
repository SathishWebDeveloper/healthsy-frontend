import Image from "next/image"
import { useRouter } from "next/router"

import useIsDesktop from "../Hooks/useIsDesktop"

const capsule = "/assets/icons/capsule.gif"
const stethoscope = "/assets/icons/stethoscope_icon.svg"
const hospital = "/assets/icons/hospital.svg"
const home = "/assets/icons/stay-at-home.gif"
const chat = "/assets/icons/chat.svg"
const shopping_bag = "/assets/icons/shopping_bag.svg"

const Medicine = ({
    className = "medicalConsultation",
    titleFontStyle = "fs32m24fwb",
    userGeneral = false,
    medicalServiceFontStyle = "fs14fwb"
}) => {
    const navigate = useRouter().push
    const isDesktop = useIsDesktop()

    const medicineDetails = [
        {
            image: capsule,
            title: "Order Medicines",
            navigate: "/order-medicines",
            twoLine: true,
            width: isDesktop ? 45 : 25,
            height: isDesktop ? 45 : 25,
        },
        {
            image: stethoscope,
            title: "Online Doctor Consultations",
            navigate: "/online-doctor-consultations",
            width: isDesktop ? 32 : 25,
            height: isDesktop ? 32 : 25,
        },
        {
            image: hospital,
            title: "In-Clinic Appointments",
            navigate: "/in-clinic-appointments",
            width: isDesktop ? 32 : 24,
            height: isDesktop ? 32 : 24,
        },
        {
            image: home,
            title: "Home Healthcare Services",
            navigate: "/home-healthcare-services",
            width: isDesktop ? 50 : 24,
            height: isDesktop ? 50 : 24,
        },
        {
            image: chat,
            title: userGeneral ? "InstaDoc" : !isDesktop ? "InstaDoc" : "InstaDoc 24x7",
            navigate: "/insta-doc",
            twoLine: true,
            width: isDesktop ? 32 : 22,
            height: isDesktop ? 32 : 22,
        },
        {
            image: shopping_bag,
            title: "Healthcare Products",
            navigate: "/healthcare-products",
            width: isDesktop ? 32 : 24,
            height: isDesktop ? 32 : 24,
        }
    ]

    return (
        <div className={`${className}`}>
            <div className="container OnlineMedicineConsultation">
                <div className="medical">
                    <div className={`${titleFontStyle} userGeneralTitle`}>Medicines, Doctors and more...</div>
                    <div className="usersDoctorMedicine">
                        {medicineDetails.map((data, idx) => {
                            return (
                                <div key={idx} className="medicalDetailsCard cursor-pointer" onClick={() => navigate(`${process.env.NEXT_PUBLIC_WEB_URL}${data.navigate}`)}>
                                    <div className="onlineMedicine">
                                        <Image
                                            src={data.image}
                                            width={data.width}
                                            height={data.height}
                                            alt="medical-img"
                                            className="medicineImg"
                                            loading="lazy" />
                                    </div>
                                    <div className={`${medicalServiceFontStyle} medicineDoctorWeb ${data.twoLine && "max-width-120"}`}>{data.title}</div>
                                </div>
                            )
                        })}
                    </div>
                    {userGeneral && <div className="mobContent text-center">
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/ad-landing-page-users-general/register`}>
                            <button className="btn fs16fwb text-white userGeneralBtn">Experience Our Services Now</button>
                        </a>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Medicine;