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
import { API_URL } from "../../../constants";
import Swal from "sweetalert2";

const TravelConfirmation = () => {
  const initialValue = dayjs();
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(initialValue);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dateChanged, setDateChanged] = useState(false);
  const [statusData, setStatusData] = useState([]);

  useEffect(() => {
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

    // Set up a 20-second setInterval to call the fetchData function
    const intervalId = setInterval(fetchData, 20000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [statusData]);


  const handleDateChange = (date) => {
    setSelectedDate(dayjs(date));
    setDateChanged(true);
    setDialogOpen(true);
  };

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
      Swal.fire({
        position: 'top',
        // // icon: 'error',
        text: `${jsonresponse.message}`,
        customClass: {
          confirmButton: 'bg-success', // Apply custom CSS class to the OK button
        },
      });
    }
    else if (jsonresponse.status_code === 500) {
      Swal.fire({
        position: 'top',
        // icon: 'error',
        text: `${jsonresponse.message}`,
        customClass: {
          confirmButton: 'bg-success', // Apply custom CSS class to the OK button
        },
      });
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
      <div className="card bg-light-green mt-3 mb-5">
        <div className="card-header " style={{ backgroundColor: "#1F5F5B" }}>
          <h3 className="text-center fw-bold text-warning m-auto">
            {" "}
            TRAVEL CONFIRMATION{" "}
          </h3>{" "}
        </div>
        <div
          className="card-body"
        >
          <div className="card h-50" style={{ backgroundColor: "rgb(214 219 218)" }}>
            <div className="card-body">
              <div
                className="card border-0"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div className="card h-50 w-100">
                  <div className="container">
                    <div className="mt-4 text-center text-danger fw-bold fs-5">Once the date is marked on Calendar, it remains fixed and cannot be altered.</div>
                    <Box className="card w-100">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          value={selectedDate}
                          onChange={handleDateChange}
                          loading={isLoading}
                          className="w-100"
                          onMonthChange={handleMonthChange}
                          renderLoading={() => <DayCalendarSkeleton />}
                          shouldDisableDate={isWeekend}
                          slots={{
                            day: ServerDay,
                          }}
                          slotProps={{
                            day: {
                              highlightedDays,
                            },
                          }}
                          sx={{

                            display: "grid",
                            "& .MuiDayCalendar-weekDayLabel": {
                              fontSize: "1.4rem",
                              fontWeight: 'bold',
                              color: '#1F5F5B',
                              // paddingTop: "1rem",
                              paddingBottom: "0.5rem",
                              padding: "calc(3rem + 18px)",
                              margin: 0,
                            },
                            "& .MuiPickersDay-dayWithMargin": {
                              fontSize: "1.3rem",
                              margin: 0,

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
                            },
                            "& .MuiPickersCalendarHeader-labelContainer": {
                              fontSize: "1.5rem"
                            },
                            '& .MuiBadge-root ': {
                              paddingLeft: '3rem',
                              paddingRight: '3rem',
                              // paddingBottom: '.3rem'
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
                            "& .css-jlta03-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected)": {
                              border: "0px solid rgba(0, 0, 0, 0.6)",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                    {/* <div className="row"> <div className="col-md-12 py-4 px-5 text-end">

                      <Link
                        className="font-custom text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3 mb-3"
                        style={{ cursor: "pointer" }}
                        onClick={route}
                      >
                        View Full History

                      </Link>
                    </div></div> */}
                    <div className="row px-2 mt-4">
                      <div className="col-md-6 d-flex mt-2 border border-success rounded rounded-3">
                        <div>
                          <button
                            className="btn font-custom  text-success fw-bold fs-5 lh-1"
                          // onClick={() => handleStatusSelect("1")}
                          >
                            <span className="font-custom">
                              <i className="fa-regular fa-circle-check text-success mx-1 fs-2"></i>
                            </span>
                            Travelled
                          </button>
                        </div>
                        <div>
                          <button className="font-custom btn btncol advancecolor text-success fw-bold fs-5 lh-1"
                          // onClick={() => handleStatusSelect("0")}
                          >
                            <span className="font-custom">
                              <i className="fa-solid fa-circle-minus text-success mx-1 fs-2"></i>
                            </span>
                            Not Travelled
                          </button>
                        </div>
                        <div>
                          <button className="font-custom btn btncol advancecolor text-success fw-bold fs-5 lh-1"
                          // onClick={() => handleStatusSelect("-1")}
                          >
                            <span className="font-custom">
                              <i className="fa-solid fa-car text-danger mx-1 fs-2"></i>
                            </span>
                            Driver Didn't Come
                          </button>
                        </div>
                      </div>
                      {/* <div className="col-6 pt-3 pb-1 lh-1">
                        <p className="text-success fs-5 px-4 cursor-pointer fw-bold text-right">
                          No of Days Travelled 0
                        </p>

                      </div> */}
                      <div className="col-md-6 py-3 px-5 text-end">

                        <Link
                          className="font-custom text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3 mb-3"
                          style={{ cursor: "pointer" }}
                          onClick={route}
                        >
                          View Full History

                        </Link>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
              <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Select Any Options</DialogTitle>
                <DialogContent></DialogContent>

                <div className="container text-center px-2">
                  <div className="row px-2">
                    <div className="col-12 mb-2 d-flex  border border-success rounded rounded-3">
                      <div>
                        <button
                          className="btn  text-success fw-bold fs-5 lh-1"
                          onClick={() => handleStatusSelect("1")}
                        >
                          <span>
                            <i className="fa-regular fa-circle-check text-success mx-1 fs-2"></i>
                          </span>
                          Travelled
                        </button>
                      </div>
                      <div>
                        <button className="btn btncol advancecolor text-success fw-bold fs-5 lh-1" onClick={() => handleStatusSelect("0")}>
                          <span>
                            <i className="fa-solid fa-circle-minus text-success mx-1 fs-2"></i>
                          </span>
                          Not Travelled
                        </button>
                      </div>
                      <div>
                        <button className="btn btncol advancecolor text-success fw-bold fs-5 lh-1" onClick={() => handleStatusSelect("-1")}>
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
                  <Button className="text-dark" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelConfirmation;
