import React from 'react';
import { useForm } from 'react-hook-form';
import axios from "axios";
// import "./blogdetails.css";

const BlogSubscribeModal = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

  const onSubmit = fields => {
    axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}subscribe/create`, fields).then(response=>{
      if(response.data?._id){
        alert("You've successfully registered yourself.");
        window.location.href="/";
      }
      else{
        alert("Some error");
      }
    }).catch(err=>{
      console.error(err);
      alert(err.response?.data?.message);
    });
  }

    return (

        <div className="subscribe-modal">
        <div className="modal fade" id="blogsubscribe" tabIndex="-1" aria-labelledby="myModals" aria-hidden="true">
            <div className="modal-dialog modal-box">
                <div className="modal-content">
                    <div className="col-lg-1"> <button type="button" className="btn-close" data-bs-dismiss="modal"></button></div> 
                    <div className="modal-body">
                                                   
                            <div className="banner-inner1">
                                <div className="row banner-inner1-two">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <p>Never miss out On our Upcoming articles !</p>
                                        <div className="col-lg-12 mb-3">
                                            <input type="email" {...register("email", {required: true})} placeholder="Enter Your Email"  />
                                            {errors.email && <div className={`invalid-feedback d-block`}>
                                                Please provide a valid email
                                            </div>}
                                        </div>
                                        <div className="col-lg-12 text-center"> <button type="submit" className='btn btn-primary px-5 py-2'> Subscribe</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default BlogSubscribeModal;
