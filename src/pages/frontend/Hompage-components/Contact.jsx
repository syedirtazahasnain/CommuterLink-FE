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
import { Link } from "react-router-dom";


const Contact = () => {
  return (
    <div>
      <section id="contact" className="contact section-bg">
        <div className="container">
          <div className="section-title text-center">
            <h2 className="text-dark">Contact Us</h2>
            <p className="fs-5">
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
                <div className="col-md-6">
                  {" "}
                  <TextField
                    className="mb-3"
                    id="outlined-basic"
                    label="Your Name"
                    variant="outlined"
                    sx={{ width: '100%' }}
                    size="small"
                  />
                </div>
                <div className="col-md-6 mb-2">
                  {" "}
                  <TextField
                    className="mb-3"
                    id="formBasicPassword"
                    label="Email"
                    variant="outlined"
                    type="email"
                    required
                    sx={{ width: '100%' }}
                    size="small"
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    className="mb-3"
                    id="formBasicPassword"
                    label="Subject"
                    variant="outlined"
                    type="text"
                    required
                    sx={{ width: '100%' }}
                    size="small"
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    className="mb-3"
                    id="exampleFormControlTextarea1"
                    label="Message"
                    multiline
                    rows={10}
                    variant="outlined"
                    sx={{ width: '100%' }}
                  />
                </div>
              </div>
            </form>
            <div className="d-flex justify-content-center">
              <button
                className="btn-custom px-4 py-2 rounded rounded-5 text-custom fw-bold"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
