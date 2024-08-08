import React, { useEffect } from "react";

const underConstructionImg = "/assets/under-construction.png";

const UnderConstruction = () => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className="">
                <img src={underConstructionImg} alt="underConstructionImg" className="img-fluid" />
                <div className="text-center fs-4 text-secondary">Connect us on</div>
                <div className="d-flex w-100 justify-content-around h1 fw-bold my-5 flex-wrap container">
                    <div>Facebook</div>
                    <div>Instagram</div>
                    <div>Twitter</div>
                </div>
            </div>
        </>)
}

export default UnderConstruction;