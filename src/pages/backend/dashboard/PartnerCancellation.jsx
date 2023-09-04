import React, { useState, useEffect } from 'react'
import { API_URL, BASE_URL, IMAGE_URL } from '../../../constants'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { setCurrentPage } from "../../../redux/generalSlice";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';

const PartnerCancellation = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");

  const crumbs = [
    {
      // path: "/portal/document-management",
      label: "View Profile",
      //   path:"/viewprofile",
      active: true,
    },
  ];

  useEffect(() => {
    dispatch(setCurrentPage("profile"));
    getProfileData();
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
        setImage(jsonresponse[0].contact.commuter_image);
      }
      else {
        setName("");
        setImage("");
      }
      console.log("Profile Page Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          Cancellation Date
        </h3>
      </div>
      <div className="card p-4  p-2">
        <div className="card" style={{ backgroundColor: "rgb(229, 248, 243)" }}>
          <div className="card-body text-dark">
            <div className="container text-center">
              <img src={`${IMAGE_URL}${image}`} style={{ height: "150px", width: "150px" }} className='border border-2 rounded rounded-circle' />
              <p className="py-2">{name}</p>
              <Form className="text-center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar />
    </LocalizationProvider>
                <div className="container">

                  <Link className="text-decoration-none btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-3 mb-3"
                    to={"/travel-buddy"}
                  >
                    Submit

                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartnerCancellation;