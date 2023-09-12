import React, { useState, useEffect } from "react";
import { Button } from "@mui/base";
import { API_URL, BASE_URL } from "../../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/generalSlice";
import { CircularProgress } from "@mui/material";

const backgroundStyle = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  // backgroundSize: 'cover',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "100",
  height: "20vh",
  // Set the desired height of the background area
};

const Notifications = () => {
  const userToken = useSelector((s) => s.login.data.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitbtn, setSubmit] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate(-1);
    }
  };

  useEffect(() => {
    dispatch(setCurrentPage("notification"));
    getNotifications();
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  const getNotifications = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/show-notifications/`,
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
        const notificationsArray = jsonresponse.data[0].Notifications;
        setNotifications(notificationsArray);
      }
      console.log("Notifications:", jsonresponse);
      setLoading(false);
    } catch (error) {
      console.error("An error occurred:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="">
        <div className="card p-2 px-4 text-success my-2 fw-bold d-flex">
          <div className="d-flex justify-content-between align-items-xl-baseline">
            <h3 className="text-success my-2 fw-bold m-0">NOTIFICATIONS</h3>
            <Link to={"/dashboard"}>
              <button className="font-custom btn btn-dark-green rounded-0 text-white fs-6 lh-1">
                <i className="fas fa-angle-left text-white" />
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="card my-2">
        <div className="row p-4">
          <div className="col">
            <div className="card p-3 backgroundColor">
              {loading ? (
                <div className="text-center">
                    {/* // Render CircularProgress while loading */}
                  <CircularProgress />
                </div>
              ) : (
                <div>
                  {notifications.map((notification, index) => (
                    <div key={index}> {/* Add a key prop */}
                      <p className="card-title text-dark py-1">
                        {index + 1}: {notification}
                      </p>
                      <hr style={{ color: "grey" }} />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* <form id="numberForm">
              <div className="container my-3 text-center">
                <Button
                  className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3s"
                  onClick={route}
                >
                  Back
                </Button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
