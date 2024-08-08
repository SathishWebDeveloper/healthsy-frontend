import MembershipBanner from "../src/components/PlusMembership/membershipBanner";
import MembershipBenifits from "../src/components/PlusMembership/membershipbenifits";
import MembershipPlans from "../src/components/PlusMembership/membershipPlans";
import FAQ from "../src/components/Common/faq";

const PlusMembershipPage = (props) => {
    return (
        <div className="plusMembershipContainer">
            <MembershipBanner
                setDownloadModal={props?.setDownloadModal}
            />
            <MembershipBenifits />
            <MembershipPlans />
            <FAQ pageName="healthsy plus membership" section="membership" className="membershipFAQ" />
        </div>
    )
}
export default PlusMembershipPage