import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/base";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";
import { setloginState } from "../../../redux/loginSlice";
import { setsignupState } from "../../../redux/signupSlice";
import { setSelectedOptionState } from "../../../redux/generalSlice";


const Verification = () => {
 const navigate =useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const name = useSelector((s) => s.signup.data.name);
  const email = useSelector((s) => s.signup.data.email);
  const [verificationName, setVerificationName] = useState("");
  const [image, setImage] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");

  const route = () => {
    dispatch(setloginState(""));
    dispatch(setsignupState(""));
    dispatch(setSelectedOptionState(""));
    window.location.href = "/";
  };

  useEffect(() => {
    getProfileData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  const getProfileData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/profile`,
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
      <section id="sign-up" class="mt-5 main-bg">
        <div className="container">
          {" "}
          <div className="row">
            <div
              className="col-md-6 d-flex fixed"
              style={{
                marginTop: "18vh"
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
              <div className="container py-3">
                <div className="card p-3 bg-white" >
                <div className="mt-3">
                          <div className="text-center">
                            {" "}
                            <img
                              src={image?`${IMAGE_URL}${image}`: `${BASE_URL}/assets/images/CL-logo-small.png` }
                              alt="photo"
                              style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
                            />
                          </div>
                          <div className="text-dark text-center mt-2">{name ? name : verificationName}<br />{email ? email : verificationEmail}</div>
                          <h3 className="card-title mt-4 mb-3 text-center text-success" >
                            Pending Verification
                          </h3>
                        </div>
                        <div>
                          <p className="text-dark text-justify  p-4">
                            Thank you for providing all the information. Your membership
                            approval will be notified through email and your mobile
                            number. After which, you will be able to access your
                            dashboard and available choices to commute with.
                          </p>
                        </div>

                        <div className="text-center mb-3">
                        <Button variant="" className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white fw-bold" onClick={route}>
                        Close
                      </Button>
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