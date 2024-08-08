const YourProfession = ({
    navigateLink = "/ad-landing-page-partners-doctors/register",
    isiOS,
    userGeneral = false,
}) => {
    return (
        <>
            <div className="container yourProfessionSection d-flex justify-content-center">
                {/* <div className="growText">To Grow your Profession</div> */}
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}${navigateLink}`} className={userGeneral && "desktopContent"}>
                    <button className="doctorAdRegistrationBtn text-white fs16fwb">
                        <span className="registerNow-btn">Register Now</span>
                    </button>
                </a>
                {userGeneral && <a href={isiOS()} target="_blank" className="p-0 mobContent">
                    <button className="doctorAdRegistrationBtn text-white fs16fwb">Download Now</button>
                </a>}
            </div>
        </>
    )
}

export default YourProfession;