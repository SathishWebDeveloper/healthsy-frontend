import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useRouter } from 'next/router';
// import Image404 from "../../assets/404.svg"
// import Header from "../Layouts/Header/Header";
// import Footer from "../Layouts/Footer/Footer";
const Image404 = "/assets/404.svg"

const Page404 = () => {
    // const navigate = useRouter().push;

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            {/* <Header /> */}
            <div className="flexCenter flex-column my-5">
                <img src={Image404} alt="Image404" className="image404" />
                <div className="title404 mt-4">
                    Oops, looks like page not found!
                </div>
                <div className="description404 mt-3">
                    We can't seem to find the page you're looking for.
                </div>
                <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>
                    <button className='btn goToHomeBtn mt-5'>
                        Go to Home
                    </button>
                </a>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Page404