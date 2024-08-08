import React from "react";
import Header from "../Layouts/Header/Header";
import Footer from "../Layouts/Footer/Footer";
import Banner from "./Banner/Articlebanner";
import BlogContent from "./BlogContent/blogcontent";

const BlogDetails = () => {
    return ( 

        <>
            <Header showMenu={false}/>
            <Banner />
            <BlogContent />
            <Footer />
        </>

     );
}
 
export default BlogDetails;