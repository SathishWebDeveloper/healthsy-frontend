import Image from "next/image"
import { useRouter } from "next/router"

const chennai = "/assets/Physiotheraphy/chennai.svg"
const bangalore = "/assets/Physiotheraphy/bangalore.svg"
const newDelhi = "/assets/Physiotheraphy/new-delhi.svg"
const mumbai = "/assets/Physiotheraphy/mumbai.svg"
const hyderabad = "/assets/Physiotheraphy/hyderabad.svg"
const kolkata = "/assets/Physiotheraphy/kolkata.svg"
const noida = "/assets/Physiotheraphy/noida.svg"
const kochi = "/assets/Physiotheraphy/kochi.svg"
const ahmedabad = "/assets/Physiotheraphy/ahmedabad.svg"
const coimbatore = "/assets/Physiotheraphy/coimbatore.svg"
const gurugram = "/assets/Physiotheraphy/gurugram.svg"
const vizag = "/assets/Physiotheraphy/vizag.svg"

const citiesArr = [
    {
        image: chennai,
        name: "Chennai",
        bgColor: "#FEEBEA",
        width: 60,
        height: 85,
        navigateTo: ""
    },
    {
        image: bangalore,
        name: "Bangalore",
        bgColor: "#FEFBEA",
        width: 78,
        height: 83,
        navigateTo: ""
    }, {
        image: newDelhi,
        name: "New Delhi",
        bgColor: "#ECEAFE",
        width: 79,
        height: 79,
        navigateTo: ""
    }, {
        image: mumbai,
        name: "Mumbai",
        bgColor: "#FCEAFE",
        width: 64,
        height: 64,
        navigateTo: "physiotherapy-mumbai"
    }, {
        image: hyderabad,
        name: "Hyderabad",
        bgColor: "#FEF4EA",
        width: 61,
        height: 88,
        navigateTo: ""
    }, {
        image: kolkata,
        name: "Kolkata",
        bgColor: "#EAF2FE",
        width: 96,
        height: 65,
        navigateTo: ""
    }, {
        image: noida,
        name: "Noida",
        bgColor: "#FEEAFE",
        width: 65,
        height: 85,
        navigateTo: ""
    }, {
        image: kochi,
        name: "Kochi",
        bgColor: "#EAFEEE",
        width: 60,
        height: 71,
        navigateTo: ""
    }, {
        image: ahmedabad,
        name: "Ahmedabad",
        bgColor: "#F6FEEA",
        width: 99,
        height: 59,
        navigateTo: ""
    }, {
        image: coimbatore,
        name: "Coimbatore",
        bgColor: "#EEFEEA",
        width: 35,
        height: 81,
        navigateTo: ""
    }, {
        image: gurugram,
        name: "Gurugram",
        bgColor: "#EAF9FE",
        width: 70,
        height: 79,
        navigateTo: ""
    }, {
        image: vizag,
        name: "Vizag",
        bgColor: "#FFF7F7",
        width: 94,
        height: 76,
        navigateTo: ""
    },
]
const Cities = () => {
    const navigate = useRouter().push
    return (
        <div className="citiesSection container">
            <div className="fs40m24fwb citiesTitle">We are in <span className="primaryColor">12 cities</span></div>
            <div className="cityBoxes">
                {citiesArr.map((city, inx) => {
                    return (
                        <div key={inx} className="cityBox flexCenter flex-column">
                            <div className="cityImageContainer flexCenter cursor-pointer" style={{ background: city.bgColor }} onClick={() => navigate(`/home-healthcare-services/physiotherapy/${city.navigateTo}`)}>
                                <Image
                                    src={city.image}
                                    width={city.width}
                                    height={city.height}
                                    alt="city-image"
                                    className="cityImage"
                                />
                            </div>
                            <div className="fs24m16fwb cityName cursor-pointer" onClick={() => navigate(`/home-healthcare-services/physiotherapy/${city.navigateTo}`)}>{city.name}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Cities;