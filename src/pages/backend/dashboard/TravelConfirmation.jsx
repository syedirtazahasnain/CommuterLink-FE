import React, { useState, useEffect } from "react";
import { Datepicker } from "@mobiscroll/react";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  }
  const handleCloseDialog = () => {
    setDialogOpen(false);
  }
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

  return (
    <div>
      <div className="card bg-light-green mt-3 mb-5">
        <div className="card-header bg-black">
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

              <div className="card p-4 bg-light p-2">
                <div className="card ">
                  <div className="card-body text-success fw-bold" style={{ backgroundColor: "rgb(229, 248, 243)" }}>
                    <div className="container">
                      <Datepicker
                        calendarType="week"
                        calendarSize={1}
                        select="date"
                        display="inline"

                        onCellClick={handleDateChange}

                      />
                      <div className="row py-2">
                        <p className="text-dark text-right">No of Days Travelled 0</p>
                        <p className="btn fs-5 text-success text-right"> View Full History</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Select Any Options</DialogTitle>
                <DialogContent>

                </DialogContent>

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

                            <i class="fa-solid fa-car text-danger mx-1 fs-2" ></i>
                          </span>
                          Driver Didn't Come
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                <DialogActions>
                  <Button className="text-dark" onClick={handleCloseDialog}>Cancel</Button>
                </DialogActions>
              </Dialog>

              <div></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TravelConfirmation;
