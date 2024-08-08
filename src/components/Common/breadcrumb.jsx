import Image from "next/image";

const home = "/assets/home-icon-white.svg";
const arrowleft = "/assets/arrow-left-white.svg";

const Breadcrumb = ({
  className = "",
  breadcrumbText = "",
  nestedLevel = false,
  Href = "#",
  nestedLevelHref = "#",
  nestedBreadcrumbText = "",
  nestedLevelTwo = false,
  nestedLevelTwoHref = "#",
  nestedBreadcrumbTextTwo = "",
  nestedLevelThree = false,
  nestedBreadcrumbTextThree = "",
  nestedLevelHrefThree = "#",
  // nestedLevelFour = false,
  nestedBreadcrumbTextFour = "",
  nestedLevelHrefFour = "#",
}) => {
  return (
    <div className={`${className} commonBreadcrumb`}>
      <div className="container">
        <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
          <Image src={home} height={15} width={15} alt="home" className="breadcrumb-arrow-left" />
        </a>
        <Image
          src={arrowleft}
          height={13}
          width={13}
          alt="arrow"
          className="breadcrumb-arrow-left mx-0"
        />
        <a href={Href} className={`text-white breadcrumbText`}>
          {breadcrumbText}
        </a>
        {nestedLevel && (
          <>
            <Image
              src={arrowleft}
              height={13}
              width={13}
              alt="arrow"
              className="breadcrumb-arrow-left mx-0 "
            />
            <a href={nestedLevelHref} className="text-white breadcrumbText">
              {nestedBreadcrumbText}
            </a>
          </>
        )}
        {nestedLevelTwo && (
          <>
            <Image
              src={arrowleft}
              height={13}
              width={13}
              alt="arrow"
              className="breadcrumb-arrow-left mx-0"
            />
            <a href={nestedLevelTwoHref} className="text-white breadcrumbText">
              {nestedBreadcrumbTextTwo}
            </a>
          </>
        )}
        {nestedLevelThree && (
          <>
            <Image
              src={arrowleft}
              height={13}
              width={13}
              alt="arrow"
              className="breadcrumb-arrow-left mx-0"
            />
            <a href={nestedLevelHrefThree} className="text-white breadcrumbText">
              {nestedBreadcrumbTextThree}
            </a>
          </>
        )}
      {nestedBreadcrumbTextFour&& (
          <>
            <Image
              src={arrowleft}
              height={13}
              width={13}
              alt="arrow"
              className="breadcrumb-arrow-left mx-0"
            />
            <a href={nestedLevelHrefFour} className="text-white breadcrumbText">
              {nestedBreadcrumbTextFour}
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Breadcrumb;