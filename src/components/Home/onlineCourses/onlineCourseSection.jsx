import { memo } from "react";

const doctor = "/assets/g2922.svg";
const tablet = "/assets/tablet.svg";
const shieldplus = "/assets/shieldplus.svg";

const OnlineCourseSection = () => {
    const sections = [
        {
            title: 'Qualified Doctors',
            desc: '300+ Partnered Doctors across 30+ Specialisations',
            image: doctor,

        },
        {
            title: ' Licensed Retail Pharmacies',
            desc: '35 + Partnered Retail Pharmacies across India',
            image: tablet,
        },
        {
            title: 'Home Healthcare Services',
            desc: 'Available in 12 major cities across the country',
            image: shieldplus,
        },
    ]
    return (
        <div className="container onlineSectionContainer d-flex justify-content-center w-100">
            <div className="onlineCourseContentWrapper d-flex justify-content-between ">
                {
                    sections.map((data, idx) => {
                        return (
                            <div key={idx} className='flexColumn align-items-center onlineCourseContent'>
                                <div className="squareBox flexCenter"> 
                                    <img src={data.image} className="metricIcons" alt={data.title}></img>
                                </div>
                                <div className="sectionSubTitles">{data.title}</div>
                                <div className="onlineSectionDesc">{data.desc}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default memo(OnlineCourseSection)