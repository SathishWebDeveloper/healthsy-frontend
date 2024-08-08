import React, { useState } from "react";
import Image from "next/image";
import { SlLocationPin } from "react-icons/sl";
import { MdAccessTime } from "react-icons/md";
// import { BsArrowRight } from "react-icons/bs";

// const externalLink = "/assets/careers/externalLink.svg";
const externalLink = "/assets/careers/apply-now-arrow.png";
// todo remove
const vacancy = true;

const CareerDetails = ({
  fetchCareerJobList,
  groupedDepartmentList: allDepartmentList,
}) => {
  const [department, setDepartment] = useState("All department");
  const [groupedDepartmentList, setGroupedDepartmentList] =
    useState(allDepartmentList);

  const filteredDept = (val) => {
    setDepartment(val);
    if (val === "All department") {
      setGroupedDepartmentList(allDepartmentList);
    } else {
      setGroupedDepartmentList({ [val]: allDepartmentList[val] });
    }
  };

  const handleWidth = () => {
    if(department ==="All department"){
      return "200px"
    } else if(department ==="Full Stack"){
      return "150px"
    } else if(department ==="UI/UX"){
      return "120px"
    }
    return `140px`
  }

  return (
    <div className="container my-5">
      <div className="flexBetweenCenter mb-5 careerDetailsHeader">
        <h2 className="careerDetailTitle">Job Openings in Coimbatore</h2>
        <div className="careerDetailDesc d-none ">
          It is a long established fact that a reader will be distracted by the
          It is a long established fact that a reader will be distracted by the
          readable content a reader will be distracted readable content a reader
        </div>
        <select
          className="selectDepartment"
          value={department}
          style={{width: handleWidth()}}
          onChange={(e) => filteredDept(e.target.value)}
          // defaultValue={"All department"}
        >
          <option value="All department">All department</option>
          {(fetchCareerJobList?.activeDepartments ?? [])?.map((option, inx) => {
            if (option.active === true) {
              return (
                <option key={inx} value={option?.department}>
                  {option?.department}
                </option>
              );
            }
          })}
        </select>
      </div>
      {vacancy ? (
        <div>
          {Object.keys(groupedDepartmentList).map((data, value) => {
            return (
              <div
                className="d-flex justify-content-between jobTeamCard"
                key={data}
              >
                <div className="">
                  <div className="departmentTitle mb-2">{data} Team </div>
                  <div className="departmentDesc">
                    Open positions in {data} team
                  </div>
                </div>
                <div className="">
                  {groupedDepartmentList[data]?.map((val, idx) => {
                    return (
                      <div className="jobPostCard mb-3" key={idx}>
                        <div className="d-flex justify-content-between">
                          <a
                            href={`${
                              process.env.NEXT_PUBLIC_WEB_URL
                            }/career/${val.department_slug}/${
                              val.slugurl
                            }`}
                            className="careerDesignation"
                          >
                            <div className="jobDesignation text-black">
                              {val?.designation}
                            </div>
                          </a>
                        </div>
                        <div
                          className="jobDescription card-text career-card-mainpage career-job-desc"
                          dangerouslySetInnerHTML={{
                            __html: val.job_Description,
                          }}
                        ></div>
                        <div className="flexBetweenCenter mt-3 jobPostCardBottom">
                          <div className="d-flex">
                            <div className="carrerJobType">
                              <MdAccessTime className="me-2" />
                              {val?.type_of_job}
                            </div>
                            <div className="jopLocation ms-3">
                              <SlLocationPin className="me-1" />
                              {val?.job_Location}
                            </div> 
                          </div>
                          <a
                            href={`${
                              process.env.NEXT_PUBLIC_WEB_URL
                            }/career/${encodeURI(val.department_slug)}/${
                              val.slugurl
                            }`}
                          >
                            <div className="career-apply-now">
                                Apply now 
                            <Image
                              className=""
                              src={externalLink}
                              width={16}
                              height={9}
                              alt="externalLink"
                            />
                            </div>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h1 className="noVacancy">Currently No Job Vacancies</h1>
        </div>
      )}
    </div>
  );
};

export default CareerDetails;
