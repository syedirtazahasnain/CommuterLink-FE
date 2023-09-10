import React, { useState, useEffect } from 'react';
import { API_URL, BASE_URL, IMAGE_URL } from '../../../constants';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { Button } from '@mui/base';
import { Box } from "@mui/material";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

const PartnerCancellation = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [contactId, setContactId] = useState("");
  const [driver, setDriver] = useState("");
  const [rider, setRider] = useState("");
  const [checkStatus, setCheckStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    getProfileData();
    document.getElementById('root').classList.remove('w-100');
    document.getElementById('root').classList.add('d-flex');
    document.getElementById('root').classList.add('flex-grow-1');
    window.KTToggle.init();
    window.KTScroll.init();
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
        Swal.fire({
          position: 'top',
          // // icon: 'warning',
          text: 'Please select a date', 
          customClass: {
            confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
          },
        });
        return;
      }

      if (checkStatus === 1) {
        const body = {
          option: driver,
          date: selectedDate.format('YYYY-MM-DD'),
        };

        console.log('sendRequest Body:', body);

        const response = await fetch(`${API_URL}/api/v1/aggreement-cancellation/${contactId}`, {
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
          Swal.fire({
            position: 'top',
            // // icon: 'error',
            text: `${jsonresponse.message}`,
            customClass: {
              confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
            },
          });
        }
        else if (jsonresponse.status_code === 500) {
          Swal.fire({
            position: 'top',
            // // icon: 'error',
            text: `${jsonresponse.message}`,
            customClass: {
              confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
            },
          });
        }
        else {
          Swal.fire({
            position: 'top',
            // // icon: 'error',
            text: `${jsonresponse.message}`,
            customClass: {
              confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
            },
          });
        }
      }
      else {
        const body = {
          option: rider,
          date: selectedDate.format('YYYY-MM-DD'),
        };

        console.log('sendRequest Body:', body);

        const response = await fetch(`${API_URL}/api/v1/aggreement-cancellation/${contactId}`, {
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
          Swal.fire({
            position: 'top',
            // // icon: 'error',
            text: `${jsonresponse.message}`,
            customClass: {
              confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
            },
          });
        }
        else if (jsonresponse.status_code === 500) {
          Swal.fire({
            position: 'top',
            // // icon: 'error',
            text: `${jsonresponse.message}`,
            customClass: {
              confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
            },
          });
        }
        else {
          Swal.fire({
            position: 'top',
            // // icon: 'error',
            text: `${jsonresponse.message}`,
            customClass: {
              confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
            },
          });
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      Swal.fire({
        position: 'top',
        // // icon: 'error',
        text: 'An error occurred while sending the request.',
         customClass: {
          confirmButton: 'bg-success' , // Apply custom CSS class to the OK button
        },
      });
    }
  };

  return (
    <div>
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">Cancellation Date</h3>
      </div>
      <div className="card p-4  p-2">
        <div className="card backgroundColor">
          <div className="card-body text-dark">
            <div className="container text-center">
              <img src={`${IMAGE_URL}${image}`} style={{ height: '150px', width: '150px' }} className="border border-2 rounded rounded-circle" />
              <p className="py-2">{name}</p>
              {/* <Form className="text-center"> */}
              <div className="">
                  <div className="container">
              <Box className="card  w-100">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    className="w-100"
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
                        // fontWeight: 'bold',
                        color: '#1F5F5B',
                        // paddingTop: "1rem",
                        paddingBottom: "0.5rem",
                        padding: "calc(3rem + 18px)",

                      },
                      "& .MuiPickersDay-root:hover": {
                        backgroundColor: "#cbeddd",
                        borderRadius: "50%",
                      },
                      "& .MuiPickersDay-root.Mui-selected": {
                        backgroundColor: "green",
                        borderRadius: "50%",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                      "& .MuiPickersCalendarHeader-labelContainer": {
                        fontSize: "1.5rem"
                      },
                      '& .MuiBadge-root ': {
                        padding: '1rem',
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
                
                {/* {selectedDate ? selectedDate.format('YYYY-MM-DD') : ""} */}
                <div className="container">
                  {checkStatus === 0 ?
                    (
                      <div className="py-5">
                        <Button
                          className="text-decoration-none btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3 mx-4"
                          style={{ cursor: 'pointer' }}
                          onClick={()=> {
                            sendRequest();
                            setRider("cancel_now");
                          }}
                        >
                          Cancel Now
                        </Button>
                        <Button
                          className="text-decoration-none btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3 mx-4"
                          style={{ cursor: 'pointer' }}
                          onClick={()=> {
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
                      className="text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3 mb-3"
                      style={{ cursor: 'pointer' }}
                      onClick={()=> {
                        sendRequest();
                        setDriver("driver");
                      }}
                    >
                      Submit
                    </Button>
                    )}
                </div>
              {/* </Form> */}</Box>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerCancellation;