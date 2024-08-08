import React, { Fragment, useEffect, useState } from "react";

import Data from "./Data";
// import "./careerfilter.css";

const CareerTabFilter = ({
  departments,
  department,
  setDepartment,
  selectbg,
  isFilterApplied,
  navigateToDept,
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [departmenthighlight, setDepartmentHighlight] = useState(true);
  const [highlightBackground, setHighlightBackground] = useState(true);
  const [careertabdata, setCareerTabData] = useState(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 960px)");
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [isDesktop]);

  // const[length, setLength] = useState(0)
  // useEffect(()=>{
  //   console.log(departments.length+1, "departments...");
  //   setLength(departments.length+1)
  // }, [])

  return (
    <>
      {isDesktop ? (
        <div className="career-tab-display mb-5">
          <button
            className={`btn career-tab ${
              department === "All Departments" ||
              (selectbg === false && departmenthighlight === true)
                ? "active"
                : ""
            }`}
            onClick={(e) => {
              navigateToDept(e.target.value);
              setDepartmentHighlight(true);
            }}
          >
            All Departments
          </button>
          {departments.map((x, i) => {
            return (
              <Fragment key={i}>
                {x.active && (
                  <button
                    className={`btn career-tab career-tab-swipe ${
                      department === x.department ? "active" : ""
                    }`}
                    key={x._id}
                    value={x.department}
                    onClick={(e) => {
                      navigateToDept(e.target.value);
                      setDepartmentHighlight(true);
                    }}
                  >
                    {x.department}
                  </button>
                )}
              </Fragment>
            );
          })}
        </div>
      ) : (
        <div className="career-tab-display mb-5">
          <button
            className={`btn career-tab career-department ${
              department === "All Departments" ||
              (selectbg === false && departmenthighlight === true)
                ? "care-mob-tab-option"
                : ""
            }`}
            onClick={(e) => {
              navigateToDept(e.target.value);
              setDepartmentHighlight(true);
            }}
          >
            All Departments
          </button>
          {departments.map((x, i) => {
            return (
              <Fragment key={i}>
                {x.active && (
                  <button
                    className={`btn career-tab career-tab-swipe  career-department ${
                      department === x.department ? "care-mob-tab-option" : ""
                    }`}
                    key={x._id}
                    value={x.department}
                    onClick={(e) => {
                      navigateToDept(e.target.value);
                      setDepartmentHighlight(true);
                    }}
                  >
                    {x.department}
                  </button>
                )}
              </Fragment>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CareerTabFilter;
