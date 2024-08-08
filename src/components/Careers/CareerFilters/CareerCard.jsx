import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
// import Link from "next/link";
import JobForm from "../../Modals/JobApplication/JobForm";
const Location = "/assets/location.svg";
// import { Link, useNavigate } from "react-router-dom";
// import "./careerfilter.css";

const CareerCard = ({ careers, activeDepartments, activeDesigations }) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [careersJobList, setCareersJobList] = useState(careers);
  const [jobpost, setJobPost] = useState({});

  let activeDepartmentList = activeDepartments?.map((data) => data.department)
  let activeDesigationList = activeDesigations?.map((data) => data?.functionName2)

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  useEffect(() => {
    let res = careers.filter((ele, idx) => {
      let department = activeDepartmentList?.some((val) => val == ele?.department)
      let designation = activeDesigationList?.some((val) => val == ele?.designation)
      return ele?.active && department && designation
    })
    setCareersJobList(res)

  }, [careers])

  function convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }

  return (
    <>
      {careersJobList.length ? (
        <div className="container-fluid ">
          <div className="row">
            {careersJobList.map((x, index) => {
              return (
                <Fragment key={x._id + "-" + index}>
                  <div
                    className="col-md-3 col-sm-6 career-card-new-mob career-box-size"
                    key={x._id + "-" + index}
                  >
                    <div className="card-box-margin career-card-mob">
                      <div className="card-body career-box career-box-mob">
                        {isDesktop ? (
                          <div className="mob-career-type">
                            <div className="card-title">{x.designation}</div>
                            <div className="job-type career-job-type-both">
                              <p>{x.type_of_job}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="career-title-type-mob">
                            <div className="career-title-mob">
                              {x.designation}
                            </div>
                            <div className="career-jobtype-mob career-job-type-both">
                              <div>{x.type_of_job}</div>
                            </div>
                          </div>
                        )}
                        <div
                          className="card-text career-card-mainpage career-job-desc"
                          dangerouslySetInnerHTML={{
                            __html: x.job_Description,
                          }}
                        ></div>
                        <div className="location">
                          <img src={Location} alt="Location" />{" "}
                          <p>{x.job_Location}</p>
                        </div>
                        {isDesktop ? (
                          <div className="career-button col-md-12 ">
                            <div className="row mob-d-inlineblock ">
                              <div className="col-md-6 pl0 ">
                                <a
                                  href={`/career-detail/${x.slugurl
                                    ? x.slugurl
                                    : convertToSlug(x.designation)
                                    }/${x._id}`}
                                  className="btn view-btn  w-100 "
                                >
                                  {/* <a to={`/career-detail/${x._id}`} className="btn view-btn"> */}
                                  View
                                </a>
                              </div>
                              {/* <a to="" className="col-md-6 pl0"> */}
                              <div className="col-md-6 pl0 a">
                                <button
                                  className="btn apply-btn w-100 a"
                                  data-bs-toggle="modal"
                                  data-bs-target="#jobapply"
                                  onClick={() => {
                                    setJobPost(x);
                                  }}
                                >
                                  Apply
                                </button>
                              </div>
                              {/* </a> */}
                            </div>
                          </div>
                        ) : (
                          <div className="career-button col-md-12 career-buttons-mob-view ">
                            <div className="row mob-d-inlineblock career-button-mob career-buttons">
                              <div className="col-md-6 pl0 career-btn-both">
                                <a
                                  href={`/career-detail/${x.slugurl}/${x._id}`}
                                  className="btn view-btn-mob career-view-btn w-100 "
                                >
                                  View
                                </a>
                              </div>
                              <div>
                                <div className="col-md-6 pl0 b career-btn-both card-apply-btn-mob-view">
                                  <button
                                    className="btn apply-btn w-100 "
                                    data-bs-toggle="modal"
                                    data-bs-target="#jobapply"
                                    onClick={() => {
                                      setJobPost(x);
                                    }}
                                  >
                                    Apply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
          <JobForm data={jobpost} />
        </div>
      ) : (
        <p className="text-center fs-4">No Job Post Available</p>
      )}
    </>
  );
};

export default CareerCard;
