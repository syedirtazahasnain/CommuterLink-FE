import React, { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { BASE_URL } from "../../../constants";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/base';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOptionState } from '../../../redux/generalSlice';

const WouldYouLikeTo = () => {

  const [selectedOption, setSelectedOption] = useState('');
  const requestedOption = useSelector((s) => s.general.data.selectedOption);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };
 

  const route = () => {

    if (selectedOption === "rider-registration" || requestedOption === "rider-registration") {
      dispatch(setSelectedOptionState(selectedOption));
      navigate("/rider-registration");
    }

    if (selectedOption === "driver-registration" || requestedOption === "driver-registration") {
      dispatch(setSelectedOptionState(selectedOption));
      navigate("/driver-registration");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div>
      <div>
        <section
          id="sign-up"
          className="mt-5 main-bg"
          style={{height:'90vh'}}
        >
          <div className="container">
            <div className="row">
              <div
                className="col-md-6 fixed"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "12vh",

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
                    <h4 className="text-success fw-bold text-center mt-2">Share Ride for School University</h4>
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



              <div className="col-md-6   mb-2 text-center d-flex justify-content-center">
                <Card
                  sx={{
                    marginTop: "10vh",
                    maxWidth: "800px",
                    // marginLeft: "5px",
                  }}
                >

                  <CardContent>
                    <Typography>
                      <form id="regForm" className="multipstepform p-4 mt-3 mb-3">
                        <h3 className="text-center text-custom fw-bold mb-3" style={{ color: '#198754' }}>Would you like to</h3>
                        <div className="text-left"> </div>

                        <div className="text-left"> <div>
                          <label className="radio-button ">
                            <input type="radio" id="option1" name="option" value="rider-registration" checked={requestedOption === 'rider-registration' ? requestedOption === 'rider-registration' : selectedOption === 'rider-registration'} onChange={handleOptionChange} />
                            <span className="ml-3"><strong>Look for a Car</strong> </span>
                          </label>
                        </div>
                          <span className="text-green" style={{ color: '#198754', fontSize: '12px' }}>CommutersLink will match you with car owners offering available seats based upon Gender, Route and Timings on cost sharing basis</span>
                          <div className="mt-1"> &nbsp;
                          </div>
                        </div>
                        <div className="text-left"><div>
                          <label className="radio-button ">
                            <input type="radio" id="option2" name="option" value="driver-registration" checked={requestedOption === 'driver-registration' ? requestedOption === 'driver-registration' : selectedOption === 'driver-registration'} onChange={handleOptionChange} />
                            <span className="ml-3"><strong>Offer your Car</strong></span>
                          </label>
                        </div>
                          <span className="text-green" style={{ color: '#198754', fontSize: '12px' }}>CommutersLink will match you with members looking to share ride with car owners offering available seats based upon Gender, Route and Timings on cost sharing basis</span>
                          <div className="mt-1"> &nbsp;
                          </div>
                        </div>
                        <div
                          className="alert alert-info alert-dismissible fade show"
                          role="alert"
                        >
                          {" "}
                          <h6 className="text-left d-flex">
                            {" "}
                            <i className="fa-solid fa-sticky-note  text-warning"></i>
                            <li style={{ listStyle: "none" }}>
                              {" "}
                              Coming Soon - Where you will have both options to
                              offer your car and look for a car simultaneously
                            </li>
                          </h6>
                          <button
                            type=""
                            class="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                          ></button>
                        </div>

                        <div className="col-12 text-center">
                          {/* onClick={() => setModalShow(true)} */}

                          <Button className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold" onClick={route}>
                            Next
                          </Button>
                        
                        </div>
                      </form>
                    </Typography>
                  </CardContent>

                  <CardActions className="row">

                  </CardActions>
                  <Typography sx={{ fontSize: "14px" }}>
                    {" "}

                  </Typography>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default WouldYouLikeTo;