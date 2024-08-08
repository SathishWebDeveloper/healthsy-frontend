import React, { Fragment, useEffect, useState, memo } from "react";

import CategoryCard from "./CategoryCard";
import Featured from "./Featured/Featured";
import DynamicBlog from "./DynamicBlog/DynamicBlog";

const searchicon = "/assets/blogsearch.svg";
const filter_icon = "/assets/blog/filter_icon.svg";

export const AllCategories = ({ category, setCategory, setLimit, articleCategoryList }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const [allcatColor, setAllCatColor] = useState(true);

  return (
    <div className="blog-allcategory-right">
      <div
        style={{
          color: allcatColor ? "#CB1B5B" : "black",
        }}
        className="blog-allcate-title"
        onClick={() => {
          // window.location.reload();
          setAllCatColor(true);
          setCategory(null)
        }}
      >
        Health Articles
      </div>
      {articleCategoryList.sort((a, b) => a.category.localeCompare(b.category))
        .map((el, i) => {
          if (el.active == true && el.menu == "Health Articles") {
            return (
              <div
                className={category == el.category ? "text-primary" : ""}
                key={i}
                onClick={() => {
                  setLimit(9)
                  setCategory(el.category);
                  setAllCatColor(false);
                }}
              >
                {el.category}
              </div>
            );
          } else {
            return <Fragment key={i}></Fragment>;
          }
        })}
    </div>
  );
};

