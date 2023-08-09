import React from "react";
import { Carousel } from "react-bootstrap";
import imgSlider1 from "../../../Images/slide-1.jpg";
import imgSlider2 from "../../../Images/slide-2.jpg";
import imgSlider3 from "../../../Images/slide-3.jpg";
import imgSlider4 from "../../../Images/slide-4.jpg";
import imgSlider5 from "../../../Images/slide-5.jpg";
import Navbar from "./Navbar";
import Button from '@mui/material/Button';

const CarouselSlider = () => {
  // const images=[imgSlider1,imgSlider2,imgSlider3,imgSlider4,imgSlider5]
  return (
    <div>
      <Carousel fade>
        <Carousel.Item interval={200000}>
          <div className="d-flex flex-column align-items-center">
            <img className="crousel mt-5 img-fluid" src={imgSlider1} alt="image1" />
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
            <img className="crousel mt-5 img-fluid" src={imgSlider2} alt="image1" />
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
            <img className="crousel mt-5 img-fluid" src={imgSlider3} alt="image1" />
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
            <img className="crousel mt-5 img-fluid" src={imgSlider4} alt="image1" />
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
            <img className="crousel mt-5 img-fluid" src={imgSlider5} alt="image1" />
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
    </div>
  );
};

export default CarouselSlider;
