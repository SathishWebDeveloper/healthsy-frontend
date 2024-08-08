import Image from "next/image";
import Link from "next/link";
import useIsDesktop from "../Hooks/useIsDesktop";

const healthsyPlus = "/assets/userGeneral/healthsy-plus.svg"
const plusMembership = "/assets/userGeneral/plus-membership.svg"
const circle1 = "/assets/userGeneral/circle-1.svg"
const circle2 = "/assets/userGeneral/circle-2.svg"

const UserGeneralMembership = ({ isiOS, setDownloadModal = () => { } }) => {

    const isDesktop = useIsDesktop()
    return (
        <>
            <div className="userGeneralMembershipSection bg-primary position-relative">
                <div className="container">
                    <div className="flexBetweenCenter membershipHeaderWrapper">
                        <Image
                            src={healthsyPlus}
                            width={185}
                            height={192}
                            alt="hexagon-healthsy"
                            className="hexogonHealthsy"
                        />
                        <div className="flexColumn text-white membershipTitleWrapper">
                            <span className="fs36m20fw800 membershipTitle">HealthSy Plus Membership</span>
                            <span className="fs18m14">Get access to free deliveries, cash-backs on medicines and healthcare products</span>
                        </div>
                        {/* <button className="membershipDownloadBtn fs16fwb">Download App</button> */}
                        {isDesktop ? (
                            <button className="membershipDownloadBtn fs16fwb" onClick={setDownloadModal}>Download App</button>
                        ) : (
                            <Link href={isiOS()} target="_blank">
                                <button className="membershipDownloadBtn fs16fwb">Download App</button>
                            </Link>)}
                    </div>
                    <div className="whoWeAre text-white text-center flexColumn">
                        <span className="fs28m24fwb whoWeAreQus">Who we are?</span>
                        <span className="fs16 userGeneralMembership">In simple terms we are a One-Stop Solution for all your recurring and immediate healthcare needs. Be it ordering genuine medicines through a subscription model to buying quality healthcare products at attractive prices to enabling you consult with experienced doctors online in a safe and secured manner,  to helping you book In-clinic appointments with your preferred doctors near you as well as providing you with quality home-based healthcare services at times when you need it the most! </span>
                    </div>
                </div>
                <Image
                    src={plusMembership}
                    width={212}
                    height={42}
                    alt="plus-membership"
                    className="plusMembership"
                />
                <Image
                    src={circle1}
                    width={75}
                    height={113}
                    alt="plus-membership"
                    className="circle-1"
                />
                <Image
                    src={circle2}
                    width={60}
                    height={113}
                    alt="plus-membership"
                    className="circle-2"
                />
            </div>
        </>
    )
}

export default UserGeneralMembership;