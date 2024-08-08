import React from "react";
import JobForm from "../../../Modals/JobApplication/JobForm";
import JobShare from "../../../Modals/JobShare/JobShare";
// import "./detailcard.css";
import Moment from "moment";

const DetailCard = ({ article }) => {
  return (
    <>
      <div className="detail-card">
        <p className="head">Organisation Name :</p>
        <p className="response">{article.organisation_Name}</p>
        <p className="head">Employment Start Date :</p>
        <p className="response">
          {/* {Moment(article.employment_Startdate).format('L')} */}
          {Moment(article.employment_Startdate).format("DD/MM/YYYY")}
        </p>
        <p className="head">Total Working Days :</p>
        <p className="response">{article.total_working_days}</p>
        <p className="head">Date Posted :</p>
        <p className="response">
          {Moment(article.createdAt).format("DD/MM/YYYY")}
        </p>
        <p className="head"> Valid Through :</p>
        <p className="response">
          {Moment(article.jobpost_expiry).format("DD/MM/YYYY")}
        </p>
        <div className="mob-dflex">
          <button
            className="share"
            data-bs-toggle="modal"
            data-bs-target="#jobshare"
          >
            Share
          </button>
          <button
            className="apply"
            data-bs-toggle="modal"
            data-bs-target="#jobapply"
          >
            Apply Now
          </button>
        </div>
      </div>
      {article ? <JobForm data={article} /> : null}
      <JobShare data={article} />
    </>
  );
};

export default DetailCard;
