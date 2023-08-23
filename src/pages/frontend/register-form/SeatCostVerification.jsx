import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { BASE_URL } from "../../../constants";
import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const SeatCostVerification = () => {

  const navigate = useNavigate();

  const onSubmit = () =>{
    navigate("/dashboard");
   };



  const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    // backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100',
    height: '20vh'
    // Set the desired height of the background area
  };
 


  return (

    <div>
      




<section id="sign-up" class="mt-5" style={{ backgroundColor: "#eee" }}>
          <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex"
                style={{
                  marginTop: "12vh"
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
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-4.png`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-6.png`}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                {/* </div> */}
              </div>
         
           
        
          <div className="col-lg-4 col-md-4 col-sm-4 py-4">
            <div
              className="card text-center border-1 border-success rounded rounded-4"
            >
            
               
                  <div className="col py-1">
                    <div style={backgroundStyle}></div>
                  </div>
          
              
                
                  <div className="col">
                    <div
                      className="card-body cardpadding my-3 py-3 rounded rounded-4"
                      style={{ background: "rgb(22,70,57)" }}
                    >
                      <div>
                        <div>
                          {" "}
                          <img
                            src={`${BASE_URL}/assets/images/signup-5.png`}
                            alt="Sample photo"
                            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '60%' }}
                          />
                        </div>
                      
                      
                      </div>
                      <div className="text-white py-4">
                        <p className="text-white text-justify">
                        According to the information you provided regarding your car and route the system has calculated
                        your per seat per day cost is Rs.170/ on const sharing basis.
                        </p>
                      </div>
                      <div className="text-white">
                        <p className="text-white text-justify">
                        The cost will be adjusted fortnightly according to changes in fuel prices.
                        </p>
                      </div>
                      <form id="numberForm">
                        <div className="mb-3">
                          <Button variant="success" className="btn-custom mx-2 text-white bg-success px-4 py-2 rounded rounded-5 text-custom fw-bold" onClick={onSubmit}>
                            Okay
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                
              
            </div>
          </div>
       
     
        </div>
      </div>
              
            
        </section>
    </div>
  );
};

export default SeatCostVerification;