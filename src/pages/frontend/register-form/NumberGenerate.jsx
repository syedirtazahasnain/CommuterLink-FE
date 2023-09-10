import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { API_URL, BASE_URL } from "../../../constants";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
//import img from "../../../Images/contribute-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import Swal from "sweetalert2";

function NumberGenerate() {
  const dispatch = useDispatch();
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const store_signup = useSelector((s)=> s.signup.data);
  //const store_login = useSelector((s)=> s.login.data);

  //console.log("Signup Status", store_signup);
  
  const submitForm = async() =>{
    try {
      const body = {
        mobile: phoneNumber,
        email : store_signup.email,
      };
  
      const response = await fetch(
        `${API_URL}/api/v1/mobilew`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      const jsonresponse = await response.json();
       
      if (jsonresponse.status_code == 200) {
        const body = {
          email: store_signup.email,
          provider: store_signup.provider,
        };
        const response = await fetch(
          `${API_URL}/api/v1/auth`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Accept': 'application/json',
            },
            body: JSON.stringify(body),
          }
        );
        const jsonresponse = await response.json();
        //console.log(jsonresponse);
  
        if (jsonresponse.statusCode === 200) {
          dispatch(setloginState(jsonresponse.access_token));
          navigate("/office_school");
        } else {
          console.log(jsonresponse);
          // alert("Error: " + jsonresponse.message);
          Swal.fire({
            position:'top',
            // // icon: 'error',
           text: `${jsonresponse.message}`,
           customClass: {
            confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
          },}
          )
        }
      } else {
        // alert("Error: " + jsonresponse.message);
        Swal.fire({
          position:'top',
          // icon: 'error',
        //  text: `${jsonresponse.message}`,
        text: "Number already exists",
         customClass: {
          confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
        },}
        )
      }
    } catch (error) {
      console.log(error.message);
    } 
  }
  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression pattern for validating Pakistan phone numbers (must start with "03" and have 11 digits)
    const phonePattern = /^03\d{9}$/;
    if (phoneNumber === '' || phonePattern.test(phoneNumber)) {
      setPhoneNumber(phoneNumber);
      setIsValidPhoneNumber(true);
    } else {
      setPhoneNumber(phoneNumber);
      setIsValidPhoneNumber(false);
    }
  };
  return (
    <div>
      {/* <div className="container py-5">
        <div className="row pt-5 pb-4 justify-content-center mt-5 ">
          <div className="col-lg-4 col-md-4 col-sm-4">
         
            <div
              className="card text-center border-1 border-success "
              style={{ borderRadius: "10px" }}
            >
              <div
                className="card-body cardpadding"
                style={{ background: "rgb(218,233,229)", borderRadius: "10px" }}
              >
                <h5 className="card-title mb-3">
                  Please Enter Your valid Phone No.
                </h5>
                <form id="numberForm">
                  <Row className="mb-3 mt-2 px-2">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label className="d-flex justify-content-center mb-3 ">
                        Number
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        className="colorplace mb-3"
                        placeholder="03XXXXXXXXX"
                        value={phoneNumber}
                        onChange={(e) => {
                          if (/^\d{0,11}$/.test(e.target.value)) {
                            validatePhoneNumber(e.target.value);
                          }
                        }}
                      />
                      {!isValidPhoneNumber && phoneNumber !== '' && <span> Please enter a valid phone number </span>}
                    </Form.Group>
                  </Row>
                  <div className="px-4 mb-3">
                    {" "}
                    <Button
                      variant="success"
                      className=""
                      onClick={ () => submitForm()}
                    >
                      Submit
                    </Button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}



<section id="sign-up" class="mt-5 main-bg">
          <div className="container">
            {" "}
            <div className="row">
              <div
                className="col-md-6 d-flex "
                style={{
                  marginTop: "10vh"
                }}
              >
               
                  <Carousel
                    className="carousel-container main-bg"
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
                      <h4 className="text-success fw-bold text-center mt-2">Share Actual Cost</h4>
                    </Carousel.Item>

                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-3.png`}
                        alt="First slide"
                      />
                      <h4 className="text-success fw-bold text-center mt-2">Offer Your Car or Get a Seat in Other's Car</h4>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                      <img
                        className="d-block img-fluid w-auto"
                        src={`${BASE_URL}/assets/images/signup-4.png`}
                        alt="First slide"
                      />
                      <h4 className="text-success fw-bold text-center mt-2">Share Ride for School University</h4>
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
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
         
          <div className="col-md-5 mb-5 px-4 py-5"  style={{
                  marginTop: "12vh"
                }}>
         
            <div
              className="card text-center border-1 border-success"
              style={{ borderRadius: "10px" }}
            >
              <div
                className="card-body cardpadding"
                style={{ background: "rgb(218,233,229)", borderRadius: "10px" }}
              >
                <h3 className="card-title mb-3">
                  Please Enter Your valid Phone No.
                </h3>
                <form id="numberForm">
                  <Row className="mb-3 mt-2 px-2">
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                      <Form.Label className="d-flex justify-content-center mb-3 ">
                        Number
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        className="colorplace mb-3"
                        placeholder="03XXXXXXXXX"
                        onChange = { (e) => validatePhoneNumber(e.target.value)}
                        defaultValue=""
                        maxLength={11}
                      />
                      {isValidPhoneNumber && <span> Please enter a valid phone number </span>}
                    </Form.Group>
                  </Row>
                  <div className="px-4 mb-3">
                    {" "}
                    <Button
                      variant="success"
                      className=""
                      onClick={ () => submitForm()}
                    >
                      Submit
                    </Button>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
              
            
        </section>
    </div>
  );
}

export default NumberGenerate;
