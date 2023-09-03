import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
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

const DriverRequestAcceptence = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [name, setName] = useState("");
  const [driverName, setDriverName] = useState("");
  const [id, setId] = useState("");
  const [contactId, setContactId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  // const [profileStatus, setProfileStatus] = useState("");

  useEffect(() => {
    getProfileData();
    getMemberData();
    getDashboardData();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  useEffect(() => {
    if (contactId) {
      getDateData();
    }
  }, [contactId]);

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
        setContactId(jsonresponse.rider[0].contact_id);
        setId(jsonresponse.rider[0].request_id);
      } else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setDriverName(jsonresponse.drivers[0].name);
        setContactId(jsonresponse.drivers[0].contact_id);
        setId(jsonresponse.drivers[0].request_id);
      }
      console.log("Final Step Dashboard Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const getDateData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/suggestedDate/${contactId}`,
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
      if (jsonresponse) {
        setSelectedDate(jsonresponse.data);
      }
      console.log("Driver Request Acceptence Date:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const sendRequest = async () => {
    try {
      const body = {
        request_id: id,
        start_date: selectedDate,
        message: "I accept your request",
        status: 3
      }

      console.log("Request Body:", body);

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
       text: 'An error occured while sending the request.'}
      )
    }
  };

  return (
    <div>
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          Driver Request Acceptence
        </h3>
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card" style={{ backgroundColor: "#e5f8f3" }}>
          <div className="card-body">

            <h5>Dear {driverName}</h5><br />
            <p className="">
              Thank you very much for accepting me as a travel buddy to ride on your car.
              I also think that we are a suitable match to commute together. so I also formally
              give my consent to share you car.
            </p>
            {/* <p>
              I have deposited Rs. XXXX/- as advance with CommutersLink which will be credited
              to your wallet on daily basis @ Rs 335/-.
            </p> */}
            <p>
              I wish to start commuting with your starting from {selectedDate}
            </p>

            <br />
            <p>
              Looking forward to a long term association for mutual benefit.
            </p>
            <p>
              Best Regards
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
              I Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRequestAcceptence;
