import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/base";
import { Breadcrumbs} from '@mui/material'

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

const TermsCondition1 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [requestedAs, setRequestedAs] = useState("");
  
  const crumbs = [
    {
      path: "/commuter-profile",
      label: "Home",
      active: false,
    },
    {
      label: id == undefined ? "Terms and Condition" : "",
      active: true,
    },
  ];
  const route = () => {
    if (requestedAs === "rider") {
      navigate("/sendapprovalformember");
    }
    else{
      navigate("/sendapprovalforpartner1");
    }
  };

  useEffect(() => {
    getMemberData();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  const getMemberData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/requests`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if (jsonresponse.data && jsonresponse.data.length > 0) {
        setRequestedAs(jsonresponse.data[0].requested_as);
      }
      console.log("Request Member Terms Condition Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

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
      <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
      <div className="d-flex justify-content-between align-items-xl-baseline">
        <h3 className="text-success my-2 fw-bold m-0">
          TERMS AND CONDITIONS
        </h3>
        <Link
              to={"/commuter-profile"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link></div></div>
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card backgroundColor">
          <div className="card-body">
            <p>1. Your car is in a good shape and is roadworthy</p>
            <p className="">
              2. You are committed to provide the car for commuting of partners
              on all days mentioned by your travel buddy
            </p>
            <p>
              3. If due to any unforeseen reason you cannot commute on a certain
              day, no fee will be paid for that day
            </p>
            <p>
              4. You will inform the travel buddy well in advance (at least 12 hours)
              about your inability to commute on a certain day. In case of any
              emergency this can be waived off under exceptional circumstances
            </p>
            <p>
              5. You will be paid on daily basis for actual number of days that
              your car is used
            </p>
            <p>
              6. If a commuting partner misses the car and fails to commute due
              to late arrival/time off you will still be paid for that day
            </p>
            <p>
              7. You will wait at least 15 minutes after the agreed time for
              commuting partner to join you
            </p>
            <p>
              8. You will update the scheduler in your dashboard on daily(as and
              when required basis)
            </p>
            <p>
              9. You will receive your share of fee through CommutersLink and
              there will be no direct transaction between you and your commuting
              partnership
            </p>
            <p>
              10. If you wish to discontinue your partnership with a member due
              a reason or other CommutersLink will inform the partner on your
              behalf. You are required to give at least 1 week notice
            </p>
            11. Any complaints, grievances will be addressed to CommutersLink
            for resolution
          </div>
          <div className="text-center">
            <Button
              className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
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

export default TermsCondition1;
