import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
//import img from "../../../Images/contribute-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";

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
        "https://staging.commuterslink.com/api/v1/mobilew",
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
          "https://staging.commuterslink.com/api/v1/auth",
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
          alert("Error: " + jsonresponse.message);
        }
      } else {
        alert("Error: " + jsonresponse.message);
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
      <div className="container py-5">
        <div className="row pt-5 pb-4 justify-content-center mt-5 ">
          <div className="col-lg-4 col-md-4 col-sm-4">
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
      </div>
    </div>
  );
}

export default NumberGenerate;
