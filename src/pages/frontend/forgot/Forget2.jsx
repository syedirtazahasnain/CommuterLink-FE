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


const Forget2 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userToken = useSelector((s) => s.login.data.token);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isValidPassword, setIsValidPassword] = useState(true);
    const [oTP, setOTP] = useState(null);
    const [isValidConfirmPassword, setisValidConfirmPassword] = useState(true);


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [navigate]);

    const validatePassword = (password) => {
        // Regular expression pattern for validating passwords
        const passwordPattern =
            /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (password === "" || passwordPattern.test(password)) {
            setPassword(password);
            setIsValidPassword(true);
        } else {
            setPassword(password);
            setIsValidPassword(false);
        }
    };

    const checkconfirmPassword = (cpassword) => {
        if (password === cpassword) {
            setConfirmPassword(cpassword);
            setisValidConfirmPassword(true);
        } else {
            setConfirmPassword(cpassword);
            setisValidConfirmPassword(false);
        }
    };

    const sendRequest = async () => {
        // try {
            if (password === "" || confirmPassword === "") {
                displayNotification("warning", "Please Fill All Fields");
            }
            else if (password !== confirmPassword) {
                displayNotification("error", "Confirm password is not matched with new password");
            }
            else {
                const body = {
                    token: userToken,
                    otp: oTP,
                    password: password,
                    confirm_password: confirmPassword
                }
                console.log("sendRequest Body:", body);

                const response = await fetch(
                    `${API_URL}/api/v1/forgot-password`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            'Accept': 'application/json',
                        },
                        body: JSON.stringify(body),
                    }
                );

                // if (!response.ok) {
                //     throw new Error(`Request failed with status: ${response.status}`);
                // }

                const jsonresponse = await response.json();
                console.log("API Response", jsonresponse);

                if (jsonresponse.statusCode === 200) {
                    dispatch(setloginState(""));
                    displayNotification("success", `${jsonresponse.message}`);
                    navigate("/login");
                }else if(jsonresponse.statusCode === 422){
                    // Email validation error
                    const errorMessage = jsonresponse.errors.otp[0];
                    displayNotification("error", errorMessage);
                }
                else{
                    displayNotification("error", "An error occured while sending the request.");
                }
            }
        // } catch (error) {
        //     console.error("An error occurred:", error);
        //     displayNotification("error", "An error occured while sending the request.");
        // }
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
                            <div className="col-md-5 mb-5 py-2" style={{
                                marginTop: "10vh"
                            }}>

                                <div
                                    className="card text-center"
                                    style={{ borderRadius: "10px" }}
                                >
                                    <div
                                        className="card-body"
                                        style={{ borderRadius: "10px" }}
                                    >
                                        <h2
                                            className="text-custom  mt-2  mb-2"
                                            style={{
                                                color: "#198754",
                                                marginBottom: "5px",
                                                marginTop: "",
                                            }}
                                        >
                                            Forgot{" "}
                                            <span>Password</span>
                                        </h2>{" "}
                                        <h5 className=" text-custom  mb-2">Enter Valid OTP </h5>
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
                                                        fullWidth
                                                        className="bg-light"
                                                        variant="outlined"
                                                        type="number"
                                                        label="otp"
                                                        value={oTP}
                                                        onChange={(e) => setOTP(e.target.value)}
                                                        // required
                                                        size="small"
                                                    />
                                                </FormControl>
                                            </Form.Group>
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
                                                        fullWidth
                                                        className="bg-light"
                                                        variant="outlined"
                                                        type="password"
                                                        label="Password"
                                                        value={password}
                                                        onChange={(e) => validatePassword(e.target.value)}
                                                        // required
                                                        size="small"
                                                        error={!isValidPassword}
                                                        helperText={
                                                            !isValidPassword &&
                                                            "Password must have at least 8 characters with mix of letters numbers special characters"
                                                        }
                                                    />
                                                </FormControl>
                                            </Form.Group>

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
                                                        fullWidth
                                                        className="bg-light"
                                                        variant="outlined"
                                                        type="password"
                                                        label="Confirm Password"
                                                        value={confirmPassword}
                                                        onChange={(e) => checkconfirmPassword(e.target.value)}
                                                        // required
                                                        size="small"
                                                        error={!isValidConfirmPassword}
                                                        helperText={
                                                            !isValidConfirmPassword &&
                                                            "Both passwords must be the same"
                                                        }
                                                    />
                                                </FormControl>
                                            </Form.Group>
                                            <Button
                                                className="btn-custom1 mx-2 border-0 px-4 py-2 rounded rounded-2 text-white mt-4 fw-bold"
                                                onClick={sendRequest}
                                            >
                                                Submit
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

export default Forget2;
