import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { Input, InputLabel } from "@mui/material";
import Form from "react-bootstrap/Form";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import AccessAlarmsRoundedIcon from '@mui/icons-material/AccessAlarmsRounded';
const Contact = () => {


 
  return (
    <div>
      <section id="contact" className="contact section-bg">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="heading-color">Contact Us</h2>
            <p>
              At CommutersLink, we are always available to address your queries
              and would love to hear your suggestions or feedback if any. Feel
              free to connect with us
            </p>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row text-left">
          <div className="col-md-8 bg-light p-5 mb-3 sha m-auto">
            <form action="#" method="post">
              <div className="row">
                <div className="col-md-6 mb-2">
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="formlabel">Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your Name"
                      required=""
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6 mb-2">
                  {" "}
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="formlabel">Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="email"
                      required=""
                    />
                  </Form.Group>
                  {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group> */}
                </div>

                {/* <Button variant="primary" type="submit">
        Submit
      </Button> */}

                <div className="col-md-12">
                  <Form.Group  controlId="formBasicPassword">
                    <Form.Label className="formlabel">Subject</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Subject"
                      required=""
                    />
                  </Form.Group>
                </div>
                <div className="col-md-12">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="formlabel">Message</Form.Label>
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="10"
                    ></textarea>
                  </Form.Group>
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-center">
              <a
                href="Home.js"
                className="btn btn-outline-custom m-2 fw-bold mr-3"
              >
                Send
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
