import React from "react";
// import { Link } from "react-router-dom";
// import Link from 'next/link';

const TermsPrivacy = () => {
    return <>
        <div className='terms-div'>
            <h6 className='text-center my-4'>By clicking on Submit, I agree to the <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/terms-and-conditions`} target="_blank"><span className="span-text-line">Terms and Conditions</span></a> <span className='span-text'>&</span> <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/privacy-policy`} target="_blank"><span className="span-text-line">Privacy Policy</span></a></h6>
        </div>
    </>
}

export default TermsPrivacy;
