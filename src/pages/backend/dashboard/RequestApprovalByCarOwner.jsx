import React, { useEffect,useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
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
  

 const RequestApprovalByCarOwner = () => {
  const navigate = useNavigate();
  const [name , setName] = useState("");
  const [driverName , setDriverName] = useState("");
  const [submitbtn , setSubmit] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);
  
  const route = () => {
    setSubmit(true);
    
    if(!submitbtn){
      navigate("/whyprocesspayment1");
    }
  }

  useEffect(() => {
    getProfileData();
    getDashboardData();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  const getProfileData = async () => {
    try{
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/profile",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization : `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if(jsonresponse){
        setName(jsonresponse[0].name);
      }
      else {
        setName("");
      }
      console.log("Profile Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getDashboardData = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/matches/office",
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
        if (jsonresponse.rider && jsonresponse.rider.length > 0) {
        setDriverName(jsonresponse.rider[0].name);
      } 
      else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setDriverName(jsonresponse.drivers[0].name);
      }  
      else {
        setDriverName("");
      }
      console.log("Dashboard Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  

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
                    Dear {driverName}
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
                  {name}
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
