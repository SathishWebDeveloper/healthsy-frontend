import Image from "next/image"
import useIsDeskTop from "../Hooks/useIsDesktop"
const healthsyAdvSubs = "/assets/homepage/healthsy-advantage-subscription.svg"
const manWithParcel = "/assets/homepage/man-with-parcel.webp"
const manWithParcelMob = "/assets/homepage/man-with-parcel-mob.webp"
const reminder = "/assets/icons/reminder.svg"
const wallet = "/assets/icons/wallet.svg"
const dosage = "/assets/icons/dosage.svg"
const skip = "/assets/icons/skip.svg"
const offer = "/assets/icons/offer.svg"
const delivery = "/assets/icons/delivery.svg"
const easyReturn = "/assets/icons/return.svg"
const loop = "/assets/icons/loop.svg"

const advantageArr = [
    {
        img: reminder,
        text: "Auto Reminders"
    },
    {
        img: wallet,
        text: "Multiple Payment Methods"
    },
    {
        img: dosage,
        text: "Update Dosage"
    },
    {
        img: skip,
        text: "Skip or Cancel"
    },
    {
        img: offer,
        text: "Free of Cost"
    },
    {
        img: delivery,
        text: "Timely Delivery"
    },
    {
        img: loop,
        text: "Choose Frequency"
    },
    {
        img: easyReturn,
        text: "Easy Return"
    },
]

const AdvantagesOfSubscription = () => {
    const isDeskTop = useIsDeskTop()

    return (
        <>
            <div className="bg-primary advOfsubs position-relative">
                <div className="container text-white">
                    <div className="healthsyAdvSubs d-flex">
                        <Image
                            src={healthsyAdvSubs}
                            width={370}
                            height={47}
                            className="advSubsTopImg"
                            alt="top-img"
                        />
                    </div>
                    <div className="flexBetween advOfsubsWrapper">
                        <div className="advOfsubsContentWrapper">
                            <div className="fs36m22fwb advOfsubsTitle">Never run out of refills with HealthSy Advantage</div>
                            <div className="subsAdvantages">
                                {advantageArr.map((data, inx) => {
                                    return (
                                        <div key={inx} className="flexAlignCenter">
                                            <Image
                                                src={data.img}
                                                width={40}
                                                height={40}
                                                alt="advantage"
                                            />
                                            <div className="subsAdvText fs16m12">{data.text}</div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="subsAdvBtnWrapper">
                                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/healthsy-advantage-subscription`}>
                                    <button className="subsAdvBtn fs16m13fwb">
                                        Learn More
                                    </button>
                                </a>
                            </div>
                        </div>
                        {
                            isDeskTop ? <Image
                                src={manWithParcel}
                                width={312}
                                height={480}
                                alt="man-with-parcel"
                            /> :
                                <Image
                                    src={manWithParcelMob}
                                    width={355}
                                    height={340}
                                    className="manWithParcelMobImg"
                                    alt="man-with-parcel"
                                />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdvantagesOfSubscription;