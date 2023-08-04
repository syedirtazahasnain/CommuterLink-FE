import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import img from "../../../Images/contribute-1.jpg";
import { useSelector } from "react-redux";
function NumberGenerate() {
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const navigate = useNavigate();
  const [ phoneNumber , setPhoneNumber ] =  useState()
  const store_signup = useSelector((s)=> s.signup.data);
  // const store_login = useSelector((s)=> s.login.data);
  
  const submitForm = async() =>{
    try {
      const body = {
        mobile: phoneNumber,
        email : store_signup.email,
      };
  //  return console.log( store_signup.email);
  // return console.log(store_login);
  
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/mobilew",
        // "http://127.0.0.1:8000/api/v1/mobilew",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const jsonresponse = await response.json();
       
      if (jsonresponse.status_code == 200) {
        console.log(jsonresponse);
        navigate("/nested");
      } else {
        alert("Error: " + jsonresponse.message);
      }
    } catch (error) {
      console.log(error.message);
    } 
  }
  const validatePhoneNumber = (phoneNumber) => {
    // Regular expression pattern for validating Pakistan phone numbers (must start with "03" and have 11 digits)
    const phonePattern = /^03\d{10}$/;
    if (phonePattern.test(phoneNumber)) {
      setPhoneNumber(phoneNumber);
      setIsValidPhoneNumber(true);
    } else {
      setIsValidPhoneNumber(false);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="row pt-5 pb-4 justify-content-center mt-5 ">
          <div className="col-lg-4 ">
            {/* <img src={img} className='w-100 rounded-top'  alt="Sample photo"/> */}
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
                      <Form.Label className="d-flex justify-content-left mb-3 ">
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
      <Footer />
    </div>
  );
}

export default NumberGenerate;
