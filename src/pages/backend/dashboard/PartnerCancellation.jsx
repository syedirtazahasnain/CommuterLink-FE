import React, { useState, useEffect } from "react";
import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Box, Link } from "@mui/material";
import { width } from "@mui/system";
import { API_URL, IMAGE_URL  } from "../../../constants";
import Swal from "sweetalert2";
import { displayNotification } from "../../../helpers";

const PartnerCancellation = () => {
  const initialValue = dayjs();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const requestContactId = useSelector((s) => s.general.data.contact_id);
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialValue);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const [statusData, setStatusData] = useState([]);
  const [checkStatus, setCheckStatus] = useState("");
  const [rider, setRider] = useState("");
  const [driver, setDriver] = useState("");

  useEffect(() => {
    getProfileData();
    // Define a function that contains the code to execute
    const fetchData = () => {
      getDashboardData();
      FetchDates();
    };

    // Initial call when the component mounts
    fetchData();

    // Set up a 1 minute 20-second setInterval to call the fetchData function
    const intervalId = setInterval(fetchData, 120000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date));
  };

  const getProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/profile`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      });

      const jsonresponse = await response.json();
      if (jsonresponse) {
        setName(jsonresponse[0].name);
        setContactId(jsonresponse[0].contact.contact_id);
        setImage(jsonresponse[0].contact.commuter_image);
        setCheckStatus(jsonresponse[0].userlist.vehicle_option);
      } else {
        setName('');
        setImage('');
        setContactId('');
        setCheckStatus('');
      }
      console.log('Partner Cancellation Page Data', jsonresponse);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const sendRequest = async () => {
    try {
      if (!selectedDate) {
        // Swal.fire({
        //   position: 'top',
        //   // // icon: 'warning',
        //   text: 'Please select a date',
        //   customClass: {
        //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
        //   },
        // });
        displayNotification("warning", "Please select a date");
        return;
      }

      if (checkStatus === 1) {
        const body = {
          option: "driver",
          date: selectedDate.format('YYYY-MM-DD'),
        };

        console.log('sendRequest Body:', body);

        const response = await fetch(`${API_URL}/api/v1/aggreement-cancellation/${requestContactId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const jsonresponse = await response.json();
        console.log('sendRequest API Response', jsonresponse);

        if (jsonresponse.status_code === 200) {
          navigate('/dashboard');
        }
        else if (jsonresponse.status_code === 100) {
          // Swal.fire({
          //   position: 'top',
          //   // // icon: 'error',
          //   text: `${jsonresponse.message}`,
          //   customClass: {
          //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          //   },
          // });
          displayNotification("error", `${jsonresponse.message}`);
        }
        else if (jsonresponse.status_code === 500) {
          // Swal.fire({
          //   position: 'top',
          //   // // icon: 'error',
          //   text: `${jsonresponse.message}`,
          //   customClass: {
          //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          //   },
          // });
          displayNotification("error", `${jsonresponse.message}`);
        }
        else {
          // Swal.fire({
          //   position: 'top',
          //   // // icon: 'error',
          //   text: `${jsonresponse.message}`,
          //   customClass: {
          //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          //   },
          // });
          displayNotification("error", `${jsonresponse.message}`);
        }
      }
      else {
        const body = {
          option: "rider",
          date: selectedDate.format('YYYY-MM-DD'),
        };

        console.log('sendRequest Body:', body);

        const response = await fetch(`${API_URL}/api/v1/aggreement-cancellation/${requestContactId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }

        const jsonresponse = await response.json();
        console.log('sendRequest API Response', jsonresponse);

        if (jsonresponse.status_code === 200) {
          navigate('/dashboard');
        }
        else if (jsonresponse.status_code === 100) {
          // Swal.fire({
          //   position: 'top',
          //   // // icon: 'error',
          //   text: `${jsonresponse.message}`,
          //   customClass: {
          //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          //   },
          // });
          displayNotification("error", `${jsonresponse.message}`);
        }
        else if (jsonresponse.status_code === 500) {
          // Swal.fire({
          //   position: 'top',
          //   // // icon: 'error',
          //   text: `${jsonresponse.message}`,
          //   customClass: {
          //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          //   },
          // });
          displayNotification("error", `${jsonresponse.message}`);
        }
        else {
          // Swal.fire({
          //   position: 'top',
          //   // // icon: 'error',
          //   text: `${jsonresponse.message}`,
          //   customClass: {
          //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
          //   },
          // });
          displayNotification("error", `${jsonresponse.message}`);
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Swal.fire({
      //   position: 'top',
      //   // // icon: 'error',
      //   text: 'An error occurred while sending the request.',
      //   customClass: {
      //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
      //   },
      // });
      displayNotification("warning", "An error occured while sending the request.");
    }
  };

  useEffect(() => {
    // Fetch status data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/v1/mytravelhistory`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        const jsonresponse = await response.json();
        console.log("Date History:", jsonresponse);
        if (jsonresponse.success === true) {
          setStatusData(jsonresponse.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, [userToken, selectedDate]);

  useEffect(() => {
    // Define a function that contains the code to execute
    const fetchData = () => {
      if (statusData) {
        fetchHighlightedDays();
      }
    };

    // Initial call when the component mounts
    fetchData();

    // Set up a 1 minute 20-second setInterval to call the fetchData function
    const intervalId = setInterval(fetchData, 120000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [statusData]);




  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleStatusSelect = (value) => {
    handleConfirmStatus(value);
  };

  const handleConfirmStatus = async (selectedStatus) => {
    // Create the data object for the POST request
    const body = {
      date: selectedDate.format('DD-MM-YYYY'),
      day: selectedDate.format('dddd'),
      status: selectedStatus,
    };

    console.log("handleConfirmStatus Body:", body);

    const response = await fetch(
      `${API_URL}/api/v1/travelhistory`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    const jsonresponse = await response.json();
    if (jsonresponse.status_code === 100) {
      // Swal.fire({
      //   position: 'top',
      //   // // icon: 'error',
      //   text: `${jsonresponse.message}`,
      //   customClass: {
      //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
      //   },
      // });
      displayNotification("error", `${jsonresponse.message}`);
    }
    else if (jsonresponse.status_code === 500) {
      // Swal.fire({
      //   position: 'top',
      //   // icon: 'error',
      //   text: `${jsonresponse.message}`,
      //   customClass: {
      //     confirmButton: 'swal-custom', // Apply custom CSS class to the OK button
      //   },
      // });
      displayNotification("error", `${jsonresponse.message}`);
    }
    console.log("handleConfirmStatus Response:", jsonresponse);
    setDialogOpen(false);
    return;
  };

  // For Dashboard Data
  const [contactId, setContactId] = useState("");

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/paymentride");
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
        setContactId(jsonresponse.rider[0].contact_id);
      } else if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setContactId(jsonresponse.drivers[0].contact_id);
      } else {
        setContactId("");
      }
      console.log("Dashboard Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  function FetchDates() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const daysToHighlight = highlightedDays;

        resolve({ daysToHighlight });
      }, 500);
    });
  }

  const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    // Find the status for the current day in statusData
    const statusForDay = statusData.find((item) =>
      day.isSame(dayjs(item.date), "day")
    );

    const marker =
      statusForDay && statusForDay.status === 1 ? (
        <i className="fa-regular fa-circle-check text-success mx-1 fs-2"></i>
      ) : statusForDay && statusForDay.status === 0 ? (
        <i className="fa-solid fa-circle-minus text-success mx-1 fs-2"></i>
      ) : statusForDay && statusForDay.status === -1 ? (
        <i className="fa-solid fa-car text-danger mx-1 fs-2"></i>
      ) : null;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? marker : undefined}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }

  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = React.useState([]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();

    // Filter the statusData to find the dates that match the current month
    const statusForMonth = statusData.filter((item) =>
      dayjs(item.date, "YYYY-MM-DD").isSame(date, "month")
    );
    console.log({ statusForMonth });

    // Map the status data to an object with date and status
    const highlightedDates = statusForMonth.map((item) => ({
      date: dayjs(item.date, "YYYY-MM-DD").date(),
      status: item.status,
    }));

    // Extract the dates to highlight based on status
    const daysToHighlight = highlightedDates
      .filter((item) => item.status !== null)
      .map((item) => item.date);

    setHighlightedDays(daysToHighlight);
    setIsLoading(false);

    requestAbortController.current = controller;
  };


  const handleMonthChange = (date) => {
    if (dateChanged) {
      setIsLoading(true);
      setHighlightedDays([]);
      fetchHighlightedDays(date);
    }
  };

  return (
    <div>

<div className="page-title">
        <h3 className="card bg-medium-teal p-4 text-dark-green my-2 fw-bold">CANCELLATION DATE</h3>
      </div>
      <div className="card">
        <div className="card bg-light">
          <div className="card-body text-dark">
            <div className="container text-center">
              <img src={`${IMAGE_URL}${image}`} style={{ height: '150px', width: '150px' }} className="border border-2 rounded rounded-circle" />
              <p className="py-2">{name}</p>
      <div className="card bg-light mt-3 mb-5">
     
        <div
          className="card-body"
        >
          <div className="card h-50" style={{ backgroundColor: "rgb(214 219 218)" }}>
            <div className="">
              <div
                className="card border-0"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div className="card h-50 w-100">
                  <div className="row g-0">
                    <div className="col-md-12">
                      <Box className="card w-100 bg-white overflow-auto overflow-y-hidden">
                     

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateCalendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            loading={isLoading}
                            className="w-100 custom-scroll-color overflow-y-hidden"
                            onMonthChange={handleMonthChange}
                            renderLoading={() => <DayCalendarSkeleton />}
                            shouldDisableDate={isWeekend}
                            disablePast
                            slots={{
                              day: ServerDay,
                            }}
                            slotProps={{
                              day: {
                                highlightedDays,
                              },
                            }}
                            sx={{
                              overflow: 'auto',
                              display: 'grid',
                              "& .MuiDayCalendar-weekDayLabel": {
                                fontSize: "1.4rem",
                                fontWeight: 'bold',
                                color: '#1F5F5B',
                                paddingY: "0",
                                paddingX: "calc(2rem + 18px)",
                                margin: 0,
                              },
                              "& .MuiPickersDay-dayWithMargin": {
                                fontSize: "1.3rem",
                                margin: 0,
                              },
                              "& .MuiPickersCalendarHeader-root": {
                                alignItems: "center",
                                marginTop: "16px",
                                marginBottom: "8px",
                                paddingLeft: "150px",
                                paddingRight: "130px",
                                backgroundColor: "#CDF0EA",
                                paddingY: "20px"
                              },
                              "& .MuiPickersDay-root:hover": {
                                backgroundColor: "#cbeddd",
                                borderRadius: "50%",
                              },
                              "& .MuiPickersDay-root.Mui-selected": {
                                backgroundColor: "green",
                                borderRadius: "100%",
                                color: "#fff",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                padding:"1px",
                              },
                              "& .MuiPickersCalendarHeader-labelContainer": {
                                fontSize: "1.5rem"
                              },
                              '& .MuiBadge-root': {
                                paddingLeft: '2rem',
                                paddingRight: '2rem',
                              },
                              '& .MuiPickersYear-yearButton': {
                                backgroundColor: '#cbeddd'
                              },
                              "& .MuiPickersYear-yearButton.Mui-selected": {
                                backgroundColor: "green",
                              },
                              '& .MuiPickersYear-yearButton.Mui-selected:hover': {
                                backgroundColor: '#cbeddd'
                              },
                              "& .MuiPickersDay-root.Mui-selected:hover": {
                                backgroundColor: "green",
                              },
                              "& .MuiButtonBase-root.MuiPickersDay-root.Mui-selected": {
                                backgroundColor: "green",
                                fontSize: "1.3rem",
                                margin: 0,
                              
                              },
                              "& .css-jlta03-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
                                border: "0px solid rgba(0, 0, 0, 0.6)",
                              },
                              "& .css-lmlc2i-MuiDateCalendar-root": {
                                backgroundColor: 'green',
                              }
                            }}
                          />


                        </LocalizationProvider>
                        <div className="container">
                        {checkStatus === 0 ?
                          (
                            <div className="py-5">
                              <Button
                                className="font-custom text-decoration-none btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3 mx-4"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  sendRequest();
                                  setRider("cancel_now");
                                }}
                              >
                                Cancel Now
                              </Button>
                              <Button
                                className="font-custom text-decoration-none btn btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-2 mb-3 mx-4"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  sendRequest();
                                  setRider("week_notice");
                                }}
                              >
                                Week Notice
                              </Button>
                            </div>
                          )
                          :
                          (<Button
                            className="text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white  px-3 py-3 mb-3"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              sendRequest();
                              setDriver("driver");
                            }}
                          >
                            Submit
                          </Button>
                          )}
                      </div>
                        {/* <div className="h-100">
                          <div className="row text-center h-50 py-2 ">
                            <div className="col-md-4 mb-2">
                              <button className="font-custom btn text-success fw-bold fs-6 lh-1">
                                <span className="d-flex">
                                  <i className="fa-regular fa-circle-check text-success mx-1 fs-5"></i>

                                  <div className="align-middle">Travelled</div>  </span>
                              </button>
                            </div>
                            <div className="col-md-4 mb-2">
                              <button className=" font-custom btn btncol advancecolor text-success fw-bold fs-6 lh-1">
                                <span className="d-flex">
                                  <i className="fa-solid fa-circle-minus text-success mx-1 fs-5"></i>

                                  <div className="align-middle">Not Travelled</div>  </span>
                              </button>
                            </div>
                            <div className="col-md-4 mb-2">
                              <button className="font-custom btn btncol advancecolor text-success fw-bold fs-6 lh-1">
                                <span className="d-flex">
                                  <i className="fa-solid fa-car text-danger mx-1"></i>

                                  <div className="align-middle">Driver Didn't Come</div>   </span>
                              </button>
                            </div>

                          </div>

                        </div> */}
                      </Box>
                    </div>


                  

                  </div>
                </div>
              </div>
              <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle className=" fw-bold">Select Any Options</DialogTitle>
                <DialogContent></DialogContent>
                <div className="container text-center px-2">
                  <div className="row px-4">
                    <div className="col-12 mb-2 d-flex flex-column flex-md-row  border border-success rounded rounded-3">
                      <div>
                        <button
                          className="btn font-custom   text-success fw-bold fs-5 lh-1"
                          onClick={() => handleStatusSelect("1")}
                        >
                          <span>
                            <i className="fa-regular fa-circle-check text-success mx-1 fs-2"></i>
                          </span>
                          Travelled
                        </button>
                      </div>
                      <div>
                        <button className="btn btncol font-custom  advancecolor text-success fw-bold fs-5 lh-1" onClick={() => handleStatusSelect("0")}>
                          <span>
                            <i className="fa-solid fa-circle-minus text-success mx-1 fs-2"></i>
                          </span>
                          Not Travelled
                        </button>
                      </div>
                      <div>
                        <button className="btn btncol font-custom advancecolor text-success fw-bold fs-5 lh-1" onClick={() => handleStatusSelect("-1")}>
                          <span>
                            <i className="fa-solid fa-car text-danger mx-1 fs-2"></i>
                          </span>
                          Driver Didn't Come
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogActions>
                  <Button className="text-dark fw-bold" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div></div></div></div></div>
  );
};

export default PartnerCancellation;
