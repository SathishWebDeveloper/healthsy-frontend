import React, { useEffect, useState } from "react";
import "./index.css";
import bar from "../../../../../assets/blog/line.svg";
import axios from "axios";
import share from "../../../../../assets/share.svg";
import img1 from "../../../../../assets/healthguide_card1.svg";

import { AllCategories } from "../CategoryTabFilters";
import { useNavigate } from "react-router-dom";
import Moment from "moment";

const HealthGuide = () => {
  const [data, setData] = useState([]);
  const [listCount, setListCount] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}health-article/list`, {
        menu: "Health Guides",
      })
      .then((res) => {
        setData(res.data.rows);
        setListCount(res.data.count);
      });
  }, []);

  const handleBlog = (id) => {
    // todo check
    navigate(`/all-category-blog/${id}`);
  };

  const openInNewTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 960px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);

  return (
    <div className="row">
      <div className="col-12 col-md-8" style={{ width: "100%" }}>
        {
          isDesktop
            ?
            <div className="blog-healthguide">
              {data.map((el, i) => {
                if (el.active == true) {
                  return (
                    <div className="blog-healthguide-container" key={i}>
                      <div className="blog-healthcare-left">
                        <img
                          src={
                            process.env.NEXT_PUBLIC_APP_API_URL + "images/" + el.uploadImage
                          }
                          alt="uploadImage"
                        />
                      </div>
                      <div className="blog-healthcare-right">
                        <div className="blog-healthguide-right-box">
                          <div className="blog-healthguide-title">{el.title}</div>
                          {/* <div
                        className="blog-healthguide-desc"
                        dangerouslySetInnerHTML={{ __html: el.description }}
                      ></div> */}
                          <div
                            className="blog-healthguide-desc"
                            dangerouslySetInnerHTML={{ __html: el.description }}
                          ></div>
                          <div className="blog-healthguide-footer">
                            <div className="blog-health-share">
                              <img
                                src={share}
                                className="blog-share-icon-img"
                                style={{ cursor: "pointer" }}
                                alt="share"
                                // todo check
                                onClick={() => openInNewTab(`${process.env.NEXT_PUBLIC_APP_API_URL}all-category-blog/${el._id}`)}
                              />
                            </div>
                            <div className="blog-data-pipe1">
                              <img src={bar} alt="bar" />
                            </div>
                            <div className="blog-health-date">
                              {Moment(el.createdAt).format("DD MMMM YYYY")}
                            </div>
                            <div className="blog-health-button">
                              <button onClick={() => handleBlog(el._id)} className="blog-health-readmore">
                                Read More
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return <></>
                }
              })}
              {listCount > 9 && (data && data.length !== listCount) ? (
                <div className="blog-healthguide-footer-readmore">
                  <button>View More</button>
                </div>
              ) : null}
            </div>
            :
            <div className="blog-healthguide-mob">
              {
                data.map((el, i) => {
                  if (el.active == true) {
                    return (
                      <div className="blog-healthguide-box-mob">
                        <div className="blog-healthguide-box1-mob">
                          <div className="blog-healthguide-top-mob">
                            <div className="blog-healthguide-top-left-mob"><img src={
                              process.env.NEXT_PUBLIC_APP_API_URL + "images/" + el.uploadImage
                            } alt="uploadImage" /></div>
                            <div className="blog-healthguide-top-right-mob">
                              <div className="blog-healthguide-top-right-title-mob">{el.title}</div>
                              <div className="blog-healthguide-top-right-desc-mob" dangerouslySetInnerHTML={{ __html: el.description }}></div>
                            </div>
                          </div>
                          <div className="blog-healthguide-bottom-mob">
                            <div>
                              <img src={share} alt="share"
                                // todo check
                                onClick={() => openInNewTab(`${process.env.NEXT_PUBLIC_APP_API_URL}all-category-blog/${el._id}`)}
                              />
                            </div>
                            <div>|</div>
                            <div>{Moment(el.createdAt).format("DD MMMM YYYY")}</div>
                            <div onClick={() => handleBlog(el._id)}>Read More</div>
                          </div>
                        </div>
                      </div>
                    )
                  } else {
                    return <></>
                  }
                })
              }
              {listCount > 9 && (data && data.length !== listCount) ? (
                <div className="blog-healthguide-viewmore-mob">
                  <button>View More</button>
                </div>
              ) : null}
            </div>
        }
      </div>
      {/* <div className="col-md-4 d-none d-md-block">
        <AllCategories />
      </div> */}
    </div>
  );
};

export default HealthGuide;
