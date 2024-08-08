import Image from "next/image";

const healthCareServiceImg = "/assets/healthcare_service_img.webp";

const UserGeneralServices = () => {
    return (
        <div className="userGeneralServiceWrapper">
            <div className="container userGeneralService d-flex">
                <div className="healthCareService text-white">
                    <div className="fs32m21fwb healthCareServiceTitle desktopContent">We want to simplify the way you <br />do your healthcare services</div>
                    <div className="fs32m21fwb healthCareServiceTitle mobContent">We want to simplify the way you do your healthcare services</div>
                    <div className="fs16m15">To learn more about our services</div>
                    <div className="CallBackBtnWrapper">
                        <a className="p-0" href={`${process.env.NEXT_PUBLIC_WEB_URL}/ad-landing-page-users-general/register`}>
                            <button className="btn fs16fwb primaryColor healthcareServiceBtn">Get a Call-back</button>
                        </a>
                    </div>
                </div>
                <div>
                    <Image src={healthCareServiceImg} width="405" height="402" className="healthcareServiceImg" alt="service-img" />
                </div>
            </div>
        </div>
    )
}

export default UserGeneralServices;