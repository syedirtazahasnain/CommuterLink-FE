import React, { useEffect,useState } from "react";
import { ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
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
  

 const ShareToCare1 = ({ children }) => {
  // const { instance } = useMsal();
  const [submitbtn , setSubmit] = useState(false);
  const dispatch = useDispatch();
  const sidebarOpened = useSelector((s) => s.general.sidebarOpened);
  const currentPage = useSelector((s) => s.general.currentPage);
  const route = () => {
    
    
   
  }
  useEffect(() => {
    // dispatch(setCurrentPage(""));
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);
 

  const name = useSelector((s) => s.signup.data.name);
  const email = useSelector((s) => s.signup.data.email);

  

  return (
 <div>
      <div className="container py-5 ">
        <div className="row justify-content-center pt-15 ">
          <div className="col-lg-12">
            <div
              className="card text-center border-1 border-success rounded rounded-4"
            >
              <div>
                <div>
                  <div>
                    <div style={backgroundStyle}></div>
                  </div>
                  </div>
              </div>
              <div>
                <div>
                  <div>
                    <div className="card">

                    <div
                      className="card-body cardpadding bg-light mb-5 py-5 rounded rounded-4"
                    //   style={{ background: "rgb(22,70,57)" }}
                    >
                      <div>
                  <div>
                          {" "}
                          <img
                            src={`${BASE_URL}/assets/images/Vector.png`}
                            alt="Sample photo"
                            className="bg-success"
                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '60%' }}
                          />
                        </div>
                  <div className="text-white">{name}<br/>{email}</div>
                  <h5 className="card-title mt-4 text-success" style={{ color: "yellow" }}>
                    FullName
                  </h5>
                  <p>test@gmail.com</p>
                </div>
                <div>
               <h5 className="text-success">I want to share ride for</h5>
               <Button variant="success" className="btn-lg">Office</Button>
                </div>
                <p>Or</p>
<Button variant="success" className="btn-lg">School/University</Button>
                <form id="numberForm">
                  <div className="mb-3">
                    
                    {/* <Button variant="success" className="btn-sm" onClick={route}>
                      
                    </Button> */}
                    <div><p className="py-3 text-success">
                        On long term basis</p></div>
                  </div>
                </form>
              </div>
             
                    </div>
           
              </div>
              {/* <div className="card bg-success">
                <div className="card-heading bg-success">Share to Care</div>
              </div> */}
                </div>
                </div>
            </div>   
            </div>
        </div>
      </div>
 </div>
    
  );
};

export default ShareToCare1;
