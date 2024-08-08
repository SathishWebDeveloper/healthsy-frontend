import Image from "next/image";

import useIsDeskTop from "../Hooks/useIsDesktop"

const plasticFree = "/assets/sustainability-policy/plastic-free.webp";
const ecoFriendly = "/assets/sustainability-policy/eco-friendly.webp";
const paperlessSystem = "/assets/sustainability-policy/paperless-system.webp";
const ourCulture = "/assets/sustainability-policy/our-culture.webp";
const plasticFreeMob = "/assets/sustainability-policy/plastic-free-mob.webp";
const ecoFriendlyMob = "/assets/sustainability-policy/eco-friendly-mob.webp";
const paperlessSystemMob = "/assets/sustainability-policy/paperless-system-mob.webp";
const ourCultureMob = "/assets/sustainability-policy/our-culture-mob.webp";

const innitiativesArr = [
    {
        img: plasticFree,
        caption: "HEALTHSY",
        title: "Plastic Free Environment",
        para: "To promote an environmentally friendly lifestyle, we prioritize minimizing and avoiding the use of plastic materials in our workplace. We actively strive to reduce our dependence on plastic by exploring alternative materials and adopting sustainable practices. This commitment to a greener workplace drives us to continuously seek out new ways to support our goal.",
        flexDirection: "flexRow",
        imgClassName: "initiativeImgRight",
        mobImg: plasticFreeMob,
    },
    {
        img: ecoFriendly,
        caption: "WE FOLLOW",
        title: "Eco - Friendly Packaging Materials",
        para: "All orders from HealthSy are packed in eco-friendly corrugated boxes because they are sustainable, recyclable, and energy-saving. After its use, these boxes can be easily broken down for recycling. Not only do they protect the products during shipping, but they also align with HealthSy's commitment to environmental sustainability.",
        flexDirection: "flexRowReverse",
        imgClassName: "initiativeImgLeft",
        mobImg: ecoFriendlyMob,
    },
    {
        img: paperlessSystem,
        caption: "WORKING TOWARDS",
        title: "100% Paperless System",
        para: "HealthSy has made major strides toward replacing paper with digital ways of drafting things, leading to a more productive and eco-friendlier workplace. This transition has also helped us in safely maintaining our essential documents for the future use.",
        flexDirection: "flexRow",
        imgClassName: "initiativeImgRight",
        mobImg: paperlessSystemMob,
    },
    {
        img: ourCulture,
        caption: "OUR CULTURE",
        title: "Green Thinking in our Culture!",
        para: "At HealthSy, we aim to inspire and empower individuals to make sustainable choices in their daily lives, creating a positive impact for both them and the environment. By this way, we educate our employees and partners about sustainability and our company's goals.",
        flexDirection: "flexRowReverse",
        imgClassName: "initiativeImgLeft",
        mobImg: ourCultureMob,
    },

]

const initiatives = () => {
    const isDesktop = useIsDeskTop()

    return (
        <>
            <div className="InitiativesSection">
                <div className="InitiativesTitle fs36m24fwb container">
                    Initiatives Taken by HealthSy for a Better Tomorrow!
                </div>
                {innitiativesArr.map((data, inx) => {
                    return (
                        <div key={inx} className={`${data.flexDirection} initiativesCardSection`}>
                            <div className={data.imgClassName}>
                                <Image
                                    src={isDesktop ? data.img : data.mobImg}
                                    width={591}
                                    height={469}
                                    alt="initiative-img"
                                    className="initiativeImg"
                                />
                            </div>
                            <div className={`flex-shrink-1 align-self-center initiativeContentWrapper container p-0 `}  >
                                <div className="caption fs18m14fw500">{data.caption}</div>
                                <div className="title fs36m20fwb">{data.title}</div>
                                <div className="para fs18m14fw500">{data.para}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default initiatives;