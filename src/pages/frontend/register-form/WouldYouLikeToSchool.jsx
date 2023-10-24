import React, { useState } from 'react'
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

const WouldYouLikeToSchool = () => {

  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const route = () => {

    if (selectedOption === "school-form") {
      navigate("/school-form");
    }

    if (selectedOption === "school-driver-form") {
      navigate("/school-driver-form");
    }
  };

  return (
    <div>
      <div>
        <section
          id="sign-up"
          className="mt-5 main-bg"
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
                  <Carousel.Item interval={2001}>
                    <img
                      className="Carousel_image img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup.png`}
                      alt="First slide"
                    />
                  </Carousel.Item>

                  <Carousel.Item interval={4000}>
                    <img
                      className="Carousel_image img-fluid w-auto"
                      src={`${BASE_URL}/assets/images/signup-3.png`}
                      alt="second slide"
                    />
                  </Carousel.Item>

                  <Carousel.Item interval={2003}>
                    <img
                      className="Carousel_image img-fluid  w-auto"
                      src={`${BASE_URL}/assets/images/signup-4.png`}
                      alt="third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={2004}>
                    <img
                      className="Carousel_image img-fluid  w-auto"
                      src={`${BASE_URL}/assets/images/signup-6.png`}
                      alt="Fourth slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </div>



              <div className="col-md-6   mb-2 text-center d-flex justify-content-center">
                <Card
                  sx={{
                    marginTop: "10vh",
                    maxWidth: "800px",
                  }}
                >

                  <CardContent>
                    <Typography>
                      <form id="regForm" className="multipstepform p-4 mt-3 mb-3">
                        <h3 className="text-center text-custom mb-3" style={{ color: '#198754' }}>Would you like to</h3>
                        <div className="text-left"> </div>

                        <div className="text-left"> <div>
                          <label className="radio-button ">
                            <input type="radio" id="option1" name="option" value="school-form" checked={selectedOption === 'school-form'} onChange={handleOptionChange} />
                            <span className="ml-3"><strong>Ride in other’s car</strong> </span>

                          </label></div>
                          <span className="text-green" style={{ color: '#198754', fontSize: '12px' }}>CommutersLink will match you with car owners offering available seats based upon Gender, Route and Timings on cost sharing basis</span>
                          <div className="mt-1"> &nbsp;
                          </div></div>
                        <div className="text-left"><div>
                          <label className="radio-button ">
                            <input type="radio" id="option2" name="option" value="school-driver-form" checked={selectedOption === 'school-driver-form'} onChange={handleOptionChange} />
                            <span className="ml-3"><strong>Use your car and offer available seats</strong></span>
                          </label>
                        </div>

                          <span className="text-green" style={{ color: '#198754', fontSize: '12px' }}>CommutersLink will match you with members looking to share ride with car owners offering available seats based upon Gender, Route and Timings on cost sharing basis</span>
                          <div className="mt-1"> &nbsp;
                          </div>
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

export default WouldYouLikeToSchool;