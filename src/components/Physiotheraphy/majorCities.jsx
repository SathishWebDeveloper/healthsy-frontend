import { useRouter } from "next/router"

const majorCitiesArr = [
   {cityName: "Bengaluru", navLink:""},
   {cityName: "Chennai", navLink:""},
   {cityName: "Kochi", navLink:""},
   {cityName: "New Delhi", navLink:""},
   {cityName: "Gurugram", navLink:""},
   {cityName: "Vizag", navLink:""},
   {cityName: "Coimbatore", navLink:""},
   {cityName: "Hyderabad", navLink:""},
   {cityName: "Ahmedabad", navLink:""},
   {cityName: "Mumbai", navLink:"physiotherapy-mumbai"},
   {cityName: "Noida", navLink:""},
   {cityName: "Kolkata", navLink:""},
]

const MajorCities = () => {
    const navigate = useRouter().push
    return (
        <div className="majorCitiesSectionWrapper">
            <div className="majorCitiesSection container">
                <div className="fs42m24fwb majorCitiesTitle" >Physiotherapy Services available in other <span className="primaryColor"> Major Cities</span></div>
                <div className="majorCitiesGrid">
                    {majorCitiesArr.map((majorCity, inx) => {
                        return (
                            <div key={inx} className="fs21m14fw500 majorCities">
                               
                                Physiotherapy Services in <span className="primaryColor cursor-pointer" onClick={()=>navigate(`/home-healthcare-services/physiotherapy/${majorCity?.navLink}`)}>{majorCity.cityName}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MajorCities;