import axios from "axios";

import Articlebanner from "../../src/components/BlogDetails/Banner/Articlebanner"
import Page404 from "../../src/components/Fallback/404";

const AllCategoryBlog = ({post}) => {

    if(!post?._id){
        return <Page404 />;
    }

    return (
        <Articlebanner data={post}/>
    )
}

export async function getServerSideProps({ params }) {
    try {
        const post = await axios
            .get(
                `${process.env.NEXT_PUBLIC_APP_API_URL}health-article/get/${params?.slugurl}`
            )
        return {
            props: { post: post?.data }, // will be passed to the page component as props
        }
    } catch (error) {
        console.error(error);
        return { props: { data: null } };
    }
}

export default AllCategoryBlog