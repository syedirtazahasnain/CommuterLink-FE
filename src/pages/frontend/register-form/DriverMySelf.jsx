import React from 'react'
import { useState } from "react";
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

const DriverMySelf = () => {
  return (
    <div>
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
              Driver's Registration Form
            </h1>{" "}
            <Form >
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>
                    Car Brand
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }} 
                  >
                     <option value="0">
          Car Brand
        </option>
                    
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
                    placeholder="Car Model"
                    defaultValue=""
                  />
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
                  >
                  <option value="0">Manufacturing Year</option>
                    <option value="1">1999</option>
                    <option value="2">2000</option>
                    <option value="3">2001</option>
                    <option value="3">2002</option>
                    <option value="3">2003</option>
                    <option value="3">2004</option>
                    <option value="3">2005</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    Registration Year
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                  <option value="0">Registration Year</option>
                    <option value="1">1999</option>
                    <option value="2">2000</option>
                    <option value="3">2001</option>
                    <option value="3">2002</option>
                    <option value="3">2003</option>
                    <option value="3">2004</option>
                    <option value="3">2005</option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>
                    Registeration Number
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Registeration Number"
                    defaultValue=""
                  />
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    My Car has AC
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                          <option  value="0">
          AC
        </option>
        <option  value="1">
        Yes
        </option>                <option  value="2">
          No
        </option>

                    
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formFile" as={Col} md="12" className="mb-3">
      <Form.Label style={{ color: "#198754" }}>Upload Car Image with visible number plate</Form.Label>
      <Form.Control type="file" />
      
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
                  >
                  <option value="0">Seats Available</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                    <option value="3">7</option>
                    
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    Seats Available for (Male, Female, Both)
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                  <option value="0">Seats Available</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                    <option value="3">6</option>
                    
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
                  >
                  <option value="0">I also accept mid-route partner</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                  
                    
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label style={{ color: "#198754" }}>
                    I also accept one-side route partner
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                  <option value="0">I also accept one-side route partner</option>
                    <option value="1">Yes</option>
                    <option value="2">No</option>
                   
                    
                  </Form.Select>
                </Form.Group>
              </Row>
<div className="row">
    <div className="col">
    <div className="container text-center d-flex justify-content-center   pt-3">
        <div className="btn btnDriver btn-toogle pt-2 mx-2 py-2" data-toggle="buttons">
            I Driver MySelf
          </div>
          <div className="btn btnDriver btn-toogle pt-2 mx-2 py-2" data-toggle="buttons">
            My Driver Drives
          </div>
          <div className="btn btnDriver btn-toogle pt-2 mx-2 py-2" data-toggle="buttons">
            Both
          </div>
     </div>
    </div>
</div>
            <Stack direction="row" className="mb-4"  spacing={2} style={{justifyContent:'right'}}>
      <Button variant="" className="btnregistration">Previous</Button>
      <Button variant="" className="btnregistration">Next</Button> </Stack>
              
            </Form>
           
          </div>
        </div>
      </div>
    </div>
    <Footer/>

    </div>
  )
}

export default DriverMySelf