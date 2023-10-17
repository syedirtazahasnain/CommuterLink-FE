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
        <div className="card bg-medium-teal p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-dark-green my-2 fw-bold m-0">TERMS AND CONDITIONS</h3>
            <Link
              to={"/dashboard"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="card h-100 bg-light" >
            <div
              className="card-header"
              // style={{ backgroundColor: "#2a402a" }}
              style={{ backgroundColor: '#00917C' }}
            >
              <h5 className="text-white pt-4 mt-2 mx-auto fw-bold">
                CAR OFFEROR
              </h5>
            </div>
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
                4. You will inform the travel buddy partners well in advance (at least 12 hours)
                about your inability to commute on a certain day. In case of an emergency this can be waived off under exceptional circumstances
              </p>
              <p>
                5. You will be paid on weekly daily basis for actual number of days that your car is used
              </p>
              <p>
                6. If a commuting partner misses the car and fails to commute due to late arrival/time off you will still be paid for that day
              </p>
              <p>
                7. You will wait at least 15 minutes after the agreed time for commuting partner to join you
              </p>
              <p>
                8. You will update the scheduler in your dashboard on daily (as and when required basis)
              </p>
              <p>
                9. You will receive your share of fee through CommutersLink and there will be no direct transaction between you and your commuting travel buddy partner
              </p>
              <p>
                10. If you wish to discontinue your partnership with a member due a reason or other CommutersLink will inform the partner on your behalf. You are required to give at least 1 week notice(insert a link here “why to receive payment through commutersLink)
              </p>
              11. Any complaints, grievances will be addressed to CommutersLink
              for resolution.
            </div>
          </div>

        </div>
        <div className="col-md-6">
          <div className="card h-100 mb-5 bg-light" >
            <div
              className="card-header"
              // style={{ backgroundColor: "#2a402a" }}
              style={{ backgroundColor: '#00917C' }}
            >
              <h5 className="text-white pt-4 mt-2 mx-auto fw-bold">
                TRAVELLER
              </h5>
            </div>
            <div className="card-body h-100">
              <p>1. The car offeror will wait 15 mins after agreed time for you to join. </p>
              <p className="">
                2. If due to any unforeseen reason you cannot commute on a certain day, fee will be still be charged as your seat remains reserved for you
              </p>
              <p>
                3. You will inform the partners well in advance (at least 12 hours) about your inability to commute on a certain day. In case of an emergency this can be waived off under exceptional circumstances
              </p>
              <p>
                4. You will pay one month 15 days cost in advance. The money will remain in your wallet and will be transferred to car owner every week after on daily basis confirmation that the service was provided. You will recharge your wallet every week to maintain 15 days commuting balance in wallet all the time
              </p>
              <p>
                5. You will be charged on daily basis for actual number of days that you avail share the car. No charges will be levied for public holidays or number of days that the car owner does not turn up
              </p>
              <p>
                6. You will update the scheduler in your dashboard on daily (as and when required basis)
              </p>
              <p>
                7. You will pay your share of fee cost through CommutersLink and there will be no direct transaction between you and your commuting partner. (insert a link here “why to receive payment through commutersLink)
              </p>
              <p>
                8. If you wish to discontinue your partnership with a member due a reason or other CommutersLink will inform the partner on your behalf. Minimum 1 week notice is required
              </p>
              <p>
                9. Any complaints, grievances will be addressed to CommutersLink for resolution
              </p>


            </div>
          </div>

        </div>
      </div>
   
     </div>
  );
};

export default TermsCondition;
