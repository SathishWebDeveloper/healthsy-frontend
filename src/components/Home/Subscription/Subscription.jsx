import { memo } from "react";

const mobile_outline = "/assets/homepage/mobile-outline.png";
const mobile_subscription = "/assets/healthSy-subscription.gif";
const reminder = "/assets/reminder.svg";
const pay_at_convenience = "/assets/pay_at_convenience.svg";
const change_dosage = "/assets/change_dosage.svg";
const easy_cancellation = "/assets/easy_cancellation.svg";
const offers = "/assets/offers.svg";
const timely_delivery = "/assets/timely_delivery.svg";
const easy_selection = "/assets/easy_selection.svg";
const easy_return_logo = "/assets/easy_return_logo.svg";


const Subscription = () => {
    return (
        <div className='subscription'>
            <div className='container'>
                <div className="subscription-adv-box">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className='content subscription-text-content'>
                                <h5 className='sub-title'>Never Run out of Refills with HealthSy advantage</h5>
                                <h4 className='title'>HealthSy Advantage Subscription</h4>
                                <ul className='features'>
                                    <li><span className='img-container'><img src={reminder} alt="reminder" /></span> Auto Reminders</li>
                                    <li><span className='img-container'><img src={pay_at_convenience} alt="pay_at_convenience" /></span>Pay at your Convenience</li>
                                    <li><span className='img-container'><img src={change_dosage} alt="change_dosage" /></span>Change Dosage</li>
                                    <li><span className='img-container'><img src={easy_cancellation} alt="easy_cancellation" /></span>Easy Cancellation</li>
                                    <li><span className='img-container'><img src={offers} alt="offers" /></span>Offers</li>
                                    <li><span className='img-container'><img src={timely_delivery} alt="timely_delivery" /></span>Timely Delivery</li>
                                    <li><span className='img-container'><img src={easy_selection} alt="easy_selection" /></span>Easy Selection</li>
                                    <li><span className='img-container'><img src={easy_return_logo} alt="easy_return_logo" /></span>Easy Return</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="subscription-img-box">
                                <img className='subscription_mob_img animate-up-down' src={mobile_outline} alt="mobile_outline" />
                                <img className='mobile-img animate-up-down' src={mobile_subscription} alt="mobile_subscription" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Subscription);