import React, { useEffect, useState, memo } from 'react'

const top = "/assets/homepage/back-to-top.svg"

const ScrolltoTop = () => {
    const [scrollbutton , setScrollbutton] = useState(false)

    useEffect(()=>{
       window.addEventListener('scroll',()=>{
           if(window.scrollY>100){
               setScrollbutton(true)
           }
           else{
               setScrollbutton(false)
           }
       })
    })

    const scrollup = ()=>{
       window.scrollTo({
           top:0,
           behavior:'smooth'
       })
    }

 return (
   <div>
       {scrollbutton && <div className='Scrollbutton'
            onClick={scrollup}><img src={top} alt='Up Arrow'/></div>}
   </div>
 )
}


export default memo(ScrolltoTop)