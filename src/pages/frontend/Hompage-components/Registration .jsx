import React from "react";
import { useState } from "react";
import { Placeholder } from "react-bootstrap";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
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
                    <option>Province</option>
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
                    <option>Choose City</option>
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
                    Starting Point
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                    <option>Drop off</option>
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
                    <option>Choose City</option>
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
                    Timings (+/- 15 Minutes)
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                    <option>Timing</option>
                    <option value="">Home to Office</option>
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
                    Select Timing
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                    <option>Home to office</option>

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
                </Form.Group>
                {["checkbox"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Monday"
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
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
                      className="mt-2"
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
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                  <Form.Label style={{ color: "#198754" }}>Gender</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ color: "#198754" }}
                  >
                    <option>Gender</option>
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
                    <option>Prefer</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Others</option>
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
                        label="Basic date picker"
                        sx={{ width: "100%" }}
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
                    <option>Martial Status</option>
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
                    <option>Education</option>
                    <option value="1">Phd</option>
                    <option value="2">Master</option>
                    <option value="3">Bachelor</option>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
