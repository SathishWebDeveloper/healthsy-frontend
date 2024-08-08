import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import Header from "../Header/Header";
import Footer from "../../Layouts/Footer/Footer";
import DetailBanner from "./DetailBanner/DetailBanner";
import DetailContent from "./DetailContent/detailcontent";
import DetailCard from "./DetailCard/detailcard";
// import { MetaTags } from 'react-meta-tags';
import { Helmet } from "react-helmet-async";

const Details = () => {
    const {query:{id} } = useRouter()
    const [pageLoading, setPageLoading] = useState(true)
    const [articleData, setArticleData] = useState(null)
    let currentUrl; 

    useEffect(() => {
        currentUrl = window.location.href
    }, [])
    useEffect(() => {
        if(id)
        fetchArticle()
    }, [id])

    function fetchArticle () {
        axios.get(`${process.env.NEXT_PUBLIC_APP_API_URL}career-add-job-post/get/${id}`)
            .then((res) => {
                setArticleData(res.data)
                setPageLoading(false)
            })
            .catch((err) => console.log('FETCH ARTICLE: ', err))
    }

    return (
        pageLoading ? null :
        <>
            <Header />
            <DetailBanner article={articleData} />
            <div className="container mob-hire-bg">
                <div className="row">
                    <div className="col-lg-7">
                        <DetailContent article={articleData} />
                    </div>
                    <div className="col-lg-5">
                        <DetailCard article={articleData} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;
