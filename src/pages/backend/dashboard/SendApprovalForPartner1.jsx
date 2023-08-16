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

const SendApprovalForPartner1 = ({ children }) => {
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
        <div className="card-body py-5" style={{}}></div>
      </div>

      <div
        className="card px-5 py-5 m-auto bg-light"
        style={{
          border: "0",
          backgroundColor: "",
          width: "50rem",
        }}
      >
        <div class="card-header bg-light mb-2">
          <h1 className="text-center text-success m-auto"></h1>

          <div
            className="card bg-light justify-content-center"
            style={{ border: "0" }}
          >
            <div className="card-body bg-light" style={{ backgroundColor: "" }}>
              <h5>Dear Zafar Jamil,</h5>
              <p className="">
                I have gone through your profile and I feel that we are a good
                match to commute together.
              </p>

              <p>
                I have approved you as a partner and we can start as soon as you
                also accept to share my car.
              </p>
            </div>
            <div className="card-body bg-light" style={{ backgroundColor: "#D9D9D9E5" }}>
              <button href="/" className=" btn_view1 btn-block ">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendApprovalForPartner1;
