import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Rejection = () => {
  // const route = () => {
  //   setSubmit(true);

  //   if (!submitbtn) {
  //     navigate("/commuter-profile");
  //   }
  // };

  return (
    <>
      <div style={{ backgroundColor: "#eee" }}>
        <div className="container pt-5" >
          <div className="row justify-content-center">
            <div className="col-md-7 bg-light mt-5 mb-5"  >
              <div className="row shadow 
                " style={{ backgroundColor: '#1F5F5B' }}>
                <h1 className="text-center text-white py-4">
                  Why Request has not been Approved
                </h1>
              </div>
              <div className="container py-3">
                <div className="card p-3" style={{ backgroundColor: " rgb(191, 216, 210)" }}>
                  <p>
                    Your Request has not been approved due to the following
                    reasons
                  </p>
                  <p className="text-danger">1. CNIC number is incorrect</p>
                  <p className="text-danger">
                    2. CNIC front side image is not clear
                  </p>
                  <p className="text-danger">3. CNIC is expired</p>
                  <p className="text-danger">
                    4. Registration number is not clear in image of the car.
                  </p>
                  <div className="text-warning py-4">
                    <h5>
                      Note: The above mentioned changes are necessary and you
                      can also update any other data.
                    </h5>
                    <div className="text-center">
                      <Button className="btn btn-sm fs-6 fw-bold btn-dark text-white rounded-4 px-3 py-2 mb-3">
                        Next
                      </Button>
                    </div>


                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        </div>

      </>
      );
};

      export default Rejection;