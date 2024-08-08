import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// import "./privacy.css";

const rightArrow = "/assets/rightArrow.svg";

const Privacy = ({ className = "" }) => {

      const navigate = useRouter()

      return (
            <>
                  {navigate.pathname === "/adv-landing-privacy" && <div className="backBtnWrapper container">
                        <Image src={rightArrow} width={100} height={20} className="backArrowImg" />
                        <button className="backBtn" onClick={() => navigate.back()}>Back</button>
                  </div>}
                  <div className={`${className} terms-content`}>
                        <div
                              className="container terms-div-content"
                              dangerouslySetInnerHTML={{
                                    __html: `<p>
          <b>AXAONE TECHNOLOGIES PRIVATE LIMITED</b>, a Company registered under the Companies Act 2013 and having its registered office at 43/2 and 43/3, 2nd Floor,
    Tulasi Damu Arrcade, Sathy Road, Ganapathy, Coimbatore, Tamilnadu – 641006 hereinafter referred to as the “Company” or “AXAONE” (where such expression 
    shall, unless repugnant to the context thereof, be deemed to include its respective legal heirs, representatives, administrators, permitted successors and assigns).
          </p>
          <h2>
          The “Company” as the creator of this Privacy Policy describes what information will it collect directly on or through our website https://healthsy:app/ (the “Site” 
    or “M-Site”) or from our mobile application “HealthSy” (the “App” or “Mobile App”). The “Company, the owner, the operator of this platform are referred collectively
    as “We”/” Our”/” Us”. As we provide and render services through both the ‘Site’ and ‘App”, we can refer to as the “Platform”. This includes the services rendered 
    on the platform that is performed by third party partnered retail pharmacies (“Retail Pharmacy”’/ “Partnered Pharmacy” / Third-party Retail Pharmacy”) for 
    medicine orders, delivery of OTCs and healthcare products, online consultation services through third party doctors also referred to as (“ Third-party Doctors”/ 
    “Partnered Doctors”), providing Home Healthcare services through third party nurses, physiotherapists, etc. collectively referred to as (“ Home Healthcare Service 
    Providers”) or for diagnostics services that is performed through third party diagnostic labs (“Third Party Diagnostic Labs”/ “Partnered Labs”)
          </h2>
          <p>We ensure a steady commitment to your privacy with regard to the protection of our invaluable information. To provide you with our uninterrupted use of services,
    we may collect and, in some circumstances, disclose information about you with your permission to the above service providers. To ensure better protection of 
    your privacy, we provide this notice explaining Our information collection and disclosure policies, and the choices You make about the way Your information is 
    collected and used.</p>
          <p>This Privacy Policy shall follow the General Data Protection Regulation (GDPR) in effect from May 25, 2018, and all provisions that may read to the contrary shall 
    be deemed to be void and unenforceable as of that date. If you do not agree with the terms and conditions of our Privacy Policy, including in relation to the 
    manner of collection or use of your information, please do not use, or access the Site. If you have any questions or concerns regarding this Privacy Policy, you 
    should contact our Customer Support Desk at <a class="privacyMailNavigate p-0" href="mailto:support@healthsy.in">support@healthsy.in</a> </p>
          <p>ANY CAPITALIZED WORDS USED HENCEFORTH SHALL HAVE THE MEANING ACCORDED TO THEM UNDER THIS AGREEMENT. FURTHER, ALL HEADING USED 
    HEREIN ARE ONLY FOR THE PURPOSE OF ARRANGING THE VARIOUS PROVISIONS OF THE AGREEMENT IN ANY MANNER. NEITHER THE USER NOR THE 
    CREATORS OF THIS PRIVACY POLICY MAY USE THE HEADING TO INTERPRET THE PROVISIONS CONTAINED WITHIN IT IN ANY MANNER.</p>
    <h6>1. DEFINITIONS</h6>
          <p>a. “We”, “Our”, and “Us” shall mean and refer to the Domain and/or the Company, as the context so requires</p>
          <p>b. “You”, “Your”, “Yourself”, “User”, shall mean and refer to natural and legal individuals who use the Platform and who is competent to enter binding contracts, as 
    per Indian laws.</p>
          <p>c. “Services” shall refer to providing a platform which will serve as an online healthcare platform providing services related to medicine delivery, online doctor 
    consultations, lab tests, and home healthcare. The detailed explanation for the same shall be provided in Clause 3 of these Terms of Use.</p>
          <p>d. “Third Parties” / “Third Party Partners” refer to any Application, company or individual apart from the User and the creator of this Application. These includes but 
    not limited to “Doctors, Home Healthcare Service Providers, Clinics / Hospitals, Retail Pharmacies, Sellers”.</p>
          <p>e. The term “Platform” refers to the Website/Domain and Platform created by the Company which enables the User to avail services of the Company using the 
    platform.</p>
          <p>f. “Personal Information” shall mean and refer to any personally identifiable information that we may collect from you such as Name, Email Id, Mobile number, 
    Password, Photo etc. For removal of any doubts, please refer to Clause.</p>
          <p>g. "Member/Patient/User" means a person, who completes the registration process and avails the services of the Platform in connecting with doctors or purchasing 
    the wellness or health packages, offered on the Platform.</p>
          <p>h. “Doctors/ Partnered Doctors/ Diagnostics Labs/ Hospitals/ Clinics /Health Centres” refers to those individuals and entities listed on the Platform and from whom 
    patients can choose to avail the services.</p>
          <p>i “Third Party Pharmacies” / “Partnered Retail Pharmacies” will refer to the pharmacies listed on the Platform which will be responsible for delivering the medicines 
    ordered by the Users on the Platform.</p>
          <p>j “Home Healthcare Service Providers” are those who are practising nurses, physiotherapists, caretakers who have been listed on our platform from who you can 
    choose to avail various Home Healthcare Services.</p>
          <p>k. “Platforms” / “Platform” refers to the Company's M-site, mobile applications, website.</p>
          <p>l. “Programme” refers to the system that is used by HealthSy for registration, on-boarding and maintaining the business relationship with its partners.</p>
          <p>m. “HealthSynergy” is simply HealthSy’s / company’s registration and on-boarding platform’s name where interested individuals such as doctors, retail pharmacies, 
    home healthcare service providers, NBFCs, brands, manufacturers, individuals, companies can register their interest through a web-based form in order to partner 
    with us and provide their valuable services to the users of HealthSy.</p>
    <h6>2. INFORMATION / DATA WE COLLECT ABOUT YOU</h6>
          <p>We are committed to respecting your online privacy. We further recognize your need for appropriate protection and management of any Personal Information 
    You share with us. We may collect the following information about you:</p>
          <p> <b>a. Contact Details: </b> First name, last name, mobile number, email ID, communication address, geographical locations as well as similar contact information. This is 
    the information you provide while registering yourself onto our platforms or while registering for any one of the HealthSy Partner registration and on-boarding 
    forms under ‘HealthSynergy’ that is present in this website.</p>
          <p> <b>b. Personal Information:</b>  Your Age, Gender, Date of Birth, Birthdate, Government identification documents that you provide, marital status, occupation, and other 
    personal information through surveys, questionnaire and E-forms.</p>
          <p> <b>c. Tracking Information:</b>  Such as, but not limited to the IP address of your device and Device ID when connected to the Internet. This information may include the 
    URL that you just came from (whether this URL is on the Platform or not), which URL you next go to (whether this URL is on the Platform or not), your computer or 
    device browser information, and other information associated with your interaction with the Platform.</p>
          <p> <b>d. Technical and Usage Information:</b>  Information related to your usage of the m-site, mobile application, website. The dates and times of you accessing our 
    platforms. These are done automatically through cookies, pixels and other tracking technologies. You can accept or reject these at the time of its appearances 
    via pop-ups, screens, etc.</p>
          <p> <b>e. Health related Information:</b>  We collect, when necessary, the information that is highly required for providing the various services on the Platform. This includes 
    the prescription medicines and OTCs that you place in your cart and in your orders, dosage details, alternate medicines, for facilitating online consultation with a 
    Doctor / Partnered Doctor, for facilitating your bookings with Home Healthcare Service Providers and during sample collection with Third party Diagnostic Labs.</p>
          <p> <b>f. Financial and Transactional Information:</b>  Information related to your transaction history on our platforms only, transaction details, method and modes of 
    payments,preferences, your manner with regards to your shopping and spending on our platforms, dates of transactions on our platforms, amount spent on our 
    platforms, and other related information.</p>
          <p> <b>g. Information from other sources:</b> Such as the details shared with our partners for facilitating the service you requested for. This included but not limited to the 
    information shared by you for medicine and healthcare products order processing with the “Third Party Retail Pharmacies, and similar information shared with 
    other registered “Third Party Partners”</p>
    <p> <b>h. Details of Platform usage for analytics:</b>  We collect, when necessary Sensitive Personal Data or Information “SPDI” as per the compliance with the Section 4 of 
    the IT (Reasonable Security Practises and Procedures and Sensitive Personal Information) Rules, 2011 (“SPDI Rules”). We may store or process your E-prescription, 
    medical notes, suggestions, recommendation, and Health related information that is generated on or through our Platform. We may collect your payment 
    information such as card number, expiration date, billing, and shipping addresses. You give your consent to storage, recording and disclosure of these information 
    by using the Services of the Platform. You agree that you are willing to provide your information voluntarily and at your own discretion which includes your SDPI. 
    You agree and give your consent to Us to collect, store, use and disclose of the personal information and the SDPI.</p>
    <p>This privacy policy also applies to data we collect from users who are not registered as members of this Platform, including, but not limited to, browsing behaviour,
    pages viewed etc. We also collect and store personal information provided by you from time to time on the Platform. We only collect and use such information 
    from you that we consider necessary for achieving a seamless, efficient, and safe experience, customized to your needs including:</p>
    <p>a. To enable the provision of services opted for by you.</p>
    <p>b. To enable the viewing of content in your interest.</p>
    <p>c. To communicate the necessary account and service-related information from time to time.</p>
    <p>d. To allow you to receive quality customer care services and data Collection.</p>
    <p>e. To comply with applicable laws, rules, and regulations</p>
    <p>f. To share information about HealthSy’s present and future promotional activities.</p>
    <p>Where any service requested by you involves a third party, such information as is reasonably necessary by the Company to carry out your service request may be 
    shared with such third party. We also do use your contact information to send you offers based on your interests and prior activity and to view the content 
    preferred by you. The Company may also use contact information internally to direct its efforts for service improvement but shall immediately delete all such 
    information upon withdrawal of your consent for the same through the ‘unsubscribe’ button or through an email to be sent to <a class="privacyMailNavigate p-0" href="mailto:customersupport@healthsy.in">customersupport@healthsy.in</a> </p>
    <p>To the extent possible, we provide you with the option of not divulging any specific information that you wish for us not to collect, store or use. You may also 
    choose not to use a particular service or feature on the Platform and opt-out of any non-essential communications from the platform.</p>
    <p>Further, transacting over the internet has inherent risks which can only be avoided by you following security practices yourself, such as not revealing account/login 
    related information to any other person and informing our customer care team about any suspicious activity or where your account has/may have been 
    compromised.</p>
    <h6>3. OUR USE OF YOUR INFORMATION</h6>
    <p>The information provided by you shall be used to provide and improve the service for you and all users.</p>
    <p>a. For maintaining an internal record.</p>
    <p>b. For enhancing the Services provided.</p>
    <p>c. To enable you to access our Platform to facilitate purchase of medicines and other services.</p>
    <p>d. For carrying out our obligations and in facilitating the services you request for from time to time.</p>
    <p>e. For processing the medicines and healthcare product’s orders.</p>
    <p>f. For communication purposes (SMS, emails, and phone calls).</p>
    <p>g. For audit and quality assessments.</p>
    <p>h. For research purposes.</p>
    <p>i. To prevent any illegal and suspected fraudulent activities that may poise threats to person(s) or violation of our terms and conditions.</p>
    <p>j. For contacting you during Online Doctor Consultations, Order processing and delivery, for contacting during Home Healthcare Service bookings, for assisting you 
    with queries. </p>
    <p>k. To comply with the applicable laws, rules, and guidelines.</p>
    <p>For more details about the nature of such communications, please refer to our Terms of Service. Further, your personal data and Sensitive Personal data may be 
    collected and stored by us for internal record.</p>
    <p>We will not sell, license, or trade your personal information. We will not share your personal information with others unless they are acting under our instructions, 
    or we are required to do so by law.</p>
    <p>Information collected via our server logs includes users' IP addresses and the pages visited; this will be used to manage the web system and troubleshoot 
    problems. We also use third-party analytics, tracking, optimization and targeting tools to understand how users engage with our Platform so that we can improve it
    and cater personalized content/ads according to their preferences.</p>
    <h6>4. HOW INFORMATION IS COLLECTED</h6>
    <p>Before or at the time of collecting personal information, we will identify the purposes for which information is being collected. If the same is not identified to you, 
    you have the right to request the Company to elucidate the purpose of collection of said personal information, pending the fulfilment of which you shall not be 
    mandated to disclose any information whatsoever</p>
    <p>We will collect and use your personal information solely with the objective of fulfilling those purposes specified by us, within the scope of the consent of the 
    individual concerned or as required by law. We will only retain personal information if necessary for the fulfilment of those purposes. We will collect personal 
    information by lawful and fair means and with the knowledge and consent of the individual concerned.</p>
    <p>Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up 
    to date.</p>
    <p> <b>The following are the ways in which your information is collected:</b> </p>
    <p>a.  Personal information shared by you at the time of registering onto our platforms (m-site, website, mobile applications, questionnaires)</p>
    <p>b.  Information collected automatically through cookies, pixels, other technologies at the time of your having an interaction on our platforms. This is solely done 
    for providing seamless service to you. We may use this information for internal analysis and to provide you with much more personalised content, services,
    location specific advertisement, offers etc.</p>
    <p>c.  Information collected from third party websites / applications: Sometimes we receive, collect and store information whenever you have an interaction with 
    third party websites that may use our technology or with whom we may have an agreement. The Privacy policy of that website's / operator’s is applicable here 
    as the information that is collected and stored is done on their behalf.</p>
    <p>d.  Information collected from “Third Party Partners”: We might receive from time to time your details shared by you with “Third Party Partners” such as order 
    details from partnered retail pharmacies, other registered third-party vendors, marketers, advertisers, partnered doctors, home healthcare service providers, 
    clinic / hospitals.</p>
    <h6>5.  OUR DISCLOSURE OF YOUR INFORMATION</h6>
    <p>The information about you and the other users of the Platform are important and integral to our business. The information that you share with us, or the 
    information is collected by us from you after your permission is only shared with third parties that are essential for facilitating the services you request for on this 
    platform. Also, we take adequate steps to ensure that these third parties have enough or sufficient data protection mechanisms in place. This is also one 
    important criterion for anyone who wants to partner with us. By accessing or using our “Site’ and “App” you not only consent to the Platform’s terms but also to 
    the terms and privacy policies of these third parties. We have enough measures in place such as legal agreements with these third parties and your personal 
    information nor your SPDI will not be misused or disclosed by these third parties to anyone at any time. These Third Parties include:</p>
    <p>•	Retail Pharmacies / Partnered Retail Pharmacies for facilitation medicine and healthcare product orders.</p>
    <p>•	Doctors / Partnered Doctors for Online Consultations.</p>
    <p>•	Home Healthcare Service Providers for satisfying your Home Healthcare Bookings.</p>
    <p>•	Clinics / Hospitals / Health Centres for satisfying your In-Clinic Appointment Bookings.</p>
    <p>•	Third Party Logistics Partner for smooth and safe delivery of your orders</p>
    <p>•	For legal obligations of the Company.</p>
    <p>•	For enhancing business operations.</p>
    <p>•	Payment Gateways for facilitating smooth payments related activities.</p>
    <p>•	For legal obligations of the Company.</p>
    <p>•	For enhancing business operations.</p>
    <p>•	Payment Gateways for facilitating smooth payments related activities.</p>
    <p>•	We may host surveys for survey creators for our platform who are the owners and users of your survey responses. We do not own or sell your responses. Anything 
    you expressly disclose in your responses will be disclosed to survey creators. Please contact the survey creator directly to better understand how they might share
    your survey responses.</p>
    <p>•	At times the company might get merged or acquisitions can take place and your personal information and the SDPI shared by you will be disclosed with the 
    concerned stakeholders such as investors, shareholders, partners, subsidiaries etc in accordance with Our Terms and Conditions and Privacy Policy so that they 
    understand how the users of our platform can have a seamless and better experience.</p>
    <h6>6.  EXTERNAL LINKS ON THE PLATFORM</h6>
    <p>The Platform may include advertisements, hyperlinks to other websites, applications, content, or resources. We have no control over any websites or resources, 
    which are provided by companies or persons other than Us. You acknowledge and agree that we are not responsible for the availability of any such external sites 
    or resources, and do not endorse any advertising, services/products, or other materials on or available from such platform or resources. You acknowledge and 
    agree that We are not liable for any loss or damage which may be incurred by you because of the availability of those external sites or resources, or because of 
    any reliance placed by you on the completeness, accuracy or existence of any advertising, products, or other materials on, or available from, such websites or 
    resources. These external websites and resource providers may have their own privacy policies governing the collection, storage, retention, and disclosure of 
    Your Personal Information that You may be subject to. We recommend that you enter the external website and review their privacy policy.</p>
    <h6>7.  GOOGLE ANALYTICS</h6>
    <p>We use Google Analytics to help us to understand how you make use of our content and work out how we can make things better. These cookies follow your 
    progress through us, collecting anonymous data on where you have come from, which pages you visit, and how long you spend on the site. This data is then 
    stored by Google to create reports. These cookies do not store your personal data.</p>
    <p>The information generated by the cookie about your use of the Website, including your IP address, may be transmitted to, and stored by Google on servers in the 
    United States. Google may use this information for the purpose of evaluating your use of the website, compiling reports on website activity for us and providing 
    other services relating to website activity and internet usage. Google may also transfer this information to third parties where required to do so by law, or where 
    such third parties process the information on Google's behalf. Google will not associate your IP address with any other data held by Google. By using this website,
    you consent to the processing of data about you by Google in the manner and for the purposes set out above.</p>
    <p>The Google website contains further information about Analytics and a copy of Google's privacy policy pages.</p>
    <h6>8.  COOKIES</h6>
    <p>We use data collection devices such as “cookies” on certain pages of our websites. “Cookies” are small files sited on your hard drive that assist us in providing 
    customized services. We also offer certain features that are only available using a “cookie”. Cookies can also help us provide information which is targeted to 
    your interests. Cookies may be used to identify logged in or registered users. Our website uses session cookies to ensure that you have a good experience. These 
    cookies contain a unique number, your 'session ID', which allows our server to recognize your computer and 'remember' what you have done on the site. The 
    benefits of this are:</p>
    <p>a.  You only need to log in once if you are navigating secure areas of the site.</p>
    <p>b.  Our server can distinguish between your computer and other users, so you can see the information that you have requested.</p>
    <p>You can choose to accept or decline cookies by modifying your browser settings if you prefer. This may prevent you from taking full advantage of the Website. 
    We also use various third-party cookies for usage, behavioural, analytics and preferences data. The following are the different types of cookies used on the 
    Website:</p>
    <p>a.  Authentication cookies: To identify the user and share the content that he or she requested.</p>
    <p>b.  Functionality cookies: For the customized user experience and resuming past course progress.</p>
    <p>c.  Tracking, optimization, and targeting cookies: To capture usage metric on the device, operating system, browser, etc. To capture behavioural metrics for 
    better content delivery. To cater and suggest most suited services.</p>
    <h6>9.  YOUR RIGHTS</h6>
    <p>Unless subject to an exemption, you have the following rights with respect to your personal data:</p>
    <p>a. The right to request a copy of your personal data which we hold about you.</p>
    <p>b.  The right to request for any correction to any personal data if it is found to be inaccurate or out of date.</p>
    <p>c.  The right to withdraw Your consent to the processing at any time.</p>
    <p>d.  The right to object to the processing of personal data.</p>
    <p>e.  The right to lodge a complaint with a supervisory authority.</p>
    <p>f.  The right to obtain information as to whether personal data are transferred to a third country or to an international organization.</p>
    <p>Where you hold an account with any of our services, you are entitled to a copy of all personal data which we hold in relation to you. You are also entitled to 
    request that we restrict how we use your data in your account when you log in.</p>
    <h6>10.  CONFIDENTIALITY</h6>
    <p>You further acknowledge that the Platform may contain information which is designated confidential by us and that you shall not disclose such information 
    without our prior written consent. Your information is regarded as confidential and therefore will not be divulged to any third party, unless if legally required to do 
    so to the appropriate authorities. We will not sell, share, or rent your personal information to any third party or use your e-mail address for unsolicited mail. Any 
    emails sent by us will only be in connection with the provision of agreed services, and you retain sole discretion to seek for discontinuation of such 
    communications at any point of time.</p>
    <h6>11.  CHILDREN/MINORS</h6>
    <p>Our platforms namely our website and mobile application are strictly not for use by minors or people under the age of 18. They can avail the services and products 
    offered on the platform only under the supervision or guidance of their parent(s) or guardian(s).</p>
    <h6>12.  OTHER INFORMATION COLLECTORS</h6>
    <p>Except as otherwise expressly included in this Privacy Policy, this document only addresses the use and disclosure of information we collect from you. To the 
    extent that you disclose your information to other parties, whether they are on our Platform or on other sites throughout the Internet, different rules may apply 
    to their use or disclosure of the information you disclose to them. To the extent that we use third party advertisers, they adhere to their own privacy policies. 
    Since we do not control the privacy policies of the third parties, you are subject to ask questions before you disclose your personal information to others.</p>
    <h6>13.  ACCESSING, REVIEWING AND CHANGING YOUR PROFILE</h6>
    <p>Following registration, you can review and change the information you submitted at the stage of registration, except Email ID and mobile number. An option for 
    facilitating such change shall be present on the Platform and such change shall be facilitated by the User. If you change any information, we may or may not keep 
    track of your old information. We will not retain in our files information you have requested to remove for certain circumstances, such as to resolve disputes, 
    troubleshoot problems and enforce our terms and conditions. Such prior information shall be completely removed from our databases, including stored ‘back up’ 
    systems. If you believe that any information, we are holding on you is incorrect or incomplete, or to remove your profile so that others cannot view it, the User 
    needs to remediate, and promptly correct any such incorrect information.</p>
    <h6>14.  CONTROL OF YOUR PASSWORD</h6>
    <p>You are entirely responsible for maintaining the confidentiality of your password. It is important that you protect it against unauthorized access of your account 
    and information by choosing your password carefully and keeping your password and computer secure by signing out after using our services.</p>
    <p>You agree not to use the account, username, email address or password of another Member at any time or to disclose your password to any third party. You are 
    responsible for all actions taken with your login information and password, including fees. If you lose control of your password, you may lose substantial control 
    over your personally identifiable information and may be subject to legally binding actions taken on your behalf. Therefore, if your password has been 
    compromised for any reason, you should immediately change your password. You agree to notify us immediately if you suspect any consistent unauthorized use 
    of your account or access to your password even after changing it.</p>
    <h6>15.  SECURITY</h6>
    <p>We treat data as an asset that must be protected against loss and unauthorized access. We employ many different security techniques to protect such data from 
    unauthorized access by members inside and outside the Company. We follow generally accepted industry standards to protect the Personal Information 
    submitted to us and information that we have accessed.</p>
    <p>However, as effective as encryption technology is, no security system is impenetrable. Our Company cannot guarantee the security of our database, nor can we 
    guarantee that information you provide will not be intercepted while being transmitted to the Company over the Internet.</p>
    <h6>16.  SEVERABILITY</h6>
    <p>Each paragraph of this Privacy Policy shall be and remain separate from and independent of and severable from all and any other paragraphs herein except where 
    otherwise expressly indicated or indicated by the context of the agreement. The decision or declaration that one or more of the paragraphs are null and void shall 
    have no effect on the remaining paragraphs of this privacy policy.</p>
    <h6>17.  COMPENSATION CLAUSE</h6>
    <p>The user accepts and agrees that Axaone, it’s subsidiaries, brands or any of its partners will not be held liable for any kind of monetary, financial or other kinds of compensation in the event of any untoward incidents that is caused to the patient. The user accepts and agrees that Axaone and its brand HealthSy is purely a technology platform and an aggregator that is engaged in connecting the users to the network of qualified and licensed partners across the country if the user wants and is intended to avail the services or products listed on Axaone’s online platforms namely the HealthSy app and website. Axaone, its subsidiaries, brands, directors, shareholders or employees will not be held responsible or liable for any damage caused to the user in the event of any untoward incidents like injury, death, loss of any property, etc</p>
    <h6>18.  AMENDMENT</h6>
    <p>Our Privacy Policy may change from time to time. The most current version of the policy will govern our use of your information and will always be at the Platform. 
    Any amendments to this Policy shall be deemed as accepted by the User on their continued use of the Platform.</p>
    <h6>19.  AUTOMATED DECISION MAKING</h6>
    <p>As a responsible Company, we do not use automatic decision-making or profiling.</p>
    <h6 id="cancellation-policy">20.  CONSENT WITHDRAWAL, DATA DOWNLOAD & DATA REMOVAL REQUESTS</h6>
    <p>To withdraw your consent, or to request the download or delete your data with us for any or all our services at any time, please email to <a class="privacyMailNavigate p-0" href="mailto:support@healthsy.in">support@healthsy.in</a> or 
    <a class="privacyMailNavigate p-0" href="mailto:registrations@healthsy.in">registrations@healthsy.in </a> </p>
    <h6>21.  CONTACT US</h6>
    <p>If you have any questions or concerns regarding this privacy policy, you should contact us by sending an e-mail to please contact our Grievance Redressal Office 
    or email to:</p>
    <p>Name: <b>Miss. Aishwarya S</b> </p>
    <p>Address: <b> 43/2 & 43/3, Second Floor, Sathy Road, Tulasi Damu Arrcade, Ganapathy, Coimbatore, Tamilnadu, India - 641006</b> </p>
    <p>Contact Number: <a class = "text-dark" href ="tel:0422-4726669"><b>  0422-4726669</b></a> </p>
    <p>E-mail: <b><a class="privacyMailNavigate p-0" href="mailto:grievance-officer@healthsy.in">grievance-officer@healthsy.in</a></b> </p>
    <p>Information provided on the website may not be 100% accurate and may be provided for promotional purposes of the business.</p>
    `,
                              }}
                        ></div>
                  </div>
            </>
      );
};

export default Privacy;
