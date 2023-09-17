import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
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

const PaymentOptions = ({ children }) => {
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
        <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-success my-2 fw-bold m-0"> MIN. PAYMENT DUE: RS 5,310/- </h3>
            <Link
              to={'/dashboard'} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card p-4  p-2">
        <h5 className="pb-2 text-success">(15 Days Advance Rs 354/-)&nbsp (Commuter Charges + 2.5% Service Charges)</h5>
        <div className="card bg-light">
          <div className="card-body text-dark">
            <p >
              Money will stay in your Wallet & will be transferred to car owner
              on weekly basis after you have availed the services
            </p>
              <h5 className="container text-white headerColor py-3 text-success text-center fw-bold">
                PAYMENT OPTIONS{" "}
              </h5>
            <div className="page-title">
              <div className="p-2 text-success text-center my-2 fw-bold">
                <div className="container text-center p-2">
                 <div className="row">
                 <div className="col-12 mb-2  border border-success rounded rounded-3 bg-light">
                    <div className="font-custom">
                    <button className="btn font-custom text-success fw-bold fs-5 lh-1">
                    <span className="font-custom">
                    <i className="fa-solid fa-building-columns fs-4 text-success mx-2"></i></span>
                 <span className="font-custom">ONLINE BANK TRANSFER</span>   
                  </button>
                        </div>
                    </div>
                    <div className="col-12 border advancecolor border-success rounded rounded-3 bg-light">
                    <div>
                    <button className="btn btncol advancecolor text-success fw-bold fs-5 lh-1">
                    <span>
                        {/* <img
                              src={`${BASE_URL}/assets/images/jazz.png`}
                              className="card-img-top w-40px m-auto mx-4"
                            /> */}
                            <i className="fa-solid fa-credit-card text-success mx-2 fs-4"></i>
                            </span>
                    CREDIT/DEBIT CARD
                  </button>
                        </div>
                    </div>

                 </div>
                </div>
                
              </div>
            </div>
          </div>
<div className="row">
    <div className="col justify-content-center d-flex justify-content-center mb-3 p-2">
    <img className="mx-2" src={`${BASE_URL}/assets/images/ep.png`}></img>
    <img className="mx-2" src={`${BASE_URL}/assets/images/jazz.png`}></img>
    <img className="mx-2" src={`${BASE_URL}/assets/images/raast.png`}></img>
    <img className="mx-2" src={`${BASE_URL}/assets/images/iban.png`}></img>
    </div>
    
</div>
          
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;
