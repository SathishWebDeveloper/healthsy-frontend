import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Link } from "react-router-dom";
// import healthsyLogo from "../../../assets/healthsy-logo.png";
// import "./headerDemo.css";
const healthsyLogo = "/assets/healthsy-logo.png";

const HeaderDemo = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-6 col-md-4 mob-pos-absolute">
            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
              <img src={healthsyLogo} alt="healthsyLogo" className="logo-img" />
            </a>
          </div>
          <div className="col-6 col-md-8 d-flex justify-content-end align-items-center">
            <div className="text-right">
              <a
                href={`${process.env.NEXT_PUBLIC_WEB_URL}/for-doctors/register-your-interest`}
                className="btn btn-secondary bookademo-register-btn register-your-interest-btn"
              >
                Register Your Interest
              </a>
            </div>
            <div className="ms-md-4">
              <button className="btn btn-primary bookademo-btn" type="button">
                {" "}
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderDemo;