const CategoryTabFilters = ({ category, articleCategoryList, articleMenuList, blogPostList = { blogPostList } }) => {
  const [active_tab, setActiveTab] = useState("Health Articles and Guides");
  const [filter, setFilter] = useState({});
  const [show, setShow] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const [allbackColor, setAllBackColor] = useState(true);
  const [featurebackColor, setFeatureBackColor] = useState(false);
  const [alltabcolor, setAllTabColor] = useState(true);
  const [featuretabcolor, setFeatureTabColor] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => {
      setIsDesktop(media.matches);
    }
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  const [popup, setPopup] = useState(false);

  const handlePopup = () => {
    setPopup(!popup);
  };

  function handleClickOutside(evt) {
    const modal = document.querySelector('.c-filter-modal')
    if (modal && modal.contains(evt.target)) return
    setPopup(false)
  }

  const [test, settest] = useState(null)

  return (
    <>
      {isDesktop ? (
        <div>
          <h1 className="blog-head-container-title">
            {active_tab}
          </h1>
          <div className="category-tab-display mb-5">
            <div className="blog-tabswitch">
              <div
                className="blog-category"
                style={{
                  width: show ? "" : "100%"
                }}
              >
                <ul
                  className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item blog-tab-list" role="presentation">
                    <button
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home-tabel-panel"
                      type="button"
                      role="tab"
                      aria-controls="home-tabel-panel"
                      aria-selected="true"
                      className={`btn category-tab active`}
                      onClick={() => {
                        setActiveTab("Health Articles and Guides")
                        setShow(true);
                      }}
                    >
                      Health Articles
                    </button>
                  </li>
                  {articleMenuList.map((el, i) => {
                    if (el.name != "Featured" && el.name != "Health Articles" && el.active == true) {
                      return (
                        <li key={i} className="nav-item" role="presentation">
                          <button
                            id={el.name}
                            data-bs-toggle="tab"
                            data-bs-target="#profile-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="profile-tab-pane"
                            aria-selected="false"
                            className={`btn category-tab`}
                            onClick={() => {
                              setActiveTab(el.name);
                              setShow(false);
                            }}
                          >
                            {el.name}
                          </button>
                        </li>
                      );
                    }
                  })}
                  <li className="nav-item" role="presentation">
                    <button
                      id="contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#contact-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="contact-tab-pane"
                      aria-selected="false"
                      className={`btn category-tab`}
                      onClick={() => {
                        setActiveTab("Featured")
                        setShow(false)
                      }}
                    >
                      Featured
                    </button>
                  </li>
                </ul>
              </div>
              {show ? (
                <div className="blog-search">
                  <div className="blog-search-icon">
                    <img src={searchicon} alt="searchIcon" />
                  </div>
                  <div className="blog-search-input">
                    <input
                      type="text"
                      placeholder="Search For Articles Here"
                      onChange={(e) =>
                        setFilter((prevState) => {
                          return {
                            ...prevState,
                            title: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="tab-content pl0" id="myTabContent">
            {active_tab === "Health Articles and Guides" ? (
              <div
                className="tab-pane fade show active"
                id="home-tabel-panel"
                role="tabpanel"
                aria-labelledby="home-tabel"
                tabIndex="0"
              >
                <CategoryCard
                  activeTab={active_tab}
                  filter={filter}
                  category={category}
                  articleCategoryList={articleCategoryList}
                  blogPostList={blogPostList}
                />
              </div>) : null}
            {articleMenuList.map((el, i) => {
              if (el.name != "Featured") {
                return (
                  <div
                    key={i}
                  >
                    {active_tab === el.name ? <DynamicBlog menu={active_tab} /> : null}
                  </div>
                );
              } else {
                return <Fragment key={i} />
              }
            })}

            {active_tab === "Featured" ? (
              <div>
                <Featured />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div>
          {show ? (
            <div className="blog-search blog-search-mob">
              <div className="blog-search-icon">
                <img src={searchicon} alt="searchicon" />
              </div>
              <div className="blog-search-input">
                <input
                  type="text"
                  placeholder="Search For Articles Here"
                  onChange={(e) =>
                    setFilter((prevState) => {
                      return {
                        ...prevState,
                        title: e.target.value,
                      };
                    })
                  }
                />
              </div>
            </div>
          ) : null}
          <div className="new-blog-filter-mob">
            <h1 className="blog-head-container-title">
              {active_tab}
            </h1>
            <div className={`${show ? "new-blog-filter-dash-mob" : "new-blog-filter-dash-mob-hide"}`}>|</div>
            <div className={`${show ? "new-blog-filter-icon-mob" : "new-blog-filter-icon-mob-hide"}`}>
              <img src={filter_icon} alt="filter_icon" onClick={handlePopup} />
            </div>
          </div>

          <div className="category-tab-display mb-5">
            <div className="blog-tabswitch">
              <div className="blog-category">
                <ul
                  className="nav nav-tabs blog-tab-mob"
                  id="myTab"
                  role="tablist"
                >
                  <div>
                    <li className={`nav-item blog-tab-list`} role="presentation">
                      <div
                        className={`${allbackColor ? "active-mob-blog-tab" : null}`}
                      >
                        <button
                          style={{
                            color: alltabcolor ? "#fff" : "",
                          }}
                          id="home-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#home-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="home-tab-pane"
                          aria-selected="true"
                          className={`btn category-tab${alltabcolor ? "tabwhitecolor" : ""
                            }`}
                          onClick={() => {
                            setActiveTab("Health Articles and Guides");
                            setShow(true);
                            setAllBackColor(true);
                            setFeatureBackColor(false);
                            setAllTabColor(true);
                            setFeatureTabColor(false);
                            settest(false)
                          }}
                        >
                          Health Articles
                        </button>
                      </div>
                    </li>
                    {articleMenuList.map((el, i) => {
                      if (el.name != "Featured" && el.name != "Health Articles") {
                        return (
                          <li className="nav-item" role="presentation" key={i}>
                            <div
                              key={i}
                              className={test == el.name ? "dynamicbgcolor" : ""}
                            >
                              <button
                                id="profile-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#profile-tab-pane"
                                type="button"
                                role="tab"
                                aria-controls="profile-tab-pane"
                                aria-selected="false"
                                className={`btn category-tab ${test == el.name ? "tabwhitecolor" : ""
                                  }`}
                                style={{
                                  color: "#000"
                                }}
                                onClick={() => {
                                  setActiveTab(el.name);
                                  setShow(false);
                                  setAllBackColor(false)
                                  setFeatureBackColor(false)
                                  setAllTabColor(false)
                                  settest(el.name)
                                }}
                              >
                                {el.name}
                              </button>
                            </div>
                          </li>
                        );
                      }
                    })}
                    <li className="nav-item" role="presentation">
                      <div
                        style={featurebackColor ? {
                          background: "#CB1B5B",
                          color: "#fff !important",
                          border: "#CB1B5B",
                        } : {}}
                      >
                        <button
                          id="contact-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#contact-tab-pane"
                          type="button"
                          role="tab"
                          aria-controls="contact-tab-pane"
                          aria-selected="false"
                          className={`btn category-tab ${featuretabcolor ? "tabwhitecolor" : ""
                            }`}
                          onClick={() => {
                            setActiveTab("Featured");
                            setShow(false);
                            setAllBackColor(false);
                            setFeatureBackColor(true);
                            setAllTabColor(false);
                            setFeatureTabColor(true);
                            settest(false)
                          }}
                        >
                          Featured
                        </button>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-content pl0" id="myTabContent">
            {active_tab === "Health Articles and Guides" ? (
              <div>
                <CategoryCard
                  activeTab={active_tab}
                  filter={filter}
                  category={category}
                  popup={popup}
                  togglePopup={handlePopup}
                  articleCategoryList={articleCategoryList}
                  blogPostList={blogPostList}
                />
              </div>) :
              null
            }
            {articleMenuList.map((el, i) => {
              if (el.name != "Featured") {
                return (
                  <div key={i}>
                    {active_tab === el.name ? <DynamicBlog menu={active_tab} /> : null}
                  </div>
                );
              }
            })}
            {active_tab === "Featured" ? <div>
              <Featured />
            </div> : null}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(CategoryTabFilters);
