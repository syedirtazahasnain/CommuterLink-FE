import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/generalSlice";

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
        "https://staging.commuterslink.com/api/v1/show-notifications/",
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
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  return (
    <>
      <div>
        <div className="page-title">
          <h3 className="card p-4 text-success my-2 fw-bold">
            Notifications
          </h3>
        </div>
        <div className="card bg-light-green my-2">
          <div className="row p-4">
            <div className="col">
              <div
                className="card p-3" style={{ backgroundColor: '#e5f8f3' }}
              >
                <div>
                  {notifications.map((notification, index) => (
                    <>
                      <h5 className="card-title text-dark py-1">
                        {index + 1}: {" "} {notification}
                      </h5>
                    </>
                  ))}
                </div>

                <form id="numberForm">
                  <div className="container my-3 text-center">
                    <Button
                      className="btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
                      onClick={route}
                    >
                      Back
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
