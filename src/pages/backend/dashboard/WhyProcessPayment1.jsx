import React, { useEffect, useState } from "react";
import { createTheme,Breadcrumbs } from "@mui/material";
import { BASE_URL } from "../../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/advancepayment");
    }
  };
  const crumbs = [
    {
      path: "/request-commuter-profile",
      label: "Home",
      active: false,
    },
    {
      path: "/beforeapprovalterms",
      label: "Terms and Condition",
      active: false,
    },
    {
      label: id == undefined ? "Why Process Payment" : "",
      active: true,
    },
  ];
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
       <h3 className="px-4 py-2 text-success my-2 fw-bold">
          <Breadcrumbs aria-label="breadcrumb">
            {crumbs.map((crumb, index) => (
              <Link
                key={index}
                to={crumb.path || ""}
                style={{
                  color: crumb.active ? "black" : "green",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  pointerEvents: crumb.path ? "auto" : "none",
                  textDecoration: "none",
                }}
              >
                {crumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        </h3>
       <div className="card bg-medium-teal p-2 px-4 text-success my-2 fw-bold d-flex">
      <div className="d-flex justify-content-between align-items-xl-baseline">
        <h3 className="text-success my-2 fw-bold m-0">
          WHY PROCESS PAYMENT THROUGH COMMUTERSLINK
        </h3>
        <Link
              to={"/beforeapprovalterms"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link></div></div>
      </div>
     

      <div
        className="card p-4 bg-light p-2"
        
      >
        <div class="card bg-light ">
        

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
                up or down the same will be adjusted.
              </p>
              <p>
                3. No dispute on cost,payments,number of days the services were
                utilized etc.
              </p>
              <p>
                4. If you stop provision of car seat to a partner for a reason
                or other with 1 week, your payment is secure and you will still be able to
                get another match.
              </p>
              <p>
                5.CommutersLink verifies all the data of its members and ensures
                your safety and security
              </p>
              <p>
                6. By receiving money through CommutersLink you remain an active
                member and have access to to other options to find travel buddies.
              </p>
              <p>
                7. Last but not the least it is the most respectable way of
                receiving money as you donot have to ask your travel buddy
                to pay you cash.
              </p>
            </div>
            <div className="text-center">
              <Button className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3" onClick={route}>
                I Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyProcessPayment1;
