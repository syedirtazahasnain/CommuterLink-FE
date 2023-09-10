import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
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

const BeforeApprovalTerms = () => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  
  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
       navigate("/whyprocesspayment1");
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
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          Terms And Conditions
        </h3>
        <h5 className="card px-4 text-success p-2">BEFORE SENDING THE REQUEST ACCEPT TERMS</h5>
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card backgroundColor" >
          <div className="card-body">

            <p>1. The car offer will wait 15 mins after agreed time for you to join.</p>
            <p className="">
              2. If due to anyunforeseen reason you cannot commute an a certain day, fee will be still be charged on
              on your seat remains reserved for you.
            </p>
            <p>
              3. You will inform the partners well in advance (atleast 12 hours)
              about your inability to cummute on a certain day. In case of an
              emergency this can be waived off under exceptional circumstances
            </p>
            <p>
              4. You will pay 15 days cost in advance. The money will remain in your
              wallet and will be transferred to car owner every week after confirmation 
              that the service was provided , you will recharge your wallet every week to maintain
              15 days commuting balance in wallet all the time.
            </p>
            <p>
              5. You will charged on daily basis for actual number of days that you share
              the car. No charges will be levied for public holidays or number of days
              that the car owner does not turn up.
            </p>
            <p>
              6. No changes will be levied for public holidays or number of days that the 
              car owner does not turn up.
            </p>
            <p>
              7. You will pay your share of cost through Commuterslink and there will be no direct
              transaction between you and your commuting partner.
            </p>
            <p>
              8. If you wish to discontinue your partnership with a memeber due a reason or other
              CommutersLink will inform the partner an your behalf.
            </p>
            <p>
              9. Any complaints, grievances will be addressed to CommutersLink for resolution.
            </p>


          </div>
          <div className="text-center">
            <Button
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
              onClick={route}
            >
              I Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeApprovalTerms;
