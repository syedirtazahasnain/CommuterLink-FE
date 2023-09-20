import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { API_URL, BASE_URL } from "../../../constants";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useGoogleLogin } from "@react-oauth/google";
import { Checkbox, FormControlLabel, InputLabel, OutlinedInput, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import Box from '@mui/material/Box';
import { FormControl } from "@mui/material";


const Forget1 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);





    // const handleLogin = async () => {
    //     if (email === "" || password === "") {
    //         Swal.fire({
    //             position: 'top',
    //             // // icon: 'warning',
    //             text: 'Please Fill All Fields',
    //             customClass: {
    //                 confirmButton: "swal-custom",

    //             },

    //         }
    //         )
    //     }
    //     else {
    //         await postData();
    //     }
    // };

    // const postData = async () => {
    //     try {
    //         if (termsService) {
    //             const body = {
    //                 email: email,

    //             };
    //             const response = await fetch(
    //                 `${API_URL}/api/v1/auth`,
    //                 {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         'Accept': 'application/json',
    //                     },
    //                     body: JSON.stringify(body),
    //                 }
    //             );
    //             const jsonresponse = await response.json();
    //             //console.log(jsonresponse);

    //             if (jsonresponse.statusCode === 200) {
    //                 dispatch(setloginState(jsonresponse.access_token));
    //             } else {
    //                 console.log(jsonresponse);
    //                 // alert("Error: " + jsonresponse.message);
    //                 Swal.fire({
    //                     position: 'top',
    //                     // // icon: 'error',
    //                     text: `${jsonresponse.message}`,
    //                     customClass: {
    //                         confirmButton: 'swal-custom',
    //                     },
    //                 }
    //                 )
    //             }
    //         }

    //         else {
    //             Swal.fire({
    //                 position: 'top',
    //                 // // icon: 'warning',
    //                 text: 'Please Check Terms of Services',
    //                 customClass: {
    //                     confirmButton: 'swal-custom',
    //                 },
    //             }
    //             )
    //         }

    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };
    // const validateEmail = (email) => {
    //     // Regular expression pattern for validating email addresses
    //     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     if (emailPattern.test(email)) {
    //         setEmail(email);
    //         setIsValidEmail(true);
    //     } else {
    //         setIsValidEmail(false);
    //     }
    // };

    // const handleSuccess = async (response) => {
    //     try {
    //         if (response && response.access_token) {
    //             const profile = await fetch(
    //                 "https://www.googleapis.com/oauth2/v3/userinfo",
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${response.access_token}`,
    //                     },
    //                     method: "get",
    //                 }
    //             );

    //             if (profile.ok) {
    //                 const userObject = await profile.json();
    //                 const body = {
    //                     email: userObject.email,
    //                     provider: "google",
    //                 };

    //                 const res = await fetch(
    //                     `${API_URL}/api/v1/auth`,
    //                     {
    //                         method: "POST",
    //                         headers: {
    //                             "Content-Type": "application/json",
    //                         },
    //                         body: JSON.stringify(body),
    //                     }
    //                 );

    //                 const jsonresponse = await res.json();

    //                 if (jsonresponse.statusCode === 200) {
    //                     dispatch(setloginState(jsonresponse.access_token));
    //                     navigate("/number-generate");
    //                 } else {
    //                     // alert("Error: " + jsonresponse.message);
    //                     Swal.fire({
    //                         position: 'top',
    //                         // // icon: 'error',
    //                         text: `${jsonresponse.message}`,
    //                         customClass: {
    //                             confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
    //                         },
    //                     }
    //                     )

    //                 }
    //             } else {
    //                 console.error("Profile request failed with status:", profile.status);
    //             }
    //         }
    //     } catch (error) {
    //         console.error("Error:", error.message);
    //     }
    // };

    return (
        <div>
            <div>
                <section id="sign-up" className="mt-5" style={{ backgroundColor: "#eee" }}>
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
                            <div className="col-md-5 mb-5 px-4 py-2" style={{
                                marginTop: "10vh"
                            }}>

                                <div
                                    className="card text-center "
                                    style={{ borderRadius: "10px" }}
                                >
                                    <div
                                        className="card-body"
                                        style={{ borderRadius: "10px" }}
                                    >
                                        <h1
                                            className="text-custom px-4 mt-2  mb-2"
                                            style={{
                                                color: "#198754",
                                                marginBottom: "5px",
                                                marginTop: "",
                                            }}
                                        >
                                            {" "}
                                            Forgot <br /> <span>Password?</span>
                                        </h1>{" "}
                                        <h3 className=" text-custom px-4 mb-2">Enter the email address <br /> <span>associated with your account.</span></h3>
                                        <Form className="text-center">
                                            <Form.Group
                                                className=" mt-4 text-center"
                                                controlId="formBasicEmail"
                                            >
                                                <FormControl
                                                    color="success"
                                                    className="bg-light"
                                                    size="small"
                                                    sx={{ width: "100%" }}
                                                    variant="outlined"
                                                >
                                                    <InputLabel htmlFor="outlined-adornment-password">
                                                       Enter email address
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="outlined-adornment-password"
                                                        type={email}
                                                
                                                        label="Enter email address"
                                                    />
                                                </FormControl>
                                            </Form.Group>


                                            <Button
                                                className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white mt-4 fw-bold"
                                            // onClick={handleLogin}
                                            >
                                                Send
                                            </Button>


                                        </Form>
                                    </div>

                                </div></div></div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Forget1;
