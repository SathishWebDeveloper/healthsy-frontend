import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useIsDesktop from "../Hooks/useIsDesktop";

const locationIcon = "/assets/location.svg";
const leftArrow = "/assets/Physiotheraphy/left-arrow.svg";

const InstaDocUsersDetails = [
    {
        name: "Gaurav",
        logo: locationIcon,
        city: "Mumbai",
        desc: "InstaDoc is extremely beneficial for me, as it provides me with professional medical assistance, whenever and wherever I am."
    },
    {
        name: "Fazil",
        logo: locationIcon,
        city: "Hyderabad",
        desc: "The doctor was super friendly! They provided me with a consultation right away, even at 2 am. It was so convenient!"
    },
    {
        name: "Malini",
        logo: locationIcon,
        city: "Coimbatore",
        desc: "I've never been sure about online medical services, but HeathSy's InstaDoc Service has made me a believer. It's simply amazing."
    }
]

const InstaDocUsers = () => {

    const isDesktop = useIsDesktop();

    return (
        <div className="instaDocUsersSection">
            <div className="container">
                <div className="fs36m20fwb instaDocTestmonialHeader">Testimonials from <span className="primaryColor">InstaDoc users</span></div>
          
                {isDesktop ? (<div className="instaDocDetails">
                    {InstaDocUsersDetails.map((data, idx) => {
                        return (
                            <div key={idx} className="instaDocUsersBox">
                                <div className="fs20fwb">{data.name}</div>
                                <div className="d-flex instaDocUsersLocation align-items-center">
                                    <Image src={data.logo} width={10} height={10} alt="insta-doc" />
                                    <div className="fs10fw500 instaDocCity">{data.city}</div>
                                </div>
                                <div className="fs16fw400 instaDocUserDesc">{data.desc}</div>
                            </div>
                        )
                    })}
                </div>) : (
                    // <div className="text-center">
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
                        {InstaDocUsersDetails.map((data, idx) => {
                            return (
                                <div key={idx} className="instaDocUsersBox">
                                    <div className="fs20fwb">{data.name}</div>
                                    <div className="d-flex instaDocUsersLocation align-items-center">
                                        <Image src={data.logo} width={10} height={10} />
                                        <div className="fs10fw500 instaDocCity">{data.city}</div>
                                    </div>
                                    <div className="fs16fw400">{data.desc}</div>
                                </div>
                            )
                        })}
                    </Carousel>
                )}
            </div>
        </div>
    )
}

export default InstaDocUsers