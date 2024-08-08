import React, { memo, useState, useEffect } from "react";
// import BlogSubscribeModal from "../../Modals/BlogSubscribeModal/blogdetails";

const home = "/assets/home-icon.svg";
const arrowleft = "/assets/arrow-left.svg";

const AllCategoryBanner = ({ bannerImageData }) => {

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 960px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, []);

  return (
    <div className="blog-breadcrumb-section">
      <div className="container">
        <div className="padding-section">
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
            <img style={{ marginLeft: isDesktop ? "" : "1%" }} className="blog-home-img" src={home} alt="" />
          </a>{" "}
          <img style={{ marginLeft: isDesktop ? "" : "-5%" }} src={arrowleft} alt="arrowleft" className="breadcrumb-arrow-left" />{" "}
          <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/blogs`}> Health Articles and Guides </a>{" "}
        </div>
        <div className="blog-banner-section">
          <div className="text-center career-banner-mob">
            {
              isDesktop
                ?
                (bannerImageData?.blog_Banner ? <img
                  src={
                    process.env.NEXT_PUBLIC_APP_API_URL +
                    "images/" +
                    bannerImageData?.blog_Banner
                  }
                  alt="blogBanner"
                  className="container-fluid content-desktop bannerImageDesktop"
                /> : null)
                :
                (bannerImageData?.blog_Banner_mob ? <img
                  src={
                    process.env.NEXT_PUBLIC_APP_API_URL +
                    "images/" +
                    bannerImageData?.blog_Banner_mob
                  }
                  alt="mobBlogBanner"
                  className='content-mobile bannerImageMob'
                /> : null)
            }
          </div>
        </div>
        {/* <BlogSubscribeModal /> */}
      </div>
    </div>
  );
};

export default memo(AllCategoryBanner);
