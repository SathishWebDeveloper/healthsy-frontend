const AdFormFooter = ({
    className = ""
}) => {

    return (
        <div className="text-center">
            <p className={`mb-0 adsFooterSection ${className}`}>
                <span className="icon">©</span> HealthSy {new Date().getFullYear()}.
                All Rights Reserved.
            </p>
        </div>
    )
}

export default AdFormFooter 