import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import { Button } from "@mui/base";
import Swal from "sweetalert2";
import { setContactIdState, setIdState, setRequestAsState } from "../../../redux/generalSlice";

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

const FinalStep = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const requestId = useSelector((s) => s.general.data.id);
  const requestContactId = useSelector((s) => s.general.data.contact_id);
  const requested_As = useSelector((s) => s.general.data.request_as);
  const [name, setName] = useState("");
  const [contactId, setContactId] = useState("");
  const [driverName, setDriverName] = useState("");
  const [id, setId] = useState("");
  const [requestAs, setRequestAs] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const selectedDateFormat = selectedDate ? selectedDate.format('YYYY-MM-DD') : '';

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
        setContactId(jsonresponse[0].contact.contact_id);
        setAmount(jsonresponse[0].wallet.wallet_amount);
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
        setRequestAs(jsonresponse.data[0].requested_as);
      }
      console.log("Final Step Request Member Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const sendRequest = async () => {
    try {
      if(requested_As === "driver"){
        const body = {
          request_id: requestId,
          start_date: selectedDateFormat,
          message: "I accept your request",
          status: 2,
        }
        console.log("sendRequest Driver:", body);
  
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
          dispatch(setRequestAsState(""));
          dispatch(setIdState(""));
          dispatch(setContactIdState(""));
          navigate("/dashboard");
        } else if (jsonresponse.statusCode === 100) {
          Swal.fire({
            position:'top',
            // // icon: 'error',
           text: `${jsonresponse.message}`,
           customClass: {
            confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
          },}
          )
        }
        else if (jsonresponse.statusCode === 500) {
          Swal.fire({
            position:'top',
            // // icon: 'error',
           text: `${jsonresponse.message}`,
           customClass: {
            confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
          },}
          )
        }
      }
      else{
        const body = {
          request_id: requestId,
          start_date: selectedDateFormat,
          message: "I accept your request",
          status: 3,
        }
        console.log("sendRequest Rider:", body);
  
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
          dispatch(setRequestAsState(""));
          dispatch(setIdState(""));
          dispatch(setContactIdState(""));
          navigate("/dashboard");
        } else if (jsonresponse.statusCode === 100) {
          // alert("Resend Error: " + jsonresponse.message);
          Swal.fire({
            position:'top',
            // // icon: 'error',
           text: `${jsonresponse.message}`,
           customClass: {
            confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
          },}
          )
        }
        else if (jsonresponse.statusCode === 500) {
          // alert("Resend Error: " + jsonresponse.message);
          Swal.fire({
            position:'top',
            // // icon: 'error',
           text: `${jsonresponse.message}`,
           customClass: {
            confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
          },}
          )
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message to the user
      // alert("An error occurred while sending the request.");
      Swal.fire({
        position:'top',
        // // icon: 'error',
       text: 'An error occured while sending the request.',
       customClass: {
        confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
      },}
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
        <h3 className="card p-4 text-success my-2 fw-bold">
          FINAL STEP - YOU ARE RIGHT THERE!
        </h3>
      </div>
      <div className="card p-4 bg-light p-2">
        <div className="card backgroundColor">
          <div className="card-body">

            <h5>Dear {requestContactId}</h5><br />
            <p className="">
              Thank you very much for accepting me as a travel buddy to ride on your car.
              I also think that we are a suitable match to commute together. so I also formally
              give my consent to share you car.
            </p>
            <p>
              I have deposited Rs. {amount}/- as advance with CommutersLink which will be credited
              to your wallet on daily basis.
            </p>
            <p>
              I wish to start commuting with your starting from:
            </p>
            <div>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker 
                      label="Select Starting Date" 
                      className="bg-white" 
                      slotProps={{ textField: { size: "small" } }}
                      sx={{ width: "100%", }}
                      value={selectedDate}
                      onChange={handleDateChange}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </ThemeProvider>
            </div>
            <br />
            <p>
              Looking forward to a long term association for mutual benefit.
            </p>
            <p>
              Best Regards
            </p>
            <p>
              {contactId}
            </p>
          </div>

          <div className="text-center">
            <Button
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
              onClick={sendRequest}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalStep;
