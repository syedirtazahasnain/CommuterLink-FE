import React from 'react'
import { BASE_URL } from '../../../constants'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const NewBanner = () => {

  const handleScroll = () => {
    document.getElementById('aboutSection').scrollIntoView();
  }

  return (
    <div className='position-relative' id='carousel'>
      <img src={`${BASE_URL}/assets/images/banner-big.jpg`} className='img-fluid w-100' />
      <div
        className="ratio ratio-1x1 position-absolute new-banner-circle"
        style={{
          right: "20px",
          top: "50%",
          transform: 'translateY(-50%)',
          width: "400px"
        }}
      >
        <Card className="p-0 rounded-circle d-flex bg-teal-dark">
          <CardContent className="m-auto text-center p-5">
            <Typography className="heading" gutterBottom variant="h5" component="div">
              <h1 className="fw-bold text-white">Welcome to CommutersLink</h1>{" "}
              <h2 className='text-yellow fw-bold'>Share to Care</h2>
            </Typography>
            <i class="fa-solid fa-arrow-down fs-1 cursor-pointer arrow-icon"  onClick={() => handleScroll()}></i>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default NewBanner
