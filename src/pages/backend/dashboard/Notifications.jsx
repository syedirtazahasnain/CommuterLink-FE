import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const [submitbtn, setSubmit] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };

  useEffect(() => {
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
        <div className="container">
          <div className="row justify-content-center pt-5">
            <div className="card">
              <div className="card  border-1 border-success rounded rounded-4">
                <div className="container">
                  <div className="row">
                    <div className="col px-4">
                      <div style={backgroundStyle}></div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div
                        className="card-body cardpadding mb-5 py-5 rounded rounded-4 bg-dark"
                      >
                        <div>
                          {notifications.map((notification, index) => (
                            <>
                              <h5 className="card-title text-white py-1">
                              {index + 1}: {" "} {notification}
                              </h5>
                            </>
                          ))}
                        </div>

                        <form id="numberForm">
                          <div className="mb-3">
                            <Button
                              variant="success"
                              className="btn-block"
                              onClick={route}
                            >
                              Next
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
