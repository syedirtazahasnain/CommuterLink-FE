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
      navigate("/finalstep");
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
      <div className="page-title d-flex flex-column justify-content-center flex-wrap me-4 ml-4">
        <div className="card-body py-4" style={{}}></div>
      </div>

      <div
        className="card px-5 py-5 bg-light"
        style={{ border: "0", backgroundColor: "rgba(162 229 198)" }}
      >
        <div class="card-header bg-light mb-2">
          <h1 className="text-center text-success m-auto">
            WHY PROCESS PAYMENT
            <br /> THROUGH COMMUTERSLINK
          </h1>

          <div
            className="card bg-light justify-content-center"
            style={{ border: "0" }}
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
            <div className="card-body">
              <Button className=" btn_view1 btn-block" onClick={route}>
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
