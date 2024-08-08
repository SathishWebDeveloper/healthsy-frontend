
// import Header from "../Layouts/Header/Header"
import OnlineConsultationBanner from "./onlineConsultationBanner"
import OnlineConsultationAdvantages from "./onlineConsultationAdvantages"
import OnlineConsultationSteps from "./onlineConsultationSteps"
// import Footer from "../Layouts/Footer/Footer"
import FAQ from "../Common/faq"

const OnlineConsultation = () => {

    return (
        <>
            <div className="onlineConsulationWholeContainer">
                {/* <Header /> */}
                <div className=" onlineConsultationconatiner  w-100">
                    <OnlineConsultationBanner />
                    <OnlineConsultationAdvantages />
                    <OnlineConsultationSteps />
                </div>
            </div>
            <FAQ pageName="online Consultaion" section="online-doctor-consultations" />
            {/* <Footer /> */}
        </>
    )
}
export default OnlineConsultation