import React, { useState } from 'react'
import Navbar from '../Hompage-components/Navbar';
import Footer from "../Hompage-components/Footer";
import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import { BASE_URL } from "../../../constants";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Button } from '@mui/base';

const Office_School = () => {
  const backgroundLogo={
    backgroundImage:`url(${BASE_URL}/assets/images/CL-logo.png)`,
    backgroundRepeat:"no-repeat",
    backgroundColor:"white",
   }
   const backgroundStyle = {
      backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
        // backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width:'100',
        height:'20vh'
          // Set the desired height of the background area
    };
    
  // const [radio1, setRadio1 ] = useState("");
  // const [radio2, setRadio2] = useState("");
 
  const name = useSelector((s) => s.signup.data.name);
  const email = useSelector((s) => s.signup.data.email);
  // const navigate = useNavigate();

//  const route = () =>{

//   if(radio1){
//     navigate("/rider-registration");
//   }
    
//     if(radio2){
//       navigate("/driver-registration");
//     }
//  };

//  console.log("Selected", radio1);
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
                      src={`${BASE_URL}/assets/images/signup.png`}
                      alt="First slide"
                    />
                  </Carousel.Item>

                  <Carousel.Item interval={2000}>
                    <img
                      className="Carousel_image img-fluid w-100"
                      src={`${BASE_URL}/assets/images/signup-3.png`}
                      alt="second slide"
                    />
                  </Carousel.Item>

                  <Carousel.Item interval={2003}>
                    <img
                      className="Carousel_image img-fluid  w-100"
                      src={`${BASE_URL}/assets/images/signup-4.png`}
                      alt="third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item interval={2004}>
                    <img
                      className="Carousel_image img-fluid  w-100"
                      src={`${BASE_URL}/assets/images/signup-6.png`}
                      alt="Fourth slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </div></div>
               
              

              <div className="col-md-6   mb-2 text-center d-flex justify-content-center">
               
                <div className="container py-5 ">
        <div className="row justify-content-center pt-15 ">
          <div className="col-lg-8">
            <div
              className="card text-center border-1 border-success rounded rounded-4"
            >
              <div className="container">
                <div className="row">
                  <div className="col px-4">
                    <div style={backgroundStyle}></div>
                  </div>
                  </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div
                      className="card-body cardpadding bg-light mb-5 py-5 rounded rounded-4"
                    //   style={{ background: "rgb(22,70,57)" }}
                    >
                      <div>
                  <div>
                          {" "}
                          <img
                            src={`${BASE_URL}/assets/images/Vector.png`}
                            alt="Sample photo"
                            className="bg-success"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '60%' }}
                          />
                        </div>
                  <div className="text-white">{name}<br/>{email}</div>
                  <h5 className="card-title mt-4 text-success" style={{ color: "yellow" }}>
                    FullName
                  </h5>
                  <p>test@gmail.com</p>
                </div>
                <div>
               <h5 className="text-success">I want to share ride for</h5>
               <Button variant="success" className="btn-lg btn-success">Office</Button>
                </div>
                <p>Or</p>
<Button variant="success" className="btn-lg btn-success">School/University</Button>
                <form id="numberForm">
                  <div className="mb-3">
                    
                   
                    <div><p className="py-3 text-success">
                        On long term basis</p></div>
                  </div>
                </form>
              </div>
             
              </div>
            
                </div>
                </div>
            </div>   
            </div>
        </div>
      </div>
              </div>
            </div>
          </div>
        </section>

        
        
        <Footer />
      </div>
    </div>
  )
}

export default Office_School;