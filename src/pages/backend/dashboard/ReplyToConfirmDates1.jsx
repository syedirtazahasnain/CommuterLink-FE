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

const ReplyToConfirmDates1 = ({ children }) => {
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
<div className="page-title">
  <h3 className="card p-4 text-success my-2 fw-bold">Member Request</h3>
  
</div>
<div className="card p-4">
  <div className="card backgroundColor">
    <div className="card-body">
    

      <div className="row text-left">
        <div
          className="col-md-12 backgroundColor  p-5 mb-3 sha m-auto"
         
        >
           <div className="card-body">
              <h5 className="py-3">Dear Yasir Abbas Mirza,</h5>

              <p>
                Thank you very much for accepting to share your ride to
                school/university. I also think that we are a suitable match, so
                I also formally give my consent to share your car.
              </p>

              <p>
                I have deposited Rs.15000/- as my share for one month (20 days)
                with CommutersLink, which will be credited to your WALLET on
                daily basis.
              </p>
              <p>
                Please also note that the deposit includes CommutersLink service
                fee @ Rs. 1,000/-.{" "}
              </p>
              <p>
                I wish to start commuting with you starting from July 15, 2022.
              </p>
              <p>
                Looking forward to a long term association for mutual benefit.
              </p>
              <p>Best regards</p>
              <p>Zafar Jamil</p>
            </div>
          <div className="d-flex justify-content-center mt-4">
            <Button className="btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3">
            Reply to Confirm Dates
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};

export default ReplyToConfirmDates1;
