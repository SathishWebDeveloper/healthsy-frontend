import Image from "next/image";
import { memo } from "react";

const tick = "/assets/tick-img.svg";
const mobile_outline = "/assets/homepage/order-medicine.gif"

const Ordering = () => {

    const orderPoints = [
        "Medicines Delivered by Licensed Retail Pharmacies only",
        "Timely Deliveries",
        "Buy medicines on Subscription model to save time & energy",
        "Save More on your Monthly Medicine Bills with Plus Membership"
    ]

    return (
        <div className="ordering-medicines-sections ">
            <div className=" ordering-medicines-padding container">
                <div className="d-flex justify-content-between">
                    <div className="mob-text-content">
                        <div className="sub-title fs16fw600">100% DIGITAL AND CONTACTLESS</div>
                        <h2 className="title fs36m22fwb">Ordering Medicines Online was never this Safe and Easy !</h2>
                        <div className="desktopContent">
                            <div className="get-health-care-products-list">
                                <ul>
                                    {orderPoints.map((desc, inx) => {
                                        return (
                                            <li key={inx}>
                                                <div className="flexAlignCenter">
                                                    <Image src={tick} width={18} height={18} alt="tick" className="features-ticks" />
                                                    <div className="fs18m16fw500">{desc}</div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='mt-4 btn-learnMore-wrapper home_page_learn_more'>
                                <a className='flexCenter btn-learnMore' href={`${process.env.NEXT_PUBLIC_WEB_URL}/order-medicines`}>Learn More</a>
                            </div>
                        </div>

                        <div className="mobContent orderingMedicineWrapper">
                            <div className="col-md-6 ordering-medicines-image-content">
                                <div className="ordering-medicines-image">
                                    {/* <Image src={mobile_outline} width={350} height={338} alt="mobile_outline" className="ordering-mockup" /> */}
                                    <Image src={mobile_outline} width={350} height={338} alt="mobile_outline" className="ordering-mockup" />
                                </div>
                            </div>
                            <div className="col-md-12 get-health-care-products-list">
                                <ul>
                                    {orderPoints.map((desc, inx) => {
                                        return (
                                            <li key={inx}>
                                                <div className="flexAlignCenter">
                                                    <Image src={tick} width={18} height={18} alt="tick" className="features-ticks" />
                                                    <div className="fs18m16fw500">{desc}</div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className='btn-learnMore-wrapper home_page_learn_more orderingLearnMoreBtn'>
                                <a className='btn-learnMore flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/order-medicines`}>Learn More</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 ordering-medicines-image-content desktopContent">
                        <div className="ordering-medicines-image">
                            <Image src={mobile_outline} width={536} height={512} alt="mobile_outline" className="ordering-mockup" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Ordering);