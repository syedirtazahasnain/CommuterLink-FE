import React, { useEffect, useState } from "react";
import { ThemeProvider, Tooltip, createTheme } from "@mui/material";
//import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { setCurrentPage, setSidebarState } from "../../../redux/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import Dashboard from "../../frontend/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
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

const TermsCondition1 = ({ children }) => {
  // const { instance } = useMsal();
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const sidebarOpened = useSelector((s) => s.general.sidebarOpened);
  const currentPage = useSelector((s) => s.general.currentPage);
  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };
  useEffect(() => {
    // dispatch(setCurrentPage(""));
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);
  const logout = () => {
    dispatch(setloginState(""));
    navigate("/login");
  };

  return (
    <div>
      <div className="page-title d-flex flex-column justify-content-center flex-wrap me-4 ml-4">
        <div className="card-body" style={{}}>
          <div className="card-title">
            <h2 className="text-success">MEMBERS REQUESTS</h2>
          </div>
        </div>
      </div>

      <div
        className="card px-5 py-5 bg-light"
        style={{ border: "0", backgroundColor: "rgba(162 229 198)" }}
      >
        <div class="card-header bg-light mb-2">
          <h1 className="text-center text-success m-auto">
            TERMS & CONDITIONS
          </h1>

          <div
            className="card bg-light justify-content-center"
            style={{ border: "0" }}
          >
            <div className="card-body">
              <p>1.Your car is in a good shape and is roadworthy</p>
              <p className="">
                2. You are committed to provide the car for commuting of
                partners on all days mentioned in the agreement
              </p>
              <p>
                3.If due to any unforeseen reason you cannot commute on certain
                day, no fee will be paid for that day
              </p>
              <p>
                4.You will inform the partners well in advance (atleast 12
                hours) about your inability to cummute on a certain day. In case
                of an emergency this can be waived off under exceptional
                circumstances
              </p>
              <p>
                5.You will be paid on daily basis for actual number of days that
                your car is used
              </p>
              <p>
                6.If a commuting partner misses the car and fails to commute due
                to late arrival/time off you will still be paid for that day
              </p>
              <p>
                7. You will wait at least 15 minute after the agreed time for
                commuting partner to join you.
              </p>
              <p>
                8. You will update the scheduler in your dashboard on daily(as
                and when required basis)
              </p>
              <p>
                9. You will receive your share of fee through CommutersLink and
                there will be no direct transaction between you and your
                commuting partner
              </p>
              <p>
                10. If you wish to discontinue your partnership with a member
                due a reason or other CommutersLink will inform the partner on
                your behalf (insert alink here "why to receive payment through
                commutersLink")
              </p>
              11. Any complaints, grievances will be addressed to CommutersLink
              for resolution
            </div>
            <div className="card-body">
              <button href="/" className=" btn_view1 btn-block ">
                I Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition1;
