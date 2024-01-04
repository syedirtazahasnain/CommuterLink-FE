import React from 'react'
import { BASE_URL } from '../../../constants'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const NewBanner = () => {

  const handleScroll = () => {
    document.getElementById('costEarningSection').scrollIntoView();
  }

  return (
    <div className='position-relative' id='carousel'>
      <video className='w-100' autoPlay loop muted>
        <source src={`${BASE_URL}/assets/images/banner_video.mp4`} type="video/mp4" />
      </video>
      <div
        className="ratio ratio-1x1 position-absolute new-banner-circle"
        style={{
          right: "20px",
          top: "calc(50% - 20px)",
          transform: 'translateY(-50%)',
          width: "400px"
        }}
      >
        <Card className="p-0 rounded-circle d-flex bg-teal-dark">
          <CardContent className="m-auto text-center p-5">
            <Typography className="heading" gutterBottom variant="h5" component="div">
              <h1 className="fw-bold text-white font-custom">Welcome to CommutersLink</h1>{" "}
              <h2 className='text-yellow fw-bold font-custom'>Share to Care</h2>
            </Typography>
            <i class="fa-solid fa-arrow-down fs-1 cursor-pointer arrow-icon" onClick={() => handleScroll()}></i>
          </CardContent>
        </Card>
      </div>
      <div
        className="position-absolute px-0 new-banner-rectangle"
      // style={{ margin: ' auto', left: 0, right: 0, textAlign: 'center', top: '550px', maxWidth: 'fit-content', width: '100%' }}
      // style={{
      //   left: "550px",
      //   top: "93%",
      //   transform: 'translateY(-180%)',
      // }}
      >
        <div className=" d-flex px-0 justify-content-center py-2"
        >
          <div className="col-12 m-auto" style={{ color: "cyan !important" }}>
            <div className='text-white text-left ps-3 text-shadow'>CAR POOLING ON LONG TERM BASIS</div>
            <div className="col-12 m-auto" style={{ color: "cyan !important" }}>
              <div className='text-white text-left text-shadow'>Your Cost Saving Daily Commuting Solution!</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewBanner
