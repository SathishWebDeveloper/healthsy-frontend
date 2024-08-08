import Image from "next/image";

const underline = "/assets/sustainability-policy/green-underline.svg"

const aboutSustainabilityPolicy = () => {
    return (
        <>
            <div className="bg-gray">
                <div className="container">
                    <div className="SustainabilitySection">
                        <div className="SustainabilityTitle fs36m24fwb">
                            What is a <span className="position-relative">Sustainability
                                <Image
                                    src={underline}
                                    width={147}
                                    height={2}
                                    alt="underline"
                                    className="greenUnderline"
                                />
                            </span> Policy at HealthSy?
                        </div>
                        <div className="SustainabilityContent fs18m14fw500">
                            At HealthSy, the idea of sustainability refers to the innovative ways in which our organization functions with the goal of having long-lasting impacts on the people we serve. This means that we have taken a lead in shaping the future of healthcare in an environment friendly and sustainable manner, to help thousands of people be healthier and happier. Sustainable here includes economic and social sustainability as well.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default aboutSustainabilityPolicy;