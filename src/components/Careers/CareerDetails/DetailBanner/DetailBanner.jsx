import React, { useEffect, useState } from "react";
// import DetailBannerImage from "../../../../assets/frame.svg";
// import careerBanner from "../../../../assets/career-detail-banner.svg"
// import "./detailbanner.css";
// import axios from "axios";
// import { useParams } from "react-router-dom";

const DetailBannerImage = "/assets/frame.svg";
const careerBanner = "/assets/career-detail-banner.svg"

const DetailBanner = ({ article }) => {
    return (
        <div className="we-hire">
            <div className="">
                <div className="container career-banner">
                    <div className="row CareerImage">
                        {/* <div className="col-lg-8 col-md-8 col-sm-8 col-xs-4 banner w60">
                            <p className="banner-title"> We are Hiring</p>
                            <p className="sub-banner-title"> {data.department}</p>
                            <p></p>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 w40">
                            <div className="CareerImage">
                                <img src={process.env.NEXT_PUBLIC_APP_API_URL+"images/"+data.job_post_image} alt={data.job_post_image} />
                            </div>
                        </div> */}
                        <img src={process.env.NEXT_PUBLIC_APP_API_URL+"images/"+article.job_post_image} alt={article.job_post_image} />
                    </div>
                </div>

            </div>
        </div>

        // <div className="we-hire for-retail-breadcrumb-section">
        //     <div className="container">
        //         <div className='for-retail-banner-section'>
        //             <div className='text-center'>
        //                 <img src={careerBanner} alt="" className='container-fluid content-desktop' />
        //                 <img src={retailBannerMobile} alt="" className='content-mobile'/>
        //             </div>
        //         </div>
        //     </div>
        // </div>

    )
}

export default DetailBanner;
