import React from 'react'
import Navbar from '../Hompage-components/Navbar';
import Footer from "../Hompage-components/Footer";
import mySlides1 from "../../../Images/signup.png";
import mySlides2 from "../../../Images/signup-3.png";
import mySlides3 from "../../../Images/signup-4.png";
import mySlides4 from "../../../Images/signup-6.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import imgfacebook from "../../../Images/facebook.png";
import imggoogle from "../../../Images/google.png";
import imgtwitter from "../../../Images/twitter.png";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {Link} from 'react-router-dom';
const WouldYouLikeTo = () => {
  return (
    <div>
      
        <div>
        <Navbar />
        
        <section
          id="sign-up"
          className="mt-5"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container">
            <div className="row">
            <div
                  className="col-md-6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10vh",
                  }}
                > <div
                className="col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "center",
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
                  <Carousel.Item interval={2001}>
                    <img
                      className="Carousel_image img-fluid w-100"
                      src={mySlides1}
                      alt="First slide"
                    />
                  </Carousel.Item>

                  <Carousel.Item interval={2000}>
                    <img
                      className="Carousel_image img-fluid w-100"
                      src={mySlides2}
                      alt="second slide"
                    />
                  </Carousel.Item>

                  <Carousel.Item interval={2003}>
                    <img
                      className="Carousel_image img-fluid  w-100"
                      src={mySlides3}
                      alt="third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={2004}>
                    <img
                      className="Carousel_image img-fluid  w-100"
                      src={mySlides4}
                      alt="Fourth slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </div></div>
               
              

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
                        <h3 className="text-center text-custom mb-3" style={{color:'#198754'}}>Would you like to</h3>
                      <div className="text-left"> </div>
                       
                          <div className="text-left"> <div><label class="radio-button ">
                             <input type="radio" id="option1" name="option" value="others_car"/>
                                <span class="ml-3"><strong>Ride in other’s car</strong> </span>
                               
                              </label></div>
                              <span className="text-green"style={{color:'#198754', fontSize:'12px'}}>CommutersLink will match you with car owners offering available seats based upon Gender, Route and Timings on cost sharing basis</span>
                              <div className="mt-1"> &nbsp;
                              </div></div>
                              <div className="text-left"><div>
                              <label className="radio-button ">
                                <input type="radio" id="option2" name="option" value="your_car"/>
                                <span className="ml-3"><strong>Use your car and offer available seats</strong></span>
                              </label>
                              </div>
                              
                              <span className="text-green" style={{color:'#198754', fontSize:'12px'}}>CommutersLink will match you with members looking to share ride with car owners offering available seats based upon Gender, Route and Timings on cost sharing basis</span>
                              <div className="mt-1"> &nbsp;
                            </div>
                              </div>
                             
                          <div className="col-12 text-center">
                      {/* onClick={() => setModalShow(true)} */}

                      <div className="mt-4"><Link to=""
                       className="btn btn-outline-custom">Next</Link></div>
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

        
        
        <Footer />
      </div>
    </div>
  )
}

export default WouldYouLikeTo;