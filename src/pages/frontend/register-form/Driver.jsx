import React from "react";
import { useState } from "react";
import { BASE_URL } from "../../../constants";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {useForm} from 'react-hook-form';
const Driver = () => {
  const{register,formState:{errors}}= useForm();
  const navigate = useNavigate();
  const [showmyself, setshowmyself] = useState(false);
  const [showmydriver, setshowmydriver] = useState(false);
  const [showboth, setshowboth]=useState(false);
  const [carModel, setCarModel] = useState('');
  const [isValidCarModel, setIsValidCarModel] = useState(true);
  const [registerationNumber, setRegisterationNumber] = useState('');
  const [isValidRegisterationNumber, setIsValidRegisterationNumber] = useState(true);
  const [bankAccount, setBankAccount] = useState('');
  const [isValidBankAccount, setIsValidBankAccount] = useState(true);
  const [drivingLicense, setDrivingLicense] = useState('');
  const [isValidDrivingLicense, setIsValidDrivingLicense] = useState(true);
  const [dateExpiry, setDateExpiry] = useState('');
  const [isValidDateExpiry, setIsValidDateExpiry] = useState(true);
  const [name, setName]=useState('');
  const[isValidName, setIsValidName] = useState(true);
  const [cnic, setCnic] = useState('');
  const [isValidCnic, setIsValidCnic] = useState(true);
  const goBack = () => {
    navigate("/registration");
  }
  function validateCarModel(carModel) {
    // A simple regular expression to match alphabetic characters and spaces
    const carModelPattern = /^[A-Za-z\s]+$/;
  
    return carModelPattern.test(carModel);
  }
  const handleCarModelChange = (e) => {
    const newModel = e.target.value;
    setCarModel(newModel);
    setIsValidCarModel(validateCarModel(newModel));
  };
  function validateRegisterationNumber(registerationNumber) {
    // A simple regular expression to match alphabetic characters and spaces
    const registerationNumberPattern = /^[A-Za-z0-9]{1,7}$/;
  
    return registerationNumberPattern.test(registerationNumber);
  }
  const handleRegisterationNumberChange = (e) => {
    const newRegisterationNumber = e.target.value;
    setRegisterationNumber(newRegisterationNumber);
    setIsValidRegisterationNumber(validateRegisterationNumber(newRegisterationNumber));
  };
  function validateBankAccount(bankAccount) {
    // A simple regular expression to match alphabetic characters and spaces
    const bankAccountPattern = /^[A-Za-z0-9]{1,26}$/;
  
    return bankAccountPattern.test(bankAccount);
  }
  const handleBankAccountChange = (e) => {
    const newBankAccount = e.target.value;
    setBankAccount(newBankAccount);
    setIsValidBankAccount(validateBankAccount(newBankAccount));
  };
  function validateDrivingLicense(drivingLicense) {
    // A simple regular expression to match alphabetic characters and spaces
    const drivingLicensePattern = /^[A-Za-z0-9-]{1,20}$/;
  
    return drivingLicensePattern.test(drivingLicense);
  }
  const handleDrivingLicenseChange = (e) => {
    const newDrivingLicense = e.target.value;
    setDrivingLicense(newDrivingLicense);
    setIsValidDrivingLicense(validateDrivingLicense(newDrivingLicense));
  };

  function validateDateExpiry(dateExpiry) {
    // A simple regular expression to match alphabetic characters and spaces
    const dateExpiryPattern = /^(0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])[-/](19|20)\d\d$/;
  
    return dateExpiryPattern.test(dateExpiry);
  }
  const handleDateExpiryChange = (e) => {
    const newDateExpiry = e.target.value;
    setDateExpiry(newDateExpiry);
    setIsValidDateExpiry(validateDateExpiry(newDateExpiry));
  };
  function validateCnic(cnic) {
    // Regular expression pattern for validating Pakistani CNIC (12345-1234567-1)
    const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
  
    return cnicPattern.test(cnic);
  }
  const handleCnicChange = (event) => {
    const inputCnic = event.target.value.replace(/\D/g, '');

    if (inputCnic.length <= 13) {
      const formattedCnic = inputCnic.replace(
        /^(\d{5})(\d{7})(\d{1})$/,
        '$1-$2-$3'
      );
      setCnic(formattedCnic);
      setIsValidCnic(validateCnic(formattedCnic));
    } else {
      setIsValidCnic(false);
    }
  };
  function validateName(name) {
    // A simple regular expression to match alphabetic characters and spaces
    const namePattern = /^(0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])[-/](19|20)\d\d$/;
  
    return namePattern.test(name);
  }
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setIsValidName(validateName(newName));
  };
  return (
    <div>
      <Navbar />
      <div style={{ backgroundColor: "#eee" }}>
        <div className="containter p-5">
          <div className="row justify-content-center">
            <div className="col-md-8 bg-white  mt-5 mb-5">
              <h1
                className="text-center mb-4"
                style={{
                  color: "#198754",
                  marginBottom: "5vh",
                  marginTop: "5vh",
                }}
              >
                {" "}
                Driver's Registration Form
              </h1>{" "}
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Car Brand
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>Car Brand</option>

                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="3">4</option>
                      <option value="3">5</option>
                      <option value="3">6</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Model Name
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      className= {`colorplace ${isValidCarModel ? '' : 'is-invalid'}`}
                      placeholder="Car Model"
                      value={carModel}
                      onChange={handleCarModelChange}
                    />
                     {!isValidCarModel && (
          <div className="invalid-feedback">
            Please enter a valid Car Model.
          </div>
        )}
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Manufacturing Year
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>Manufacturing Year</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Registration Year
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>Registration Year</option>
                      <option value="1999">1999</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-0">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Registeration Number
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      className= {`colorplace ${isValidRegisterationNumber ? '' : 'is-invalid'}`}
                      placeholder="Registeration Number"
                      value={registerationNumber}
                      onChange={handleRegisterationNumberChange}
                    />
                                 {!isValidRegisterationNumber && (
          <div className="invalid-feedback">
            Please enter a valid Car Registeration No.
          </div>
        )}
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      My Car has AC
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>AC</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    controlId="formFile"
                    as={Col}
                    md="12"
                    className="mb-3"
                  >
                    <Form.Label className="mt-3" style={{ color: "#198754" }}>
                      Upload Car Image with visible number plate
                    </Form.Label>
                    <Form.Control type="file" required />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      Seats Available
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>Seats Available</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      Seats Available for (Male, Female, Both)
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>Seats Available</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="6">5</option>
                      <option value="6">6</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label style={{ color: "#198754" }}>
                      I also accept mid-route partner
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>I also accept mid-route partner</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label style={{ color: "#198754" }}>
                      I also accept one-side route partner
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ color: "#198754" }}
                      required
                    >
                      <option value="" hidden>
                        I also accept one-side route partner
                      </option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <div className="tab">
                    <div className="container">
                      <div className="row justify-content-center mt-5">
                        <div className="col-lg-12">
                          <div className="card text-center" >
                            <div className="card-body">
                              <h5 className="card-title">Bank/Payment Details</h5>
                              <p className="small-text text-center">Please provide details to receive payment through Bank Account, Jazz Cash, EasyPaisa or Raast ID. Atleast one field must be filled. </p>
                                <div class="container">
                                <img src={`${BASE_URL}/assets/images/iban.png`} alt=""/> <img src={`${BASE_URL}/assets/images/ep.png`} alt=""/> <img src={`${BASE_URL}/assets/images/jazz.png`} alt=""/> <img src={`${BASE_URL}/assets/images/raast.png`} alt=""/>
                                </div>
                                <form id="paymentForm">
                                <div className="mt-4">
                                  {/* <input type="text" className="form-control mb-2" id="bankAccount" 
                                  name="bankAccount" placeholder="Bank Account (IBAN)"
                                  />      */}
                                           <Form><Row>
                                           <Form.Group as={Col} md="12" className="mb-3" controlId="bankAccount" id="bankAccount">
                    {/* <Form.Label style={{ color: "#198754" }}>
                      Bank Account (IBAN)
                    </Form.Label> */}
                    <Form.Control
                      required
                      type="text"
                      className= {` ${isValidBankAccount ? '' : 'is-invalid'}`}
                      placeholder="BankAccount"
                      value={bankAccount}
                      onChange={handleBankAccountChange}
                    />
                            {!isValidBankAccount && (
          <div className="invalid-feedback">
            Please enter a valid Account or IBAN Number.
          </div>
        )}
                                            
                                    </Form.Group>        </Row></Form>      
                                </div>
                                <div>
                                  <input type="text"  className="form-control mb-2" id="jazzCashAccount" name="jazzCashAccount" placeholder="Jazz Cash Account Number" required=""/>
                                </div>
                                <div>
                                  <input type="text" className="form-control mb-2" id="easypaisaAccount" name="easypaisaAccount" placeholder="EasyPaisa Account Number" required=""/>
                                </div>
                                <div>
                                  <input type="text" className="form-control mb-2" id="raastID" name="raastID" placeholder="Raast ID"/>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>    
                  </div>
                <div className="row">
                  <div className="col">
                    <div className="container text-center d-flex justify-content-center pt-2 flex-wrap">
                      <Button
                        variant="outlined"
                        className={`btn ${showmyself === true ? "btnDriver" : "btnWhite" }  btn-toogle pt-2 mx-2 mt-3`}
                        onClick={() => {
                          setshowmyself(true);
                          setshowmydriver(false);
                          setshowboth(false);
                        }}
                        data-toggle="buttons"
                      >
                        I Driver MySelf
                      </Button>
                      <Button
                        variant="outlined"
                        className={`btn ${showmydriver === true ? "btnDriver" : "btnWhite" }  btn-toogle pt-2 mx-2 mt-3`}
                        onClick={() => {
                          setshowmyself(false);
                          setshowmydriver(true);
                          setshowboth(false);
                        }}
                        data-toggle="buttons"
                      >
                        My Driver Drives
                      </Button>
                      <Button
                        variant="outlined"
                        className={`btn ${showboth === true ? "btnDriver" : "btnWhite" }  btn-toogle pt-2 mx-2 mt-3`}
                        onClick={() => {
                          setshowmydriver(false);
                          setshowmyself(false);
                          setshowboth(true);
                        }}
                        data-toggle="buttons"
                      >
                        Both
                      </Button>
                    </div>
                  </div>
                </div>

                {showmyself && (
                  <>
                    <Row className="mb-3 mt-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Driving Licence No.
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className={`colorplace ${isValidDrivingLicense ? '' : 'is-invalid'}`}
                          placeholder="License No."
                                   value={drivingLicense}
                      onChange={handleDrivingLicenseChange}

                        />
                     
                    
                     {!isValidDrivingLicense && (
          <div className="invalid-feedback">
            Please enter a valid License.
          </div>)}
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Valid Upto
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Here"
                          
                          className={`colorplace ${isValidDrivingLicense ? '' : 'is-invalid'}`}
                          value={dateExpiry}
                      onChange={handleDateExpiryChange}
                        />
                                  {!isValidDateExpiry && (
          <div className="invalid-feedback">
            Please enter a valid MM/DD/YYYY or MM-DD-YYYY date.
          </div>)}
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload License (front)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom02"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload License (back)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                    </Row>
                  </>
                )}

                {showmydriver && (
                  <>
                    <Row className="mb-3 mt-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Name
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className={`colorplace ${isValidName ? '' : 'is-invalid'}`}
                          value={name}
                      onChange={handleNameChange}
                        />
                          
                      
                                  {!isValidName && (
          <div className="invalid-feedback">
            Please enter a full Name
          </div>)}
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          CNIC
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          
                      
                          className={`colorplace ${isValidCnic ? '' : 'is-invalid'}`}
            placeholder="12345-1234567-1"
            value={cnic}
            onChange={handleCnicChange}
          />
          {!isValidCnic && (
            <div className="invalid-feedback">
              Please enter a valid CNIC in the format 12345-1234567-1.
            </div>
          )}
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload CNIC (front)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom02"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload CNIC (back)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Driving Licence No.
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className={`colorplace ${isValidDrivingLicense ? '' : 'is-invalid'}`}
                          placeholder="License No."
                                   value={drivingLicense}
                      onChange={handleDrivingLicenseChange}
                        />
                                  {!isValidDrivingLicense && (
          <div className="invalid-feedback">
            Please enter a valid License.
          </div>)}
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Valid Upto
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Here"
                          className={`colorplace ${isValidDrivingLicense ? '' : 'is-invalid'}`}
                          value={dateExpiry}
                      onChange={handleDateExpiryChange}
                        />
                                                 {!isValidDateExpiry && (
          <div className="invalid-feedback">
            Please enter a valid MM/DD/YYYY or MM-DD-YYYY date.
          </div>)}
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload License (front)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom02"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload License (back)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                    </Row>
                  </>
                )}
                {showboth && (<>
                    <Row className="mb-3 mt-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Name
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                         
                      
                                   className={`colorplace ${isValidName ? '' : 'is-invalid'}`}
                          value={name}
                      onChange={handleNameChange}
                        />
                          
                      
                                  {!isValidName && (
          <div className="invalid-feedback">
            Please enter a full Name
          </div>)}
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          CNIC
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
        className={`colorplace ${isValidCnic ? '' : 'is-invalid'}`}
            placeholder="12345-1234567-1"
            value={cnic}
            onChange={handleCnicChange}
          />
          {!isValidCnic && (
            <div className="invalid-feedback">
              Please enter a valid CNIC in the format 12345-1234567-1.
            </div>
          )}
                      </Form.Group>
                    </Row>

                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload CNIC (front)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom02"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload CNIC (back)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Driving Licence No.
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className={`colorplace ${isValidDrivingLicense ? '' : 'is-invalid'}`}
                          placeholder="License No."
                                   value={drivingLicense}
                      onChange={handleDrivingLicenseChange}
                        />
                                                 {!isValidDrivingLicense && (
          <div className="invalid-feedback">
            Please enter a valid License.
          </div>)}
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="12"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Valid Upto
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          className={`colorplace ${isValidDrivingLicense ? '' : 'is-invalid'}`}
                          value={dateExpiry}
                      onChange={handleDateExpiryChange}
                        />
                                                                 {!isValidDateExpiry && (
          <div className="invalid-feedback">
            Please enter a valid MM/DD/YYYY or MM-DD-YYYY date.
          </div>)}
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom01"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload License (front)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationCustom02"
                      >
                        <Form.Label style={{ color: "#198754" }}>
                          Upload License (back)
                        </Form.Label>
                        <Form.Control type="file" required />
                      </Form.Group>
                    </Row>

                </>)
                }
                <Stack
                  direction="row"
                  className="mb-4 mt-3"
                  spacing={2}
                  style={{ justifyContent: "right" }}
                >
                  <Button variant="" className="btnregistration" onClick={goBack}>
                    Previous
                  </Button>
                  <Button variant="" className="btnregistration">
                    Submit
                  </Button>
                </Stack>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Driver;
