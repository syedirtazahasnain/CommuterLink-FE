import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import { displayNotification } from "../../../helpers";

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121',
    },
  },
});

const backgroundLogo = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
};

const DriverFinalStep = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [name, setName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [id, setId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const selectedDateFormat = selectedDate ? selectedDate.format('DD-MM-YYYY') : '';
  // const [profileStatus, setProfileStatus] = useState("");

  useEffect(() => {
    getProfileData();
    getMemberData();
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
        // setProfileStatus(jsonresponse[0].profile_status);
      }
      console.log("Final Step Profile Data", jsonresponse);
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
        setDriverName(jsonresponse.data[0].user[0].name);
        setId(jsonresponse.data[0].id);
      }
      console.log("Final Step Request Member Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const sendRequest = async () => {
    try {
      const body = {
        request_id: id,
        start_date: selectedDateFormat,
        message: "I accept your request",
        status: 3
      }

      const response = await fetch(
        `${API_URL}/api/v1/request`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const jsonresponse = await response.json();
      console.log("API Response", jsonresponse);

      if (jsonresponse.statusCode === 200) {
        navigate("/dashboard");
      } else {
        // alert("Resend Error: " + jsonresponse.message);
        // Swal.fire({
        //   position:'top',
        //   // // icon: 'warning',
        //  text: `${jsonresponse.message}`,
        //  customClass: {
        //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
        // },}
        // )
        displayNotification("error", `${jsonresponse.message}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message to the user
      // alert("An error occurred while sending the request.");
      // Swal.fire({
      //   position:'top',
      //   // icon: 'error',
      //  text: 'An error occured while sending the request',
      //  customClass: {
      //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
      // },}
      // )
      displayNotification("error", "An error occured while sending the request");
    }
  };

  const handleDateChange = (newDate) => {
    if (newDate) {
      const newDateObject = dayjs(newDate);
      setSelectedDate(newDateObject);
    }
  };

  return (
    <div>
      <div className="page-title">
        <div className="card bg-medium-teal p-2 px-4 text-success my-2 fw-bold d-flex">
      <div className="d-flex justify-content-between align-items-xl-baseline">
        <h3 className="text-dark-green my-2 fw-bold m-0">
        FINAL STEP - YOU ARE RIGHT THERE!
        </h3>
        <Link
              to={"/"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link></div></div>
      </div>
      
      <div className="card p-4 bg-light p-2">
        <h5 className="text-dark-green pb-2">
          Send following request and start commuting together
        </h5>
        <div className="card bg-light">
          <div className="card-body">

            <p>Dear {driverName}</p>
            <p className="">
             Glad to know that we shall be commuting together. The date you have proposed to start
             sharing suits me as well.
            </p>
            <p>
              Let's connect on a call to fine tune and coordinate further.
            </p>
            <p>
             Looking forward and best regards
            </p>
            <p>
              Looking forward to a long term association for mutual benefit.
            </p>
          
            <p>
              {name}
            </p>
          </div>

          <div className="text-center">
            <Button
              className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white px-3 py-2 mb-3"
              onClick={sendRequest}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverFinalStep;
