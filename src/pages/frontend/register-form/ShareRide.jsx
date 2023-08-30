import React from 'react'
import { BASE_URL } from "../../../constants";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link } from 'react-router-dom';

const ShareRide = () => {

    const Size = {
        fonstSize: "14px",
        marginBottom: "8px",
        width: "350px",
        margin: "auto",
      };

  return (
    <div>
        <div>
        <section
          id="sign-up"
          // className="mt-5"
          style={{ backgroundColor: "#eee" }}
        >
        <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex fixed"
                style={{
                  marginTop: "10vh",
                }}
              >
                
                  <Carousel
                    style={{
                      backgroundColor: "#eee",
                    }}
                    className="carousel-container"
                    prevIcon={null}
                    nextIcon={null}
                    indicators={null}
                  >
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup.png`}
                        alt="First slide"
                      />
                      <h4 className="text-success fw-bold text-center mt-2">Share Actual Cost</h4>
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-3.png`}
                        alt="First slide"
                      />
                      <h4 className="text-success fw-bold text-center mt-2">Offer Your Car or Get a Seat in Other's Car</h4>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-4.png`}
                        alt="First slide"
                      />
                      <h4 className="text-success fw-bold text-center mt-2">Share Ride for School University</h4>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-6.png`}
                        alt="First slide"
                      />
                      <h4 className="text-success fw-bold text-center mt-2">Share Ride For Office</h4>
                    </Carousel.Item>
                  </Carousel>
                </div>
               
              

              <div className="col-md-6 mb-3 py-5 text-center d-flex justify-content-center">
                <Card
                  sx={{
                    marginTop: "10vh",
                    width: "600px"
                    // marginLeft: "5px",
                  }}
                >
          
                  <CardContent>
                    <Typography>
                    <form id="regForm" className="multipstepform p-4 my-3">
                        <h3 className="text-center text-custom mb-5" style={{color:'#198754'}}>I want to share ride for:</h3>
                      <div className="text-left"> <label className="radio-button ">
                            <input type="radio" id="option1"name="option" value="office"/>
                            <span className="ml-3"style={{color:'#198754'}}>Office</span>
                          </label></div>
                       
                          <div className="text-left"> <label class="radio-button">
                            <input type="radio" id="option2" name="option" value="University"/>
                            <span className="ml-3" style={{color:'#198754'}}>University (Only if you are over 18 years)</span>
                          </label></div>
                          <div className="col-12 text-center">
                  
                      <div className="my-4">
                      <Link variant="" className="btnregistration fs-6 py-2 px-4" style={{textDecoration: "none"}}>
                        Next
                      </Link>
                        {/* <Link to="/WouldYouLikeTo" className="btn btn-custom">Next</Link> */}
                        </div>
                    </div>
                    </form>
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ShareRide;