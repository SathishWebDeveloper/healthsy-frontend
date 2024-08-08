const rupee = "/assets/rupee.svg";
const debitcard = "/assets/icons/credit-card-2.svg";
const alarm = "/assets/alarm.svg";
const verified = "/assets/Vector2.svg";
const messenger2 = "/assets/messenger-2.svg";
const menusymbol = "/assets/menu.svg";
const physio = "/assets/icons/physiotherapist.svg";
const careTaker = "/assets/icons/care-taker.svg";
const homeIsolation = "/assets/icons/home-isolation.svg";
const mentalWellness = "/assets/icons/mental-wellness.svg";
const nursingService = "/assets/icons/nursing-service.svg";
const nursingSupport = "/assets/icons/nursing-support.svg";
const speechTheraphy = "/assets/icons/speech-theraphy.svg";
const elder = "/assets/icons/elder.svg";
const orthoRehab = "/assets/icons/ortho-rehab.svg";
const motherBaby = "/assets/icons/mother-baby-care.svg";
const tablet = "/assets/tablet.svg";
const subscription = "/assets/orderMedicine/order_medicine_Group.svg";
const medicineReturn = "/assets/orderMedicine/order_medicine_return_1.svg";
const vector = "/assets/orderMedicine/order_medicine_Vector.svg";
const wallet = "/assets/orderMedicine/order_medicine_wallet_1.svg";
const phone = "/assets/orderMedicine/order_medicine_phone-call_4.svg";
const refund = "/assets/refund1.svg";
const reachOut = "/assets/phone-call-2.svg";
const stethoscope = "/assets/icons/stethoscope.svg";
// const bell = "/assets/icons/bell.svg";
const bell = "/assets/bell-2.svg";
const questionMark = "/assets/icons/questionMark.svg";

const mars = "/assets/icons/mars.svg";
const ayurveda = "/assets/icons/ayurveda.svg";
const bariatric = "/assets/icons/bariatric-surgery.svg";
const heart = "/assets/icons/heart.svg";
const cosmetology = "/assets/icons/cosmetology.svg";
const dentistry = "/assets/icons/dentistry.svg";
const skin = "/assets/icons/skin.svg";
const throat = "/assets/icons/throat.svg";
const endocrine = "/assets/icons/endocrine.svg";
const urology = "/assets/icons/urology.svg";

const stomachache = "/assets/icons/stomachache.svg";
const physician = "/assets/icons/physician.svg";

const surgeon = "/assets/icons/surgeon.svg";
const uterus = "/assets/icons/uterus.svg";
const hepatology = "/assets/icons/hepatology.svg";
const uterus2 = "/assets/icons/uterus-2.svg";
const pediatrics = "/assets/icons/pediatrics.svg";
const brain = "/assets/icons/brain.svg";
const cancer = "/assets/icons/cancer-cell.svg";
const eyeball = "/assets/icons/eyeball.svg";

const joint = "/assets/icons/joint.svg";
const baby = "/assets/icons/baby.svg";
const brain2 = "/assets/icons/brain-2.svg";
const mentalHealth = "/assets/icons/mental-health.svg";
const lungs = "/assets/icons/lungs.svg";
const microscope = "/assets/icons/microscope.svg";
const xRay = "/assets/icons/x-ray.svg";
const symptoms = "/assets/icons/symptoms.svg";
const sexology = "/assets/icons/sexology.svg";
// const physician = "/assets/icons/physician.svg";

export const emailValidator = (email) => {
  const emailValidate = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailValidate.test(email);
};

