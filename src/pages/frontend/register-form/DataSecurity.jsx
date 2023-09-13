import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL } from "../../../constants";
import { Button } from "@mui/base";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { useSelector } from "react-redux";

const DataSecurity = () => {

  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [contactId, setContactId] = useState("");
  const [price, setPrice] = useState("");
  const [option, setOption] = useState("");

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
      <section id="sign-up" class="mt-5 main-bg">
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
              {/* </div> */}
            </div>
            <div className="col-md-6 pt-5" style={{marginTop: "6vh", marginBottom: "9vh"}}>
              <div
                className="container py-3"
              >
               <div className="card p-3 bg-white border border-2 shadow"><div className="mt-3" >
                  <div
                    className="text-center"
                    // style={{ background: "rgb(22,70,57)" }}
                  >
                    <div>
                      <div>
                        {" "}
                        <img
                          src={`${BASE_URL}/assets/images/data_security_icon.png`}
                          alt="Sample photo"
                          style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '60%' }}
                        />
                           <h3 className="card-title py-2 text-center fw-bold text-success" >
                            DATA SECURITY
                          </h3>
                      </div>
                    </div>
                    <div className="text-white p-4 ">
                      <p className="text-black text-justify fs-5 ">
                       CommutersLink has established strict security policies across our processes,
                       systems, resources and offices that ensure your data is 100% secure.
                      </p>
                    </div>
                   
                    <form id="numberForm">
                      <div className="mb-5">
                        <button  className="btnregistration px-4 fs-6 py-2">
                          Next
                        </button>
                      </div>
                    </form>
                  </div>
                </div></div>
                
              </div>
            </div>




            {/* <div className="col-md-6 pt-5" style={{marginTop: "6vh", marginBottom: "9vh"}}>
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
                        your per seat per day cost is <strong>Rs.{price}/</strong> on const sharing basis.
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
              </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DataSecurity;