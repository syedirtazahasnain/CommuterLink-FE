import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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

const AdvancePayment = () => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const [windowClosedManually, setWindowClosedManually] = useState(false);
  const [memberId, setMemberId] = useState("");
  const [userId, setUserId] = useState("");
  const [payment, setPayment] = useState("");
  const [profileType, setProfileType] = useState("");
  const userToken = useSelector((s) => s.login.data.token);
  const paymentURL =`https://staging.commuterslink.com/getpayments3?id=${userId}&amountPaid=${payment}&mobile=sjkdhaskjdhs`;

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/congratulations");
    }
  };
  
  useEffect(() => {
    getDashboardData();
    getMemberData();
    getProfileData();
    getPaymentSuccess();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  useEffect(() => {
    if(memberId){
      getPaymentDetails();
    }
  }, [memberId]);

  useEffect(() => {
    // Listen for the beforeunload event
    const beforeUnloadHandler = () => {
      setWindowClosedManually(true);
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);

    return () => {
      // Clean up event listener when component unmounts
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, []);

  const getDashboardData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/matches/office`,
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
       if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setProfileType("Driver");
        setMemberId(jsonresponse.drivers[0].contact_id);
      }
      console.log("Advance Payment Contact Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getProfileData = async () => {
    try{
      const response = await fetch(
        `${API_URL}/api/v1/profile`,
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
        setUserId(jsonresponse[0].contact.user_id);
      }
      console.log("Advance Payment Profile Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getMemberData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/requests`,
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
      if (jsonresponse.data && jsonresponse.data.length > 0) {
        if(profileType === "Driver"){
          setMemberId("");
        }
        else{
          setMemberId(jsonresponse.data[0].contact_id);
        }
      }
      console.log("Advance Payment Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getPaymentDetails = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/advance-seat-cost/${memberId}`,
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
      if(jsonresponse){
        setPayment(jsonresponse);
      }
      console.log("Payment Details:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const openAndCloseWindow = () => {
    // Calculate the center position of the screen
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;
    const windowWidth = 800; // Width of the new window
    const windowHeight = 600; // Height of the new window
    const leftPosition = (screenWidth - windowWidth) / 2;
    const topPosition = (screenHeight - windowHeight) / 2;
  
    // Open a new window at the center
    const newWindow = window.open(
      paymentURL,
      "_blank",
      `width=${windowWidth},height=${windowHeight},left=${leftPosition},top=${topPosition}`
    );

    // After opening, start checking if the new window is closed
    const intervalId = setInterval(() => {
      if (newWindow && newWindow.closed) {
        clearInterval(intervalId);
        getPaymentSuccess();
        };
    }, 1000);
  };
  
  const getPaymentSuccess = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/apppaymentinquiry`,
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
      if(jsonresponse.success === true){
        setWindowClosedManually(true);
      }
      console.log("Payment Success Message:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <div>
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          Two Weeks Advance Min. Payment Due: Rs.{payment}/-{" "}
        </h3>
      </div>
      <div className="card p-4  p-2">
        <div className="card backgroundColor">
          <div className="card-body text-dark">
            <p>
              Money will stay in your Wallet & will be transferred to car owner
              on weekly basis after you have availed the services
            </p>
            <p className="">
              At any given point in time wallet must have 2 weeks balance, so
              keep checking and keep loading.
            </p>
            <div className="page-title">
              <h5 className="card p-2 text-success text-center my-2 fw-bold">
                PAYMENT OPTIONS{" "}
              </h5>
            </div>
            <div className="page-title">
              <div className="card p-2 text-success text-center my-2 fw-bold">
                <div className="container text-center p-2">
                  <div className="row">
                    <div className="col-12 mb-2  border border-success rounded rounded-3">
                      <div>
                        <button 
                          className="btn  text-success fw-bold fs-5 lh-1" 
                          onClick={openAndCloseWindow}
                        >
                          <span><i className="fa-solid fs-3 fa-wallet text-success mx-2" /></span>
                          Credit/Debit Card
                        </button>
                      </div>
                    </div>
                    <div className="col-12 border advancecolor border-success rounded rounded-3">
                      <div>
                        <button 
                          className="btn btncol advancecolor text-success fw-bold fs-5 lh-1"
                          onClick={openAndCloseWindow} 
                        >
                          <span><img
                            src={`${BASE_URL}/assets/images/jazz.png`}
                            className="card-img-top w-40px m-auto mx-4"
                          /></span>
                          Jazz Cash
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <Button
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
            >
              Skip Payment
            </Button>
            <Button
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3 ml-2"
              onClick={route}
              disabled={!windowClosedManually}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancePayment;
