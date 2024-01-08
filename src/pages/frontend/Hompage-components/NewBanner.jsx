import React from 'react'
import { BASE_URL } from '../../../constants'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import Signup from '../Signup/Signup'

const NewBanner = () => {

  const handleScroll = () => {
    document.getElementById('costEarningSection').scrollIntoView();
  }

  return (
    <>
      <div className='position-relative video-container'>
      <video className='video-width' autoPlay loop muted>
        <source  src={`${BASE_URL}/assets/images/banner_video.mp4`} type="video/mp4" />
      </video>
      <div
        className="position-absolute pt-1 rounded-top signup-mobile"
        style={{
          right: "40px",
          paddingLeft:'20px',
          top: "calc(45% - 0px)",
          transform: 'translateY(-50%)',
        
        }}
      >
       
       <Signup />
      </div>
      <div
        className="position-absolute px-0 new-banner-rectangle"
      >
        <div className=" d-flex px-0 justify-content-center py-2"
        >
          <div className="col-12 m-auto" style={{ color: "cyan !important" }}>
            <div className='text-white text-left ps-3'>CAR POOLING ON LONG TERM BASIS</div>
            <div className="col-12 m-auto" style={{ color: "cyan !important" }}>
              <div className='text-yellow text-left  text-shadow'>Your Cost Saving Daily Commuting Solution!</div>
            <div ><img className="commuters-text" src={`${BASE_URL}/assets/images/CommutersLink-text.png`}></img></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  )
}

export default NewBanner
