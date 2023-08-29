import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { resetsignupState } from "../../../redux/signupSlice";
import { resetloginState } from "../../../redux/loginSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";


const Verification = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const name = useSelector((s) => s.signup.data.name);
  const email = useSelector((s) => s.signup.data.email);
  const [verificationName, setVerificationName] = useState("");
  const [image, setImage] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");
  const imageURL = "https://staging.commuterslink.com/uploads/picture/";

  const route = () => {
    dispatch(resetsignupState());
    dispatch(resetloginState());
    navigate("/");
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/profile",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if (jsonresponse) {
        setVerificationName(jsonresponse[0].name);
        setVerificationEmail(jsonresponse[0].email);
        setImage(jsonresponse[0].contact.commuter_image);
      }
      else {
        setVerificationName("");
        setVerificationEmail("");
        setImage("");
      }
      console.log("Verification Page Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
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
              className="col-md-6 d-flex fixed"
              style={{
                marginTop: "20vh"
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


            <div className="col-lg-5 col-md-4 col-sm-4 pt-5 ">
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
                        className="card-body cardpadding mb-5 py-5 rounded rounded-4"
                        style={{ background: "rgb(22,70,57)" }}
                      >
                        <div>
                          <div>
                            {" "}
                            <img
                              src={`${imageURL}${image}`}
                              alt="Sample photo"
                              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '60%' }}
                            />
                          </div>
                          <div className="text-white">{name ? name : verificationName}<br />{email ? email : verificationEmail}</div>
                          <h5 className="card-title mt-4" style={{ color: "yellow" }}>
                            Pending Verificaiton
                          </h5>
                        </div>
                        <div>
                          <p className="text-white text-justify">
                            Thank you for providing all the information. Your membership
                            approval will be notified through email and your mobile
                            number after which, you will be able to access your
                            dashboard and available choices to commute with
                          </p>
                        </div>

                        <form id="numberForm">
                          <div className="mb-3">

                            <Button variant="success" className="btn-sm" onClick={route}>
                              Close
                            </Button>
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
      </section>
    </div>
  );
};

export default Verification;