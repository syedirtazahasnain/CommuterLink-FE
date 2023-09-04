import React, { useState, useEffect } from 'react';
import { API_URL, BASE_URL, IMAGE_URL } from '../../../constants';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { Button } from '@mui/base';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";

const PartnerCancellation = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [contactId, setContactId] = useState('');
  const [driver, setDriver] = useState('');
  const [rider, setRider] = useState('');
  const [checkStatus, setCheckStatus] = useState('');
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
          icon: 'warning',
          text: 'Please select a date',
        });
        return;
      }

      if (checkStatus === 1) {
        const body = {
          option: driver,
          date: selectedDate.format('YYYY-MM-DD'),
        };

        console.log('sendRequest Body:', body);

        return;

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
        else {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            text: `${jsonresponse.message}`,
          });
        }
      }
      else {
        const body = {
          option: rider,
          date: selectedDate.format('YYYY-MM-DD'),
        };

        console.log('sendRequest Body:', body);

        return;

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
        else {
          Swal.fire({
            position: 'top',
            icon: 'warning',
            text: `${jsonresponse.message}`,
          });
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      Swal.fire({
        position: 'top',
        icon: 'error',
        text: 'An error occurred while sending the request.',
      });
    }
  };

  return (
    <div>
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">Cancellation Date</h3>
      </div>
      <div className="card p-4  p-2">
        <div className="card" style={{ backgroundColor: 'rgb(229, 248, 243)' }}>
          <div className="card-body text-dark">
            <div className="container text-center">
              <img src={`${IMAGE_URL}${image}`} style={{ height: '150px', width: '150px' }} className="border border-2 rounded rounded-circle" />
              <p className="py-2">{name}</p>
              <Form className="text-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={selectedDate}
                    onChange={handleDateChange}
                    sx={{
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
                      <>
                        <Button
                          className="text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3 mb-3"
                          style={{ cursor: 'pointer' }}
                          onClick={()=> {
                            sendRequest();
                            setRider("cancel_now");
                          }}
                        >
                          Cancel Now
                        </Button>
                        <Button
                          className="text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3 mb-3 ml-3"
                          style={{ cursor: 'pointer' }}
                          onClick={()=> {
                            sendRequest();
                            setRider("week_notice");
                          }}
                        >
                          Week Notice
                        </Button>
                      </>
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerCancellation;