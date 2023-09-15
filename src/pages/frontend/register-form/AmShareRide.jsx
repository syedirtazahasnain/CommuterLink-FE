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

const AmShareRide = () => {

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
          className="mt-5 main-bg"
        >
          <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex fixed "
                style={{
                  marginTop: "20vh",
                }}
              >

                <Carousel
                  className="carousel-container main-bg"
                  prevIcon={null}
                  nextIcon={null}
                  indicators={null}
                >
                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Share Actual Cost</h4>
                  </Carousel.Item>

                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-3.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Offer Your Car or Get a Seat in Other's Car</h4>
                  </Carousel.Item>
                  <Carousel.Item interval={4000}>
                    <img
                      className="d-block img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-4.png`}
                      alt="First slide"
                    />
                    <h4 className="text-success fw-bold text-center mt-2">Share Ride For School University</h4>
                  </Carousel.Item>
                  <Carousel.Item interval={4000}>
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
                        <h4 className="text-black text-left fw-bolder mb-3">I am a:</h4>
                        <div className="text-left"> <label className="radio-button ">
                          <input type="radio" id="option1" name="option" value="office" />
                          <span className="ml-3 text-black fw-bold">Parent</span><br />
                          <p className="ml-4 px-2" style={{ color: '#198754' }}>Registering for my children's commute
                            to School/University</p>
                        </label></div>

                        <div className="text-left"> <label class="radio-button">
                          <input type="radio" id="option2" name="option" value="University" />
                          <span className="ml-3 text-black fw-bold">Student</span><br />
                          <p className="ml-4 px-2" style={{ color: '#198754' }}>I'm above 18 years and registering at my own</p>
                        </label></div>
                        <h4 className="text-left text-black fw-bolder py-4 text-custom" style={{ color: '#198754' }}>Would you like to:</h4>
                        <div className="text-left"> <label className="radio-button ">
                          <input type="radio" id="option1" name="option" value="office" />
                          <span className="ml-3 text-black fw-bold">Ride in other's car</span><br />
                          <p className="ml-4 px-2" style={{ color: '#198754' }}>CommutersLink will match you with car owners offering available seats based upon Gender, Route and
                            Timings on cost sharing basis</p>

                        </label></div>

                        <div className="text-left"> <label class="radio-button">
                          <input type="radio" id="option2" name="option" value="University" />
                          <span className="ml-3 text-black fw-bold" style={{ color: '#198754' }}>Use your car and offer available seats</span><br />
                          <p className="ml-4 px-2" style={{ color: '#198754' }}>CommutersLink will match you with members looking to share ride with car owners offering available seats based upon Gender, Route and
                            Timings on cost sharing basis</p>
                        </label></div>
                        <div className="col-12 text-center">

                          <div className="my-4">
                            <Link variant="" className="btnregistration fs-6 py-2 px-4" style={{ textDecoration: "none" }}>
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

export default AmShareRide;