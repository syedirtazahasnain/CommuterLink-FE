import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { BASE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
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

const DriverWhyProcess = () => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/advancepayment");
    }
  };

  useEffect(() => {
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  return (
    <div>
      <div className="card bg-medium-teal p-2 px-4 text-success my-2 fw-bold d-flex">
      <div className="d-flex justify-content-between align-items-xl-baseline">
        <h3 className="text-dark-green my-2 fw-bold m-0">
        WHY PROCESS PAYMENT THROUGH COMMUTERSLINK
        </h3>
        <Link
              to={"/request-commuter-profile"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link></div></div>

      <div
        className="card p-4 bg-light p-2"
        
      >
        <div className="card bg-light">
        

          <div
       
            
          >
            <div className="card-body">
              <p>
                1. Commuters link keeps a month's advance and your money is
                secure and will be paid transferrred to you wallet on daily
                basis.
              </p>
              <p className="">
                2. No bargaining involved. Commuterslink works out per day cost
                based upon a fixed rationalized formula. If the petrol prices go up or down
                the same will be adjusted
              </p>

              <p>
                3. No dispute on cost, payments, number of days the services were
                utilized etc.
              </p>
              <p>
                4. If you stop provision of car seat to a partner for a reason
                or other with 1 week, your payment is secure.
              </p>
              <p>
                5. CommutersLink verifies all the data of its member and ensures
                your safety and security
              </p>
              <p>
                6. By receiving money through CommutersLink you remain an active
                member and have access to other options to find travel.
              </p>
              <p>
                7. Last but not the least it is the most respectable way of
                receiving money as you do not have to ask your travel buddy to pay.
              </p>
            
            </div>
            <div className="text-center">
              <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3" onClick={route}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverWhyProcess;
