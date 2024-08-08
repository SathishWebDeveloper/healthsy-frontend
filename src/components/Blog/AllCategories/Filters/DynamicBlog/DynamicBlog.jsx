import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Moment from "moment";
import { SkeletonLoading } from "../../../../Common/skeletonLoading";
// import "./index.css";
// import bar from "../../../../../assets/blog/line.svg";
// import img from "../../../../../assets/featured_card.svg";
// import { AllCategories } from "../CategoryTabFilters";
// import { useNavigate } from "react-router-dom";
const share = "/assets/share.svg";

const DynamicBlog = ({ menu }) => {
  const [data, setData] = useState([]);
  const [listCount, setListCount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useRouter().push;
  const [limit, setLimit] = useState(9);
  const [categorydatas, setCategoryDatas] = useState([])
  const [datalength, setDataLength] = useState(0);

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}health-article-category/list`)
      .then((res) => {
        setCategoryDatas(res.data.rows);
        setListCount(res.data.count)
      });
  }, []);

  useEffect(() => {
    setIsLoading(true)
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}health-article/blog-post-list`, {
        limit: limit,
        menu
      })
      .then((res) => {
        setData(res.data.rows);
        setDataLength(res.data.count);
        setIsLoading(false)
      }).catch((err) => {
        setIsLoading(false)
      });
  }, [limit, menu]);

  const handleBlog = (slugurl, id) => {
    navigate(`/all-category-blog/${slugurl}`);
  };

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const handleViewMore = () => {
    setLimit(limit + 9);
  };

  return (
    <>{
      isLoading ?
        <div className="w-100 d-block d-md-flex">
          <SkeletonLoading page='dynamicBlog' />
        </div>
        : (
          <div className="row">
            {isDesktop ? (
              <div className="col-12 col-md-8" style={{ width: "100%" }}>
                <div className="blog-news">
                  <div className="blog-news-container">
                    {
                      (data && data.length > 0)
                        ?
                        data.map((el, i) => {
                          return (
                            <div
                              className="blog-news-box"
                              key={i}
                              onClick={() =>
                                handleBlog(el.slugurl, el._id)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              <div className="blog-news-logo">
                                <img
                                  src={
                                    process.env.NEXT_PUBLIC_APP_API_URL +
                                    "images/" +
                                    el.uploadImage
                                  }
                                  alt="uploadImage"
                                />
                              </div>
                              <div className="blog-news-bottom">
                                <div className="blog-news-bottom-box">
                                  <div className="blog-news-title">{el.title}</div>
                                  <div className="blog-news-foot">
                                    <div className="blog-news-share">
                                      <img
                                        src={share}
                                        alt="share"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          // todo check
                                          openInNewTab(
                                            `${process.env.NEXT_PUBLIC_APP_API_URL}all-category-blog/${el._id}`
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="blog-news-date">
                                      {Moment(el.createdAt).format("DD MMMM YYYY")}
                                    </div>
                                    <div className="blog-news-button"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })
                        :
                        <div className="norecord-found">No records found</div>
                    }
                  </div>
                  {datalength > 9 && (data && data.length !== datalength) ? (
                    <div className="blog-news-viewmore">
                      <button onClick={handleViewMore} className="viewMoreBtn">View More</button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                <div className="blog-list-section dynamic-blog-list-section">
                  {
                    data && data.length > 0
                      ?
                      data.map((el) => {
                        return (
                          // categorydatas.map((cat)=>{
                          //   if (
                          //     el.active == true &&
                          //     el.menu == menu &&
                          //     el.menu != "Featured" 
                          //     &&
                          //     el.category === cat.category
                          //     && cat.active == true
                          //   ) {
                          //     return (
                          <div
                            className="blog-list-bg"
                            onClick={() => {
                              window.scrollTo(0, 0);
                              handleBlog(el.slugurl, el._id);
                            }}
                          >
                            <div className="blog-banner-img">
                              <img
                                src={
                                  process.env.NEXT_PUBLIC_APP_API_URL +
                                  "images/" +
                                  el.uploadImage
                                }
                                alt="uploadImage"
                              />
                            </div>
                            <div className="col-12">
                              <div className="row d-flex align-items-center">
                                <div className="col-9 mob-w100">
                                  <div className="blog-list-content-section">
                                    <div className="blog-list-content">
                                      <p>{el.category}</p>
                                      <h3>{el.title}</h3>
                                      <div className="blog-list"></div>
                                    </div>
                                  </div>
                                  <div className="blog-list-author-name d-flex">
                                    <p className="author-name">
                                      By <span>{el.authordetails}</span>
                                    </p>
                                    <p className="date">
                                      {Moment(el.createdAt).format("DD MMMM YYYY")}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-3 d-flex justify-content-end">
                                  <div>
                                    <button
                                      className="btn blog-list-read-more"
                                      onClick={() => {
                                        window.scrollTo(0, 0);
                                        handleBlog(el.slugurl, el._id);
                                      }}
                                    >
                                      <span>Read More</span>
                                    </button>
                                  </div>
                                  {/* <div className="btn blog-list-read-more"><Link to="">Read More</Link></div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                          //     );
                          //   } else {
                          //     return <></>;
                          //   }
                          // })
                        )
                      })
                      : <div className="norecord-found">No records found</div>
                  }
                </div>
                {datalength > 9 && (data && data.length !== datalength) ? (
                  <div className="blog-healthguide-viewmore-mob">
                    <button onClick={handleViewMore} className="viewMoreBtn">View More</button>
                  </div>
                ) : null}
              </>
            )}
          </div>)
    }
    </>
  );
};

export default DynamicBlog;
