import { memo } from "react";

const JoinUs=()=>{
    return(
        <div className="join-us-section">
            <div className="container join-us-box">
                <div className="row">
                    <div className="col-md-6">
                        <h4 className='title'>Come Join Us</h4>
                        <div className="joinUsDesc">Check out the various open positions at HealthSy and send in your interest. Be assured, whatever the outcome might be, our hiring team will revert back to you. Thank you! </div>
                    </div>
                    <div className="col-md-6 join-us-btn-section home_page_learn_more">
                        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/join-us`}>
                         <button onClick={()=>{
                                 window.scrollTo(0,0)
                             }} className='btn btn-primary px-4 py-3 join-us-btn'>Apply Now</button>
                        </a>
                     </div>
                </div>
            </div>

        </div>
    )
}

export default memo(JoinUs);