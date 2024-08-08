import React, { useState, useEffect } from "react";
import axios from "axios";
const JobTitle = "/assets/job-title-icon.svg";
const Job = "/assets/location.svg";
const JobType = "/assets/job-type-icon.svg";
// import { useParams } from "react-router-dom";
// import "./detailcontent.css";

const DetailContent = ({ article }) => {
  return (
    <div className="detail-content">
      <p className="content-p1 car-par-tit-mob">Position Title, Job Location and Job Type</p>
      <ul>
        <li> <img src={JobTitle} alt="JobTitle" />{article.designation}</li>
        <li> <img src={Job} alt="Job" />{article.job_Location}</li>
        <li> <img src={JobType} alt="JobType" />{article.type_of_job}</li>
      </ul>
      {/* <p className="content-p1">Job Description</p> */}
      {/* <p className="content-p2">
              description
            </p> */}
      <div className="car-particular-desc" dangerouslySetInnerHTML={{ __html: article.job_Description }}></div>
      {/* <p className="content-p1 "> Key Qualities, Responsibilities and Requirements</p>
            <p className="content-p2">
              designation
            </p> */}
    </div>
  );
}

export default DetailContent;
