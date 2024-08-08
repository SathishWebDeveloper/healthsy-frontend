import React from "react";
import axios from "axios";

import AllCategoryBanner from "../src/components/Blog/AllCategories/Banner"
import CategoryFilterSection from "../src/components/Blog/AllCategories/Filters/CategoryFilterSection"
import BlogHeader from "../src/components/Layouts/Header/BlogHeader";

const BlogsPage = ({ bannerImageData, articleCategoryList, articleMenuList, blogPostList }) => {
 
    return (
        <div style={{ background: "#f9f9f9" }}>
            <BlogHeader />
            <AllCategoryBanner bannerImageData={bannerImageData} />
            <CategoryFilterSection
                articleCategoryList={articleCategoryList}
                articleMenuList={articleMenuList}
                blogPostList={blogPostList}
            />
        </div>
    )
}

export async function getServerSideProps() {
    try {
        const bannerImagePromise = axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}banner-images/list`)

        const articleCategoryPromise = axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}health-article-category/list`)

        const articleMenuPromise = axios
            .post(`${process.env.NEXT_PUBLIC_APP_API_URL}health-article-menu/list`)

        const blogPostPromise = await axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}health-article/blog-post-list`, { limit: 9, skip: 0, menu: "Health Articles" })

        const [bannerImageData, articleCategoryList, articleMenuList, blogPostList] = await Promise.all([bannerImagePromise, articleCategoryPromise, articleMenuPromise, blogPostPromise]);

        return {
            props: {
                bannerImageData: bannerImageData?.data?.rows?.length ? bannerImageData?.data?.rows[0] : {},
                articleCategoryList: articleCategoryList?.data?.rows?.length ? articleCategoryList?.data?.rows : [],
                articleMenuList: articleMenuList?.data?.rows?.length ? articleMenuList?.data?.rows : [],
                blogPostList: blogPostList?.data?.rows?.length ? blogPostList?.data : [],
            }
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                bannerImageData: {},
                articleCategoryList: [],
                articleMenuList: [],
                blogPostList: [],
            }
        };
    }
}

export default BlogsPage