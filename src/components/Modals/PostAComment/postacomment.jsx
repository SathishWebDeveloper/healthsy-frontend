import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BlogPostACommentModal from "../BlogPostACommentModal/BlogPostACommentModal";
// import "./postacomment.css";

const PostAComment = ({blogId}) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  
  const[successModal, setSuccessModal] = useState(false)

  const onSubmit = (fields) => {
    let item = {
      id: blogId,
      name: fields.name,
      email: fields.email,
      comment: fields.comment
    }
    axios
      .post(`${process.env.NEXT_PUBLIC_APP_API_URL}post-a-comment/create`, item)
      .then((response) => {
        setSuccessModal(true)
      });
  };

  const[name, setName]=useState(false)
  const[email, setEmail]=useState(false)
  const[comment, setComment]=useState(false)

  return (
    <>
     {
      successModal == false && (
        <div
      className="modal fade show"
      id="myModal"
      aria-labelledby="myModals"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-box">
        <div className="post-a-comment">
          <div className="modal-content">
            <div className="modal-body">
              <div className="col-lg-1">
                {" "}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>
              <div className=" modal-comment">
                <h4 className="modal-title ">Post A Comment</h4>
              </div>
              <form 
                 onSubmit={handleSubmit(onSubmit)}
              >
                <div className="inner-modal">
                  <div className="row">
                    <div className="col-lg-12">
                      <label>
                        {" "}
                        Name <span className="star">*</span>
                      </label>
                    </div>
                    <div className="col-lg-12">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        {...register("name", { required: true })}
                        onChange={(e)=>setName(true)}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <div className={`invalid-feedback d-block`}>
                          Please Enter name
                        </div>
                      )}
                    </div>
                    <div className="col-lg-12">
                      <label>
                        {" "}
                        Email ID <span className="star">*</span>
                      </label>
                    </div>
                    <div className="col-lg-12">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        {...register("email", { required: true })}
                        onChange={(e)=>setEmail(true)}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <div className={`invalid-feedback d-block`}>
                          Please Enter email
                        </div>
                      )}
                    </div>
                    <div className="col-lg-12">
                      <label>
                        {" "}
                        Comment <span className="star">*</span>
                      </label>
                    </div>
                    <div className="col-lg-12">
                      <textarea
                        placeholder="Type here"
                        id="comment"
                        name="comment"
                        className="form-control"
                        {...register("comment", { required: true })}
                        onChange={(e)=>setComment(true)}
                      ></textarea>
                      {errors.comment && (
                        <div className={`invalid-feedback d-block`}>
                          Please Enter comment
                        </div>
                      )}
                    </div>
                    <div className="col-lg-12">
                      <button 
                        type="submit" 
                        className={`btn-submit ${name==true&&email==true&&comment==true?"getnotifybutton":""}`}
                      >
                    {" "}
                    Submit{" "}
                  </button>
                  </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
      )
     }
    { successModal && 
       <BlogPostACommentModal
         dis={successModal ? "block" : "none"}
       />}
    </>
  );
};

export default PostAComment;
