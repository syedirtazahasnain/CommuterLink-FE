import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ff4815",
      contrastText: "white",
    },
  },
});

const backgroundLogo = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
};

const ConfirmYourRide = ({ children }) => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const sidebarOpened = useSelector((s) => s.general.sidebarOpened);
  const currentPage = useSelector((s) => s.general.currentPage);
  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };
  useEffect(() => {
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);
  const logout = () => {
    dispatch(setloginState(""));
    navigate("/login");
  };

  return (
    <div>
           <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
        CONFIRM YOUR RIDE      
        </h3>
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card bg-danger">
        <div className="card-body text-white">
              <h3>Select Dates you have travelled and press confirm</h3>
              <p className="">
                The following dates have been submitted to your travel buddy fro reconfiirmation
              </p>
              <p>
                2. CNIC front side image is not clear
              </p>
              <p>
                3. CNIC is expired
              </p>
              <p>
                4. Registration number is not clear in image of the car.
              </p>
              <div className="text-warning py-4">
                <h5>
                    Note: The above mentioned changes are necessary and  you can also
                    update any other data.
                </h5>
            </div>
             
            </div>
           
          <div className="text-center">
            <button
              to="/"
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmYourRide;
