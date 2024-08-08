import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const closeIcon = "/assets/icons/closeIcon.svg";
const logoH = "/assets/logoH.png";

const CTAMobileFooter = ({
  setShowCTAcard = () => { },
  ctxBannerText,
  setCtaPopupModal,
  buttonText = "Get Callback",
  buttonClassName = "",
  isLink = false,
  hrefValue = () => "#",
  clickNavigate = "",
  isCall = false,
  callHref = "#"
}) => {

  const navigate = useRouter().push;

  return (
    <div className="ctaBannerMobWrapper flexBetweenCenter mobContent">
      <div className="d-flex align-items-center">
        <Image
          src={closeIcon}
          width={10}
          height={10}
          alt="close icon"
          className="bannerCloseIcon"
          onClick={() => setShowCTAcard(false)}
        />
        <div className="borderLine"></div>
        <Image
          src={logoH}
          className="logoH"
          width={40}
          height={40}
          alt="Logo H"
        />
        <div className="ctxBannerText">{ctxBannerText}</div>
      </div>
      <div>
        {isLink ? (
          <Link
            href={hrefValue()}
            target="_blank"
          >
            <button type="button" className={`downloadBtn`} >
              Download App
            </button>
          </Link>
        ) : isCall ? (
          <Link
            href={callHref}
            className="p-0"
          >
            <button type="button" className={`downloadBtn`} >
              Call Now
            </button>
          </Link>
        ) :
          <button
            className={`${buttonClassName} getCallbackBtn`}
            onClick={() => {
              if (clickNavigate) {
                navigate(clickNavigate);
              } else {
                setCtaPopupModal(true);
              }
            }}
          >
            {buttonText}
          </button>
        }
      </div>
    </div>
  );
};

export default CTAMobileFooter;