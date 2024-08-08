import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "react-multi-carousel/lib/styles.css";
import useIsDesktop from "../Hooks/useIsDesktop";

const advantageImg = "/assets/instaDoc/insta-doc-advantages.webp"
const leftArrow = "/assets/Physiotheraphy/left-arrow.svg";

const instaDocAdvantageArr = [
    "Simple & hassle free",
    "Grow with us",
    "Gain experience",
    "Additional source of income",
    "Dedicated app",
    "Daily payments",
    "Increase network of patients",
    "Sound help & support",
]

const InstaDocAdvantages = () => {
    const isDesktop = useIsDesktop();
    return (
        <div className="InstaDocAdvantagesSection ">
            <div className="text-center fs48m28fwb">Advantages of <span className="primaryColor"> InstaDoc </span></div>
            {isDesktop ? (<div className="instaDocContent desktopContent">
                <div className="flexCenter">
                    <Image
                        src={advantageImg}
                        width={524}
                        height={618}
                        alt={"insta-doc-advantage-image"}
                        className="instaDocAdvantageImg"
                    />
                </div>
                {instaDocAdvantageArr.map((data, inx) => {
                    return (
                        <span key={inx} className={`instaDocAdvantage advantage${inx + 1}`}>{data}</span>
                    )
                })}
            </div>
            ) : (
                <div className="text-center">
                    <Carousel
                        // animationHandler="fade"
                        // className="highlights-doc-img"
                        infiniteLoop
                        // autoPlay
                        // interval={2500}
                        axis="horizontal"
                        swipeable={false}
                        showStatus={false}
                        // centerMode
                        // centerSlidePercentage={90.33} // Adjust the percentage as needed
                        showArrows={false}
                        showThumbs={false}
                        showIndicators={false}
                        renderArrowPrev={(onClickHandler) => {
                            return (
                                <div
                                    className={` instaDocCarouselArrow flexCenter`}
                                    onClick={onClickHandler}
                                >
                                    {" "}
                                    <Image
                                        src={leftArrow}
                                        width={30}
                                        height={20}
                                        alt="right arrow"
                                    />
                                </div>
                            );
                        }}

                        renderArrowNext={(onClickHandler) => (
                            <div
                                className="instaDocCarouselRightArrow flexCenter"
                                onClick={onClickHandler}
                            >
                                <Image src={leftArrow} width={30} height={20} alt="right arrow" />
                            </div>
                        )}
                    >
                        {instaDocAdvantageArr.map((data, index) => {
                            return (
                                <div className="instaDocMobAdvantage fs18fwb primaryColor" key={index}>
                                    {data}

                                </div>
                            );
                        })}
                    </Carousel>
                   
                    <Image
                        src={advantageImg}
                        width={288}
                        height={336}
                        alt={"insta-doc-advantage-image"}
                        className="instaDocAdvantageImg"
                    />
                </div>
            )}
        </div>
    )
}

export default InstaDocAdvantages;