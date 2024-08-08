import React, { useEffect, useState } from 'react'
import "./index.css"
import Data from "./Data"
import axios from 'axios'
import { AllCategories } from '../CategoryTabFilters'

const PopularVideo = () => {
    const [data, setData] = useState([])
    const [listCount, setListCount] = useState([]);

    useEffect(()=>{
        axios.post(`${process.env.NEXT_PUBLIC_APP_API_URL}health-article/list`, {menu: 'Popular Video'})
        .then((res)=>{
            setData(res.data.rows)
            setListCount(res.data.count)
        })
    }, [])

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
      };

      const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 960px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);

    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);


  return (
    <div className='row'>
        {
            isDesktop
            ?
            <div className='col-12 col-md-8' style={{ width: "100%" }}>
        <div className='blog-popularvideo'>
        <div className='blog-popularvideo-container'>
            {
                data.map((el,i)=>{
                    if(el.active==true){
                        return(
                            <div className='blog-popularvideo-box' key={i}>
                                <div className='blog-popularvideo-box1'>
                                    <div className='blog-popularvideo-top'>
                                      {/* <video poster={el.videoUrl} className="embed-responsive-item" src={el.videoUrl} allowFullScreen></video> */}
                                      <iframe width="1200" height="675" src={el.videoUrl} title={el.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                    <div className='blog-popularvideo-down'>
                                        {el.title}
                                    </div>
                                </div>
                            </div>
                        )
                    }else{
                        return<></>
                    }
                })
            }
        </div>
        {listCount > 9 && (data && data.length !== listCount) ? (
            <div className='blog-popularvideo-footer'><button>View More</button></div>
        ) : null}
    </div>
        </div>
        :
        <div className="blog-popular-mob">
           <div className="blog-popular-container-mob">
              {
                data.map((el, i)=>{
                    if(el.active==true){
                        return(
                            <div className="blog-popular-box-mob">
                               <div className='blog-popular-video-mob'>
                                <div className='blog-popular-top-mob'><iframe src={el.videoUrl} title={el.title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                                <div className='blog-popular-bottom-mob'>{el.title}</div>
                               </div>
                            </div>
                        )
                    }else{
                        return<></>
                    }
                })
              }
           </div>
           {listCount > 9 && (data && data.length !== listCount) ? (
            <div className="blog-healthguide-viewmore-mob">
                <button>View More</button>
            </div>
           ) : null}
      </div>
        }
    </div>
  )
}

export default PopularVideo
