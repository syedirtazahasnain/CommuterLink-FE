import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import { Button } from "@mui/base";
import Swal from "sweetalert2";

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
        Swal.fire({
          position:'top',
          icon: 'warning',
         text: `${jsonresponse.message}`}
        )
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message to the user
      // alert("An error occurred while sending the request.");
      Swal.fire({
        position:'top',
        icon: 'warning',
       text: 'An error occured while sending the request'}
      )
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
        <h3 className="card p-4 text-danger my-2 fw-bold">
          FINAL STEP - YOU ARE RIGHT THERE!
        </h3>
        <h3 className="card p-4 text-success my-2 fw-bold">
          SEND FOLLOWING REQUEST AND START COMMUTING TOGETHER
        </h3>
      </div>
      
      <div className="card p-4 bg-light p-2">
        <div className="card backgroundColor">
          <div className="card-body">

            <h5>Dear {driverName}</h5><br />
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
           
            <br />
            <p>
              Looking forward to a long term association for mutual benefit.
            </p>
          
            <p>
              {name}
            </p>
          </div>

          <div className="text-center">
            <Button
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
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
