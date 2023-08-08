import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
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
import Dashboard from "./Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const userToken = useSelector((s) => s.login.data.token);

  useEffect(() => {
    if(userToken){
      navigate("/dashboard");
    }
    else{
      navigate("/login");
    }
  }, [userToken]);

  const googlesignup = useGoogleLogin({
    onSuccess: (codeResponse) => handleSuccess(codeResponse),
    onError: (codeResponse) => handleFailure(codeResponse),
  });
  const handleFailure = (response) => {
    console.log("handleFailure", response);
  };

  const handleLogin = async () => {
    await postData();
  };

  const postData = async () => {
    try {
      const body = {
        email: email,
        password: password,
      };
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const jsonresponse = await response.json();
      //console.log(jsonresponse);

      if (jsonresponse.statusCode == 200) {
        dispatch(setloginState(jsonresponse.access_token));
      } else {
        console.log(jsonresponse);
        alert("Error: " + jsonresponse.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const validateEmail = (email) => {
    // Regular expression pattern for validating email addresses
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(email)) {
      setEmail(email);
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };
  const handleSuccess = async (response) => {
    try {
      const profile = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo",

        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
          method: "get",
        }
      );
      // var userObject=jwt_decode(response.credential)
      let userObject = await profile.json();
      const body = {
        email: userObject.email,
        // provider_id : "DasD8BjWaeoVDCq4",
        provider:"google",
      };
      const res = await fetch(
        "https://staging.commuterslink.com/api/v1/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const jsonresponse = await res.json();

      if (jsonresponse.statusCode == 200) {
        navigate("/");
      } else {
        console.log(jsonresponse);
        alert("Error: " + jsonresponse.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const Size = {
    fonstSize: "14px",
    marginBottom: "8px",
    width: "350px",
    margin: "auto",
  };
  return (
    <div>
      <div>
        <Navbar />

        <section id="sign-up" class="mt-5" style={{ backgroundColor: "#eee" }}>
          <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10vh",
                }}
              >
                <div
                  className="col-md-6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5vh",
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
                        className="Carousel_image img-fluid w-100"
                        src={mySlides1}
                        alt="First slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={mySlides2}
                        alt="First slide"
                      />
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={mySlides3}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="Carousel_image img-fluid w-100"
                        src={mySlides4}
                        alt="First slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>

               
              </div>

              <div className="col-md-6 mb-2">
                <h3
                  className="text-center mb-2"
                  style={{
                    color: "#198754",
                    marginBottom: "5px",
                    marginTop: "10vh",
                  }}
                >
                  {" "}
                  Login
                </h3>{" "}
                <Form className="text-center">
                  <Form.Group
                    className="mb-1 mt-5 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="email"
                      label="Email"
                      onChange={(e) => validateEmail(e.target.value)}
                      required
                      error={!isValidEmail}
                      helperText={!isValidEmail && "Please enter a valid email"}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mt-3 text-center"
                    controlId="formBasicEmail"
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="password"
                      label="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="ml-3 mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="checkbox"
                      style={{ borderBlockColor: " #198754" }}
                      required=""
                    />
                    <label className="form-check-label" for="form2Example3">
                      <div id="span-text" className=" mr-5 small">
                        I agree with all statements in
                        <a href="#!" style={{ textDecoration: "none" }}>
                          <span
                            style={{ color: "#198754", textDecoration: "none" }}
                          >
                            Terms of service
                          </span>
                        </a>
                      </div>
                    </label>
                  </div>
                  {/* <Button className="btn  formbtn" onClick={() => postData()}> */}
                  <Button className="btn  formbtn" onClick={handleLogin}>
                    Login
                  </Button>{" "}
                  <div className="container">
                    <div className="row d-flex justify-content-center">
                      <div class="column mr-3">
                        <p class=" text-muted" id="text2">
                          Or continue with
                        </p>
                      </div>
                      <div class="column">
                        <ul
                          class="list-unstyled  d-flex "
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <li class="mr-3">
                            <a onClick={() => googlesignup()}>
                              <img
                                src={imggoogle}
                                alt=""
                                style={{ height: "25px", width: "25px" }}
                              />
                            </a>
                          </li>
                          <li class="mr-3">
                            <a href="https://www.facebook.com/Sysreforms">
                              <img
                                src={imgfacebook}
                                alt=""
                                style={{ height: "27px", width: "27px" }}
                              />
                            </a>
                          </li>
                          <li>
                            <a href="https://instagram.com/sysreforms_international?igshid=YmMyMTA2M2Y= ">
                              <img
                                src={imgtwitter}
                                alt=""
                                style={{ height: "27px", width: "27px" }}
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <hr id="hrline2" />
                    <div id="span-text" className="text-center mb-5">
                      New to CommuterLinks? &nbsp;
                      <Link to="/registration">
                        <span style={{ color: "#198754" }}>Registration</span>
                      </Link>
                    </div>
                  </div>
                </Form>
              </div>
            </div>{" "}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Login;
