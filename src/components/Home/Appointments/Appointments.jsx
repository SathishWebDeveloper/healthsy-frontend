import Image from 'next/image';
import { memo } from 'react'

const appointment = "/assets/homepage/appointment.gif"

const Appointments = () => {

  return (
    <div className="in-clinic-doc-appointment-section">
      <div className="container inClinicAppointmentWrapper">
        <div className="doc-appointment-content-wrapper flexBetween">
          <div className='desktopContent'>
            <div className="in-clinic-doc-appointment-image-section">
              <Image src={appointment} width={536} height={518} alt="appointment" />
            </div>
          </div>
          <div className="mob-text-content desktopContent">
            <div className="in-clinic-doc-appointment-content-section">
              <div className="sub-title fs16fw600">VISIT DOCTORS NEAR YOU</div>
              <div className="title fs36m22fwb">In-Clinic Doctor Appointments</div>
              <div>
                <p className='fs18fw500'>
                  Book your In-Clinic doctor appointments with your preferred doctor in your city.
                  Choose your appointments based on your preferred date and time slot.
                  Forget about long queues and unsure In-Clinic appointments
                </p>
              </div>
              <div className='btn-learnMore-wrapper home_page_learn_more appointentContentWrapper'>
                <a className='btn-learnMore text-white flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/in-clinic-appointments`}>Learn More</a>
              </div>
            </div>
          </div>

          <div className="mob-text-content mobContent">
            <div className="in-clinic-doc-appointment-content-section">
              <div className="sub-title fs16fw600">VISIT DOCTORS NEAR YOU</div>
              <div className="title fs36m22fwb">In-Clinic Doctor Appointments</div>
              <div className="in-clinic-doc-appointment-image-section">
                <Image src={appointment} width={348} height={248} alt="appointment" />
              </div>
              <div>
                <p className='fs16'>
                  Book your In-Clinic doctor appointments with your preferred doctor in your city.
                  Choose your appointments based on your preferred date and time slot.
                  Forget about long queues and unsure In-Clinic appointments
                </p>
              </div>
              <div className='btn-learnMore-wrapper home_page_learn_more learnMoreBtn'>
                <a className='btn-learnMore text-white flexCenter' href={`${process.env.NEXT_PUBLIC_WEB_URL}/in-clinic-appointments`}>Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Appointments);