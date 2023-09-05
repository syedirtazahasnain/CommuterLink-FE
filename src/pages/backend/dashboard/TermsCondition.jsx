import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import { setCurrentPage } from "../../../redux/generalSlice";

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

const TermsCondition = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sidebarOpened = useSelector((s) => s.general.sidebarOpened);
  const currentPage = useSelector((s) => s.general.currentPage);
  const userToken = useSelector((s) => s.login.data.token);

  const route = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(setCurrentPage("termscondition"));
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  return (
    <div>
      <div className="page-title">
        <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-success my-2 fw-bold m-0">Terms And Conditions</h3>
            <Link
              to={"/dashboard"} >
              <button className="btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card backgroundColor"  >
          <div className="card-body">
            <p>1. Your car is in a good shape and is roadworthy</p>
            <p className="">
              2. You are committed to provide the car for commuting of partners
              on all days mentioned in the agreement
            </p>
            <p>
              3. If due to any unforeseen reason you cannot commute on certain
              day, no fee will be paid for that day
            </p>
            <p>
              4. You will inform the partners well in advance (atleast 12 hours)
              about your inability to cummute on a certain day. In case of an
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
              7. You will wait at least 15 minute after the agreed time for
              commuting partner to join you.
            </p>
            <p>
              8. You will update the scheduler in your dashboard on daily(as and
              when required basis)
            </p>
            <p>
              9. You will receive your share of fee through CommutersLink and
              there will be no direct transaction between you and your commuting
              partner
            </p>
            <p>
              10. If you wish to discontinue your partnership with a member due
              a reason or other CommutersLink will inform the partner on your
              behalf (insert alink here "why to receive payment through
              commutersLink")
            </p>
            11. Any complaints, grievances will be addressed to CommutersLink
            for resolution
          </div>
          {/* <div className="text-center">
            <Button
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
              onClick={route}
            >
              Back
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;
