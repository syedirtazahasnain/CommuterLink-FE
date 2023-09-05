import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/generalSlice";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPage("contactus"));
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  return (
    <div>
      <div className="page-title">
        <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-success my-2 fw-bold m-0">Contact Us</h3>
            <Link
              to={"/dashboard"} >
              <button className="btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="page-title">
        <h5 className="card p-2 px-4 text-success">
          At CommutersLink, we are always available to address your queries and
          would love to hear your suggestions or feedback if any. Feel free to
          connect with us
        </h5>
      </div>
      <div className="card p-4">
        <div className="card backgroundColor">
          <div className="card-body">
            <h1 className="text-center text-success">Contact Us</h1>

            <div className="row text-left">
              <div
                className="col-md-12 backgroundColor  p-5  py-5 sha"
               
              >
                <form action="#" method="post">
                  <div className="row">
                    <div className="col-md-6">
                      {" "}
                      <TextField
                        className="mb-3 bg-light"
                        color="success"
                        id="outlined-basic"
                        label="Your Name"
                        variant="outlined"
                        sx={{ width: "100%" }}
                        size="small"
                      />
                    </div>
                    <div className="col-md-6 mb-2">
                      {" "}
                      <TextField
                        className="mb-3 bg-light"
                        id="formBasicPassword"
                        color="success"
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                        sx={{ width: "100%" }}
                        size="small"
                      />
                    </div>
                    <div className="col-md-12">
                      <TextField
                        className="mb-3 bg-light"
                        id="formBasicPassword"
                        color="success"
                        label="Subject"
                        variant="outlined"
                        type="text"
                        required
                        sx={{ width: "100%" }}
                        size="small"
                      />
                    </div>
                    <div className="col-md-12">
                      <TextField
                        className="mb-2 bg-light"
                        id="exampleFormControlTextarea1"
                        label="Message"
                        color="success"
                        multiline
                        rows={10}
                        variant="outlined"
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>
                </form>
                <div className="d-flex justify-content-center">
                  <Button className="btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3">
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
