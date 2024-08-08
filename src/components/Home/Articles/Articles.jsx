import React, { useEffect, useState, memo } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";

import { SkeletonLoading } from "../../Common/skeletonLoading"

const Articles = () => {
  const [articlesList, setArticlesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const navigate = useRouter().push;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);
  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}health-article/getLatestArticles`,
        {
          limit: 8,
        }
      )
      .then((res) => {
        setArticlesList(res?.data ?? []);
        setIsLoading(false)
      }).catch((err) => {
        setIsLoading(false)
      });
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <div className="container">
      <div className="home-more-blogs">
        <div className="more-blog-title d-flex justify-content-between ps-2">
          <p className="home-articles-title">Health Articles and Guides</p>
          <p className="view_all_articles" >
            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/blogs`}>View All</a>
          </p>
        </div>
        {isLoading ?
          <div className="d-flex w-100">
            <SkeletonLoading page={'homeArticle'} data={isDesktop ? 2 : 1} />
          </div>
          :
          <div className="more-blog-slider">
            <Carousel
              responsive={responsive}
              arrows={true}
              infinite={true}
              renderArrowsWhenDisabled
              swipeable={true}
              draggable={true}
            >
              {articlesList?.map((el, i) => {
                return (
                  <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/all-category-blog/${el.slugurl}`} key={i}>
                    <div
                      className="home-more-blog-card cursor-pointer"
                    // onClick={() => {
                    //   navigate("all-category-blog/" + el.slugurl);
                    // }}
                    >
                      <div className="home-more-blog-card-img">
                        <img src={el.imageURL} alt={el.slugurl} />
                      </div>
                      <div className="container">
                        <div className="home-more-blog-category fs16m12fwb">{el.category?.toUpperCase()}</div>
                        <div className="home-more-blog-card-title fs22m14fwb p-0">{el.title}</div>
                        <div className="home-more-blog-card-date fs16m12 text-dark home-more-blog">{el.createdAt?.split("|")[0]}</div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </Carousel>
          </div>}
      </div>
    </div>
  );
};

export default memo(Articles);
