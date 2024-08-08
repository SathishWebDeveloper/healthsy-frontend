import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
const thumbsup = "/assets/homepage/thumbsup.gif"
// import { useNavigate } from 'react-router-dom';
// import "./index.css"

const BlogPostACommentModal = ({ dis }) => {

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 960px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);

  const navigate = useRouter().push

  return (
    <>
      <div
        className="modal fade show"
        id="blogpostacomment"
        //   tabIndex="-1"
        aria-labelledby="blogPostACommentModal"
        aria-hidden="true"
        onClick={() => window.location.reload()}
        style={{
          display: dis
        }}
      >
        <div className="modal-dialog modal-box" >

          <div
            className="modal-content"
            style={{ borderRadius: "8px" }}
          >
            <div className="modal-body">
              <div className='blogsuccessicon'>
                <img src={thumbsup} alt="thumbsup" />
              </div>
              {
                isDesktop
                  ?
                  <div
                    className="launchTitle"
                    style={{
                      textAlign: "center",
                      height: "10vh",
                      fontSize: "32px",
                      fontWeight: "700"
                    }}
                  >
                    Thank You!
                  </div>
                  :
                  <div
                    className="launchTitle"
                    style={{
                      display: "none",
                      textAlign: "center"
                    }}
                  >
                    Thank You!
                  </div>
              }
              {
                isDesktop
                  ?
                  <div
                    className="launchpara"
                    style={{
                      textAlign: "center",
                      height: "10vh",
                      fontWeight: "500",
                      fontSize: "24px"
                    }}
                  >
                    You have posted a comment successfully
                  </div>
                  :
                  <div
                    className="blogsuccesspara-mob"
                  >
                    Posted a comment successfully!
                  </div>
              }
              {
                isDesktop
                  ?
                  ""
                  :
                  <div className='blog-gohome-mob'>
                    <a href={`${process.env.NEXT_PUBLIC_WEB_URL}/`}>Go to Home</a>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostACommentModal