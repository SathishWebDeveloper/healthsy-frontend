import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const accucheckLogo = "/assets/healthcareProducts/topBrands/Accucheck-logo.webp";
const colgateLogo = "/assets/healthcareProducts/topBrands/Colgate-logo.webp";
const daburLogo = "/assets/healthcareProducts/topBrands/Dabur-logo.webp";
const dettolLogo = "/assets/healthcareProducts/topBrands/Dettol-logo.webp";
const himalayaLogo = "/assets/healthcareProducts/topBrands/Himalaya-logo.webp";
const johnsonsLogo = "/assets/healthcareProducts/topBrands/johnsons-logo.webp";
const niveaLogo = "/assets/healthcareProducts/topBrands/Nivea-logo.webp";
const pediasureLogo = "/assets/healthcareProducts/topBrands/pediasure-logo.webp";
const vicksLogo = "/assets/healthcareProducts/topBrands/Vicks-logo.webp";


const HealthcareProductsTopBrands = () => {
    const topBrands = [
        accucheckLogo, colgateLogo, daburLogo, dettolLogo, himalayaLogo, johnsonsLogo, niveaLogo, pediasureLogo, vicksLogo
    ]
    const responsive = {
        xll: {
            breakpoint: { max: 3000, min: 2600 },
            items: 4.5,
        },
        xl: {
            breakpoint: { max: 2600, min: 1400 },
            items: 4.5,
        },
        desktop: {
            breakpoint: { max: 1399, min: 1024 },
            items: 3.5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2.5,
        },
        mobile: {
            breakpoint: { max: 464, min: 280 },
            items: 1.5,
        },
        // mobile: {
        //     breakpoint: { max: 320, min: 0 },
        //     items: 1.5,
        // },
    };

    return (<>
        <div className="healthcareProductsTopBrandsContainer d-flex">
            <div className="healthcareProductsTopBrandsWrapper container d-flex align-items-center">
                <div className="healthcareProductsTopBrandsContent ">
                    Top Brands
                </div>
            </div>
            <div className="topBrandsCarouselider">
                <Carousel
                    responsive={responsive}
                    arrows={false}
                    // autoPlay={true}
                    infinite={true}
                    renderArrowsWhenDisabled
                    swipeable={true}
                    draggable={true}
                >
                    {topBrands?.map((ele, i) => {
                        return (
                            <div
                                key={i}
                                className=" topBrandsCarouselImages "
                            >
                                <div className="d-flex topBrandlImag">
                                    <img src={ele} alt={ele} className={`topBrandImg${i+1}`} />
                                </div>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        </div>
    </>
    )
}
export default HealthcareProductsTopBrands
