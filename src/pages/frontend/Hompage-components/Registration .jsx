import React from "react";
import { useState } from "react";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import mySlides1 from "../../../Images/signup.png";
import mySlides2 from "../../../Images/signup-3.png";
import mySlides3 from "../../../Images/signup-4.png";
import mySlides4 from "../../../Images/signup-6.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const Registration = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  return (
    <>
    <Navbar/>
     <div  style={{ backgroundColor: "#eee" }}>
      <div className="containter">
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
              Registration
            </h1>{" "}
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>
                    Starting Point
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }} 
                  >
                     <option value="0">
          Province
        </option>
                    
                    <option value="1">Punjab</option>
                    <option value="2">Sindh</option>
                    <option value="3">KPK</option>
                    <option value="3">Balochistan</option>
                    <option value="3">AJK</option>
                    <option value="3">Gilgit Baltistan</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    Select City
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                         <option value="">
          Choose City
        </option>
                    <option value="1">Punjab</option>
                    <option value="2">Sindh</option>
                    <option value="3">KPK</option>
                    <option value="3">Balochistan</option>
                    <option value="3">AJK</option>
                    <option value="3">Gilgit Baltistan</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>
                    Drop Off
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                  <option value="0">Province</option>
                    <option value="1">Punjab</option>
                    <option value="2">Sindh</option>
                    <option value="3">KPK</option>
                    <option value="3">Balochistan</option>
                    <option value="3">AJK</option>
                    <option value="3">Gilgit Baltistan</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    Select City
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                    <option value="0">Choose City</option>
                    <option value="1">AJK</option>
                    <option value="2">Balochistan</option>
                    <option value="3">Gilgit Baltistan</option>
                    <option value="3">KPK</option>
                    <option value="3">Punjab</option>
                    <option value="3">Sindh</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>
                    Timings (+/- 15 Minutes)
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                          <option value="0">
          Home to Office
        </option>
                    
                    <option value="9:00 AM">00:00 AM</option>
                    <option value="10:00 AM">00:15 AM</option>
                    <option value="11:00 AM">00:30 AM</option>
                    <option value="12:00 PM">00:45 AM</option>
                    <option value="1:00 PM">01:00 AM</option>
                    <option value="2:00 PM">01:15 AM</option>
                    <option value="3:00 PM">01:30 AM</option>
                    <option value="4:00 PM">01:45 AM</option>
                    <option value="5:00 PM">02:00 AM</option>
                    <option value="6:00 PM">02:30 AM</option>
                    <option value="6:00 PM">02:45 AM</option>
                    <option value="6:00 PM">03:00 AM</option>
                    <option value="6:00 PM">03:15 AM</option>
                    <option value="6:00 PM">03:30 AM</option>
                    <option value="6:00 PM">03:45 AM</option>
                    <option value="6:00 PM">04:00 AM</option>
                    <option value="6:00 PM">04:15 AM</option>
                    <option value="6:00 PM">04:30 AM</option>
                    <option value="6:00 PM">04:45 AM</option>
                    <option value="6:00 PM">05:00 AM</option>
                    <option value="6:00 PM">05:15 AM</option>
                    <option value="6:00 PM">05:30 AM</option>
                    <option value="6:00 PM">05:45 AM</option>
                    <option value="6:00 PM">06:00 AM</option>
                    <option value="6:00 PM">06:15 AM</option>
                    <option value="6:00 PM">06:30 AM</option>
                    <option value="6:00 PM">06:45 AM</option>
                    <option value="6:00 PM">07:00 AM</option>
                    <option value="6:00 PM">07:15 AM</option>
                    <option value="6:00 PM">07:30 AM</option>
                    <option value="6:00 PM">07:45 AM</option>
                    <option value="6:00 PM">08:00 AM</option>
                    <option value="6:00 PM">08:15 AM</option>
                    <option value="6:00 PM">08:30 AM</option>
                    <option value="6:00 PM">08:45 AM</option>
                    <option value="6:00 PM">09:00 AM</option>
                    <option value="6:00 PM">09:15 AM</option>
                    <option value="6:00 PM">09:30 AM</option>
                    <option value="6:00 PM">09:45 AM</option>
                    <option value="6:00 PM">10:00 AM</option>
                    <option value="6:00 PM">10:15 AM</option>
                    <option value="6:00 PM">10:30 AM</option>
                    <option value="6:00 PM">10:45 AM</option>
                    <option value="6:00 PM">11:00 AM</option>
                    <option value="6:00 PM">11:15 AM</option>
                    <option value="6:00 PM">11:30 AM</option>
                    <option value="6:00 PM">11:45 AM</option>
                    <option value="6:00 PM">12:00 PM</option>
                    <option value="6:00 PM">12:15 PM</option>
                    <option value="6:00 PM">12:30 PM</option>
                    <option value="6:00 PM">12:45 PM</option>
                    <option value="6:00 PM">01:00 PM</option>
                    <option value="2:00 PM">01:15 PM</option>
                    <option value="3:00 PM">01:30 PM</option>
                    <option value="4:00 PM">01:45 PM</option>
                    <option value="5:00 PM">02:00 PM</option>
                    <option value="6:00 PM">02:30 PM</option>
                    <option value="6:00 PM">02:45 PM</option>
                    <option value="6:00 PM">03:00 PM</option>
                    <option value="6:00 PM">03:15 PM</option>
                    <option value="6:00 PM">03:30 PM</option>
                    <option value="6:00 PM">03:45 PM</option>
                    <option value="6:00 PM">04:00 PM</option>
                    <option value="6:00 PM">04:15 PM</option>
                    <option value="6:00 PM">04:30 PM</option>
                    <option value="6:00 PM">04:45 PM</option>
                    <option value="6:00 PM">05:00 PM</option>
                    <option value="6:00 PM">05:15 PM</option>
                    <option value="6:00 PM">05:30 PM</option>
                    <option value="6:00 PM">05:45 PM</option>
                    <option value="6:00 PM">06:00 PM</option>
                    <option value="6:00 PM">06:15 PM</option>
                    <option value="6:00 PM">06:30 PM</option>
                    <option value="6:00 PM">06:45 PM</option>
                    <option value="6:00 PM">07:00 PM</option>
                    <option value="6:00 PM">07:15 PM</option>
                    <option value="6:00 PM">07:30 PM</option>
                    <option value="6:00 PM">07:45 PM</option>
                    <option value="6:00 PM">08:00 PM</option>
                    <option value="6:00 PM">08:15 PM</option>
                    <option value="6:00 PM">08:30 PM</option>
                    <option value="6:00 PM">08:45 PM</option>
                    <option value="6:00 PM">09:00 PM</option>
                    <option value="6:00 PM">09:15 PM</option>
                    <option value="6:00 PM">09:30 PM</option>
                    <option value="6:00 PM">09:45 PM</option>
                    <option value="6:00 PM">10:00 PM</option>
                    <option value="6:00 PM">10:15 PM</option>
                    <option value="6:00 PM">10:30 PM</option>
                    <option value="6:00 PM">10:45 PM</option>
                    <option value="6:00 PM">11:00 PM</option>
                    <option value="6:00 PM">11:15 PM</option>
                    <option value="6:00 PM">11:30 PM</option>
                    <option value="6:00 PM">11:45 PM</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    Drop-off Time
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                          <option  value="0">
          Office to Home
        </option>

                    <option value="9:00 AM">00:00 AM</option>
                    <option value="10:00 AM">00:15 AM</option>
                    <option value="11:00 AM">00:30 AM</option>
                    <option value="12:00 PM">00:45 AM</option>
                    <option value="1:00 PM">01:00 AM</option>
                    <option value="2:00 PM">01:15 AM</option>
                    <option value="3:00 PM">01:30 AM</option>
                    <option value="4:00 PM">01:45 AM</option>
                    <option value="5:00 PM">02:00 AM</option>
                    <option value="6:00 PM">02:30 AM</option>
                    <option value="6:00 PM">02:45 AM</option>
                    <option value="6:00 PM">03:00 AM</option>
                    <option value="6:00 PM">03:15 AM</option>
                    <option value="6:00 PM">03:30 AM</option>
                    <option value="6:00 PM">03:45 AM</option>
                    <option value="6:00 PM">04:00 AM</option>
                    <option value="6:00 PM">04:15 AM</option>
                    <option value="6:00 PM">04:30 AM</option>
                    <option value="6:00 PM">04:45 AM</option>
                    <option value="6:00 PM">05:00 AM</option>
                    <option value="6:00 PM">05:15 AM</option>
                    <option value="6:00 PM">05:30 AM</option>
                    <option value="6:00 PM">05:45 AM</option>
                    <option value="6:00 PM">06:00 AM</option>
                    <option value="6:00 PM">06:15 AM</option>
                    <option value="6:00 PM">06:30 AM</option>
                    <option value="6:00 PM">06:45 AM</option>
                    <option value="6:00 PM">07:00 AM</option>
                    <option value="6:00 PM">07:15 AM</option>
                    <option value="6:00 PM">07:30 AM</option>
                    <option value="6:00 PM">07:45 AM</option>
                    <option value="6:00 PM">08:00 AM</option>
                    <option value="6:00 PM">08:15 AM</option>
                    <option value="6:00 PM">08:30 AM</option>
                    <option value="6:00 PM">08:45 AM</option>
                    <option value="6:00 PM">09:00 AM</option>
                    <option value="6:00 PM">09:15 AM</option>
                    <option value="6:00 PM">09:30 AM</option>
                    <option value="6:00 PM">09:45 AM</option>
                    <option value="6:00 PM">10:00 AM</option>
                    <option value="6:00 PM">10:15 AM</option>
                    <option value="6:00 PM">10:30 AM</option>
                    <option value="6:00 PM">10:45 AM</option>
                    <option value="6:00 PM">11:00 AM</option>
                    <option value="6:00 PM">11:15 AM</option>
                    <option value="6:00 PM">11:30 AM</option>
                    <option value="6:00 PM">11:45 AM</option>
                    <option value="6:00 PM">12:00 PM</option>
                    <option value="6:00 PM">12:15 PM</option>
                    <option value="6:00 PM">12:30 PM</option>
                    <option value="6:00 PM">12:45 PM</option>
                    <option value="6:00 PM">01:00 PM</option>
                    <option value="2:00 PM">01:15 PM</option>
                    <option value="3:00 PM">01:30 PM</option>
                    <option value="4:00 PM">01:45 PM</option>
                    <option value="5:00 PM">02:00 PM</option>
                    <option value="6:00 PM">02:30 PM</option>
                    <option value="6:00 PM">02:45 PM</option>
                    <option value="6:00 PM">03:00 PM</option>
                    <option value="6:00 PM">03:15 PM</option>
                    <option value="6:00 PM">03:30 PM</option>
                    <option value="6:00 PM">03:45 PM</option>
                    <option value="6:00 PM">04:00 PM</option>
                    <option value="6:00 PM">04:15 PM</option>
                    <option value="6:00 PM">04:30 PM</option>
                    <option value="6:00 PM">04:45 PM</option>
                    <option value="6:00 PM">05:00 PM</option>
                    <option value="6:00 PM">05:15 PM</option>
                    <option value="6:00 PM">05:30 PM</option>
                    <option value="6:00 PM">05:45 PM</option>
                    <option value="6:00 PM">06:00 PM</option>
                    <option value="6:00 PM">06:15 PM</option>
                    <option value="6:00 PM">06:30 PM</option>
                    <option value="6:00 PM">06:45 PM</option>
                    <option value="6:00 PM">07:00 PM</option>
                    <option value="6:00 PM">07:15 PM</option>
                    <option value="6:00 PM">07:30 PM</option>
                    <option value="6:00 PM">07:45 PM</option>
                    <option value="6:00 PM">08:00 PM</option>
                    <option value="6:00 PM">08:15 PM</option>
                    <option value="6:00 PM">08:30 PM</option>
                    <option value="6:00 PM">08:45 PM</option>
                    <option value="6:00 PM">09:00 PM</option>
                    <option value="6:00 PM">09:15 PM</option>
                    <option value="6:00 PM">09:30 PM</option>
                    <option value="6:00 PM">09:45 PM</option>
                    <option value="6:00 PM">10:00 PM</option>
                    <option value="6:00 PM">10:15 PM</option>
                    <option value="6:00 PM">10:30 PM</option>
                    <option value="6:00 PM">10:45 PM</option>
                    <option value="6:00 PM">11:00 PM</option>
                    <option value="6:00 PM">11:15 PM</option>
                    <option value="6:00 PM">11:30 PM</option>
                    <option value="6:00 PM">11:45 PM</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>
                    I commute (Select Days)
                  </Form.Label>
                </Form.Group><div className="row d-flex mt-2">
                  <div className="col-md-6 col-sm-4">
                  {["checkbox"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3 d-flex">
                    <Form.Check
                      inline
                      label="Monday"
                      name="group1"
                      type={type}
                      id={`inline-${type}-0`}
                    />
                    <Form.Check
                      inline
                      label="Tuesday"
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                    <Form.Check
                      inline
                      label="Wednesday"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      inline
                      label="Thursday"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      inline
                      label="Friday"
                      type={type}
                      
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      inline
                      label="Saturday"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      inline
                      label="Sunday"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                  </div>
                ))}
                  </div>
                </div>
               
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>Gender</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                    <option value="0">Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    Preferred Gender
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                    
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Both</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>
                    Year of Birth
                  </Form.Label>
                  <LocalizationProvider dateAdapter={AdapterDayjs} sx="w">
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="MM/DD/YY"
                        sx={{ width: "100%" }}
                        size={''}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    Martial Status
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                    <option value="">Martial Status</option>
                    <option value="1">Married</option>
                    <option value="2">Single</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>
                    Education
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                    <option value="0">Education</option>
                    <option value="1">Phd</option>
                    <option value="2">Master</option>
                    <option value="3">Bachelor</option>
                    <option value="4">BA</option>
                    <option value="5">BSC</option>
                    <option value="6">FSC</option>
                    <option value="7">FA</option>
                    <option value="8">I.Com</option>
                    <option value="9">Matric</option>
                    <option value="10">Middle</option>
                    <option value="11">Primary</option>

                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    Profession
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Profession (Engineer, Doctor, etc)"
                    defaultValue=""
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="12" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>CNIC</Form.Label>

                  <Form.Control
                    required
                    type="number"
                    placeholder="xxxxxxxxxxxxx"
                    defaultValue=""
                    maxLength={13}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                

                  <Form.Group controlId="formFile" as={Col} md="6" className="mb-3">
        <Form.Label style={{ color: "#198754" }}> Upload CNIC (Front)</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group controlId="formFile" as={Col} md="6" className="mb-3">
        <Form.Label style={{ color: "#198754" }}> Upload CNIC (back)</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
              </Row>

              <Row className="mb-3">
                

       
    <Form.Group controlId="formFile" as={Col} md="12" className="mb-3">
      <Form.Label style={{ color: "#198754" }}>Upload your picture</Form.Label>
      <Form.Control type="file" />
      <Form.Text className="" style={{ color: "#198754" }}>
      The picture will only be shown to members with whom you agree to commute
        </Form.Text>
    </Form.Group>
    
            </Row>
            <Stack direction="row" className="mb-4"  spacing={2} style={{justifyContent:'right'}}>
      <Button variant="" className="btnregistration">Previous</Button>
      <Button variant="" className="btnregistration">Next</Button> </Stack>
              
            </Form>
             {/* <div className="row">
                          <div className="col-lg-6 col-md-4">
                            <Box
                              component="form"
                              sx={{
                                "& .MuiTextField-root": { m: 1, width: "50ch" },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <div>
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label="Multiline"
                                  multiline
                                  maxRows={12}
                                />
                                
                             
                              </div>
                             
                          
                            </Box>
                          </div>
                          <div className="col-lg-6 col-md-4">
                            <Box
                              component="form"
                              sx={{
                                "& .MuiTextField-root": { m: 1, width: "50ch" },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <div>
                                <TextField
                                  id="outlined-multiline-flexible"
                                  label=""
                                  multiline
                                  maxRows={12}
                                />
                                
                             
                              </div>
                             
                          
                            </Box>
                          </div>
                        
                        </div> */}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
   
  );
};

export default Registration;
