import React, { Fragment, useEffect, useState, memo } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Moment from "moment";

import { AllCategories } from "./CategoryTabFilters";
import { SkeletonLoading } from "../../../Common/skeletonLoading";

const CategoryCard = ({ filter, popup, togglePopup, articleCategoryList, blogPostList }) => {
  const [data, setData] = useState(blogPostList?.rows);
  const [category, setCategory] = useState("");
  const [datalength, setDataLength] = useState(blogPostList?.count);
  const [limit, setLimit] = useState(9)
  const [loading, setLoading] = useState(false)
  const [viewMoreLoading, setViewMoreLoading] = useState(false)
  const navigate = useRouter().push;

  const fetchBlogPost = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}health-article/blog-post-list`, {
        ...filter,
        category: category,
        limit: limit,
        skip: limit - 9,
        menu: "Health Articles"
      })
      .then((res) => {
        if (limit === 9) {
          setData(res.data.rows);
        } else {
          setData([...data, ...res.data.rows]);
        }
        setDataLength(res.data.count);
      });
  }
  useEffect(() => {
    if (limit !== 9 || Object.keys(filter)?.length || category) {
      fetchBlogPost()
    }
    if (limit > 8) {
      setViewMoreLoading(false)
    }
  }, [filter, category, limit]);

  const handleBlog = (slugurl, id) => {
    navigate(`/all-category-blog/${slugurl}`);
  };

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const [categorydata, setCategoryData] = useState("");
  const [buttonColor, setButtonColor] = useState(false);
  const [popclose, setPopClose] = useState(false);

  const handleCategoryHover = () => {
    setCategory(categorydata);
    setPopClose(true);
    togglePopup()
  };

  const handleViewMore = () => {
    setLimit(limit + 9)
    setViewMoreLoading((val) => !val)
  }
  const Norecords = () => {
    return (
      <div className="norecord-found">No records found</div>
    )
  }
  return (
    <>
      <div className="all-category-bg">
        <div className="blog-allcategory">
          {loading || data?.length === null ? (
            <div className="col-md-8 skeleton-comp">
              <SkeletonLoading page={'Health_Articles_and_Guides'} />
            </div>
          ) :
            <div className="col-md-8">
              {
                isDesktop
                  ?
                  <div className="blog-list-section">
                    {
                      data && data?.length > 0
                        ?
                        (data.map((el, i) => {
                          return (
                            articleCategoryList?.map((cat, idx) => {
                              if (el.active === true && el.category === cat.category && cat.active === true) {
                                return (
                                  <div className="blog-list-bg" key={idx}>
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
                                            <p className="date">{Moment(el.createdAt).format("DD MMMM YYYY")}</p>
                                          </div>
                                        </div>
                                        <div className="col-3 d-flex justify-content-end">
                                          <div>
                                            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/all-category-blog/${el.slugurl}`}>
                                              <button
                                                className="btn blog-list-read-more"
                                              // onClick={() => {
                                              //   window.scrollTo(0, 0);
                                              //   handleBlog(el.slugurl, el._id);
                                              // }}
                                              >
                                                <span>Read More</span>
                                              </button>
                                            </a>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <Fragment key={idx}></Fragment>
                                )
                              }
                            }
                            ))
                        }))
                        :
                        <Norecords />
                    }
                  </div>
                  :
                  <div className="blog-list-section">
                    {
                      data && data.length > 0
                        ?
                        data.map((el) => {
                          return (
                            articleCategoryList.map((cat, inx) => {
                              if (el.active === true && el.category === cat.category && cat.active === true) {
                                return (
                                  <div className="blog-list-bg"
                                    key={inx}
                                    onClick={() => {
                                      window.scrollTo(0, 0);
                                      handleBlog(el.slugurl, el._id);
                                    }}>
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
                                            <p className="date">{Moment(el.createdAt).format("DD MMMM YYYY")}</p>
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
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <></>
                                )
                              }
                            })
                          )
                        })
                        : <div className="norecord-found">No records found</div>
                    }
                  </div>
              }
              {datalength > 9 && (data && data.length !== datalength) ? (
                <div className="left-allcategory-footerview blog-allcategory-viewmore-mob">
                  <button className="viewMore" onClick={handleViewMore}>{viewMoreLoading ? 'Loading...' : 'View More'}</button>
                </div>
              ) : null}
              {/* {viewMoreLoading ? (
                <div className="col-md-8 skeleton-comp">
                  <SkeletonLoading page={'Health_Articles_and_Guides'} />
                </div>
              ): null} */}
            </div>



          }
          <div className="col-md-4 d-none d-md-block">
            <AllCategories category={category} setLimit={setLimit} setCategory={setCategory} articleCategoryList={articleCategoryList} />
          </div>
        </div>
      </div>
      {popup ? (
        <div className={`c-filter-modal new-blog-popup ${popclose ? "popclose" : ""}`}>
          <div className="blog-pop-apply-mob">
            <button
              style={{ background: buttonColor ? "#CB1B5B" : "" }}
              onClick={handleCategoryHover}
            >
              Apply
            </button>
          </div>
          {articleCategoryList?.map((el, i) => {
            return (
              <div
                // className={category == el.category ? "text-primary" : ""}
                className="blog-pop-container-mob"
                key={i}
              // onClick={() => {
              //   setCategory(el.category);
              // }}
              >
                <div className="blog-pop-title-mob">{el.category}</div>
                <div className="blog-pop-radio-mob">
                  <input
                    type="radio"
                    name="category"
                    value={categorydata}
                    onChange={(e) => {
                      setCategoryData(el.category);
                      setButtonColor(true);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

export default memo(CategoryCard);
