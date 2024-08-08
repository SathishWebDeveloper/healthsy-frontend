const Details = [
    "Speech Therapy",
    "Nursing Support Services",
    "Nursing Services",
    "Nursing Support Services",
    "Caretakers",
]

const mobDetails = [
    "Speech Theraphy",
    "Mental Wellness Theraphy",
    "Nursing Services",
    "Nursing Support Services",
    "Caretakers"
]

const OtherHomeHealthCareService = () => {
    return (
        <div className="container healthCareSection">
            <div className="otherCities fs42m24fwb">Other Home Healthcare <span className="primaryColor">Service available</span></div>
            <div className="desktopContent">
                <div className="services">
                    {Details.map((services, inx) => {
                        return (
                            <div key={inx} className="cityServices fs21m14">{services}</div>
                        )
                    })}
                </div>
            </div>
            <div className="mobContent">
                {mobDetails.map((data, index) => {
                    return (
                        <div key={index} className="cityServices fs21m14">{data}</div>
                    )
                })}
            </div>
        </div>
    )
}

export default OtherHomeHealthCareService   