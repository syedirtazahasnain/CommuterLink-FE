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
          className="mt-5"
          style={{ backgroundColor: "#eee" }}
        >
        <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex"
                style={{
                  marginTop: "12vh",
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
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-3.png`}
                        alt="second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-4.png`}
                        alt="third slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-6.png`}
                        alt="forth slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>
               
              

              <div className="col-md-6   mb-2 text-center d-flex justify-content-center">
                <Card
                  sx={{
                    marginTop: "10vh",
                    maxWidth: "600px",
                    marginLeft: "5px",
                  }}
                >
          
                  <CardContent>
                    <Typography>
                    <form id="regForm" className="multipstepform p-4 mt-3 mb-3">
                        <h3 className="text-center text-custom mb-3" style={{color:'#198754'}}>I want to share ride for:</h3>
                      <div className="text-left"> <label className="radio-button ">
                            <input type="radio" id="option1"name="option" value="office"/>
                            <span className="ml-3"style={{color:'#198754'}}>Office</span>
                          </label></div>
                       
                          <div className="text-left"> <label class="radio-button">
                            <input type="radio" id="option2" name="option" value="University"/>
                            <span className="ml-3" style={{color:'#198754'}}>University (Only if you are over 18 years)</span>
                          </label></div>
                          <div className="col-12 text-center">
                      {/* onClick={() => setModalShow(true)} */}

                      {/* <Button
                        variant="outlined"
                        type="submit"
                        // onClick={validateOTP}
                        className="btn btn-outline-custom"
                      >
                         <Link to="/Office">Next</Link>
                      </Button> */}
                      <div className="mt-4"><Link to="/WouldYouLikeTo" className="btn btn-outline-custom">Next</Link></div>
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

export default ShareRide;