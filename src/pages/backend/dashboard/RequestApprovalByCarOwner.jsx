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
  

 const RequestApprovalByCarOwner = ({ children }) => {
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
    dispatch(setOption0State(""));
    dispatch(setOption1State(""));
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
          <div className="card border border-0" style={{backgroundColor:'rgb(217,217,217)'}}>
            <div
              className="card  border-1 border-dark rounded rounded-4"
              style={{backgroundColor:'rgb(217,217,217)'}}
            >
              <div className="container">
                <div className="row">
                  <div className="col px-4">
                    <div style={backgroundStyle}></div>
                  </div>
                  <h4 className="text-dark text-center">REQUEST APPROVAL FOR CAR OWNER</h4>
                  </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col">
                    <div
                      className="card-body cardpadding mb-5 py-5 rounded rounded-4 bg-dark"
                      // style={{ background: "rgb(22,70,57)" }}
                    >
                      <div>
                 
                  <div className="text-white"></div>
                  <h5 className="card-title text-white py-1" >
                    Dear ride22
                  </h5>
                </div>
                <div>
                  <p className="text-white text-justify">
                  Thank you for sending me the request for sharieng my car.
                  <br/>
                  Based upon your profile, I feel that we are a good match. I
                  feel that we are a good match. I approve your request to commute together. 
                  <br/>
                  Looking forward to sharing
                  <br/><br/>
                  Regards,
                  <br/><br/>
                  Name
                  </p>
                </div>

                <form id="numberForm">
                  <div className="mb-3">
                    
                    <Button variant="success" className="btn-block fs-5" onClick={route}>
                      Next
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

export default RequestApprovalByCarOwner;