export function convertToTitleCase(str) {
  // Split the string into an array of words
  var words = str?.split('-');

  // Capitalize the first letter of each word
  var capitalizedWords = words?.map(function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the words back into a single string
  var result = capitalizedWords?.join(' ');

  return result;
}

export const slugUrl = (slugName) => slugName?.trim()?.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
export const homeHealthCareAdvantageArr = [
  {
    image: rupee,
    desc: (
      <>
        <span className="fw-bold">100% refund</span> in case of ‘No Show’ by the
        Home Healthcare Service Provider.
      </>
    ),
  },
  {
    image: debitcard,
    desc: (
      <>
        Pay using <span className="fw-bold">online methods or pay directly</span>{" "} service provider.
      </>
    ),
  },
  {
    image: messenger2,
    desc: (
      <>
        Reach out to our support team via <span className="fw-bold">chat, mail or call.</span>
      </>
    ),
  },
  {
    image: verified,
    desc: (
      <>
        Book <span className="fw-bold">qualified and verified professionals</span> on HealthSy.
      </>
    ),
  },
  {
    image: alarm,
    desc: (
      <>
        <span className="fw-bold">Easy cancellation and rescheduling</span> of booking.
      </>
    ),
  },
  {
    image: menusymbol,
    desc: (
      <>
        <span className="fw-bold">6+ Home Healthcare categories </span> on
        HealthSy.
      </>
    ),
  },
];

export const homeHealthCareServiceCategories = [
  {
    image: physio,
    text: "Physiotherapy",
  },
  {
    image: careTaker,
    text: "Caretakers",
  },
  {
    image: homeIsolation,
    text: "Home Isolation Support",
  },
  {
    image: mentalWellness,
    text: "Mental Wellness Support",
  },
  {
    image: nursingService,
    text: "Nursing Service",
  },
  {
    image: nursingSupport,
    text: "Nursing Support",
  },
  {
    image: speechTheraphy,
    text: "Speech Therapy",
  },
  {
    image: elder,
    text: "Elderly Care Support",
  },
  {
    image: orthoRehab,
    text: "Ortho Rehab Support",
  },
  {
    image: motherBaby,
    text: "Mother & Baby Care Support",
  },
];

export const orderMedicineAdvantageArr = [
  {
    image: tablet,
    desc: (
      <>
        Find more than<span className="fw-bold"> 1.5 Lakh medicines </span>on HealthSy.
      </>
    ),
  },
  {
    image: subscription,
    desc: (
      <>
        Subscription model ensures you{" "}
        <span className="fw-bold">never run out of your refills.</span>
      </>
    ),
  },
  {
    image: medicineReturn,
    desc: (
      <>
        Make easy <span className="fw-bold"> cancellation & returns</span> on  your orders.
      </>
    ),
  },
  {
    image: vector,
    desc: (
      <>
        <span className="fw-bold">Get free doctor consultation </span> if no valid prescription for the order.
      </>
    ),
  },
  {
    image: wallet,
    desc: (
      <>
        Get to pay using<span className="fw-bold"> multiple payment</span> methods.
      </>
    ),
  },
  {
    image: phone,
    desc: (
      <>
        Option to order medicine over{" "}
        <span className="fw-bold"> call & WhatsApp.</span>
      </>
    ),
  },
];

export const onlineConsultationeAdvantageArr = [
  {
    image: verified,
    desc: (
      <>
        All the doctors partnered with HealthSy are<span className="fw-bold"> Experienced </span> and <span className="fw-bold">Verified</span>.
      </>
    ),
  },
  {
    image: refund,
    desc: (
      <>
        You will receive <span className="fw-bold">100% refund </span> in case of{" "}
        <span className="fw-bold"> ‘ No Show ’ </span> by the doctor.
      </>
    ),
  },
  {
    image: reachOut,
    desc: (
      <>
        Reach out to our support team from the app{" "}
        <span className="fw-bold"> via chat, mail or call</span>.
      </>
    ),
  },
  {
    image: stethoscope,
    desc: (
      <>
        We have over <span className="fw-bold">25+ Doctor specializations </span> on HealthSy.
      </>
    ),
  },
  {
    image: bell,
    desc: (
      <>
        Get reminders about your{" "}
        <span className="fw-bold"> upcoming online doctor consultations</span>.{" "}
      </>
    ),
  },
  {
    image: messenger2,
    desc: (
      <>
        Free follow-up with{" "}
        <span className="fw-bold"> 40 messages</span> for <span className="fw-bold">48 hours</span> after the consultation.{" "}
      </>
    ),
  },
];

export const serviceSpecializations = [
  [
    {
      image: mars,
      text: "Andrology",
    },
    {
      image: ayurveda,
      text: "Ayush",
    },
    {
      image: bariatric,
      text: "Bariatrics",
    },
    {
      image: heart,
      text: "Cardiology",
    },
    {
      image: cosmetology,
      text: "Cosmetology",
    },
    {
      image: dentistry,
      text: "Dentistry",
    },
    {
      image: skin,
      text: "Dermatology",
    },
    {
      image: throat,
      text: "ENT",
    },
    {
      image: endocrine,
      text: "Endocrinology",
    },
    {
      image: urology,
      text: "Urology",
    },
  ],
  [
    {
      image: stomachache,
      text: "Gastroenterology",
    },
    {
      image: physician,
      text: "General Physician",
    },
    {
      image: surgeon,
      text: "General Surgeon",
    },
    {
      image: uterus,
      text: "Gynaecology",
    },
    {
      image: hepatology,
      text: "Hepatology",
    },
    {
      image: uterus2,
      text: "Infertility",
    },
    {
      image: pediatrics,
      text: "Neonatology",
    },
    {
      image: brain,
      text: "Neurology",
    },
    {
      image: cancer,
      text: "Oncology",
    },
    {
      image: eyeball,
      text: "Ophthalmology",
    },
  ],
  [
    {
      image: joint,
      text: "Orthopaedics",
    },
    {
      image: baby,
      text: "Paediatrics",
    },
    {
      image: brain2,
      text: "Psychiatrist",
    },
    {
      image: mentalHealth,
      text: "Psychology",
    },
    {
      image: lungs,
      text: "Pulmonology",
    },
    {
      image: microscope,
      text: "Pathology",
    },
    {
      image: xRay,
      text: "Radiology",
    },
    {
      image: symptoms,
      text: "Rheumatology",
    },
    {
      image: sexology,
      text: "Sexology",
    },
    {
      image: physician,
      text: "Family physician",
    },
  ],
];

export const inclinicAdvantages = [
  {
    image: refund,
    desc: (
      <>
        <span className="fw-bold">100% refund</span> in case of
        <span className="fw-bold"> ‘No Show’ or appointment cancellation </span> by doctor / clinic.
      </>
    ),
  },
  {
    image: stethoscope,
    desc: (
      <>
        {" "}
        <span className="fw-bold"> 25+ specializations </span> such as Pulmonology, Dentistry, Gynaecology, and many more.
      </>
    ),
  },
  {
    image: alarm,
    desc: (
      <>
        {" "}
        <span className="fw-bold">Easy cancellation and rescheduling </span> of
        your In-Clinic appointments on the app.
      </>
    ),
  },
  {
    image: questionMark,
    desc: (
      <>
        Reach out to our support team via{" "}
        <span className="fw-bold"> call, mail or chat.</span>{" "}
      </>
    ),
  },
  {
    image: rupee,
    desc: (
      <>
        Pay Online or choose the option to
        <span className="fw-bold"> ‘Pay directly at Clinic’.</span>
      </>
    ),
  },
  {
    image: verified,
    desc: (
      <>
        All the doctors partnered with HealthSy are<span className="fw-bold"> Experienced</span> and <span className="fw-bold">Verified</span>.
      </>
    ),
  },
];
