import React, { useEffect, useState } from 'react'
import "./index.css"
import axios from 'axios'
import img from "../../../../../assets/featured_card.svg"
import share from "../../../../../assets/share.svg"
import { AllCategories } from '../CategoryTabFilters'
import Moment from "moment";

const InTheNews = () => {
    const [data, setData] = useState([])
    const [listCount, setListCount] = useState([]);

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}health-article/list`, { menu: 'In The News' })
            .then((res) => {
                setData(res.data.rows)
                setListCount(res.data.count)
            })
    }, [])

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const media = window.matchMedia('(min-width: 960px)');
        const listener = () => setIsDesktop(media.matches);
        listener();
        window.addEventListener('resize', listener);

        return () => window.removeEventListener('resize', listener);
    }, [isDesktop]);

    return (
        <div className='row'>
            {
                isDesktop
                    ?
                    <div className='col-12 col-md-8' style={{ width: "100%" }}>
                        <div className='blog-news'>
                            <div className='blog-news-container'>
                                {
                                    data.map((el, i) => {
                                        if (el.active == true) {
                                            return (
                                                <div className='blog-news-box' key={i}>
                                                    <div className='blog-news-logo'>
                                                        <img src={process.env.NEXT_PUBLIC_APP_API_URL + "images/" + el.uploadImage} alt="uploadImage" />
                                                    </div>
                                                    <div className='blog-news-bottom'>
                                                        <div className='blog-news-bottom-box'>
                                                            <div className='blog-news-title'>
                                                                {el.title}
                                                            </div>
                                                            <div className='blog-news-foot'>
                                                                <div className='blog-news-share'>
                                                                    <img
                                                                        src={share}
                                                                        alt="share"
                                                                        style={{ cursor: "pointer" }}
                                                                        // todo check
                                                                        onClick={() => openInNewTab(`${process.env.NEXT_PUBLIC_APP_API_URL}all-category-blog/${el._id}`)}
                                                                    /></div>
                                                                <div className='blog-news-date'>{Moment(el.createdAt).format("DD MMMM YYYY")}</div>
                                                                <div className='blog-news-button'></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return <></>
                                        }
                                    })
                                }
                            </div>
                            {listCount > 9 && (data && data.length !== listCount) ? (
                                <div className='blog-news-viewmore'><button>View More</button></div>
                            ) : null}
                        </div>
                    </div>
                    :
                    <>
                        <div className='blog-news-mob'>
                            <div className='blog-innews-container-mob'>
                                {
                                    data.map((el, i) => {
                                        if (el.active == true) {
                                            return (
                                                <div className='blog-innews-box-mob'>
                                                    <div className='blog-in-the-news-mob'>
                                                        <div className='blog-news-image-mob'><img src={process.env.NEXT_PUBLIC_APP_API_URL + "images/" + el.uploadImage} alt="uploadImage" /></div>
                                                        <div className='blog-news-title-mob'>{el.title}</div>
                                                        <div className='blog-news-share-mob'>
                                                            <div>
                                                                <img src={share} alt="share"
                                                                    // todo check
                                                                    onClick={() => openInNewTab(`${process.env.NEXT_PUBLIC_APP_API_URL}all-category-blog/${el._id}`)}
                                                                />
                                                            </div>
                                                            <div>|</div>
                                                            <div>{Moment(el.createdAt).format("DD MMMM YYYY")}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        } else {
                                            return <></>
                                        }
                                    })
                                }
                            </div>
                        </div>
                        {listCount > 9 && (data && data.length !== listCount) ? (
                            <div className="blog-healthguide-viewmore-mob">
                                <button>View More</button>
                            </div>
                        ) : null}
                    </>
            }
        </div>
    )
}

export default InTheNews
