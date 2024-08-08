import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from 'next/head';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Moment from "moment";
import parse from 'html-react-parser';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { useForm } from "react-hook-form";

import PostAComment from "../../Modals/PostAComment/postacomment";
import BlogSuccessSubscribe from "../../Modals/BlogSuccessSubscribe/BlogSuccessSubscribe";
import { app } from "../../../webappurl";

const home = "/assets/home-icon.svg";
const share = "/assets/share.svg";
const whatsapp = "/assets/whatsapp-icon.svg";
const facebook = "/assets/fb-icon.svg";
const twitter = "/assets/X.svg";
const linkedin = "/assets/linkedin-icon.svg";
const thumbsup = "/assets/thumbs-up.svg";
const thumbsdown = "/assets/thumbs-down.svg";
const arrow = "/assets/arrow-left.svg";

const Articlebanner = ({ data }) => {

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
      items: 1,
    },
  };

  const navigate = useRouter().push;
  const [like, setLike] = useState(0);
  const [dislike, setDisLike] = useState(0);
  const [postacommentID, setPostacommentID] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [successbgColor, setSuccessBgColor] = useState(false);
  const [email, setemail] = useState(null);
  const [emailcheck, setEmailCheck] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  useEffect(() => {
    const container = document.querySelector('.blogpage-text');
    const lastChild = container?.lastElementChild;
    data?._id === '65a8fd8f4f13d8b6a68a1a13' && (lastChild.textContent = 'https://www.researchgate.net/figure/Benefits-of-electronic-prescribing-eRx-13_tbl1_230723434')
    return () => {
      lastChild.textContent = '';
    };
  }, []);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // useEffect(()=>{
  //   getPostACommentData()
  // }, [])

  // const getPostACommentData = () => {
  //   axios
  //     .post(`${process.env.NEXT_PUBLIC_APP_API_URL}post-a-comment/list`)
  //     .then((res) => {
  //       setPostacommentID(res.data[0]._id);
  //     });
  // };

  const handleLike = (like) => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}post-a-comment/update/${postacommentID}`,
        {
          like: like,
        }
      )
      .then((res) => {
        if (like == 0 && dislike == 0) {
          setLike(like + 1);
        } else if (dislike == 1 && like == 0) {
          setDisLike(dislike - 1);
          setLike(like + 1);
        }
      });
  };

  const handleDisLike = (dislike) => {
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}post-a-comment/update/${postacommentID}`,
        {
          dislike: dislike,
        }
      )
      .then((res) => {
        if (dislike == 0 && like == 0) {
          setDisLike(dislike + 1);
        } else if (dislike == 0 && like == 1) {
          setDisLike(dislike + 1);
          setLike(like - 1);
        }
      });
  };

  const onSubmit = (fields) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}blog-subscribe/create`,
        fields
      )
      .then((response) => {
        setSuccessModal(true);
      })
      .catch((err) => {
        setemail(fields.email);
      });
  };



  const handleBlog = (slugurl) => {
    navigate(`/all-category-blog/${slugurl}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <>
      <Head>
        <title>{data?.metatitle}</title>
        {data?.others ? parse(data?.others) : null}
        <meta name="description" content={data?.metadescription} />
        <meta name="keywords" content={data?.metakeywords} />
      </Head>
      {/* <Header /> */}
      <div className="article-banner">
        <div className="container-fluid">
          <div className="container">
            <div className="health-care-routes">
              <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                <img src={home} alt="home" />
              </a>{" "}
              <img src={arrow} alt="arrow" />
              <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/blogs`}>{data.menu}</a>{" "}
              <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/blogs`}>
                <img src={arrow} alt="arrow" /> {data.category}
              </a>
              {/* <img src={arrow} alt="" /> <a href="#"> {data.title} </a> */}
            </div>
            <div className="row banner">
              <div className="col-lg-7 col1">
                {isDesktop ? (
                  <div className="row banner-inner">
                    <div className="d-flex">
                      <div>
                        {data?.authorImage && (
                          <img
                            className="blog-particular-profile"
                            src={
                              process.env.NEXT_PUBLIC_APP_API_URL +
                              "images/" +
                              data.authorImage
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                            alt="authorImage"
                          />
                        )}
                      </div>
                      <div>
                        <p>
                          {" "}
                          <span>{data.authordetails}</span> <br />
                          {data.authorSpecialization}
                          <br />
                          <span className="span1">
                            {" "}
                            <b> Uploaded On : </b>{" "}
                            <span className="span2">
                              {(data.createdAt.split(" | ")[0])}
                            </span>{" "}
                          </span>
                        </p>
                      </div>
                      <div
                        className="flex3"
                        style={{
                          marginLeft: "15%",
                          width: "35%",
                        }}
                      >
                        <p>
                          <span className="span1">
                            <b>Updated On :</b> <br />{" "}
                            <span className="span2">
                              {((data.updatedAt))}
                              <span
                                style={{
                                  color: "gray",
                                  fontWeight: "300",
                                  paddingLeft: "2%",
                                  paddingRight: "2%",
                                }}
                              >
                              </span>
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="particular-blog-profile-mob">
                    <div className="particular-blog-profile-top-mob">
                      <div className="particular-blog-profile-top1-mob">
                        {data?.authorImage && (
                          <img
                            src={
                              process.env.NEXT_PUBLIC_APP_API_URL +
                              "images/" +
                              data.authorImage
                            }
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                            alt="authorImage"
                          />
                        )}
                      </div>
                      <div className="particular-blog-profile-top2-mob">
                        <div>{data.authordetails}</div>
                        <div>{data.authorSpecialization}</div>
                      </div>
                    </div>
                    <div className="particular-blog-profile-bottom-mob">
                      <div className="particular-uploaded-mob">
                        <div>Updated On:</div>
                        <div>
                          {(data.updatedAt)}
                          <span
                            style={{
                              color: "gray",
                              fontWeight: "300",
                              paddingLeft: "2%",
                              paddingRight: "2%",
                            }}
                          >
                          </span>
                        </div>
                      </div>
                      <div className="particular-updated-mob">
                        <div>Uploaded On:</div>
                        <div>
                          {(data.createdAt.split(" | ")[0])}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="row banner-inner-two">
                  <div className="image-bg">
                    {data?.uploadImage && (
                      <img
                        src={
                          process.env.NEXT_PUBLIC_APP_API_URL +
                          "images/" +
                          data.uploadImage
                        }
                        alt="uploadImage"
                      />
                    )}
                  </div>
                  <p
                    style={{
                      paddingTop: "2%",
                      color: "#cb1b5b",
                      textTransform: "uppercase",
                      fontFamily: "Mulish",
                      fontSize: "16px",
                      fontWeight: "700",
                    }}
                  >
                    {data.category}
                  </p>
                  <h1 className="title mb-3">{data.title}</h1>
                  <div
                    className="blogpage-text"
                    dangerouslySetInnerHTML={{ __html: data.description }}
                  ></div>


                  {isDesktop ? (
                    <div className="grid">
                      Was this Article Helpful ?
                      <img
                        onClick={(e) => handleLike(like)}
                        src={thumbsup}
                        alt="thumbsup"
                      />{" "}
                      {like}
                      <img
                        onClick={(e) => handleDisLike(dislike)}
                        src={thumbsdown}
                        alt="thumbsdown"
                      />{" "}
                      {dislike}
                      <button
                        type="button"
                        className="btn post-a-comment-new-web"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                      >
                        {" "}
                        Post A Comment
                      </button>
                    </div>
                  ) : (
                    <div className="post-comment-mob">
                      <div className="post-comment-box-mob">
                        <div className="post-comment-top-mob">
                          <div>Was this Article Helpful ? </div>
                        </div>
                        <div className="post-comment-bottom-mob">
                          <div>
                            <img
                              // onClick={handleLike}
                              src={thumbsup}
                              alt="thumbsup"
                            />{" "}
                            {/* {like} */}
                            <img
                              // onClick={handleDisLike}
                              src={thumbsdown}
                              alt="thumbsdown"
                            />{" "}
                            {/* {dislike} */}
                          </div>
                          <div>
                            <button
                              type="submit"
                              className="btn post-comment-btn-mob"
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                            >
                              {" "}
                              Post A Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="tag">
                    {" "}
                    <b>Tags:</b>{" "}
                  </p>
                  <div className="tags">
                    {data.metatags?.map((el, i) => {
                      return <button key={i}>{el?.title}</button>;
                    })}
                  </div>
                </div>
                {/* <div className="particular-blog-readmore">
                <button>View More</button>
              </div> */}
              </div>
              <div className="col-lg-5 col2">
                <div className="inner-grid">
                  <div className="row banner-inner1">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                      <div className="row banner-inner1-two">
                        <p className="blog-never-miss-mob">
                          Never miss out On our Upcoming articles !
                        </p>
                        <div className="col-lg-12">
                          {" "}
                          <input
                            className="blog-sub-mob"
                            type="email"
                            // name="email"
                            {...register("email", {
                              required: true,
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid Email Address",
                              },
                            })}
                            onChange={(e) => {
                              setSuccessBgColor(true);
                              setEmailCheck(e.target.value);
                            }}
                            placeholder="Enter Your Email"
                          />
                          {errors.email ? (
                            <div className={`invalid-feedback d-block`}>
                              Please provide a valid email
                            </div>
                          ) : email && email == emailcheck ? (
                            <div className={`invalid-feedback d-block`}>
                              Email already subscribed
                            </div>
                          ) : null}
                        </div>
                        <div className="btn">
                          <div className="col-lg-12">
                            {" "}
                            <button
                              type="submit"
                              className={`btn subscribe-blog-mob ${successbgColor ? "blog-success-bgColor" : ""
                                }`}
                            >
                              {" "}
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className=" banner-inner1-three">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>Share This Article</div>
                      <div>
                        <img src={share} className="share-icon" alt="share" />
                      </div>
                    </div>
                    <div className="logo">
                      <div className="d-flex logos">
                        <div className=" whatsapp">
                          <WhatsappShareButton
                            url={`${app}all-category-blog/${data.slugurl}`}
                          >
                            <img src={whatsapp} alt="whatsapp" />
                          </WhatsappShareButton>
                        </div>
                        <div className=" facebook">
                          <FacebookShareButton
                            url={`${app}all-category-blog/${data.slugurl}`}
                          >
                            <img src={facebook} alt="facebook" />
                          </FacebookShareButton>
                        </div>
                        <div className=" twitter">
                          <TwitterShareButton
                            url={`${app}all-category-blog/${data.slugurl}`}
                          >
                            <img src={twitter} alt="twitter" />
                          </TwitterShareButton>
                        </div>
                        <div className=" linkedin">
                          <LinkedinShareButton
                            url={`${app}all-category-blog/${data.slugurl}`}
                          >
                            <img src={linkedin} alt="linkedin" />
                          </LinkedinShareButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <BlogSubscribeModal /> */}

            <PostAComment blogId={data._id} />
            {data?.relatedArticles?.length ? <div
              className="more-blogs home-more-blogs"
            >
              {data?.relatedArticles?.length === 1 ?
                (
                  <div className="more-blogs home-more-blogs singleArticle">
                    <div className="more-blog-title">Related Article</div>
                    <div
                      className="home-more-blog-card related-blog-post-card cursor-pointer"
                      onClick={() => {
                        handleBlog(data.relatedArticles[0].slugurl);
                        // window.location.reload();
                      }}
                    >
                      <div className="home-more-blog-card-img">
                        <img
                          src={data.relatedArticles[0].imageURL}
                          alt={data.relatedArticles[0].slugurl}
                        />
                      </div>
                      <div className="m-2">
                        {/* <div className="home-more-blog-category">{data.relatedArticles[0].category?.toUpperCase()}</div> */}
                        <div className="home-more-blog-card-title">
                          <p>{data.relatedArticles[0].title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="more-blogs home-more-blogs">
                    <div className="more-blog-title">Related Articles</div>
                    <div className="more-blog-slider">
                      <Carousel
                        responsive={responsive}
                        arrows={true}
                        // autoPlay={true}
                        infinite={true}
                        renderArrowsWhenDisabled
                        swipeable={true}
                        draggable={true}
                      >
                        {data?.relatedArticles?.map((el, i) => {
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
                                  <div className="home-more-blog-card-date fs16m12 text-dark home-more-blog">{formatDate(el.createdAt)}</div>
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      </Carousel>
                    </div>
                  </div>
                )
              }
            </div>
              : null
            }
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      <BlogSuccessSubscribe successModal={successModal} setSuccessModal={setSuccessModal} />
    </>
  );
};

export default Articlebanner;
