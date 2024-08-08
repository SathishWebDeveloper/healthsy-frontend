import React from "react";
// import Link from "next/link";
import { useRouter } from "next/router";
// import "./header.css";
// import healthsyLogo from "../../../assets/healthsy-logo.png";
// import { Link, useNavigate } from "react-router-dom";

const healthsyLogo = "/assets/healthsy-logo.png";

const Header = (props) => {
    const router = useRouter()
    const handleClick = () => {
        const ele = document.querySelector("#dropdown1");
        if (ele.classList.contains("show"))
            ele.classList.remove("show")
        else
            ele.classList.add("show");
    }
    const toggleSelector = (e) => {
        const liElement = e.target.parentElement.parentElement
        const parent = liElement.parentElement;
        const childNodes = parent.childNodes;
        childNodes.forEach((ele) => {
            if (ele.id !== liElement.id)
                ele.classList.remove("active");
            else {
                if (ele.classList.contains("active"))
                    ele.classList.remove("active");
                else
                    ele.classList.add("active");
            }
        })
    }

    return (
        <header className="header">
            <div className="container">
                <div className="col-md-12 contents">
                    <div className="row">
                        <div className="col-6">
                            <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                                <img src={healthsyLogo} alt="healthsyLogo" className="logo-img" />
                            </a>
                        </div>
                        <div className="col-6  career-detail-header">
                            <div className="dropdown text-end">
                                <button className="btn btn-open-position" onClick={() => router.push("/join-us")}>Open Positions</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;