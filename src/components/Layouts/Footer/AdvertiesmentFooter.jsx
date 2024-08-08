import { useEffect, useState } from "react";
import axios from "axios";

const linkedin_logo = "/assets/linkedin_logo.svg";
const facebook_logo = "/assets/facebook_logo.svg";
const instagram_logo = "/assets/instagram_logo.svg";
const twitter_logo = "/assets/Twitter Logo.svg";

const AdvertiesmentFooter = ({ mobile = "", email = "doctors@healthsy.in" }) => {
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");

    useEffect(() => {
        getSocialMediaData();
    }, []);

    const getSocialMediaData = () => {
        axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}social-media-links/list`)
            .then((res) => {
                setLinkedinUrl(res.data.rows[res.data.rows.length - 1]?.linkedin);
                setFacebookUrl(res.data.rows[res.data.rows.length - 1]?.facebook);
                setInstagramUrl(res.data.rows[res.data.rows.length - 1]?.instagram);
                setTwitterUrl(res.data.rows[res.data.rows.length - 1]?.twitter);
            });
    };

    return (
        <div className="advertiesmentFooterSection text-white text-center">
            <div className="fs14fw500 learnMoreTxt">To learn more. Call us at</div>
            <div className="fs20m24fwb footerContactNumber"><a className="text-white doctorMobileNavigation" href={`tel:${mobile}`}>{mobile}</a></div>
            <div className="fs12fw500">( 9 AM - 8 PM Monday to Saturday )</div>
            <div className="fs12fw500 orTxt">(or)</div>
            <div className="fs14fw500 writeTxt">Write to us at</div>
            <div className="fs20m24fwb footerMail"><a className="doctorMailNavigation text-white" href="mailto:doctors@healthsy.in">{email}</a></div>
            <div className="flexCenter socialMediaLogos">
                {linkedinUrl && linkedinUrl.length > 0 ? (
                    <img
                        src={linkedin_logo}
                        alt="linkedin_logo"
                        className="adLinkedinLogo"
                        onClick={() => {
                            window.open(linkedinUrl);
                        }}
                    />
                ) : null}
                {facebookUrl && facebookUrl.length > 0 ? (
                    <img
                        src={facebook_logo}
                        alt="facebook_logo"
                        className="adFacebookLogo"
                        onClick={() => {
                            window.open(facebookUrl);
                        }}
                    />
                ) : null}
                {instagramUrl && instagramUrl.length > 0 ? (
                    <img
                        src={instagram_logo}
                        alt="instagram_logo"
                        className="adInstagramLogo"
                        onClick={() => {
                            window.open(instagramUrl);
                        }}
                    />
                ) : null}
                {twitterUrl && twitterUrl.length > 0 ? (
                    <img
                        src={twitter_logo}
                        alt="twitter_logo"
                        className="adTwitterLogo"
                        onClick={() => {
                            window.open(twitterUrl);
                        }}
                    />
                ) : null}
            </div>
            <div className="text-center my-auto">
                <p className="copyRights mb-0">
                    <span className="adsDoctorFooter">©</span> HealthSy {new Date().getFullYear()}.
                    All Rights Reserved.
                </p>
            </div>
        </div>
    )
}

export default AdvertiesmentFooter;