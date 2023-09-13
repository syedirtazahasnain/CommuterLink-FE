import React, { useEffect,useState } from "react";
import { ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { setCurrentPage, setSidebarState, setOption0State, setOption1State } from "../../../redux/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import Dashboard from "../../frontend/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { setsignupState } from "../../../redux/signupSlice";
import { Button } from "react-bootstrap";
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ff4815",
      contrastText: "white",
    },
  },
});

const backgroundLogo={
  backgroundImage:`url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat:"no-repeat",
  backgroundColor:"white",
 }
 const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
      // backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width:'100',
      height:'20vh'
        // Set the desired height of the background area
  };
  

 const TermsCondition1 = ({ children }) => {
  // const { instance } = useMsal();
  const navigate = useNavigate();
  const [submitbtn , setSubmit] = useState(false);
  const dispatch = useDispatch();
  const sidebarOpened = useSelector((s) => s.general.sidebarOpened);
  const currentPage = useSelector((s) => s.general.currentPage);
  const route = () => {
    setSubmit(true);
    dispatch(setsignupState(""));
    dispatch(setloginState(""));
    navigate("/");
    
    if(!submitbtn){
      navigate("/commuter-profile");
    }
  }
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
  }

  const name = useSelector((s) => s.signup.data.name);
  const email = useSelector((s) => s.signup.data.email);

  

  return (
    <div>
         <div className="container py-5 ">
        <div className="row justify-content-center pt-15 ">
          <div className="col-lg-4 col-md-4 col-sm-4">
            <div
              className="card text-center border-1 border-success rounded rounded-4"
            >
              <div className="container">
                <div className="row">
                  <div className="col px-4">
                    <div style={backgroundStyle}></div>
                  </div>
                  </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div
                      className="card-body cardpadding mb-5 py-5 rounded rounded-4"
                      style={{ background: "rgb(22,70,57)" }}
                    >
                      <div>
                  <div>
                          {" "}
                          <img
                            src={`${BASE_URL}/assets/images/CL-logo.png`}
                            alt="Sample photo"
                            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '60%' }}
                          />
                        </div>
                  <div className="text-white">{name}<br/>{email}</div>
                  <h5 className="card-title mt-4" style={{ color: "yellow" }}>
                    Pending Verificaiton
                  </h5>
                </div>
                <div>
                  <p className="text-white text-justify">
                    Thank you for providing all the information. Your membership
                    approval will be notified through email and your mobile
                    number after which, you will be able to access your
                    dashboard and available choices to commute with
                  </p>
                </div>

                <form id="numberForm">
                  <div className="mb-3">
                    
                    <Button variant="success" className="btn-sm" onClick={route}>
                      Close
                    </Button>
                  </div>
                </form>
              </div>
              </div>
                </div>
                </div>
            </div>   
            </div>
        </div>
      </div>
    </div>
    
  );
};

export default TermsCondition1;
