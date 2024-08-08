import Image from "next/image";
import { memo } from "react"

// const topbrands = '/assets/top-brands.png'
const topbrands = '/assets/homepage/top-brand.webp'
// const mobTopbrands = '/assets/mobile-top-brands.webp'
const tick = "/assets/tick-img.svg";

const topBrands = [
    {
        img: tick,
        title: "15+ Categories"
    },
    {
        img: tick,
        title: "30+ Sub-Categories"
    },
    {
        img: tick,
        title: "Top Brands"
    }
]

const WidestRange = () => {
    return (
        <div className="widestRangeWrapper">
            <div className="container widestRangeContentWrapper d-flex justify-content-between">
                <div className="widestRangeProductWrapper content mob-text-content">
                    <div className="fs16fw600 primaryColor widestRangeHealthcareProduct">HEALTHCARE PRODUCTS</div>
                    <div className="fs36m22fwb">Widest Range & Attractive Prices</div>
                    <div className="desktopContent">
                        <div className="rangeContentWrapper">
                            {topBrands.map((data, idx) => {
                                return (
                                    <div key={idx} className="d-flex topBrandsList">
                                        <Image src={data.img} width={24} height={24} alt="tick-img" />
                                        <div className="widestRangeTitle fs18fw600">{data.title}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='btn-learnMore-wrapper home_page_learn_more'>
                            <a className='btn-learnMore flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/healthcare-products`}>Learn More</a>
                        </div>
                    </div>
                </div>
                <div className="d-flex">
                    <img src={topbrands} className='topBrandImg desktopContent' alt='Top Brands'></img>
                </div>

                <div className="mobContent widestTopBrandWrapper">
                    <div className="d-flex widestTopBrandImg">
                        <img src={topbrands} className='topBrandImg' alt='Top Brands'></img>
                    </div>
                    <div className="rangeContentWrapper">
                        {topBrands.map((data, idx) => {
                            return (
                                <div key={idx} className="d-flex topBrandsList">
                                    <Image src={data.img} width={24} height={24} alt="tick-img" />
                                    <div className="widestRangeTitle fs16fw500">{data.title}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div className='home_page_learn_more'>
                        <a className='btn-learnMore flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/healthcare-products`}>Learn More</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default memo(WidestRange)