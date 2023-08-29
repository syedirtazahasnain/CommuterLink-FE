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
import { Box } from "@mui/material";
import { width } from "@mui/system";

const TravelConfirmation = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDateChange = (date) => {
    if (!dialogOpen) {
      setDialogOpen(true);
      setSelectedDate(date);
    }
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  // For Dashboard Data
  const [contactId, setContactId] = useState("");

  useEffect(() => {
    getDashboardData();
  }, []);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
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

  const TravelConfirmation = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/profile",
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
      console.log(jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  {
    /* Second Calendar */
  }
  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  /**
   * Mimic fetch with abort controller https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort
   * ⚠️ No IE11 support
   */
  function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = date.daysInMonth();
        const daysToHighlight = [1, 2, 3].map(() =>
          getRandomNumber(1, daysInMonth)
        );

        resolve({ daysToHighlight });
      }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException("aborted", "AbortError"));
      };
    });
  }

  const initialValue = dayjs("2022-04-17");

  function ServerDay(props) {
    const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

    const isSelected =
      !props.outsideCurrentMonth &&
      highlightedDays.indexOf(props.day.date()) >= 0;

    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={isSelected ? "🌚" : undefined}
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
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  React.useEffect(() => {
    fetchHighlightedDays(initialValue);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <div>
      {/* <div className="card bg-light-green mt-3 mb-5">
        <div className="card-header " style={{ backgroundColor: "#2a402a" }}>
          <h3 className="text-center text-warning m-auto">
            {" "}
            TRAVEL CONFIRMATION{" "}
          </h3>{" "}
        </div>
        <div
          className="card-body"
          style={{
            borderWidth: "0 2px 2px 2px",
            borderStyle: "solid",
            borderColor: "#066539",
          }}
        >
          <div className="card" style={{ backgroundColor: "#D9D9D9" }}>
            <div className="card-body">
              <div
                className="card p-4 border-0  p-2"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div className="card ">
                 
                  <div className="container">
                    <Datepicker
                      calendarType="week"
                      calendarSize={1}
                      select="date"
                      display="inline"
                      onCellClick={handleDateChange}
                     
                    />
                    <div className="row py-2">
                      <p className="text-success fs-5 cursor-pointer text-right">
                        No of Days Travelled 0
                      </p>
                      <p className="btn fs-5 text-success text-right">
                        {" "}
                        View Full History
                      </p>
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
                        <button className="btn  text-success fw-bold fs-5 lh-1">
                          <span>
                            <i className="fa-regular fa-circle-check text-success mx-1 fs-2"></i>
                          </span>
                          Travelled
                        </button>
                      </div>
                      <div>
                        <button className="btn btncol advancecolor text-success fw-bold fs-5 lh-1">
                          <span>
                            <i class="fa-solid fa-circle-minus text-success mx-1 fs-2"></i>
                          </span>
                          Not Travelled
                        </button>
                      </div>
                      <div>
                        <button className="btn btncol advancecolor text-success fw-bold fs-5 lh-1">
                          <span>
                            <i class="fa-solid fa-car text-danger mx-1 fs-2"></i>
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
      </div> */}
      {/* Second Calendar */}
      <div className="card bg-light-green mt-3 mb-5">
        <div className="card-header " style={{ backgroundColor: "#2a402a" }}>
          <h3 className="text-center text-warning m-auto">
            {" "}
            TRAVEL CONFIRMATION{" "}
          </h3>{" "}
        </div>
        <div
          className="card-body"
          style={{
            borderWidth: "0 2px 2px 2px",
            borderStyle: "solid",
            borderColor: "#066539",
          }}
        >
          <div className="card h-50" style={{ backgroundColor: "#D9D9D9" }}>
            <div className="card-body">
              <div
                className="card border-0"
                style={{ backgroundColor: "#D9D9D9" }}
              >
                <div className="card h-50">
                  <div className="container">
                    <Box className="card  w-100">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                          defaultValue={initialValue}
                          loading={isLoading}
                          className="w-100"
                          onMonthChange={handleMonthChange}
                          // onChange={handleDateChange}
                          renderLoading={() => <DayCalendarSkeleton />}
                          slots={{
                            day: ServerDay,
                          }}
                          slotProps={{
                            day: {
                              highlightedDays,
                              onClick: handleDateChange,
                            },
                          }}
                          sx={{
                            display: "grid",
                            "& .MuiDayCalendar-weekDayLabel": {
                              fontSize: "1.5rem",
                              paddingTop: "2rem",
                              paddingBottom: "1rem",
                              paddingLeft: "5rem",
                              paddingRight: "5rem",
                              margin: 0,
                            },
                            "& .MuiPickersDay-dayWithMargin": {
                              fontSize: "1.5rem",
                              padding: "5rem",
                              margin: 0,

                            },
                            "& .MuiPickersDay-root:hover": {
                              backgroundColor: "#cbeddd",
                              paddding: "5rem"


                            },
                            "& .MuiPickersDay-root.Mui-selected": {
                              backgroundColor: "green",
                              borderRadius: "90%",
                              color: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            },
                            "& .MuiPickersCalendarHeader-labelContainer": {
                              fontSize: "16px"
                            },

                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                    <div className="row py-2">
                      <p className="text-success fs-5 px-4 cursor-pointer text-right">
                        No of Days Travelled 0
                      </p>
                      <p className="btn fs-5 px-4 text-success text-right fw-bold">
                        {" "}
                        View Full History
                      </p>
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
                        <button className="btn  text-success fw-bold fs-5 lh-1">
                          <span>
                            <i className="fa-regular fa-circle-check text-success mx-1 fs-2"></i>
                          </span>
                          Travelled
                        </button>
                      </div>
                      <div>
                        <button className="btn btncol advancecolor text-success fw-bold fs-5 lh-1">
                          <span>
                            <i class="fa-solid fa-circle-minus text-success mx-1 fs-2"></i>
                          </span>
                          Not Travelled
                        </button>
                      </div>
                      <div>
                        <button className="btn btncol advancecolor text-success fw-bold fs-5 lh-1">
                          <span>
                            <i class="fa-solid fa-car text-danger mx-1 fs-2"></i>
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
      {/* <Box className="card bg-light w-100">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            defaultValue={initialValue}
            loading={isLoading}
            className="w-50"
            onMonthChange={handleMonthChange}
            renderLoading={() => <DayCalendarSkeleton />}
            slots={{
              day: ServerDay,
            }}
            slotProps={{
              day: {
                highlightedDays,
              },
            }}
            sx={{
              "& .MuiDayCalendar-weekDayLabel": {
                fontSize: "1.5rem",
                paddingTop: "2rem",
                paddingBottom:"1rem",
                paddingLeft:"4rem",
                paddingRight:"4rem",
                margin: 0,
              },
              "& .MuiPickersDay-dayWithMargin": {
                fontSize: "1.5rem",
                padding:"4rem",
                margin: 0,
                
              },
              "& .MuiPickersDay-root.Mui-selected:hover":{
                backgroundColor:"green",
                paddding:"5rem"
               
                
              },
              "& .MuiPickersDay-root.Mui-selected":{
                backgroundColor:"green"
                
              },
              
            }}
          />
        </LocalizationProvider>
      </Box> */}
    </div>
  );
};

export default TravelConfirmation;
