import React from "react";
import "./blogcontent.css";
import img1 from "../../../assets/allcategories_card4.svg"
import img2 from "../../../assets/allcategories_card2.svg"
import img3 from "../../../assets/allcategories_card3.svg"
import share from "../../../assets/share.svg"

const ArticleContent = () => {
    return (
        <div className="blog-content">
            <div className="container images">
                <p className="content-text">More Articles on Mental Wellness</p>
                <div className="row blog-images">
                    <div className="col-lg-4">
                        <div className="img">
                            <img src={img1} alt="img1" />
                            <p >10 Home Plants to Improves Oxygen Levels at Home</p> <br />
                            <div className="share"> <img src={share} alt="share" />  |  July23, 2022</div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="img">
                            <img src={img2} alt="img2" />
                            <p >10 Home Plants to Improves Oxygen Levels at Home</p> <br />
                            <div className="share"> <img src={share} alt="share" />  |  July23, 2022</div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="img">
                            <img src={img3} alt="img3" />
                            <p >10 Home Plants to Improves Oxygen Levels at Home</p> <br />
                            <div className="share"> <img src={share} alt="share" />  |  July23, 2022</div>
                        </div>
                    </div>
                </div>
                <div className="view"><button>View More</button></div>
            </div>
        </div>
    );
}

export default ArticleContent;
