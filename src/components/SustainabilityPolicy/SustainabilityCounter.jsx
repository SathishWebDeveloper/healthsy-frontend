import { useEffect, useState } from "react"
import axios from "axios"
import Image from "next/image"
import CountUp from "react-countup"

const earth_img = "/assets/sustainability-policy/earth.webp"

const SustainabilityCounter = () => {
    const [count, setCount] = useState("")
    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_APP_API_URL}sustainability-policy-counter/sustainability-policy-counter-list`)
            .then((response) => {
                setCount(response?.data?.rows[0])
            });
    }, [])

    return (
        <div className="sustainabilityCounterSection position-relative">
            <div className="container text-white d-flex sustainabilityMobContentWrapper">
                <div className="sustainabilityContentWrapper text-center">
                    <div className="fs48m36fw800"><CountUp start={1} end={count?.count} duration={5} />+</div>
                    <div className="fs18fwb sustainabilityOrderMedicine">Medicines Orders Delivered Using Eco-Friendly Materials</div>
                </div>
                <div className="sustainabilityImg">
                    <Image src={earth_img} width={434} height={329} alt="earth-img" className="sustainabilityCounterImg" />
                </div>
            </div>
        </div>
    )
}

export default SustainabilityCounter;