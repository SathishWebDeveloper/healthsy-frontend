import { memo } from "react";
import useIsDesktop from "../Hooks/useIsDesktop";

const jayavardhananceo = "/assets/aboutUs/jayavardhanan-ceo.png"
const jayavardhananceoMob = "/assets/aboutUs/mobile-jayavardhanan-ceo.webp"

const vineetcto = "/assets/aboutUs/vineet-cto.png"
const linkedinIcon = "/assets/aboutUs/linkedin-icon.png"

const AboutCTO = () => {
    const isDesktop = useIsDesktop()

    return (
        <>
            <div className="container aboutCTOSection">
                <div className="aboutUsCTOTitle text-center">
                    <h3>Meet our <span>CEO & CTO</span></h3>
                    <p>Meet the back-bones of HealthSy and our pillars of strength </p>
                </div>

                <div className="row">
                    <div className="col-6 col-md-6">
                        <div className="ctoimg-section">
                            <img
                                src={isDesktop ? jayavardhananceo : jayavardhananceoMob}
                                className="img-fluid cto-img"
                                alt="Jayavardhanan CEO" />
                            <h6>Jayavardhanan</h6>
                            <div className="d-flex">
                                <p>Founder, CEO</p>
                                <div className="ms-auto">
                                    <a href="https://www.linkedin.com/in/jayavardhanan" target="_blank">
                                        <img
                                            src={linkedinIcon}
                                            className="img-fluid li-icon"
                                            alt="linkedinIcon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-6">
                        <div className="ctoimg-section">
                            <img
                                src={vineetcto}
                                className="img-fluid cto-img"
                                alt="Affordability Image" />
                            <h6>Vineet Jain CTO</h6>
                            <div className="d-flex">
                                <p>CTO</p>
                                <div className="ms-auto">
                                    <a href="https://www.linkedin.com/in/vineet-jain-6b444974" target="_blank">
                                        <img
                                            src={linkedinIcon}
                                            className="img-fluid li-icon"
                                            alt="linkedinIcon" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(AboutCTO);