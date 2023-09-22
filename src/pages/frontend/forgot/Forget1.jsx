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
import { displayNotification } from "../../../helpers";


const Forget1 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userToken = useSelector((s) => s.login.data.token);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);

    useEffect(() => {
        if (userToken) {
            navigate("/forget-password");
        }
    }, [userToken]);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

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

    const sendRequest = async () => {
        if (email === "") {
            displayNotification("warning", `Please Enter your Email`);
        }
        else {
            const body = {
                email: email,
            }
            console.log("sendRequest Body:", body);

            const response = await fetch(
                `${API_URL}/api/v1/forgot`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }

            const jsonresponse = await response.json();
            console.log("API Response", jsonresponse);

            if (jsonresponse.statusCode === 200) {
                dispatch(setloginState(jsonresponse.token));
            }
            else {
                displayNotification("error", `Email does not exist`);
            }
            // else if (jsonresponse.statusCode === 422) {
            //     // console.log("hi");
            //     // return;
            //     const errors = jsonresponse.errors;
            //     for (const field of Object.keys(errors)) {
            //         displayNotification("error", `${errors[field][0]}`);
            //     }
            // }          
        }
    };

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
                                        <h2
                                            className="text-custom px-4 mt-2  mb-2"
                                            style={{
                                                color: "#198754",
                                                marginBottom: "5px",
                                                marginTop: "",
                                            }}
                                        >
                                            {" "}
                                            Forgot <br /> <span>Password?</span>
                                        </h2>{" "}
                                        <h4 className=" text-custom px-4 mb-2 mt-1">Enter the email address <br /> <span>associated with your account.</span></h4>
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
                                                    <TextField
                                                        id="outlined-adornment-password"
                                                        type="email"
                                                        // value={email}
                                                        onChange={(e) => validateEmail(e.target.value)}
                                                        // required
                                                        error={!isValidEmail}
                                                        helperText={!isValidEmail && "Please enter a valid email"}
                                                        size='small'
                                                        sx={{ width: '100%' }}
                                                        label="Enter email address"
                                                    />
                                                </FormControl>
                                            </Form.Group>
                                            <Button
                                                className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white mt-4 fw-bold"
                                                onClick={sendRequest}
                                            >
                                                Send
                                            </Button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Forget1;
