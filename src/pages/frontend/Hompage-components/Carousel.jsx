import React from 'react'
import { Carousel } from 'react-bootstrap';
import imgSlider1 from '../../../Images/slide-1.jpg'
import imgSlider2 from '../../../Images/slide-2.jpg'
import imgSlider3 from '../../../Images/slide-3.jpg'
import imgSlider4 from '../../../Images/slide-4.jpg'
import imgSlider5 from '../../../Images/slide-5.jpg'
import Navbar from './Navbar';

const CarouselSlider = () => {
  return (
    <div>
      <Navbar/>
      
      <Carousel fade>
  
    <Carousel.Item interval={1500}>
      <img src={imgSlider1} alt='image1'/>
      <Carousel.Caption>
      <h1
            id="white-heading"
            className="mb-3 animate__animated animate__fadeInDown"
          >
            Welcome to CommutersLink
          </h1>
          <p className="mb-3 fs-2" animate__animated animate__fadeInDown>
            "Share to care"
          </p>
          <button
            className="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
            type="submit"
          >
            GET STARTED
          </button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={1500}>
    <img src={imgSlider2} alt='image2'/>
      <Carousel.Caption>
      <div className="carousel-caption d-none d-md-block">
          <h1
            id="white-heading"
            className="mb-3 animate__animated animate__fadeInDown"
          >
            Share Car Ride with Your Neighbourhood for Daily/Monthly Commute
          </h1>
          <button
            className="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
            type="submit"
          >
            GET STARTED
          </button>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={1500}>
    <img src={imgSlider3} alt='image3'/>
      <Carousel.Caption>
      <h1
            id="white-heading"
            className="mb-3 animate__animated animate__fadeInDown"
          >
            Share Your Car or Ride with Others
          </h1>
          <button
            className="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
            type="submit"
          >
            GET STARTED
          </button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={1500}>
    <img src={imgSlider4} alt='image4'/>
      <Carousel.Caption>
      <h1
            id="white-heading"
            className="animate__animated animate__fadeInDown m3-5"
          >
            Let's Go Together to Offices, School and Universities
          </h1>
          <button
            className="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
            type="submit"
          >
            GET STARTED
          </button>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={1500}>
    <img src={imgSlider5} alt='image5'/>
      <Carousel.Caption>
      <h1
            id="white-heading"
            className="mb-3 animate__animated animate__fadeInDown"
          >
            Share Actual Cost and Save
          </h1>
          <button
            className="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
            type="submit"
          >
            GET STARTED
          </button>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>

  </div>
  )
}

export default CarouselSlider