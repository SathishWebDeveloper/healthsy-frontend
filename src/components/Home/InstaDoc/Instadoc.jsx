import Image from 'next/image';
import { memo } from 'react'
import useIsDesktop from '../../Hooks/useIsDesktop';

const instadoc_img_mob = "/assets/homepage/instaDoc-mob.webp";
const instaDocImg = "/assets/homepage/instaDoc.webp"

const tick = "/assets/tick-img.svg";
// const resp_instadoc_img = "/assets/homepage/home-insta-doc-mob.webp";
// const instaDocImg = "/assets/homepage/try-now.svg";

const instaDocPoints = [
    "Connect with a general physician instantly",
    "Consult via audio, video and chat",
    "Strictly not for emergency use",
    "Available 24*7",
]

const instaDocMobPoints = [
    "Connect with a doctor instantly",
    "Consult via audio, video and chat",
    "Strictly not for emergency use",
    "Available 24*7"
]

const Instadoc = () => {

    const isDesktop = useIsDesktop();

    return (
        <div className="instadoc-section">
            <div className="container padding">
                <div className="row flex-row-reverse position-relative">
                    <div className="col-md-6 order-first order-md-last desktopContent">
                        <div className="instadoc-image-section">
                            {/* <div>
                                <Image src={instaDocImg} width={200} height={100} alt="instaDocImg" className="instaDocImgSection" />
                            </div> */}
                            <img src={instaDocImg} alt="instadoc_img" className="position-absolute content-desktop instaDocImage" />
                            {/* <img src={resp_instadoc_img} alt="resp_instadoc_img" className="content-mobile mob-width-size instaDocMobImage" /> */}
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end instaDocTextConent">
                        <div className="instadoc-content-section">
                            <div className="sub-title fs16fw600">NEVER FEEL HELPLESS WITH</div>
                            <div className="title fs36m22fwb">InstaDoc 24x7</div>
                            <div className='desktopContent'>
                                <div className="instadoc-lists">
                                    <ul>
                                        {instaDocPoints.map((point, inx) => <li key={inx} className="flexAlignCenter"><img src={tick} alt="tick" /><span className='fs18m16fw500'>{point}</span></li>)}
                                        <div className='mt-3 home_page_learn_more btn-learnMore-wrapper'>
                                            <a className='btn-learnMore flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/insta-doc`}>Learn More</a>
                                        </div>
                                    </ul>
                                </div>
                            </div>

                            <div className='mobContent'>
                                <div className="order-first order-md-last">
                                    <div className="instadoc-image-section">
                                        <img src={instadoc_img_mob} alt="instadoc_img" className="instaDocImage" />
                                    </div>
                                </div>
                                <div className="instadoc-lists">
                                    <ul>
                                        {instaDocMobPoints.map((point, inx) => <li key={inx} className="flexAlignCenter"><img src={tick} alt="tick" /><span className='fs18m16fw500'>{point}</span></li>)}
                                        <div className='mt-3 home_page_learn_more '>
                                            {/* btn-learnMore-wrapper */}
                                            <a className='btn-learnMore flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/insta-doc`}>Learn More</a>
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(Instadoc);