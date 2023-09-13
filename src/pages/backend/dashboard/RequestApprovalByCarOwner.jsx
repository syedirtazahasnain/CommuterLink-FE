import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
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
}
const backgroundStyle = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  // backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  width: '100',
  height: '20vh'
  // Set the desired height of the background area
};


const RequestApprovalByCarOwner = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [submitbtn, setSubmit] = useState(false);
  const userToken = useSelector((s) => s.login.data.token);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
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
    try {
      const response = await fetch(
        `${API_URL}/api/v1/profile`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if (jsonresponse) {
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

    <div> <div className="page-title">
      <h3 className="card p-4 text-success my-2 fw-bold">REQUEST APPROVAL FOR CAR OWNER</h3>

    </div>

      <div className="card p-4 bg-light p-2">
        <div
          className="card backgroundColor"
        >
          <div className="card-body">     <p  >
            Dear {driverName}
          </p>


            <p className="">
              Thank you for sending me the request for sharieng my car.
              <br />
              Based upon your profile, I feel that we are a good match. I
              feel that we are a good match. I approve your request to commute together.
              <br />
              Looking forward to sharing
              <br /><br />
              Regards,
              <br /><br />
              {name}
            </p></div>



          <div className="row text-left">

            <div className="d-flex justify-content-center mt-4">
              <Button className="font-custom border-0 btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3">
                Next
              </Button>


            </div>
          </div>
        </div>
      </div></div>

  );
};

export default RequestApprovalByCarOwner;
