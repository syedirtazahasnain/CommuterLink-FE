import React from 'react'
import { BASE_URL } from "../../../constants";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Button } from '@mui/base';

const Office_School = () => {

  const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    // backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100',
    height: '20vh'
  };

  const name = useSelector((s) => s.login.data.name);
  const email = useSelector((s) => s.login.data.email);
  const navigate = useNavigate();

   const schoolRoute = () => {
    navigate("/school-form");
   };

   const officeRoute = () => {
    navigate("/nested");
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

              <div className="col-md-6 text-center d-flex justify-content-center">

                <div className="container">
                  <div className="row justify-content-center pt-8">
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
                                  <div className="text-white">{name}<br />{email}</div>
                                  <h5 className="card-title mt-4 text-success" style={{ color: "yellow" }}>
                                    Full Name
                                  </h5>
                                  {name ?
                                    (<p>{name}</p>)
                                    :
                                    (<></>)
                                  }
                                </div>
                                <div>
                                  <h5 className="text-success mt-3">I want to share ride for</h5>
                                  <Button variant="success" className="btn-lg btn-success mt-3" onClick={officeRoute}>Office</Button>
                                </div>
                                <p className="mt-3">Or</p>
                                <Button variant="success" className="btn-lg btn-success mb-1" onClick={schoolRoute}>School/University</Button>
                                <form id="numberForm">
                                  <div className="mb-3">
                                    <div>
                                      <p className="py-3 text-success">On long term basis</p>
                                    </div>
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
      </div>
    </div>
  )
}

export default Office_School;