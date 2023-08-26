import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/base";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/generalSlice";

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
        <h3 className="card p-4 text-success my-2 fw-bold">Contact Us</h3>
        <h5 className="card p-4 text-success my-2 fw-bold">
          At CommutersLink, we are always available to address your queries and
          would love to hear your suggestions or feedback if any. Feel free to
          connect with us
        </h5>
      </div>
      <div className="card p-4">
        <div className="card" style={{ backgroundColor: "#e5f8f3" }}>
          <div className="card-body">
            <h1 className="text-center text-success">Contact Us</h1>

            <div className="row text-left">
              <div
                className="col-md-12  p-5 mb-3 sha m-auto"
                style={{ backgroundColor: "#e5f8f3" }}
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
                <div className="d-flex justify-content-center mt-4">
                  <Button className="btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3">
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
