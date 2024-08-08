import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Image from "next/image";
import { useState } from "react";

const quotation = "/assets/icons/quotation.png"
const prathap = "/assets/users/prathap.png"
const sita = "/assets/users/sita.png"
const krunal = "/assets/users/krunal.png"
const karthik = "/assets/users/karthik.png"

const subscriptionUsers = [
  {
    image: prathap,
    feedback: "I tried HealthSy advantage subscription, and it was really good. The medicine delivery was on-time. The payment method is indeed simple.",
    name: "Mr. Prathap",
    designation: "HealthSy User",
  },
  {
    image: sita,
    feedback: "HealthSy is sending me auto-reminders every 30days and it is very helpful for me. Thanks to HealthSy advantage subscriptions!",
    name: "Mrs. Sita",
    designation: "HealthSy User",
  },
  {
    image: krunal,
    feedback: "I was trying to add a new medicine to my subscription list lately and the process of updating it was very effortless. This advantage subscription is a great deal.",
    name: "Mr. Krunal",
    designation: "HealthSy User",
  },
  {
    image: karthik,
    feedback: "It's so advanced, it honestly doesn't feel like AI to me, it sounds exactly like me when I'm talking to people It's so advanced, it honestly doesn't feel like AI to me, it sounds exactly like me when I'm talking to people",
    name: "Mr.Karthick",
    designation: "HealthSy User",
  },

]

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1600, min: 580 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 579, min: 0 },
    items: 1,
  },
};

const AdvSubscriptionTestimonials = () => {
  const [applyStyle, setApplyStyle] = useState(true)
  return (
    <div className={`AdvSubscriptionTestimonialsSection ${applyStyle && "applyStyle"}`}>
      <div className="fs36m24fwb advantageTestimonialsTitle">Testimonials from <span className="primaryColor">Advantage Users</span></div>
      <div>
        <Carousel
          responsive={responsive}
          arrows={false}
          infinite={true}
          renderArrowsWhenDisabled
          swipeable={true}
          draggable={true}
          showDots={true}
          beforeChange={() => setApplyStyle(false)}
        >
          {subscriptionUsers?.map((el, i) => {
            return (
              <div className="advTestimonialBox" key={i}>
                <Image
                  src={quotation}
                  width={50}
                  height={50}
                  alt="quotation"
                  className="doubleQuotation"
                />
                <div className="userFeedBack fs16m11">{el.feedback}</div>
                <div className="d-flex align-items-center">
                  <Image
                    src={el.image}
                    width={56}
                    height={56}
                    alt="user-image"
                    className="testimonialUserImage"
                  />
                  <div className="userInfo">
                    <div className="fs13m9fwb">{el.name}</div>
                    <div className="primaryColor fs13m9fw600">{el.designation}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default AdvSubscriptionTestimonials;
