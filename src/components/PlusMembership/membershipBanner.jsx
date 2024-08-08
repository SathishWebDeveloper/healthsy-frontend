import DownloadBtn from "../Common/DownloadBtn";

const arrowleft = "/assets/arrow-left.svg";
const home = "/assets/home-icon.svg";
const bannerImage = "/assets/plus-membership.mp4";

const MembershipBanner = ({ setDownloadModal }) => {
    return (
        <div className="membershipBannerContainer">
            <div className="padding-section  container pt-3">
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                    <img src={home} alt="home" />
                </a>{" "}
                <img src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
                <a href="#"> HealthSy Plus Memberships </a>
            </div>
            <div className="membershipBannerSection">
                <div className="membershipBannerImage text-center">
                    {/* <img src={bannerImage}></img> */}
                    <video autoPlay muted>
                        <source src={bannerImage} type="video/mp4" />
                    </video>
                </div>
                <div className="membershipBannerContentWrapper text-center d-flex flex-column align-items-center mt-5">
                    <h1 className="membershipBannerContentOne">HealthSy Plus Membership   </h1>
                    <div className="membershipBannerContentTwo mt-4">It’s never too late to start saving more !</div>
                    <div>
                        <DownloadBtn setDownloadModal={setDownloadModal} btnClassName="btn-learnMore mt-5" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MembershipBanner