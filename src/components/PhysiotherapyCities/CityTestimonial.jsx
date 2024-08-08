import Image from "next/image";
import { useEffect } from "react";

const rating = "/assets/Physiotheraphy/rating.svg";

const cityTestimonialsArr = [
    {
        image: rating,
        title: "“Super advanced AI”",
        desc: "It's so advanced, it honestly doesn't feel like AI to me, it sounds exactly like me when I'm talking to people"
    },
    {
        image: rating,
        title: "“The best AI chat assistant”",
        desc: "I've played with a couple of these new AI tools and this one is by far the best, it's so easy to use and the Twitter integration is an absolute game-changer!"
    },
    {
        image: rating,
        title: "“Impressive machine learning”",
        desc: "The machine learning algorithms in this tool are truly impressive. It understands and responds perfectly to my emails for me."
    },
    {
        image: rating,
        title: "“Great for quick responses”",
        desc: "The responses it comes up with are so natural and always fit well with the conversation. I'm very impressed"
    },
    {
        image: rating,
        title: "“Made my life easier”",
        desc: "I never realized how much time I was wasting by hand-responding to messages before I started using ConversAI. It's saved me so much time and effort!"
    },
    {
        image: rating,
        title: "“It's a huge time saver”",
        desc: "I never realized how much time I was wasting by hand-responding to messages before I started using ConversAI. It's saved me so much time and effort!"
    },

]

const CityTestimonial = () => {
    useEffect(()=>{
        const cityTestimonialColumnOne = document.getElementById('cityTestimonialColumnOne');
        const cityTestimonialColumnTwo = document.getElementById('cityTestimonialColumnTwo');
        const cityTestimonialColumnThree =  document.getElementById('cityTestimonialColumnThree');

        function scrollContent(marqueeContent) {
            marqueeContent.scrollTop++;
            
            if (marqueeContent.scrollTop >= marqueeContent.scrollHeight - marqueeContent.clientHeight) {
                marqueeContent.scrollTop = 0;
            }
        }   
        setInterval(()=>scrollContent(cityTestimonialColumnOne), 60);
        setInterval(()=>scrollContent(cityTestimonialColumnTwo), 40); 
        setInterval(()=>scrollContent(cityTestimonialColumnThree), 60); // Adjust the scroll speed as needed
    })
    
    return (
        <div className="cityTestimonialSection">
            <div className="container">
                <div className="fs42m24fwb cityTestimonialHeading">Testimonials from<span className="primaryColor"> Mumbai</span></div>
                <div className="d-flex">
                <div className="cityTestimonialColumnOne">
                    <div className="marquee-container">
                        <div className="marquee-content-2"  id="cityTestimonialColumnOne">
                            {[...cityTestimonialsArr, ...cityTestimonialsArr].map((data, index) => (
                                <div key={index} className="cityTestimonialGridBox">
                                    <Image 
                                        src={data.image} 
                                        width={100} 
                                        height={20} 
                                        alt="rating"
                                    />
                                    <div className="fs18fwb cityTestimonialTitle">{data.title}</div>
                                    <div>{data.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="cityTestimonialColumnTwo desktopContent">
                    <div className="marquee-container">
                        <div className="marquee-content-2"   id="cityTestimonialColumnTwo">
                            {[...cityTestimonialsArr, ...cityTestimonialsArr].map((data, index) => (
                                <div key={index} className="cityTestimonialGridBox">
                                    <Image src={data.image} width={100} height={20} alt="rating" />
                                    <div className="fs18fwb cityTestimonialTitle">{data.title}</div>
                                    <div>{data.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="cityTestimonialColumnThree desktopContent">
                    <div className="marquee-container">
                        <div className="marquee-content-2"   id="cityTestimonialColumnThree">
                            {[...cityTestimonialsArr, ...cityTestimonialsArr].map((data, index) => (
                                <div key={index} className="cityTestimonialGridBox">
                                    <Image src={data.image} width={100} height={20} alt="ratings" />
                                    <div className="fs18fwb cityTestimonialTitle">{data.title}</div>
                                    <div>{data.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default CityTestimonial;