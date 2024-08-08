import Image from "next/image"

const tick = "/assets/icons/tick.svg"

const benefits = [
    {
        image: tick,
        title: "Auto-Reminders",
        content: "You will be notified of your upcoming subscription order via SMS, mail & in-app notifications."
    },
    {
        image: tick,
        title: "Choose Frequency",
        content: "You can get your medicine refills every 15, 30, or 45 days based on your own preferences."
    },
    {
        image: tick,
        title: "Multiple Payment Methods",
        content: "You can choose to pay at the time of delivery using cash or any digital mode of payment."
    },
    {
        image: tick,
        title: "Skip Subscription",
        content: "You have an easy option to skip the entire subscription order before the dispatch process."
    },
    {
        image: tick,
        title: "Cancel Subscription",
        content: "You can choose to cancel the entire ongoing subscription at ease from your application itself."
    },
    {
        image: tick,
        title: "Update Subscription",
        content: "You can update the subscription in terms of quantity or remove a particular item based on your needs."
    },
    {
        image: tick,
        title: "Timely Delivery",
        content: "Receive your subscription order delivered one day prior to the expiry date of your refills."
    },
    {
        image: tick,
        title: "Free of Cost",
        content: "It is completely free of cost for the users to begin with HealthSy Advantage Subscription."
    },
    {
        image: tick,
        title: "Easy Return",
        content: "You can place an easy return for the items in the subscription order if you don’t require it."
    }
]

const BenefitsofAdvantageSubscrition = () => {

    return (
        <div className="container healthSySubscriptionContianer">
            <div className="fs36m22fwb healthSySubscriptionBenefits">Get to Know the Benefits of  <span className="primaryColor">HealthSy Advantage Subscription</span></div>
            <div className="healthsySubscription">
                {benefits.map((data, index) => {
                    return (
                        <div key={index} className="healthSyAdvantageSubsctiption">
                            <div className="d-flex">
                                <Image src={data.image} width={17} height={20} className="healthSySubscriptionImage" alt="adv" />
                                <div className="fs20fwb healthsySubscriptionTitle">{data.title}</div>
                            </div>
                            <div className="fs16 healthSyContent">{data.content}</div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export default BenefitsofAdvantageSubscrition