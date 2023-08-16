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

const CommuterProfile1 = ({ children }) => {
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
        {/* <div className="border border-bottom border-success justify-content-center ml-3"></div> */}
        <p className="justify-content-center px-3 text-success">
          You are looking for travel buddles to ride your car, others who want
          to share their car and to connect with members with whom you can take{" "}
        </p>
      </div>

      <div
        className="card px-5 py-5"
        style={{
          border: "0",
          backgroundColor: "#D9D9D9",
        }}
      >
        <div class="card-header d-flex flex-column bg-light mb-2">
          <div>
            {" "}
            <h5 className="text-success ">Zafar Jamil</h5>
          </div>

          <div className="card bg-light" style={{ border: "0" }}>
            <div className="row d-flex justify-content-between">
              <div className="col-4">
                <div className="card border-0 bg-light" style={{ width: "50rem" }}>
                  <p className="">
                    <b>Gender:</b> <u>Male</u>
                    <br />
                    <b> Age:45</b> <u>Years</u> <br />
                    <b>Home Address:</b>{" "}
                    <u>H-1150, St-09, DHA Phase 2, Islamabad</u>
                    <br />
                    <b>Profession:</b> <u>Web Developer</u> <br />
                    <b>Education:</b>
                    <u>Masters</u>
                    <br />
                    <b>Cell:</b> <u>XXXXXXXXXXX</u>
                  </p>
                </div>
              </div>
              <div className="col-2">
                <div className="card">
                  <img src={`${BASE_URL}/assets/images/Sir Zafar.png`} />
                </div>
              </div>
            </div>
            <div>
              <h5 className="text-success">Details</h5>
              <div className="row d-flex">
                <div className="col-4">
                  <div className="card border-0 bg-light">
                    <div className="card border-0 bg-light">
                      <p>
                        <b>Gender:</b> <u>Female</u> <br />
                        <b>Point of Origin</b>{" "}
                        <u>(If different from home address)</u>
                        :-
                        <br />
                        <b>Pickup Timings:</b> <u>6am</u> <br />
                        <b>Destination:</b>{" "}
                        <u>The City School, H-8, Islamabad</u>
                        <br />
                        <b>Contact No:</b> <u>0334-9594377</u>
                        <br />
                        <b>Return Timings:</b> <u>2pm</u>
                        <br />
                        <b>Days:</b> <u>Mon-Fri</u>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-2">
                  <div
                    className="card mx-2 border-0 bg-light"
                    style={{ width: "20rem" }}
                  >
                    <p>
                      <b>Age:</b> <u>16Years</u> <br />
                      <b>No.of Seats:</b> 1 <br />
                      <b>Seat for:</b> <u> Girl</u>
                      <br />
                      <b>Payment Terms (perDay):</b> <u>Rs.350</u>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body bg-light">
              <button href="/" className=" btn_view1 btn-block ">
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuterProfile1;
