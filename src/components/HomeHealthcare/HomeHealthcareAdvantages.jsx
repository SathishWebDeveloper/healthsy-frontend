import { useEffect, useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

// import rupee from "../../assets/rupee.svg"
// import alarm from "../../assets/alarm.svg"
// import menusymbol from "../../assets/menu-symbol.svg"
// import vector2 from "../../assets/Vector2.svg"
// import messenger2 from "../../assets/messenger-2.svg"
// import debitcard from "../../assets/debit-card.svg"
const rupee = "/assets/rupee.svg"
const alarm = "/assets/alarm.svg"
const menusymbol = "/assets/menu-symbol.svg"
const vector2 = "/assets/Vector2.svg"
const messenger2 = "/assets/messenger-2.svg"
const debitcard = "/assets/debit-card.svg"

const HomeHealthcareAdvantanges = () => {

    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
      const media = window.matchMedia("(min-width: 960px)");
      const listener = () => setIsDesktop(media.matches);
      listener();
      window.addEventListener("resize", listener);
  
      return () => window.removeEventListener("resize", listener);
    }, [isDesktop]);

    const advantagesContent = [
        {
            image: rupee,
            desc: '100% refund in case of ‘No Show’ by the Home Healthcare Service Provider'
        },
        {
            image: debitcard,
            desc: 'Pay using online methods or pay directly to service provider'
        },
        {
            image: menusymbol,
            desc: '12+ Home Healthcare categories on HealthSy'
        },
        {
            image: alarm, 
            desc: 'Easy cancellation and rescheduling of booking'

        },
       
        {
            image: vector2,
            desc:'Qualified and verified professionals'
        },
        {
            image: messenger2,
            desc: 'Reach out to our support team via chat, mail or call'
        },
    ]
    return (
        <div className=" healthcareAdvantageConatiner">
            {isDesktop ?
                advantagesContent.map((data, idx) => {
                    return (

                        <div className={`healthcareAdvantagecontent healthcareAdvantageBox${idx+1} ${(idx === 1 || idx === 2) && 'healthcareAdvantagecontentBox'}`} key={idx}>
                            {/* <div className="advantageImage"> */}
                            <img src={data.image} alt='medicine' className="advantageImage mb-4"></img>
                            {/* </div> */}
                            <div className="advantageContent">{data.desc}</div>
                        </div>
                    )
                }) : (
                    < div className="homeHealthcareCarousel d-block">
                        <Carousel
                            showThumbs={false}
                            showIndicators={true}
                        >
                            {
                                advantagesContent.map((data, idx) => {
                                    return (
                                        <div className={`orderMedicineAdvantagecontent  healthcareMobileAdvantagecontent mt-5 ${(idx === 1 || idx === 2) && 'advantageContentWrapper'}`} key={idx}>
                                            <img src={data.image} alt='medicine' className="advantageImage mb-3" ></img>
                                            <div className="advantageContent">{data.desc}</div>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                )
            }
        </div>
    )
}
export default HomeHealthcareAdvantanges