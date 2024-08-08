import HealthsyLifeHeader from "../src/components/Layouts/Header/CareerHeader";
import HealthsyLifeBanner from "../src/components/HealthsyLife/HealthsyLifeBanner"
import JoinHealthsy from "../src/components/HealthsyLife/JoinHealthsy"
import CoreHealthsy from "../src/components/HealthsyLife/CoreHealthsy"
import Insiders from "../src/components/HealthsyLife/Insiders"
import GrowAtHealthsy from "../src/components/HealthsyLife/GrowAtHealthsy";

const LifeAtHealthsyPage = () => {
    return (
        <>
            <HealthsyLifeHeader />
            <HealthsyLifeBanner />
            <JoinHealthsy />
            <CoreHealthsy />
            <GrowAtHealthsy />
            <Insiders />
        </>
    )
}
export default LifeAtHealthsyPage