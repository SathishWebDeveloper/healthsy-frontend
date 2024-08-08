import Image from "next/image";

const growing = "/assets/healthsyLife/growing.svg"
const ecosystem = "/assets/healthsyLife/eco-friendly.svg"
const daimond = "/assets/healthsyLife/diamond.svg"
const verify = "/assets/healthsyLife/verify.svg"

const JoinHealthsy = () => {
    return (
        <div className="container joinHealthsy">
            <div className="d-flex w-100 join-healthsy-content">
                <div className="w-100">
                    <div className="d-flex flex-column life-question">
                    <h2 className="why-healthsylife me-2">Why Join</h2>
                    <h2 className="why-healthsylife">HealthSy?</h2>
                    </div>
                    <p className="mt-4 why-healthsylife-answer">When you join HealthSy, you get to be a part of our dream – “Affordable healthcare to every individual in this country”. You get to touch the lives of millions of people across the country and help them lead a healthy life. If this is not enough, here are some other reasons why you should join us-</p>
                </div>
                <div className="why-healthsylife-reasons">
                    <div className="d-flex life-reason-pair">
                        <div>
                            <div className="joinHealthsyImages flexCenter">
                                <Image src={growing}
                                width={35}
                                height={35}
                                alt="My Image"
                            />
                            </div>
                            <h2 className="mt-4 join-reason">Growing Sector</h2>
                            <p className="mt-4 join-reason-answer">Be a part of a booming health-tech sector. Join us and scale up your career in leaps and bounds. </p>
                        </div>
                        <div className="ms-4 life-ecosystem">
                            <div className="joinHealthsyImages flexCenter">
                                <Image src={ecosystem}
                                width={35}
                                height={35}
                                alt="My Image"
                            />
                            </div>
                            <h2 className="mt-4 join-reason">Positive Ecosystem</h2>
                            <p className="mt-4 join-reason-answer">Be a part of a vibrant and young culture that is filled with energetic and like-minded people. </p>
                        </div>
                    </div>
                    <div className="d-flex life-reason-pair">
                        <div>
                            <div className="joinHealthsyImages flexCenter">
                                <Image src={daimond}
                                width={35}
                                height={35}
                                alt="My Image"
                            />
                            </div>
                            <h2 className="mt-4 join-reason">Inculcate Excellence </h2>
                            <p className="mt-4 join-reason-answer">Be a part of a workforce that is analytical and drives excellence and innovation on a day-to-day basis. </p>
                        </div >
                        <div className="ms-4 life-transparent">
                            <div className="joinHealthsyImages flexCenter">
                                <Image src={verify}
                                width={35}
                                height={35}
                                alt="My Image"
                            />
                            </div>
                            <h2 className="mt-4 join-reason">100% Transparent</h2>
                            <p className="mt-4 join-reason-answer">Be a part of an organization which encourages trust and transparency between every individual and teams.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JoinHealthsy;