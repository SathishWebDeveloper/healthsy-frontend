import Image from "next/image";

const registerView = "/assets/franchise/registerview.webp"
const registerMobView = "/assets/franchise/register-mview.webp"
const bannerTick = "/assets/franchise/banner-tick.svg"

const registerYourInterest = () => {
    return (
        <>
            <div className="container p-0">
                <div className="registerSection text-center">
                    <div className="title fs36m24fwb">Register your interest and wait for callback </div>
                    <div className="sub-title fs18m16">You can own a branded licensed retail pharmacy in 5 simple steps</div>

                    <div className="registerImageSection">
                        <div className="desktopContent">
                            <Image
                                src={registerView}
                                fill
                                className="registerImg"
                                alt="register Banner" />
                        </div>
                        <div className="mobContent">
                            <Image
                                src={registerMobView}
                                fill
                                className="registerImg"
                                alt="register mobile Banner" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default registerYourInterest;