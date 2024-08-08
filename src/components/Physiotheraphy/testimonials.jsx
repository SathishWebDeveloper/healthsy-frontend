import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "react-multi-carousel/lib/styles.css";
import MultiCarousel from "react-multi-carousel";
import Image from "next/image";

const rating = "/assets/Physiotheraphy/rating.svg";
const avathar = "/assets/Physiotheraphy/avathar.svg";
const locationPin = "/assets/Physiotheraphy/location-pin.svg";
const leftArrow = "/assets/Physiotheraphy/left-arrow.svg";

const testimonialsData = [
    {
        text: `‘Loom has been the light of my life since you showed me
        it.’ – I never tire of hearing this from folks. Not even an you showed me it.’ – I never tire of hearing this from folks.`,
        name: "Vasanth Raj",
        location: "Chennai"
    },
    {
        text: `‘Loom has been the light of my life since you showed me
        it.’ – I never tire of hearing this from folks. Not even an you showed me it.’ – I never tire of hearing this from folks.`,
        name: "Vasanth Raj",
        location: "Chennai"
    },
    {
        text: `‘Loom has been the light of my life since you showed me
        it.’ – I never tire of hearing this from folks. Not even an you showed me it.’ – I never tire of hearing this from folks.`,
        name: "Vasanth Raj",
        location: "Chennai"
    },
    {
        text: `‘Loom has been the light of my life since you showed me
        it.’ – I never tire of hearing this from folks. Not even an you showed me it.’ – I never tire of hearing this from folks.`,
        name: "Vasanth Raj",
        location: "Chennai"
    },
]
const Testimonials = () => {

    return (
        <div className="testimonialSection">
            <div className="container testimonialTitle">
                <div className="fs40m24fwb desktopContent text-start">Testimonials</div>
                <div className="fs40m24fwb mobContent text-start">Our <span className="primaryColor">Customer Feedback</span></div>
            </div>
            <Carousel
                // animationHandler="fade"
                // className="highlights-doc-img"
                // autoPlay
                infiniteLoop
                // interval={3000}
                axis="horizontal"
                
                swipeable={false}
                showArrows={false}
                showThumbs={false}
                showIndicators={false}
                renderArrowPrev={(onClickHandler, hasPrev, label) => {
                    return (
                        <div
                            className={`testimonialCarouselArrow flexCenter`}
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

                renderArrowNext={(onClickHandler, hasNext, label) => (
                    <div
                        className="testimonialCarouselRightArrow flexCenter"
                        onClick={onClickHandler}
                    >
                        <Image src={leftArrow} width={30} height={20} alt="right arrow" />
                    </div>
                )}
            >
                {testimonialsData.map((data, index) => {
                    return (
                        <div className="testimonialContentWrapper" key={index}>

                            <div className="testimonialContent flexCenter flex-column" key={index}>
                                <Image
                                    src={rating}
                                    width={240}
                                    height={43}
                                    className="rating"
                                    alt="rating"
                                />
                                <div className="fs30m14 primaryColor testimonialText">{data?.text}</div>
                                <div className="d-flex">
                                    <span>
                                        <Image
                                            src={avathar}
                                            width={72}
                                            height={72}
                                            className="avatharImage"
                                            alt="avathar"
                                        />
                                    </span>
                                    <div>
                                        <div className="fs24m10">{data?.name}</div>
                                        <div className="d-flex">
                                            <span>
                                                <Image
                                                    src={locationPin}
                                                    width={20}
                                                    height={20}
                                                    className="locationPin"
                                                    alt="location"
                                                />
                                            </span>
                                            <div className="locationName fs18m10">{data?.location}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </Carousel>
            {/* <Testimonials2 /> */}
        </div>
    )
}
const Testimonials2 = () => {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            //   items: 0.8, // Center item takes 0.8 of the space
            //   slidesToSlide: 1,
            //   partialVisibilityGutter: 10,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1.2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1.2,
        },
    };
    return (
        <div className="testimonialSection testimonialSection2">
            <MultiCarousel
                responsive={responsive}
                arrows={true}
                infinite={true}
                renderArrowsWhenDisabled
                swipeable={true}
                draggable={true}
                renderArrowPrev={(onClickHandler, hasPrev, label) => {
                    return (
                        <div
                            className={`testimonialCarouselArrow flexCenter`}
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

                renderArrowNext={(onClickHandler, hasNext, label) => (
                    <div
                        className="testimonialCarouselRightArrow flexCenter"
                        onClick={onClickHandler}
                    >
                        <Image src={leftArrow} width={30} height={20} alt="right arrow" />
                    </div>
                )}
            >
                {testimonialsData.map((data, index) => {
                    return (
                        <div className="testimonialContentWrapper" key={index}>
                            <div className="testimonialContent flexCenter flex-column" key={index}>
                                <Image
                                    src={rating}
                                    width={240}
                                    height={43}
                                    alt="rating"
                                />
                                <div className="fs30m14 primaryColor testimonialText">{data?.text}</div>
                                <div className="d-flex">
                                    <span>
                                        <Image
                                            src={avathar}
                                            width={72}
                                            height={72}
                                            className="avatharImage"
                                            alt="avathar"
                                        />
                                    </span>
                                    <div>
                                        <div className="fs24m10">{data?.name}</div>
                                        <div className="d-flex">
                                            <span>
                                                <Image
                                                    src={locationPin}
                                                    width={20}
                                                    height={20}
                                                    alt="location"
                                                />
                                            </span>
                                            <div className="locationName">{data?.location}</div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </MultiCarousel>
        </div>
    )
}

export default Testimonials;