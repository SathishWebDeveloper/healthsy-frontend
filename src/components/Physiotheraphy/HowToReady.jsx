import Image from "next/image";
import useIsDesktop from "../Hooks/useIsDesktop";

const readyForPhysiotherapy = "/assets/Physiotheraphy/ready-for-physiotherapy.webp"
const readyForPhysiotherapyWebImg = "/assets/Physiotheraphy/physiotherapyImg.webp"

const HowToReady = () => {

    const isDesktop = useIsDesktop()

    return (
        <div className="howToReadySection container flexCenter">
            <div className="physiotherapyImageWrapper">
                <Image
                    src={isDesktop ? readyForPhysiotherapyWebImg : readyForPhysiotherapy}
                    width={600}
                    height={668}
                    alt="physiotherapy-image"
                    className="physiotherapyImage"
                />
            </div>
            <div className="textSection">
                <div className="fs48m24fwb howToReadyQuestion">
                    How to get ready before a <span className="primaryColor">physiotherapy session</span> at your home ?
                </div>
                <div className="fs24m16 howToReadyAnswer">
                    To begin a home-based physiotherapy session, there are several factors that should be considered. For a successful physiotherapy session, it is advisable to select a spacious space in your home, dress in comfortable clothes, and provide a comprehensive description of all your symptoms to the therapist.
                </div>
            </div>
        </div>
    )
}

export default HowToReady; 