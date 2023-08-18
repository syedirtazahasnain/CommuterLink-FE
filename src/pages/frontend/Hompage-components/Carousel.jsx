import React from "react";
import { Carousel } from "react-bootstrap";
import { BASE_URL } from "../../../constants";
import Navbar from "./Navbar";
import Button from '@mui/material/Button';

const CarouselSlider = () => {
  // const images=[imgSlider1,imgSlider2,imgSlider3,imgSlider4,imgSlider5]
  return (
    <div id="carousel">
   <section>
   <Carousel fade>
        <Carousel.Item interval={200000}>
          <div className="d-flex flex-column align-items-center">
            <img className="crousel mt-5 img-fluid" src={`${BASE_URL}/assets/images/slide-1.jpg`} alt="image1" />
            <Carousel.Caption>
              <h1
              id="white-heading"
              className="animate__animated animate__fadeInDown"
              >
              Welcome to CommutersLink
              </h1>
              <p className="fs-2 animate__animated animate__fadeInDown" >
              "Share to care"
              </p>
              <button className="animate__animated animate__fadeInUp scrollto mt-5 my-sm-0 mr-2 btn-custom px-4 py-2 rounded rounded-5 text-custom fw-bold" 
              variant="outlined" 
              type="submit"
              >
              GET STARTED
              </button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        {/* <Carousel.Item interval={200000}>
          <div className="d-flex flex-column align-items-center">
            <img className="crousel mt-5 img-fluid" src={`${BASE_URL}/assets/images/slide-2.jpg`} alt="image1" />
            <Carousel.Caption>
              <h1
              id="white-heading"
              className="animate__animated animate__fadeInDown"
              >
              Welcome to CommutersLink
              </h1>
              <p className="fs-2 animate__animated animate__fadeInDown" >
              "Share to care"
              </p>
              <Button className="animate__animated animate__fadeInUp scrollto btn btn-sm mt-5 my-sm-0 mr-2 btn-outline-custom" 
              variant="outlined" 
              type="submit"
              >
              GET STARTED
              </Button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={200000}>
          <div className="d-flex flex-column align-items-center">
            <img className="crousel mt-5 img-fluid" src={`${BASE_URL}/assets/images/slide-3.jpg`} alt="image1" />
            <Carousel.Caption>
              <h1
              id="white-heading"
              className="animate__animated animate__fadeInDown"
              >
              Welcome to CommutersLink
              </h1>
              <p className="fs-2 animate__animated animate__fadeInDown" >
              "Share to care"
              </p>
              <Button className="animate__animated animate__fadeInUp scrollto btn btn-sm mt-5 my-sm-0 mr-2 btn-outline-custom" 
              variant="outlined" 
              type="submit"
              >
              GET STARTED
              </Button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={200000}>
          <div className="d-flex flex-column align-items-center">
            <img className="crousel mt-5 img-fluid" src={`${BASE_URL}/assets/images/slide-4.jpg`} alt="image1" />
            <Carousel.Caption>
              <h1
              id="white-heading"
              className="animate__animated animate__fadeInDown"
              >
              Welcome to CommutersLink
              </h1>
              <p className="fs-2 animate__animated animate__fadeInDown" >
              "Share to care"
              </p>
              <Button className="animate__animated animate__fadeInUp scrollto btn btn-sm mt-5 my-sm-0 mr-2 btn-outline-custom" 
              variant="outlined" 
              type="submit"
              >
              GET STARTED
              </Button>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={200000}>
          <div className="d-flex flex-column align-items-center">
            <img className="crousel mt-5 img-fluid" src={`${BASE_URL}/assets/images/slide-5.jpg`} alt="image1" />
            <Carousel.Caption>
              <h1
              id="white-heading"
              className="animate__animated animate__fadeInDown"
              >
              Welcome to CommutersLink
              </h1>
              <p className="fs-2 animate__animated animate__fadeInDown" >
              "Share to care"
              </p>
              <Button className="animate__animated animate__fadeInUp scrollto btn btn-sm mt-5 my-sm-0 mr-2 btn-outline-custom" 
              variant="outlined" 
              type="submit"
              >
              GET STARTED
              </Button>
            </Carousel.Caption>
          </div>
        </Carousel.Item> */}
    </Carousel>
   </section>
    </div>
  );
};

export default CarouselSlider;
