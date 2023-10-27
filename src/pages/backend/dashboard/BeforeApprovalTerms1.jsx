import React, { useEffect, useState } from "react";
import { createTheme, Breadcrumbs } from "@mui/material";
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

const BeforeApprovalTerms1 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);

  const crumbs = [
    {
      path: "/request-commuter-profile",
      label: "Home",
      active: false,
    },
    {
      label: id == undefined ? "Terms and Condition" : "",
      active: true,
    },
  ];
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
        <h3 className="card px-4 py-2 text-success my-2 fw-bold">
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
            <h3 className="text-dark-green my-2 fw-bold m-0">
              TERMS AND CONDITIONS
            </h3>
            <Link
              to={"/request-commuter-profile"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link></div></div>
      </div>
      <div className="card p-4 bg-light p-2">
        <h5 className="text-dark-green pb-2">Before sending the request accept these terms</h5>
        <div className="card" >
          

        <div className="card-body">
              <ol><li className="mb-2">Your car is in a good shape and is roadworthy</li>
              <li className="mb-2">You are committed to provide the car for commuting of partners
                on all days mentioned in the agreement </li>
                
              
              <li className="mb-2">
                If due to any unforeseen reason you cannot commute on certain
                day, no fee will be paid for that day
              </li>
              <li className="mb-2">
              You will inform the travel buddy partners well in advance (at least 12 hours)
                about your inability to commute on a certain day. In case of an emergency this can be waived off under exceptional circumstances 
              </li>
              <li className="mb-2">
                You will be paid on weekly daily basis for actual number of days that your car is used
              </li>
              <li className="mb-2">
                If a commuting partner misses the car and fails to commute due to late arrival/time off you will still be paid for that day
              </li>
              <li className="mb-2">
                You will wait at least 15 minutes after the agreed time for commuting partner to join you
              </li>
              <li className="mb-2">
                You will update the scheduler in your dashboard on daily (as and when required basis)
              </li>
              <li className="mb-2">
                You will receive your share of fee through CommutersLink and there will be no direct transaction  between you and your commuting travel buddy partner 
              </li>
              <li className="mb-2">
                If you wish to discontinue your partnership with a member due a reason or other CommutersLink will inform the partner on your behalf. You are required to give at least 1 week notice(insert a link here “why to receive payment through commutersLink) 
              </li>
              <li className="mb-2"> Any complaints, grievances will be addressed to CommutersLink
              for resolution.</li></ol>
              
            </div>
   
          
          <div className="text-center">
            <Button
              className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3"
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

export default BeforeApprovalTerms1;
