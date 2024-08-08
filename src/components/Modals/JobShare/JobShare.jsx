import React, { useState } from "react";
// import Link from "next/link";
import { FacebookShareButton, InstapaperShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";
import { app } from "../../../webappurl"
import { CopyToClipboard } from "react-copy-to-clipboard";
// import { Link } from "react-router-dom";
// import './jobshare.css';

const closeIcon = "/assets/close-icon.svg";
const copyIcon = "/assets/copy-icon.svg";
const whatsappIcon = "/assets/whatsapp-icon.svg"
const fbIcon = "/assets/fb-icon.svg"
const twitterIcon = "/assets/Twitter Logo.svg"
const linkedinIcon = "/assets/linkedin-icon.svg"
const instagramIcon = "/assets/instagram-icon.svg"

const JobShare = ({ data }) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeSnippet = `${app}career-detail/${data?.slugurl}/${data?._id}`;
  // const codeSnippet = `${app}career-detail/${data._id}`;
  // const codeSnippet = window.location.href;
  const onCopyText = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };


  return (
    <>
      <div className="modal fade jobshare-section" id="jobshare" tabIndex="-1" aria-labelledby="jobShareModal" aria-hidden="true">
        <div className="modal-dialog modal-box modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-body">
              <div className="jobshare-body">
                <div id="jobShareModal" className="title">
                  <strong>Share</strong>
                </div>
                <div className="btn-dismissal">
                  <button
                    type="button"
                    className="btn-close "
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button></div>
              </div>


              <div className="col-md-12">
                <div className="row">
                  <div className="job-share-para">
                    <p>Share this job position with your friends !</p>
                  </div>
                  <div className="copy-link-bg">
                    {codeSnippet}
                    <CopyToClipboard text={codeSnippet} onCopy={onCopyText}>
                      <span className="float-right copied">{isCopied ? "Copied!" : <img src={copyIcon} alt="copyIcon" className="float-right cursor-pointer" />}</span>
                    </CopyToClipboard>
                  </div>
                  <div className="text-center mb-3">
                    or share via
                  </div>
                  <div className="text-center share-sm-icons car-share-icon-mob">
                    <div className="sm-icons car-mob-icons">
                      <a href="">
                        <span className="wa-sm-icon">
                          <WhatsappShareButton
                            url={codeSnippet}
                          >
                            <img src={whatsappIcon} alt="whatsappIcon" />
                          </WhatsappShareButton>
                        </span>
                      </a>
                      <a href="">
                        <span className="fb-sm-icon">
                          <FacebookShareButton
                            url={codeSnippet}
                          >
                            <img src={fbIcon} alt="fbIcon" />
                          </FacebookShareButton>
                        </span>
                      </a>
                      <a href="">
                        <span className="twitter-sm-icon">
                          <TwitterShareButton
                            url={codeSnippet}
                          >
                            <img src={twitterIcon} alt="twitterIcon" />
                          </TwitterShareButton>
                        </span>
                      </a>
                      <a href="">
                        <span className="li-sm-icon">
                          <LinkedinShareButton
                            url={codeSnippet}
                          >
                            <img src={linkedinIcon} alt="linkedinIcon" />
                          </LinkedinShareButton>
                        </span>
                      </a>
                      <a href="">
                        <span className="insta-sm-icon">
                          <InstapaperShareButton
                            url={codeSnippet}
                          >
                            <img src={instagramIcon} alt="instagramIcon" />
                          </InstapaperShareButton>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobShare;
