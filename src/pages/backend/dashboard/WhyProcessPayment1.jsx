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

const WhyProcessPayment1 = () => {
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
       <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
         WHY PROCESS PAYMENT THROUGH COMMUTERSLINK
        </h3>
      </div>
     

      <div
        className="card p-4 bg-light p-2"
        
      >
        <div class="card backgroundColor">
        

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
                based upon a fixed relationized formula. If the petrol prices go
                up or down the same is adjusted in the monthly commuter fee.
              </p>

              <p>
                3.If the partner misses out on some days and does not commute,
                you still get the share as the seat reserved for the partner
                remains empty.
              </p>
              <p>
                4. No dispute on cost,payments,number of days the services were
                utilized etc.
              </p>
              <p>
                5. If you stop provision of car seat to a partner for a reason
                or other, your payment is secure and you will still be able to
                choose another match
              </p>
              <p>
                6.CommutersLink verifies all the data of its members and ensures
                your safety and security
              </p>
              <p>
                7.By money through CommutersLink you are insured for treatment
                of any injury resulting from accident upto 100,000.00 Rs.
              </p>
              <p>
                8. By receiving money through CommutersLink you remain an active
                member and have access to facilities like scheduler
              </p>
              <p>
                9. Last but not the least it is the most respectable way of
                receiving money as
              </p>
            </div>
            <div className="text-center">
              <Button className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={route}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyProcessPayment1;
