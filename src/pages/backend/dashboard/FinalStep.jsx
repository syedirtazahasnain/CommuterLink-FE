import React, { useEffect, useState } from "react";
import { createTheme, Breadcrumbs } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, BASE_URL } from "../../../constants";
import { useNavigate, Link, useParams } from "react-router-dom";
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

const FinalStep = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const requestId = useSelector((s) => s.general.data.id);
  const requestContactId = useSelector((s) => s.general.data.contact_id);
  const requested_As = useSelector((s) => s.general.data.request_as);
  const [name, setName] = useState("");
  const [contactId, setContactId] = useState("");
  const [driverName, setDriverName] = useState("");
  const [Id, setId] = useState("");
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
  
  const crumbs = [
    {
      path: "/request-commuter-profile",
      label: "Home",
      active: false,
    },
    {
      path: "/beforeapprovalterms",
      label: "Terms and Condition",
      active: false,
    },
    {
      path: "/whyprocesspayment1",
      label: "Why Process Payment",
      active: false,
    },
    {
      path: "/advancepayment",
      label: "Advance Payment",
      active: false,
    },
    {
      path: "/congratulations",
      label: "Congratulation",
      active: false,
    },
    {
      label: id == undefined ? "Final Step" : "",
      active: true,
    },
  ];
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
        } else if (jsonresponse.status_code === 100) {
          // Swal.fire({
          //   position:'top',
          //   // // icon: 'error',
          //  text: `${jsonresponse.message}`,
          //  customClass: {
          //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
          // },}
          // )
          displayNotification("error", `${jsonresponse.message}`);
        }
        else if (jsonresponse.status_code === 500) {
          // Swal.fire({
          //   position:'top',
          //   // // icon: 'error',
          //  text: `${jsonresponse.message}`,
          //  customClass: {
          //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
          // },}
          // )
          displayNotification("error", `${jsonresponse.message}`);
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
        } else if (jsonresponse.status_code === 100) {
          // alert("Resend Error: " + jsonresponse.message);
          // Swal.fire({
          //   position:'top',
          //   // // icon: 'error',
          //  text: `${jsonresponse.message}`,
          //  customClass: {
          //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
          // },}
          // )
          displayNotification("error", `${jsonresponse.message}`);
        }
        else if (jsonresponse.status_code === 500) {
          // alert("Resend Error: " + jsonresponse.message);
          // Swal.fire({
          //   position:'top',
          //   // // icon: 'error',
          //  text: `${jsonresponse.message}`,
          //  customClass: {
          //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
          // },}
          // )
          displayNotification("error", `${jsonresponse.message}`);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle error appropriately, e.g., display an error message to the user
      // alert("An error occurred while sending the request.");
      // Swal.fire({
      //   position:'top',
      //   // // icon: 'error',
      //  text: 'An error occured while sending the request.',
      //  customClass: {
      //   confirmButton: 'swal-custom' , // Apply custom CSS class to the OK button
      // },}
      // )
      displayNotification("error", "An error occured while sending the request.");
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
      <h3 className="px-4 py-2 text-success my-2 fw-bold">
          <Breadcrumbs aria-label="breadcrumb">
            {crumbs.map((crumb, index) => (
              <Link
                key={index}
                to={crumb.path || ""}
                style={{
                  color: crumb.active ? "black" : "green",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  pointerEvents: crumb.path ? "auto" : "none",
                  textDecoration: "none",
                }}
              >
                {crumb.label}
              </Link>
            ))}
          </Breadcrumbs>
        </h3>
        <div className="card bg-medium-teal p-2 px-4 text-success my-2 fw-bold d-flex">
      <div className="d-flex justify-content-between align-items-xl-baseline">
      <h3 className="text-dark-green my-2 fw-bold m-0">
      FINAL STEP - YOU ARE RIGHT THERE!
        </h3>
        <Link
              to={"/congratulations"} >
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link></div></div>
      </div>
      <div className="card p-4 bg-white p-2">
        <div className="card bg-light">
          <div className="card-body">

            <p>Dear {requestContactId}</p><br />
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
              className="font-custom btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3"
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
