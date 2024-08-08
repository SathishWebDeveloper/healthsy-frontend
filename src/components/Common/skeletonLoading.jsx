import React, { FC } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading = ({ page, data = 2 }) => {

    return (
        <>
            {Array(data)
                .fill()
                .map((item, index) => {
                    return (
                        <SkeletonTheme baseColor="#efcfdb" highlightColor="#fff" className='w-100' key={index}>
                            {
                                page === 'Health_Articles_and_Guides' &&
                                <div key={index} className="col-sm-4 card-group mb-4 card-skeleton">
                                    <div className="card border-0 d-flex flex-row align-items-center justify-content-between">
                                        <div className="" >
                                            <Skeleton height={20} width={150} className='skeleton-category' />
                                            <Skeleton height={20} width={300} className='skeleton-title' />
                                            <Skeleton height={20} width={250} className='skeleton-author' />
                                        </div>
                                        <div className='skeleton-btn'>
                                            <Skeleton height={35} width={180} className='skeleton-read-more' />
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                page === 'career' &&
                                <div key={index} className="col-sm-4 card-group m-4 career-card-skeleton ">
                                    <div className="card border-0 d-flex flex-row  justify-content-between">
                                        <div className="" >
                                            <Skeleton height={20} width={180} className='skeleton-designation' />
                                            <Skeleton height={25} width={100} className='skeleton-type_of_job' />
                                            <Skeleton height={150} width={250} className='skeleton-job_Description' />
                                            <Skeleton height={20} width={112} className='skeleton-job_Location' />

                                            <div className='d-flex justify-content-between skeleton-careers-btns'>
                                                <Skeleton height={40} width={100} className='skeleton-view-btn' />
                                                <Skeleton height={40} width={100} className='skeleton-apply-btn' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                page === 'homeArticle' &&
                                <div key={index} className="m-4 article-card-skeleton w-100">
                                    <div className="card border-0 w-100">
                                        <Skeleton height={230} width={430} className='skeleton_article_image' />
                                        <Skeleton height={20} width={175} className='skeleton_article_category' />
                                        <Skeleton height={25} width={230} className='skeleton_article_title' />
                                    </div>
                                </div>
                            }
                            {
                                page === 'dynamicBlog' &&
                                <div key={index} className="m-4 dynamicBlog-card-skeleton">
                                    <div className="card border-0 d-flex flex-row  justify-content-between w-100">
                                        <div className="w-100" >
                                            <Skeleton height={175} width={275} className='skeleton-dynamicBlog_img m-3' />
                                            <Skeleton height={20} width={150} className='skeleton-dynamicBlog_title m-3' />

                                            <div className='skeleton-careers-btns w-100 m-3'>
                                                <Skeleton height={30} width={100} className='skeleton-dynamicBlog_share' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {
                                page === 'header' &&
                                <div key={index} className="m-4 header-skeleton w-100">
                                    <div className="border-0 d-flex">
                                        <Skeleton height={50} width={200} className="header-skeleton-content me-2" />
                                    </div>
                                </div>
                            }
                        </SkeletonTheme>
                    )
                })}
        </>
    )
}

export { SkeletonLoading }