import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import AppLinkSuccess from "../Common/AppLinkSuccess"

const qrCode = "/assets/qrCode/userQR.png"
const instaDocImg = "/assets/icons/send-arrow.svg"
const logo_google_playstore_outline = "/assets/google_playstore.svg";
const logo_app_playstore_outline = "/assets/homepage/logo-app-playstore-outline.svg";

const DownloadApp = ({
  className = ""
}) => {

  const [activeStatus, setActiveStatus] = useState("")
  const [linkSentModal, setLinkSentModal] = useState(false)

  const {
    register,
    errors,
    // getValues,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}store-link/list`, { category: "user-app" })
      .then((response) => {
        setActiveStatus(response.data.rows.filter((userAppLink) => userAppLink.active))
      });
  }, [])

  const onSubmit = (fields) => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}app-download-sms/send-link`, fields)
      .then(() => {
        setLinkSentModal(true)
        reset()
      });
  }

  return (
    <div className={`${className} desktopContent mb-5 doctorsAppDownload text-center `}>
      <div className="freeApp primaryColor fs16fwb">Get our Free App</div>
      <div className="healthsyDownloadAppWrapper">
        <div className="fs14fwb">Scan the QR code to Download the “HealthSy App”</div>
        <Image src={qrCode} width={130} height={130} alt="QrCodeImg" className="doctorListingQrCode" />
        <div className="fs14fw500">Get App Download Links Via SMS</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="position-relative instaDocInputWrapper d-flex">
            <div>
              <div className="flexColumn downloadAppSendBtn">
                <input type="number"
                  name="moileNumber"
                  placeholder="Enter your Mobile Number"
                  className="doctorListingInputField fs12 px-3"
                  {...register("mobile", {
                    required: 'Mobile number is required',
                    minLength: {
                      value: 10,
                      message: 'Mobile number must be exactly 10 digits'
                    },
                    maxLength: {
                      value: 10,
                      message: 'Mobile number must be exactly 10 digits'
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: 'Mobile number must contain only digits'
                    }
                  })}
                />
                {errors?.mobile && <p className="error">{errors?.mobile?.message}</p>}
              </div>
              <button className="doctorListingSentBtn border-0 flexCenter">
                <Image src={instaDocImg} width={22} height={22} className="" alt='send arrow' />
              </button>
            </div>
            {linkSentModal &&
              <AppLinkSuccess
                linkSentModal={linkSentModal}
                setLinkSentModal={setLinkSentModal}
              />
            }
          </div>
        </form>
        <div className="appLink d-flex align-items-center p-0 instaDocAppLink">
          <Link href={activeStatus?.length ? activeStatus[0]?.playStore ?? '#' : "#"} target="_blank">
            <Image src={logo_google_playstore_outline} width={20} height={21} className="googlePlayStoreImg doctorListAppLink" alt='Play store' />
            Google Play
          </Link>
          <Link href={activeStatus?.length ? activeStatus[0]?.appStore ?? '#' : "#"} target="_blank">
            <Image src={logo_app_playstore_outline} width={17} height={20} className="googleAppStoreImg doctorListAppLink" alt='apple store' />
            App Store
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DownloadApp