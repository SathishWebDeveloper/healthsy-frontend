import Image from "next/image";

const physio = "/assets/icons/physiotherapist.svg";
const careTaker = "/assets/icons/care-taker.svg";
const mentalWellness = "/assets/icons/mental-wellness.svg";
const nursingService = "/assets/icons/nursing-service.svg";
const nursingSupport = "/assets/icons/nursing-support.svg";
const speechTheraphy = "/assets/icons/speech-theraphy.svg";

const hhspServicies = [
    {
        image: physio,
        text: "Physiotherapy",
    },
    {
        image: careTaker,
        text: "Caretakers",
    },
    {
        image: mentalWellness,
        text: "Mental Wellness Support",
    },
    {
        image: nursingService,
        text: "Nursing Service",
    },
    {
        image: speechTheraphy,
        text: "Speech Therapy",
    },
    {
        image: nursingSupport,
        text: "Nursing Support",
    },
];

const HhspOnHealthsy = () => {
    return (
        <div className="container hhspOnHealthsy">
            <div className="text-center">
                <h1 className="fs38m28fwb">Home Healthcare <span className="primaryColor">Service Categories on HealthSy</span></h1>
                <span className="fs24m16fw500">“ Qualified and Trained Professionals ”</span>
            </div>
            <div className="serviceCategoryGrid">
                {hhspServicies.map((data, inx) => {
                    return (
                        <div key={inx} className="serviceCategoryWrapper flexCenter flex-column text-center">
                            <Image
                                src={data.image}
                                width={64}
                                height={64}
                                alt="service-category"
                                className="serviceCategoryImg"
                            />
                            <div className="fs15m11fwb serviceCategoryName">{data.text}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default HhspOnHealthsy;