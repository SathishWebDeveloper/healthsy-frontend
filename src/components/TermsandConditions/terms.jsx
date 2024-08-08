import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
// import "./terms.css";

const rightArrow = "/assets/rightArrow.svg";

const Terms = ({ className = "" }) => {

    const navigate = useRouter()

    return (
        <>
            {navigate.pathname === "/adv-landing-terms" && <div className="backBtnWrapper container">
                <Image src={rightArrow} width={100} height={20} className="backArrowImg" />
                <button className="backBtn" onClick={() => navigate.back()}>Back</button>
            </div>}
            <div className={`${className} terms-content`}>
                <div
                    className="container terms-div-content"
                    dangerouslySetInnerHTML={{
                        __html: `<p>
          We, <b>AXAONE TECHNOLOGIES PRIVATE LIMITED</b>, a Company registered under the Companies Act 2013 and having its registered office at 43/2 & 43/3, 2nd Floor,
          Tulasi Damu Arrcade, Sathy Road, Ganapathy, Coimbatore District, Tamilnadu, India - 641006 hereinafter referred to as the “Company”, “Us”, “Our”, “We” or
          “AXAONE” (where such expression shall, unless repugnant to the context thereof, be deemed to include its respective legal heirs, representatives, administrators,
          permitted successors and assigns).
      </p>
      <p>
          The Company ensures steady commitment to your usage of the Platform and privacy about the protection of your valuable information. This document contains
          information about the Website and Domain https://healthsy.app/ and mobile application “HealthSy” (hereinafter referred to as the “Platform”) that is owned,
          operated and maintained by <b>AXAONE TECHNOLOGIES PRIVATE LIMITED.</b>
      </p>
      <p>
          This is an electronic document / record that within the terms of the Information Technology Act, 2000 and those rules that fall within it. This electronic document
          / record is computer generated and does not require any physical or digital signatures. This electronic document / record is published with the provisions of
          Rule3(1) of the Information Technology Act (Intermediaries Guidelines and Digital Media Ethics Code) Rules, 2021 that requires that mandatory publishing of
          Terms and Conditions of Usage, Privacy Policy or accessing the website and the mobile applications of the Company.
      </p>
      <h6> 1. To these Terms of Use (“Terms”), wherever the context so requires,</h6>
      <p>
          a.  “We”, “Our”, and “Us” shall mean and refer to the Domain / Mobile Application, and/or the Company, as the context so requires.
      </p>
      <p>b.  “You”, “Your”, “Yourself”, “Member/User”, shall mean and refer to natural and legal individuals who use the Platform and who is competent to enter binding
          contracts, as per Indian laws.</p>
      c.  “Services” shall refer to providing a platform which will serve as an online healthcare platform providing services related to medicine delivery, online doctor
          consultations, lab tests, and home healthcare services. The detailed explanation for the same shall be provided in Clause 3 of these Terms of Use.
      <p>d.  “Third Parties” refer to any Application, Company or individual apart from the Member, and the creator of this Platform. It shall include such payment gateways
          as partnered by the Company.</p>
      <p>
          e.  The term “Platform” refers to the Website/Domain and mobile Application created by the Company which enables the Client / User to avail services of the
          Company using the platform.
      </p>
      <p>
          f.  "Member/Patient/User" means a natural or legal person, who completes the registration process and avails the services of the Platform for purchasing
          medicines, booking online consultations with the doctors listed on the Platform, booking lab tests, in-clinic doctor appointments or availing home healthcare
          facilities offered on the Platform.
      </p>
      <p>g.  “Doctors / Clinic/ Hospital/ Home Healthcare Service Provider / Diagnostic centre” refers to those entities listed on the Platform and from whom patients can
          choose to avail the services.</p>
      <p>
          h.  “E-Wallet / HealthSy Wallet “refers to the closed system of pre-paid payment instrument issued by the platform and created and managed directly by the Wallet
          Service Provider.
      </p>
      <p>
          i.  “E-Wallet Account / HealthSy Wallet Account” means the User’s E-Wallet account on the Platform classified as closed system payment instruments issued by
          accepting minimum customer details, i.e., Customer name, e-mail address, mobile number, which permit payment for purchase of eligible product from the
          Platform
      </p>
      <p>
          j.  “Third Party Pharmacies / Partnered Retail Pharmacies” will refer to the pharmacies listed on the Platform which will be responsible for delivering the
          medicines ordered by the Users on the Platform. These Third-Party Pharmacies are entirely responsible for the sale of medicines and HealthSy simply acts as a
          facilitator / marketplace.
      </p>
      <p>
          k.  The use of this Platform by the Members is solely governed by these Terms as well as the Privacy Policy and other policies as listed on the Platform, and any
          modifications or amendments made thereto by the Company, from time to time, at its sole discretion. If you continue to access and use this Platform, you are
          agreeing to comply with and be bound by the following Terms and Conditions of Use and Our Privacy Policy. The Member expressly agrees and acknowledges
          that these Terms and Policy are co-terminus in nature and that expiry/termination of either one will lead to the termination of the other.
      </p>
      <p>
          l.  The Member unequivocally agrees that these Terms and the Policy constitute a legally binding agreement between the Member and the Company, and that the
          Member shall be subject to the rules, guidelines, policies, terms, and conditions applicable to any service that is provided by the Platform, and that the same shall
          be deemed to be incorporated into these Terms and shall be treated as part and parcel of the same. The Member acknowledges and agrees that no signature or
          express act is required to make these Terms and the Policy binding on the Member and that the Member’s act of visiting any part of the Platform constitutes the
          Member’s full and final acceptance of these Terms and the Policy.
      </p>
      <p>
          m. The Company reserves the sole and exclusive right to amend or modify these Terms without any prior permission or intimation to the Member, and the
          Member expressly agrees that any such amendments or modifications shall come into effect immediately. The Member has a duty to periodically check the
          terms and stay updated on its requirements. If the Member continues to use the Platform following such a change, the Member will be deemed to have
          consented to all amendments/modifications made to the Terms. In so far as the Member complies with these Terms, it is granted a personal, non-exclusive,
          non-transferable, revocable, limited privilege to access and use the Platform and the Services. If the Member does not adhere to the changes, the Member
          must stop using the Services at once. Your continued use of the Services will signify your acceptance of the changed terms.
      </p>
      <p>
          n.  These terms and conditions, read with the privacy policy and wallet terms and conditions, are an electronic record under the Information Technology Act,
          2000, and the rules made thereunder and the amended provisions pertaining to electronic records under various Indian statutes and is enforceable against
          you under law by way of your acceptance hereof.
      </p>
      <p>
          o.  The Company hereby states that the Terms of Service and Use is published in compliance with laws governing the territory of India including but not
          limited to:
      </p>
      <p>
          p. The Indian Contract Act, 1872 (“Contract Act”).
      </p>
      <p>
          q.  The (Indian) Information Technology Act, 2000 (“IT Act”) and the rules, regulations, guidelines and clarifications framed thereunder, including the (Indian)
          Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Information) Rules, 2011, and the (Indian) Information
          Technology (Intermediaries Guidelines) Rules, 2011 (“IG Guidelines”);
      </p>
      <p>
          r.  The Drugs and Cosmetic Act, 1940 (“Drugs Act”), read with the Drugs and Cosmetics Rules, 1945 (“Drugs Rules”).
      </p>
      <p>s. The Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954 (“Drugs and Magic Act”).</p>
      <p>t. The Indian Medical Council Act, 1956 read with the Indian Medical Council Rules, 1957.</p>
      <p>u. The Consumer Protection Act, 1986.</p>
      <p>
          v. “Programme” and “HealthSynergy” – “Programme” refers to the system that is used by HealthSy for registration, on-boarding and maintaining the
          business relationship with its partners. “HealthSynergy” is simply HealthSy’s / company’s registration and on-boarding platform’s name where
          interested individuals such as doctors, retail pharmacies, home healthcare service providers, NBFCs, brands, manufacturers, individuals, companies
          can register their interest through a web-based form in order to partner with us and provide their valuable services to the users of HealthSy.
      </p>
      <p>
          w. This version of the website <a href="#" class="privacyMailNavigate p-0">(https://healthsy:app/)</a> that is live currently is exclusively a platform that is be used by the company for launching, branding, traction
          building, promotions, blogging, marketing, partner registrations and on-boarding and for recruitment activities. The full version or the ecommerce version of the
          website will be updated shortly. This terms and conditions along with the privacy policy will be applicable for this version of the website <a href="#" class="privacyMailNavigate p-0">(https://healthsy:app/)</a> or any
          other versions that will be updated in the future.
      </p>
      <h6>2. REGISTRATION</h6>
      <p>a. For HealthSy Mobile App and E-Commerce Website : Registration is not mandatory for all Members to acquire information about the Platform or its features,
          however, to avail the services or purchase medicines through the Platform, the Users will have to be registered on the platform.</p>
      <p> b. For Current Version of the Live Website : The platform <a href="#" class="privacyMailNavigate p-0">(https://healthsy:app/)</a> is open to all since it is a promotional website.
          However, under ‘HealthSynergy” if any interested party(ies) / individuals want to register themselves for the respective partner programmes of HealthSy such as
          ‘HealthSy Partnered Doctor Network Programme’, HealthSy Partnered Pharmacy Network Programme’, HealthSy Partnered Home Healthcare Service Providers
          Network Programme’, then registration is mandatory. Each registration form has its set of questions for which the user / individual is willingly given their answers
          and submitted the same to us. HealthSy’s respective on-boarding team will get in touch with them via call or email, verify the details, share more information if
          needed such as licenses, documents, etc. and on-board the doctor, retail pharmacy or home healthcare service provider. The user / individual accepts and agrees
          that all the information that is provided on the respective registration forms are true and not malicious in any way or any form. The user / individual also accepts and
          agrees to allow the HealthSy onboarding team to get in touch with them via call or email during work hours and complete the onboarding process. </p>
      <p>c. Get Notified : The user / individual who wants to get notified of our product launch in the near future can submit their details such as their name, email, mobile
          number (authenticated via OTP) and their level of excitement with regards to HealthSy’s upcoming application launches. The user / individual accepts and agrees
          for the same. The user / individual will be notified of HealthSy’s app launch via a SMS and email. Meanwhile, you agree to receiving promotional and transactional
          SMS and emails from HealthSy which you can unsubscribe as well.</p>
      <p>d. Registration for this Platform is available only to those above the age of Eighteen (18) years, barring those “Incompetent to Contract” which inter alia include
          insolvents. If you are a minor and wish to use the Platform as a Member, you may do so through your legal guardian and the Company reserves the right to
          terminate your account on knowledge of you being a minor and having registered on the Platform or availing any of its Services.</p>
      <p>e. Further, at any time during your use of this Platform, including but not limited to the time of registration, you are solely responsible for protecting the
          confidentiality of Your Username and password, and any activity under the account shall be deemed to have been done by you. In the case that you provide us
          with false and/or inaccurate details or we have reason to believe you have done so, we hold the right to permanently suspend your account. You agree that you
          will not disclose your password to any third party and that you will take sole responsibility for any activities or actions under your account, whether you have
          authorized such activities or actions. You will immediately notify us of any herein below use of your account.</p>
      <h6>3. PLATFORM OVERVIEW</h6>
      <p>The Platform acts as an aggregator and connects the Users with retail pharmacies, hospitals, doctors, and wellness centres, home healthcare service providers
          of their choice from among those listed on the Platform. The following are the Services provided by the Platform:</p>
      <p> <b>i. Online Doctor Consultation: </b> The platform facilitates booking of online consultations with the doctors of the User’s choice listed on the Platform. To avail this
          Service, the member must select from among listed doctors of their choice listed on the Platform and pick a time slot of their choice from among the available
          time slots. To confirm the consultation, the Users would be required to provide the contact information, symptoms / health concerns requested by the Platform.
          Upon receiving the online doctor consultation conformation , the doctor will connect with you at the scheduled time either via chat, call or video as requested by
          you. The time duration taken for diagnosing you is at the discretion of the third-party doctor. All doctors listed on the platform are third-party and they merely
          provide their services to you with your 100% consent only. The Company will not be responsible in manner for discrepancies or issues that might arise due to
          poor connectivity or network connections. The terms ‘third party doctors / doctors / practitioners / medical practitioner / specialists’ are common words / terms
          that you may come across on the website and mobile application which means the User’s personal doctor with whom he / she will have a patient – doctor
          relationship. You agree and acknowledge that these doctors are not part of the company but simply listed on the company’s platform to provide online doctor
          consultation and advisory service to you after your consent. The platform also has 24 * 7 online doctor consultation called InstaDoc 24/7 service under which after
          providing your contact information and your symptoms / health conditions, a doctor (Only General Physician) will be assigned to you post payment confirmation.
          You agree that this service will be available to you only for common health concerns such as stomach pain, body aches, headaches or simply those health
          concerns that will be treated by a general physician. You accept and acknowledge that you cannot use this service or the online doctor consultation for any
          emergency or critical cases. The company does not recommend any specific doctor / specialists under any circumstances. You agree and acknowledge that any
          Digital Prescription issued to you following an online doctor consultation with your doctor is issued in compliance with the applicable laws of the country. If any
          Digital Prescription issued by the doctor is not valid, the retail pharmacies will inform the same and refuse to dispense the prescribed medicines. We only act as
          an aggregator and in event of any issues arising out of the digital prescription the company shall not be responsible or liable in any way. You should always follow
          the advice of your doctor and if in doubt always look for a second opinion. Most importantly, it is your responsibility to provide only accurate and true information
          with regards to your symptoms /health conditions before availing online consultation with a doctor. The statements, opinions, advise, logics, consultations given
          by the third-party doctors through HealthSy’s website and mobile application will not be binding on the company nor will reflect the company’ objective. Also, the
          company makes no promises / warranties that these services will meet your 100 % satisfaction. You accept and agree that in order to cancel an upcoming online
          doctor consultation, you will connect with our support team via call, mail or chat at least 45 minutes before your schedules time slot. If cancelled with less than
          45 minutes to the schedules time slot, a ‘Cancellation Fee’ of INR 75 will be applicable. If there is a ‘No Show’ from your side for that online doctor consultation ,
          no refunds will be applicable. You agree and accept to the ‘Online Doctor Consultation Cancellation Policy’ when you avail any online doctor consultations services
          on our platform.</p>
      <p> <b>ii. Purchase of Medicines and Pharmaceutical Products:</b> The Users can purchase medicines, Pharmaceutical Products, OTCs (Over-The- Counter) and healthcare
          products listed on the Platform that are offered by our third-party retail pharmacies (“Retailers / Partnered Retail Pharmacy). HealthSy simply acts act as an
          aggregator / marketplace / portal to connect online users with offline retail pharmacies. All items including medicines, healthcare products that are listed on our
          platform and its content are made available to you by these retail pharmacies and they are all third-party items / healthcare products / medicines. If the medicines
          sought to be purchased by the Users are categorized as prescription drugs, they would be required to upload a scanned copy of the latest valid prescription issued
          by a registered medical practitioner / doctor. The third-party pharmacies who will be responsible for the sale of the Order shall verify the prescription and validate
          the same with the User over e-mail or phone call and accept the order only on being satisfied about the authenticity of the prescription. The Order for prescription
          drugs will not be processed unless a valid prescription has been submitted by the User. If the prescription uploaded by the user is not valid it will be considered
          an invalid prescription and the third-party pharmacy that is assigned the order will not process the same. The company will not be responsible or liable to the
          users for the sale and the authenticity of the medicines / products and services offered on sale on the platform. The retail pharmacies will be entirely responsible
          and liable for the same. The Company is not responsible for any delayed, performance related nor breach of contract which you have entered with the Retail
          Pharmacies. The listing of the medicines and its contents on the platform is merely an invite for offer for sale. The order placement and the sale that take place
          is entirely with your consent and after thorough validation of prescription from the retail pharmacy’s end. The initiation and the conclusion of an order placed by
          you for medicines, products or services is within the hands of the concerned Retail Pharmacy. The responsibility for the invoice for your order is also in the hands
          of the retail pharmacies. The user agrees and acknowledges that at no point in time the medicines or items placed by you are a property of the company. The
          orders for medicines and pharmaceutical products will be delivered by the retail pharmacies or third-party logistic companies. The User also agrees and
          acknowledge that company in no way is responsible nor liable for delays, misconduct, errors that is on the part of the Retail Pharmacies. The User also agrees to
          accept these delivery agents and logistical companies to deliver the order to the location / address specified by the user. You also accept and agree to the Return,
          Refund and Cancellation Policy if you choose to place an order for medicines, OTCs and healthcare products over the platform.</p>
      <p> <b>iii. Alternates for Prescribed medicines:</b> You accept and agree that as per the existing laws in India, an alternate for a prescription medicine will be provided to
          you online if under these circumstances :</p>
      <p>You have provided your 100% consent for an alternate medicine to the prescribed medicine by the doctor with the third party licensed pharmacist.</p>
      <p>If the doctor / medical practitioner has given his consent to provide any equivalent generic drug which contains the same salt compositions or the nearest salt
          compositions to the prescribed medicines.</p>
      <p>If the prescription provided by the doctor contains only the active salt names instead of any specific brand name and even under such circumstances approved by
          a licensed pharmacist.</p>
      <p> <b>iv. Delivery of medicines, OTCs and healthcare products:</b> You accept and acknowledge that the company does not engage in the delivery of your orders. The
          medicines and healthcare products will be delivered to your address as chosen by you by the retail pharmacy’s delivery agent or third-party delivery companies /
          individuals. You also accept and agree that this delivery agent will act as your agent for collecting the order from the retail pharmacies and delivering it to your
          chosen address. This is done with your consent and the company will not be held responsible or liable for this.</p>
      <p> <b>v. Transfer of property and sale completion:</b> once the order is accepted by the retail pharmacy, it would be processed in accordance with the terms and
          conditions of the order placed by you. The order processing is undertaken by the retail pharmacy’s licensed pharmacist whenever required by the law. You agree
          and accept that the property and the title of the items ordered by you is immediately transferred to you with the processing of the order and with the invoice billed
          and raised by the respective retail pharmacy. The invoice for the items in the order will be provided by the respective retail pharmacy to you. You and acknowledge
          that the sale of products and any services involved is completed at the respective retail pharmacy itself and that the company is in no way connected to the
          transfer of property and completion of sale.</p>
      <p> <b>vi. Home Healthcare Services:</b> The Users can avail home health care facilities, i.e., medical and healthcare services provided within the confines of your home
          which include but will not be limited to nursing care, monitoring vitals, assistance in everyday activities, physiotherapy sessions, monitoring health conditions in
          recovering patients, care for terminally ill patients, elderly care support, Mom and Baby care support, Speech therapy, Counselling. The Users can avail the services
          of trained professionals in the sphere of home health care listed on the Platform.</p>
      <p>The Platform only acts as an aggregator and shall not be responsible in any manner for any death, injury or any other medico legal issues that may arise because
          of availing the services or purchase of medicines on the Platform, the onus for the same shall lie with the Home Healthcare Service Provider or the doctors
          providing the treatment. The Home Healthcare Service Providers are not part of the company but are professionals who have listed themselves on the platform
          to provide health and medical services that is within their field of profession.</p>
      <p>Any additional services sought from the professionals or entity which do not fall within the ambit of the services availed on the Platform will have to be paid by
          the User directly to the professional providing the service. You also agree and accept to the Home Healthcare Services Cancellation Policy if you choose to make
          a booking for the services on the platform.</p>
      <p> <b>vii. In-Clinic Doctor Appointments:</b> The platform is simply an aggregator that lists the doctors /Practitioners / Clinics / Hospitals / Health Centres so that
          online users can make appointments / bookings for in-clinic visits. The information / content provided on the platform with respect to the Doctor / Practitioner
          or the information with regards to the location / reputation of the Clinic / Hospital / Health Centre is entirely on their part. They are in no way part of the company.
          The user accepts and acknowledges that their conduct and activities are no way legally binding on the company. The company will not be responsible nor liable
          in any way for their actions that brings in any harm, economic loss, or legal issues to the user. You also agree and accept to the In-clinic Appointments
          Cancellation Policy if you choose to make a booking for the services on the platform.</p>
          <h6>4. COMPENSATION CLAUSE</h6>
          <p>The user accepts and agrees that Axaone, it’s subsidiaries, brands or any of its partners will not be held liable for any kind of monetary, financial or other kinds of compensation in the event of any untoward incidents that is caused to the patient. The user accepts and agrees that Axaone and its brand HealthSy is purely a technology platform and an aggregator that is engaged in connecting the users to the network of qualified and licensed partners across the country if the user wants and is intended to avail the services or products listed on Axaone’s online platforms namely the HealthSy app and website. Axaone, its subsidiaries, brands, directors, shareholders or employees will not be held responsible or liable for any damage caused to the user in the event of any untoward incidents like injury, death, loss of any property, etc</p>
      <h6>5.  ELIGIBILITY</h6>
      <p>a. The Members further represent that they will comply with this Agreement and all applicable local, state, national and international laws, rules, and regulations.</p>
      <p>b. The Members may not use the Platform if they are not competent to contract or are disqualified from doing so by any other applicable law, rule, or regulation
          currently in force.</p>
      <h6>6. CONTENT</h6>
      <p>All text, graphics, Member interfaces, visual interfaces, photographs, trademarks, logos, brand names, descriptions, sounds, music, and artwork (collectively,
          ‘Content’), is generated/provided by Platform and the Platform have control over it and assures a reasonable quality, the accuracy, integrity, or genuineness of
          the services offered through the Platform.</p>
      <p>The Users/doctors, diagnostic centres, third party pharmacies and para medical or nursing health care professionals shall be solely responsible for the Content
          uploaded by them on the Platform including but not limited to details of the medical professional or specific queries and requirements. In case of any dispute
          pertaining to the authenticity, accuracy or originality of such content, the User responsible for posting the content alone shall be responsible for the same. They
          shall be further responsible for indemnifying the Company and the Platform under such circumstances</p>
      <p>The listing of the medicines displayed on the Platform by Third Party Pharmacies is only an “invitation to offer for sale.” By placing an order for the medicines, the
          User is making an offer for purchase and such order will be construed to be accepted only upon the Third-Party Pharmacist accepting to deliver the order after
          due verification of the Prescription. The e-mail confirmation by the Company upon receiving the User’s order will not be construed as acceptance of offer.</p>
      <p>All the Content displayed on the Platform is subject to copyright and shall not be reused by any party (or a third party) without the prior written consent of the
          Company and the copyright owner.</p>
      <p>The Members are solely responsible for the integrity, authenticity, quality and genuineness of the feedback and comments by Members can be made via the
          Platform, the Platform bears no liability whatsoever for any feedback or comments made by the Members or made in respect of any of the content on the
          Platform. Further, the Platform reserves its right to suspend the account of any Member for an indefinite period to be decided at the discretion of the
          Platform or to terminate the account of any Member who is found to have created or shared or submitted any Content or part thereof that is found to be
          untrue/inaccurate/misleading or offensive/vulgar. The Member shall be solely responsible for making good any financial or legal losses incurred through the
          creation/sharing/submission of Content or part thereof that is deemed to be untrue/inaccurate/misleading.</p>
      <p>The Members have a personal, non-exclusive, non-transferable, revocable, limited privilege to access the Content on the Platform. Members shall not copy,
          adapt, and modify any content without written permission of the Company.</p>
      <h6>7. E-WALLET FACILITY (HealthSy Wallet)</h6>
      <p>i. The E-wallet enables the Users to use cashbacks earned on medicine and healthcare product orders from time to time. Also, any refunds can be reverted back
          to the HealthSy Wallet only with your consent. No money can be added into this wallet as it is a closed wallet in accordance with the RBI rules and regulations.</p>
      <p>ii. The amounts in the HealthSy Wallet may be used for making payments towards transactions/purchases done by the Users on the Platform only.</p>
      <p>iii. The Users will not be permitted to make any cash withdrawals or redemptions from the EWallet or make payments or settlements with third party services,
          in accordance with the Master Direction on Issuance and Operation of Prepaid Payment Instruments issued by Reserve Bank of India (“RBI”).</p>
      <p>iv. The balance in the Wallet cannot be used for purchase of another prepaid payment instrument.</p>
      <p>v. The amount credited in the wallet via cashbacks must be used by the user within a period of 3 months.</p>
      <p>vi. The purchase from the wallet will enable the users for additional insider discounts in accordance with the terms for such discount set out on the Platform.</p>
      <p>vii. By registering for or using E-Wallet feature on the Platform, the User represents and warrant that they have the right, authority, and capacity to enter these
          E-Wallet Terms and to abide by all the terms and conditions.</p>
      <p>viii. HealthSy E-Wallets are non-transferable.</p>
      <p>ix. The Company or the Wallet Service Provider has the right to suspend or discontinue your HealthSy Wallet facility at any point of time for any violation of the
          T&Cs, for modifying or copying any part of the software, for copying the graphic work, potential fraud related activities, threat to the
          national security, any force majeure events, causing harm to the brand and the company in any way possible.</p>
      <p>x.  No interest in payable on the amount credited via cashbacks or refunds of your HealthSy Wallet.</p>
      <h6>8. INVOICING FOR PURCHASE ON THE PLATFORM</h6>
      <p>Purchase of medicines on the Platform would entitle the User to valid invoices, both in digital form which would be mailed to the User’s e-mail id and the
          physical invoice which would be issued with the delivery of the order. The invoice for purchase of medicines, OTCs and healthcare products is provided by the
          respective retail pharmacy to you via email. The invoices would comprise the following details:</p>
      <p>i. The name of the medicine / product,</p>
      <p>ii. Quantity, manufacturers name</p>
      <p>iii. Manufacturer’s address,</p>
      <p>iv. Price,</p>
      <p>v. Contact details,</p>
      <p>vi. Taxes,</p>
      <p>vii. Customer’s details,</p>
      <p>viii. Total price</p>
      <p>ix. Mode of payment</p>
      <p>x. Name of the Retail Pharmacy</p>
      <p>xi. Address of the Retail Pharmacy</p>
      <p>xii. Registration Number of the Retail Pharmacy</p>
      <p>xiii. License Number and Name of the Pharmacist.</p>
      <p>xiv. Discount / Offers if any.</p>
      <h6>9. TERM</h6>
      <p>a. These Terms shall continue to form a valid and binding contract between the Parties and shall continue to be in full force and effect until the Member continues
          to access and use the Platforms.</p>
      <p>b. The Members may terminate their use of the Platform at any time.</p>
      <p>c. The Company may terminate these Terms and close a member’s account at any time without notice and/or suspend or terminate a member’s access to the
          Platform at any time and for any reason, if any discrepancy or legal issue arises.</p>
      <p>d. Such suspension or termination shall not limit our right to take any other action against you that the Company considers appropriate.</p>
      <p>e. It is also hereby declared that the Company may discontinue the Services and Platforms without any prior notice.</p>
      <h6>10. TERMINATION</h6>
      <p>a. The Company reserves the right, in its sole discretion, to unilaterally terminate the Member’s access to the Platform, or any portion thereof, at any time, without
          notice or cause.</p>
      <p>b. The Platform also reserves the universal right to deny access to Members, to any/all are on its Platform without any prior notice/explanation to protect the
          interests of the Platform and/or other visitors to the Platform.</p>
      <p>c. The Platform reserves the right to limit, deny or create different access to the Platform and its features with respect to different Members, or to change any of
          the features or introduce new features without prior notice.</p>
      <p>d. The Member shall continue to be bound by these Terms, and it is expressly agreed to by the Parties that the Member shall not have the right to terminate these
          Terms till the expiry of the same.</p>
      <h6>11. COMMUNICATION</h6>
      <p>By using this Platform and providing his/her identity and contact information to the Company through the Platform, the Members hereby agree and consent to
          receive calls, e-mails, or SMS from the Company and/or any of its representatives at any time.</p>
      <p>Users can report to <a class="privacyMailNavigate p-0" href="mailto:support@healthsy.in">support@healthsy.in </a> if they find any discrepancy about Platform or contentrelated information and the Company will take necessary action
          after an investigation. The response with resolution (if any issues found) shall be dependent on the time is taken for investigation.</p>
      <p>The Users expressly agrees that notwithstanding anything contained herein above, it may be contacted by the Company or any representatives relating to any
          Services availed by the Member on the Platform or anything pursuant thereto and the Members agree to indemnify the Company from all harassment claims. It
          is expressly agreed to by the Parties that any information shared by the Member with the Company shall be governed by the Privacy Policy.</p>
      <p>Unsubscribe and Opt-Out: Users can opt-out of receiving further communication from the Company through SMS and Emails by Logging into your HealthSy
          account on the website <a href="#" class="privacyMailNavigate p-0"> https://healthsy:app/</a> and unsubscribing the same. You can also Unsubscribe by clicking the ‘Unsubscribe” option found on newsletters
          received via emails.</p>
      <h6>12. PAYMENT</h6>
      <h6>Charges</h6>
      <p>a. Registration on the Platform is free of cost at present. However, in case of availing the services, the Users shall pay the appropriate fee for the products and
          services listed on the platform directly to the Company in any of the prescribed modes of Payment Methods.</p>
      <p>i. Debit Card</p>
      <p>ii. Credit Cards</p>
      <p>iii. Net Banking</p>
      <p>iv. UPI:</p>
      <p>v. Online Payment Gateways: _________</p>
      <p>vi. Cash on Delivery (COD)</p>
      <p>b. The User(s) acknowledges that a minimum of one of the above payment methods shall be offered on the Platform. An additional processing
          charge of 3% would be levied on the payments made and the User agrees to the same. The Users are solely responsible for the genuineness of
          credentials and payment information provided on the Platform and the Platform shall not be liable for any consequences, direct or indirect,
          resulting from the provision of incorrect or untrue credentials or payment information by any Users </p>
      <p>c. The payment is processed through a third-party gateway and the User shall be bound by the third party’s terms and conditions.</p>
      <p>d. For appointments booked with doctors for online consultations and in clinic appointments or any other medical professionals booked through
          the Platform, the Users are advised to make payment for the same through the Platform.</p>
      <p>e. For any payments made through the Platform, the Company or the Platform shall not be responsible for:</p>
      <p>i. Lack of authorization for any transaction.</p>
      <p>ii. Exceeding of any pre-set limit mutually agreed by the User and their bank</p>
      <p>iii. Any payment issues arising because of the transactions.</p>
      <p>iv. The transaction being declined for any other reason</p>
      <p>f. In the event of money getting deducted from the User’s Account, despite a failure of transaction, the payment deducted will be returned to the
          User’s account within 7 working days.</p>
      <p>g. If you choose to make ‘Pay directly to service provider’ for booking any home healthcare services, you choose to directly hand over the home
          healthcare service feed to the service provider opted by you after the successful completion of the service. Any issues arising from this will not be
          held liable to the company. It is between you and the respective home healthcare service provider.</p>
      <p>h. If you choose to make ‘Pay at Clinic; for booking an in-clinic doctor appointment then you must directly hand over the in-clinic fees at the
          respective clinic post completion of your appointment and the company will not be held liable for any issues arising from this. It is between you
          and the respective clinic’s administration.</p>
      <h6>13. MEMBER OBLIGATIONS AND FORMAL UNDERTAKINGS AS TO CONDUCT</h6>
      <p>The Users agrees and acknowledges that they are a restricted Member of this Platform and that they:</p>
      <p>a. Agree to provide genuine credentials during the process of registration on the Platform. You shall not use a fictitious identity to register. The
          Company is not liable if the Member has provided incorrect information.</p>
      <p>b. Agree to ensure the Name, Email address, Address, Mobile number and any such other information provided during account registration is
          always valid and shall keep your information accurate and up to date. The Member can update their details anytime through accessing their
          profile on the platform.</p>
      <p>c. Agree that they are solely responsible for maintaining the confidentiality of your account password. You agree to notify us immediately of any unauthorized
          use of your account. Company reserves the right to close your account at any time for any or no reason.</p>
      <p>d. Understand and acknowledge that the data submitted is manually entered into the database of the Platform. The Member also acknowledges the fact
          that data so entered the database is for the purpose of easy and ready reference for the Member, and to streamline the Services through the Platform.</p>
      <p>e. The User agrees that opinions about health issues or health care generated on the Platform will not be construed by them under any circumstances as
          expert opinion</p>
      <p>f. The Users agree and understand that they are availing the services on the Platform or purchasing medicines on the Platform at their own risk and will not
          hold the Platform or the Company liable under any circumstances.</p>
      <p>g. Authorize the Platform to use, store or otherwise process certain personal information and all published Content, User responses, User locations,
          Member comments, reviews, and ratings for personalization of Services, marketing, and promotional purposes and for optimisation of Memberrelated
          options and Services.</p>
      <p>h. Understand and agree that, to the fullest extent permissible by law, the Platform/Company and their successors and assigns, or any of their affiliates
          or their respective officers, directors, employees, agents, licensors, representatives, operational service providers, advertisers or suppliers shall not be
          liable for any loss or damage, of any kind, direct or indirect, in connection with or arising from use of the Platform or from this terms of use, including, but
          not limited to, compensatory, consequential, incidental, indirect, special or punitive damages.</p>
      <p>I. Are bound not to cut, copy, modify, recreate, reverse engineer, distribute, disseminate, post, publish or create derivative works from, transfer, or sell any
          information or obtained from the Platform. Any such use/limited use of the Platform will only be allowed with the prior express written permission of the
          Company.</p>
      <p>j. Agree not to access (or attempt to access) the Platform and/or the materials or Services by any means other than through the interface provided by the
          Platform. The use of deep-link, robot, spider or other automatic devices, program, algorithm or methodology, or any similar or equivalent manual process,
          to access, acquire, copy or monitor any portion of the Platform or its content, or in any way reproduce or circumvent the navigational structure or
          presentation of the Platform, materials or any content, or to obtain or attempt to obtain any materials, documents or information through any means not
          specifically made available through the Platform will lead to suspension or termination of the Member’s access to the Platform. The Member
          cknowledges and agrees that by accessing or using the Platform or any of the Services provided therein, it may be exposed to content that it may
          consider offensive, indecent, or otherwise objectionable. The Company disclaims all liabilities arising in relation to such offensive content on the Platform.</p>
      <p>k. Expressly agree and acknowledge that the Content generated by the Member and displayed on the Platform is not owned by the Company and that the
          Company is in no way responsible for the content of the same. The Member may, however, report any offensive or objectionable content, which the Company
          may then remove from the Platform, at its sole discretion. </p>
      <p>l. Agrees and understands that the Platform only provides aggregator services and shall not be responsible in any manner for any death, injury or any other
          medico legal issues that may arise because of availing the services, the onus for the same shall lie with the hospital and or the doctors providing the treatment.</p>
      <p>m. Agrees and understands that any services availed which do not fall within the ambit of the package availed will have to be paid by the User directly at the facility.</p>
      <p>n. Expressly consents to follow the terms and conditions, and policies of the Vendor affiliated with the Company from whom the Members are utilising services.</p>
      <h6>The Users further undertakes not to:</h6>
      <p>a. Engage in any activity that interferes with or disrupts access to the Platform or the Services provided therein (or the servers and networks which are connected
          to the Platform);</p>
      <p>b. Impersonate any person or entity, or falsely state or otherwise misrepresent his/her affiliation with a person or entity.</p>
      <p>c. Probe, scan or test the vulnerability of the Platform or any network connected to the Platform, nor breach the security or authentication measures on the Platform
          or any network connected to the Platform. The Member may not reverse look-up, trace or seek to trace any information relating to any other Member of, or visitor
          to, the Platform, or any other viewer of the Platform, including any Member account maintained on the Platform not operated/managed by the Member, or exploit
          the Platform or information made available or offered by or through the Platform, in any manner.</p>
      <p>d. Disrupt or interfere with the security of, or otherwise cause harm to, the Platform, systems resources, accounts, passwords, servers, or networks connected to
          or accessible through the Platform or any affiliated or linked Platforms.</p>
      <p>e. Use the Platform or any material or content therein for any purpose that is unlawful or prohibited by these Terms, or to solicit the performance of any illegal
          activity or other activity which infringes the rights of this Platform or any other third party (s).</p>
      <p>f. Violate any code of conduct or guideline which may be applicable for or to any service offered on the Platform.</p>
      <p>g. Violate any applicable laws, rules, or regulations currently in force within or outside India.</p>
      <p>h. Violate any portion of these Terms or the Privacy Policy, including but not limited to any applicable additional terms of the Platform contained herein or
          elsewhere, whether made by amendment, modification, or otherwise.</p>
      <p>i. Commit any act that causes the Company to lose (in whole or in part) the Services of its Internet Establishment ("ISP") or in any manner disrupts the Services
          of any other supplier/service provider of the Company/Platform.</p>
      <h6>Further:</h6>
      <p>a. The Member hereby expressly authorizes the Company/Platform to disclose all information relating to the Member in the possession of the Company/Platform
          to law enforcement or other government officials, as the Company may in its sole discretion, believe necessary or appropriate in connection with the investigation
          and/or resolution of possible crimes, especially those involve personal injury and theft/infringement of intellectual property. The Member further understands that
          the Company/Platform might be directed to disclose any information (including the identity of persons providing information or materials on the Platform) as
          necessary to satisfy any judicial Order, law, regulation, or valid governmental request.</p>
      <p>b. By indicating Member's acceptance to purchase any service offered on the site, the Member is obligated to complete such transactions after making payment.
          Members shall prohibit from indicating their acceptance to avail services where the transactions have remained incomplete.</p>
      <p>c. The Member agrees to use the services provided by the Company, its affiliates, consultants, and contracted companies, for lawful purposes only.</p>
      <p>d. The Member agrees not to make any bulk purchase to indulge in any resale activities. In case of any such instances, the Company reserves all rights to cancel
          the current and future orders and block the concerned Member account.</p>
      <p>e. The Member agrees to provide authentic and true information. The Company reserves the right to and validate the information and other details provided by the
          Member at any point of time. If upon verification such Member details are found to be false, not to be true (wholly or partly), the Company shall in its sole
          discretion reject the registration and debar the Member from using the Services available on its Website, and/or other affiliated websites without prior
          intimation whatsoever.</p>
      <p>f. The Member agrees not to post any material on the Platform that is defamatory, offensive, obscene, indecent, abusive, or needlessly distressful, or advertising
          any goods or services. More specifically, the Member agrees not to host, display, upload, update, publish, modify, transmit, or in any manner share any information
          that:</p>
      <p>g. belongs to another person and to which the Member has no right to.</p>
      <p>ii. is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous, invasive of another's privacy, hateful, or racially, ethnically
          objectionable, disparaging, relating, or encouraging money laundering or gambling, or otherwise unlawful in any manner whatever.</p>
      <p>iii. is in any way harmful to minors</p>
      <p>iv. infringes any patent, trademark, copyright, or other proprietary rights.</p>
      <p>v. violates any law for the time being in force</p>
      <p>vi. deceives or misleads the addressee about the origin of such messages or communicates any information which is grossly offensive or menacing in nature.</p>
      <p>vii. Abuse, harass, threaten, defame, disillusion, erode, abrogate, demean, or otherwise violate the legal rights of others.</p>
      <p>viii. Impersonate any person or entity, or falsely state or otherwise misrepresent Your affiliation with a person or entity.</p>
      <p>ix. Publish, post, disseminate, any information which is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous,
          invasive of another's privacy, hateful, or racially, ethnically objectionable, disparaging, relating or encouraging money laundering or gambling, or otherwise
          unlawful in any manner whatever; or unlawfully threatening or unlawfully harassing including but not limited to "indecent representation of women" within the
          meaning of the Indecent Representation of Women (Prohibition) Act, 1986;</p>
      <p>x. Threatens the unity, integrity, defence, security or sovereignty of India, friendly relations with foreign states, or public order or causes incitement to the
          commission of any cognizable offence or prevents investigation of any offence or is insulting any other nation.</p>
      <h6>14. SUSPENSION OF MEMBER ACCESS AND ACTIVITY</h6>
      <p>Notwithstanding other legal remedies that may be available, the Company may in its sole discretion, limit the Member’s access and/or activity by immediately
          removing the Member’s access credentials either temporarily or indefinitely, or suspend/terminate the Member’s association with the Platform, and/or refuse to
          usage of the Platform to the Member, without being required to provide the Member with notice or cause:</p>
      <p>a. If the Member is in breach any of these Terms or the Policy</p>
      <p>b. If the Member has provided wrong, inaccurate, incomplete, or incorrect information.</p>
      <p>c. If the Member’s actions may cause any harm, damage, or loss to the other Members or to the Company, at the sole discretion of the Company.</p>
      <h6>15. INDEMNITY</h6>
      <p>The Members of this Platform agree to indemnify, defend and hold harmless the Company/Platform, and their respective directors, officers, employees and
          agents (collectively, "Parties"), from and against any and all losses, liabilities, claims, damages, demands, costs and expenses (including legal fees and
          disbursements in connection therewith and interest chargeable thereon) asserted against or incurred by us that arise out of, result from, or maybe payable by
          virtue of, any breach or nonperformance of any representation, warranty, covenant or agreement made or obligation to be performed pursuant to these terms of
          use. Further, the Member agrees to hold the Company/Platform harmless against any claims made by any third party due to, or arising out of, or in connection with:</p>
      <p>a. Member’s use of the Platform,</p>
      <p>b. Member’s violation of these Terms and Conditions</p>
      <p>c. Member’s violation of any rights of another.</p>
      <p>d. Member’s alleged improper conduct pursuant to these Services</p>
      <p>e. Member’s conduct in connection with the Platform.</p>
      <p>Member agrees to fully cooperate in indemnifying the Company and the Platform at the Member’s expense. The Member also agrees not to reach a settlement
          with any party without the consent of the Company.</p>
      <p>In no event shall the Company/Platform be liable to compensate the Member or any third party for any special, incidental, indirect, consequential or punitive
          damages whatsoever, including those resulting from loss of use, data or profits, whether or not foreseeable, and whether or not the Company/ Platform had been
          advised of the possibility of such damages, or based on any theory of liability, including breach of contract or warranty, negligence or other tortuous action, or any
          other claim arising out of or in connection with the Member’s use of or access to the Platform and/or the Services or materials contained therein</p>
      <h6>16. LIMITATION OF LIABILITY</h6>
      <p>a. The Founders/ Promoters/ Directors/ Associated people of the Company/Platform are not responsible for any consequences arising out of the following events:</p>
      <p>i. If the Platform is inoperative/non-responsive due to any connectivity errors associated with the internet connection such as but not limited to slow connectivity,
          no connectivity, server failure.</p>
      <p>ii. If the Member has fed incorrect information or data or for any deletion of data.</p>
      <p>iii. If there is an undue delay or inability to communicate through email.</p>
      <p>iv. If there is any deficiency or defect in the Services managed by Us.</p>
      <p>v. If there is a failure in the functioning of any other service provided by the Platform</p>
      <p>b. The Platform accepts no liability for any errors or omissions, on behalf of itself, or for any damage caused to the Member, the Member’s belongings, or to
          any third party, resulting from the use or misuse of the Platform or any service availed of by the Member through the Platform. The service and any Content or
          material displayed on the service is provided without any guarantees, conditions, or warranties as to its accuracy, suitability, completeness, or reliability. The
          Platform will not be liable to you for the unavailability or failure of the Platform.</p>
      <p>c. Members are to comply with all laws applicable to them or to their activities, and with all Policies, which are hereby incorporated into this Agreement by
          reference.</p>
      <p>d. The Platform expressly excludes any liability for any loss or damage that was not reasonably foreseeable by the Platform, and which is incurred by you in
          connection with the Platform, including loss of profits; and any loss or damage incurred by you because of your breach of these terms.</p>
      <p>e. To the fullest extent permitted by law, the Platform shall not be liable to you or any other party for any loss or damage, regardless of the form of action or
          basis of any claim. You acknowledge and agree that your sole and exclusive remedy for any dispute with us is to terminate your use of the Platform.</p>
      <h6>17. RETURN, REFUND, AND CANCELLATION POLICY</h6>
      <p>You can return and receive refund on the eligible products and services ordered by you on the Website and the App. You can also cancel your orders and services. 
      This is further subjected to the detailed Terms and Conditions that is mentioned on the ‘Return, Refund and Cancellation Policy’.
       The Users are requested to read the ‘Return, Refund and Cancellation Policy” thoroughly as this Policy is very much an important part of the Terms and Conditions.</p>
      <h6>18. SHIPPING AND DELIVERY POLICY</h6>
      <p><b>Delivery of Orders - Date and Time Clause</b></p>
      <p>You accept and agree that the date and time of order delivery at your location which is mentioned during the placement of your order is tentative and indicative 
      and are subject to change due to various factors including natural calamities such as floods, rains, lockdowns, public holidays etc as well as any change due to the 
      factors that is 100% dependable on the partnered pharmacies (3rd party pharmacies). The delivery of the medicine and healthcare product orders is the sole 
      responsibility of the partnered pharmacies and any delay, unfulfilled deliveries or issues arising out of delivery related will need to be dealt directly with the 
      partnered pharmacies (3rd party pharmacies) own delivery agent or their 3rd party delivery agent. Axaone or its subsidiaries / brands will be in no way responsible 
      for any kind of compensation or legal action that arises out of delivery related issues.</p>
      <p><b>This includes but not limited to:</b> <br />
      * Delays in delivery of orders <br />
      * Missing items in the order <br />
      * Broken or damaged items <br />
      * Expired items <br />
      * Wrong items <br />
      * Unfulfilled deliveries <br />
      * Any untoward incident brought by the delivery agent of the 3rd party pharmacies</p>
      <p><b>Tentative - Indicative Delivery Timeline for Orders</b></p>
      <p>The delivery of medicine and healthcare product order solely rests upon on partnered pharmacies (3rd party pharmacies). Axaone being the technology 
      platform will show only the tentative/ indicative timeline for the delivery of the orders to the respective pincodes from the 3rd party pharmacy stores based 
      on the information shared by them. Axaone does not promise any quick or instant delivery of medicine and healthcare product orders to anyone. Similarly we will
      work with all our partnered pharmacies (3rd party pharmacies) to ensure safe and smooth delivery of orders to customers.</p>
      <p>You accept and agree to the partnered pharmacies (3rd party pharmacies) own delivery agent or their 3rd party delivery agent to deliver the medicine and healthcare product orders at your chosen location</p>
      <p><b>Order Return :</b></p>
      <p>Order returns will be picked up only by third party logistics or the respective pharmacy’s own delivery agent for which Axaone or its subsidiaries / brands
      will not be held accountable or responsible for any claim or damages that arises due to the actions of the third party delivery logistics. Once the order return 
      is picked up from the chosen location it will be returned back to the partnered pharmacy that sold the items to the respective customer.</p>
      <p>You accept and agree to the partnered pharmacies (3rd party pharmacies) own delivery agent or their 3rd party delivery agent to pick-up the medicine and healthcare product orders from your chosen location.</p>
      <h6>19. DISCLAIMER OF WARRANTIES AND LIABILITIES</h6>
      <p>a. The Member agrees and undertakes that they are accessing the Platform at their sole risk and are that they are using their best and prudent
          judgment before availing any service listed on the Platform or accessing/using any information displayed thereon.</p>
      <p>b. The Member agrees that any kind of information, resources, activities, recommendations obtained/availed from Platform, written or oral,
          will not create any warranty and the Platform disclaims all liabilities resulting from these.</p>
      <p>c. The Company/Platform does not guarantee that the Services contained in the Platform will be uninterrupted or error-free, or that the
          Platform or its server will be free of viruses or other harmful components, and the Member hereby expressly accepts all associated risks
          involved with the Member’s use of the Platform.</p>
      <p>d. It is further agreed to by the Parties that the contents of this Section shall survive even after the termination or expiry of the Terms and/or
          Policy.</p>
      <h6>20. JURISDICTION</h6>
      <p>The Parties to the Term hereby mutually agree that Jurisdiction for any claim arising out of the said terms shall lie with the courts in Coimbatore,
          Tamilnadu, India.</p>
      <h6>21. FORCE MAJEURE</h6>
      <p>Neither the Company nor the Platform shall be liable for damages for any delay or failure to perform its obligations hereunder if such delay or
          failure is due to cause beyond its control or without its fault or negligence, due to Force Majeure events including but not limited to acts of war,
          acts of God, earthquake, riot, fire, festive activities sabotage, labour shortage or dispute, internet interruption, technical failure, breakage of sea
          cable, hacking, piracy, cheating, illegal or unauthorized.</p>
      <h6>22. DISPUTE RESOLUTION AND JURISDICTION</h6>
      <p>It is expressly agreed to by the Parties hereto that the formation, interpretation and performance of these Terms and any disputes arising
          therefrom will be resolved through a two-step Alternate Dispute Resolution (“ADR”) mechanism. It is further agreed to by the Parties that the
          contents of this Section shall survive even after the termination or expiry of the Terms and/or Policy.</p>
      <p>Mediation: In case of any dispute between the parties, the Parties will attempt to resolve the same amicably amongst themselves, to the mutual
          satisfaction of all Parties. If the Parties are unable to reach such an amicable solution within thirty (30) days of one Party communicating the
          existence of a dispute to any other Party, the dispute will be resolved by arbitration, as detailed herein below</p>
      <p>Arbitration: If the Parties are unable to amicably resolve a dispute by mediation, said dispute will be referred to arbitration by a sole arbitrator to
          be appointed by the Company, and the award passed by such sole arbitrator will be valid and binding on all Parties. The Parties shall bear their
          own costs for the proceedings, although the sole arbitrator may, in his/her sole discretion, direct Party to bear the entire cost of the proceedings.
          The arbitration shall be conducted in English, and the seat of Arbitration shall be Coimbatore, Tamilnadu, India.</p>
      <p>The Parties expressly agree that the Terms of Use, Privacy Policy, and any other agreements entered between the Parties are governed by the
          laws, rules and regulations of India.</p>
      <h6>23. NOTICES/GRIEVANCES</h6>
      <p>All communication relating to any dispute or grievance experienced by the Member may be communicated to the Company by the Member by
          contacting our ‘Grievance Redressal Officer or emailing to:</p>
      <p>Name: Mr. Arul S
      <br /> 
      Address: <br />
      Axaone Technologies Private Limited <br />
      43/2 & 43/3, Second Floor, Sathy Road, Tulasi Damu Arrcade, Ganapathy, Coimbatore, TN - 641006 <br />
      Contact Number: 7603944039
      <br /> E-mail: <a class="privacyMailNavigate p-0" href="mailto:grievance-officer@healthsy.in">grievance-officer@healthsy.in</a>
      </p>
      <h6>24. PRIVACY POLICY</h6>
      <p>The Users are requested to read the ‘Privacy Policy” thoroughly as the Policy is very much an important part of the Terms and Conditions. Please
          become aware by reading the Privacy Policy document as to how the Company collects, shares, processes and maintains safety and security
          practices with regards to your information.</p>
      <h6>25. MISCELLANEOUS PROVISIONS</h6>
      <p> <b>a. Entire Agreement:</b> These Terms, read with the Policy, form the complete and final contract between the Member and the Company with
          respect to the subject matter hereof and supersedes all other communications, representations, and agreements (whether oral, written or
          otherwise) relating thereto.</p>
      <p> <b>b. Waiver: </b> The failure of either Party at any time to require performance of any provision of these Terms shall in no manner affect such Party's
          right later to enforce the same. No waiver by either party of any breach of these Terms, whether by conduct or otherwise, in any one or more
          instances, shall be deemed to be or construed as a further or continuing waiver of any such breach, or a waiver of any other breach of these
          Terms.</p>
      <p> <b>c. Severability:</b> If any provision/clause of these Terms is held to be invalid, illegal, or unenforceable by any court or authority of competent
          jurisdiction, the validity, legality, and enforceability of the remaining provisions/clauses of these Terms shall in no way be affected or impaired
          thereby, and each such provision/clause of these Terms shall be valid and enforceable to the fullest extent permitted by law. In such case, these
          Terms shall be reformed to the minimum extent necessary to correct any invalidity, illegality, or unenforceability, while preserving to the
          maximum extent the original rights, intentions and commercial expectations of the Parties hereto, as expressed herein.</p>
      <p><b>d. Contact Us:</b> If you have any questions about this Policy, the practices of the Platform, or your experience with the Service provided by the
          Platform, you can contact us at <a class="privacyMailNavigate p-0" href="mailto:support@healthsy.in">support@healthsy.in</a> </p>
          
            `,
                    }}
                ></div>
            </div>
        </>
    );
};

export default Terms;
