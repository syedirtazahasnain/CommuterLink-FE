import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import { Breadcrumbs } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/base";

const backgroundLogo = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
};

const Congratulations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/finalstep");
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
      path: "/whyprocesspayment1",
      label: "Why Process Payment",
      active: false,
    },
    {
      path: "/advancepayment",
      label: "Advance Payment",
      active: false,
    },
    {
      label: id == undefined ? "Congratulation" : "",
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
            <h3 className="text-dark-green my-2 fw-bold m-0">
              CONGRATULATIONS!
            </h3>
            <Link
              to={"/advancepayment"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>

      </div>
      <div className="card p-4 bg-light p-2">
      <h5 className="pb-2 text-dark-green text-center my-2 fw-bold">
        Your Payment has been Received Successfully and credited to your Wallet
      </h5>
        <div className="card bg-light">
          <div className="card-body bg-light">


            <div className="text-center">
              <span><i className="fa-solid fa-thumbs-up text-warning" style={{ fontSize: '100px' }}></i></span>

            </div>

            <div className="text-center">
              <Button
                className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white px-3 py-2 mt-4"
                onClick={route}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
