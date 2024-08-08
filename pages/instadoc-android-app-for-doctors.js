import FormPageHeader from "../src/components/Layouts/Header/FormPageHeader"
import Head from "next/head"
import InstaDocBanner from "../src/components/InstaDocAndroidApp/instaDocBanner"
import FAQ from "../src/components/Common/faq"
import InstaDocDownloadLink from "../src/components/InstaDocAndroidApp/instaDocDownloadLink"
import InstaDocFooter from "../src/components/InstaDocAndroidApp/instaDocFooter"

const staticData = [
    {
        question: "Is your app available on App Store and Play Store ?",
        answer: "No, the InstaDoc app for doctors will be shared via a restricted access through a weblink. This is mainly because we have our main partnered doctors app (HealthSy- Doctors App) listed both on App Store and Play Store. To avoid any confusions we will share the InstaDoc Android version app only through our own link that is 100% safe and secured to download. "
    },
    {
        question: "Is it safe to download the app ?",
        answer: "The InstaDoc app is not listed on the Play store only for operational convenience. Rest assured it is easy and safe to download the app by using the link or by clicking the download button on this webpage."
    },
    {
        question: "What should I do after downloading the app?",
        answer: "After downloading the app you can login to your InstaDoc account by using your registered mobile number and set your digital signature from the ‘My Account’ section."
    },
    {
        question: "When can I check-in and check out of the app?",
        answer:"You can check-in to and check out of the InstaDoc app based on your convenience. However, you can expect more patients to connect with you if you are available more on our platform especially at night hours when most patients would feel helpless to find a qualified general physician."
    },
    {
        question: "With whom can I ask my doubts or concerns?",
        answer: "You can call or WhatsApp your dedicated manager on their mobile number and they’ll be glad to assist you with all your concerns. "
    },
    {
        question: "Why should I download the InstaDoc app ?",
        answer: "You should download the InstaDoc app since you have signed up for this platform earlier. It’s only through this app you can receive patients and consult with them online."
    },
    {
        question: "What features does this app have?",
        answer: "You can consult with your patients online via audio, video and chat. You can write doctor-friendly digital prescriptions for your online patients. You can manage all your completed and active consultations as well your patients seamlessly on this app. "
    }
]

const instaDocAndroidApp = () => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <FormPageHeader instaDoc={true}/>
            <InstaDocBanner />
            <InstaDocDownloadLink />
            <FAQ 
                isStatic={true}
                section={false}
                staticData={staticData}
                pageName="InstaDoc Android App"
                className="bg-white"
            />
            <InstaDocFooter />
        </>
    )
}

export default instaDocAndroidApp