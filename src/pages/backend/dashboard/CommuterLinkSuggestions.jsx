import React, { useState, useEffect } from "react";
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CommuterLinkSuggestions = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);

  // For Dashboard Data
  const [contactId, setContactId] = useState("");
  const [contactRequestId, setContactRequestId] = useState("");
  const [name, setName] = useState("");
  const [nameRequest, setNameRequest] = useState("");
  const [requestStatus, setRequestStatus] = useState("");
  const [requestStage, setRequestStage] = useState("");
  const [requestStageMember, setRequestStageMember] = useState("");
  const [image, setImage] = useState("");
  const [imageRequest, setImageRequest] = useState("");
  const [option, setOption] = useState("");

  useEffect(() => {
    getProfileData();
    getMemberData();
  }, []);

  useEffect(() => {
    getDashboardData();
  }, []);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };

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
        setOption(jsonresponse[0].userlist.vehicle_option);
      }
      console.log("Dashboard Page Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
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
        setName(jsonresponse.rider[0].name);
        setRequestStatus(jsonresponse.rider[0].req_sent);
        setRequestStage(jsonresponse.rider[0].req_stage);
        setImage(jsonresponse.rider[0].commuter_image);
      }

      if (jsonresponse.drivers && jsonresponse.drivers.length > 0) {
        setContactId(jsonresponse.drivers[0].contact_id);
        setName(jsonresponse.drivers[0].name);
        setRequestStatus(jsonresponse.drivers[0].req_sent);
        setRequestStage(jsonresponse.drivers[0].req_stage);
        setImage(jsonresponse.drivers[0].commuter_image);
      }
      console.log("Dashboard Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  const getMemberData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/requests`,
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
      if (jsonresponse.data && jsonresponse.data.length > 0) {
        setContactRequestId(jsonresponse.data[0].contact_id);
        setNameRequest(jsonresponse.data[0].user[0].name);
        setImageRequest(jsonresponse.data[0].user[0].commuter_image);
        setRequestStageMember(jsonresponse.data[0].request_stage);
      }
      console.log("Request Member Data:", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <div className="card  mt-3 mb-5">
      <div className="card-header" style={{ backgroundColor: "#1F5F5B", padding: "5px 0", margin: "0" }}>
    <h4 className="text-center text-warning m-auto" style={{ lineHeight: "1" }}>
        {option === 1 ? "TRAVEL BUDDIES FOR YOUR CAR" : "GET A SEAT/S IN THEIR CAR"}
    </h4>
</div>

        <div
          className="card-body"
          // style={{
          //   borderWidth: "0 2px 2px 2px",
          //   borderStyle: "solid",
          //   borderColor: "#066539",
          // }}
        >
          <div className="card" style={{ backgroundColor: "#D9D9D9" }}>
            <div
              className="card-header "
              // style={{ backgroundColor: "#2a402a" }}
              style={{ backgroundColor: '#00917C' }}
            >
              <h5 className="text-white mt-4 mx-auto">
                COMMUTERSLINK SUGGESTION
              </h5>
            </div>

            <div className="card-body" style={{background:"rgb(191, 216, 210)"}}>
              <p>
                Based upon your Profile, We have Following{" "}
                <strong> MATCHES</strong> to Offer
              </p>
              <div className="row">
                <div
                  className="card m-auto border-0 w-100"
                  style={{
                    width: "auto",
                    backgroundColor: "rgb(191, 216, 210)",
                  }}
                >
                  <div class="row d-flex justify-content-center">
                    {requestStage === 1 ? (
                      <div className="col-sm-2">
                        <div
                          className="card"
                          style={{
                            width: "6rem",
                            fontWeight: "bold",
                            backgroundColor: "rgb(32 155 98)",
                          }}
                        >
                          <img
                            src={`${IMAGE_URL}${image}`}
                            className="card-img-top w-40px m-auto mt-3"
                          />
                          <div
                            className="card-title text-light text-center"
                            style={{ width: "6rem", cursor: "pointer" }}
                            onClick={() => {
                              route();
                            }}
                          >
                            {name}
                          </div>
                          <img
                            className=""
                            src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                          />
                        </div>
                      </div>
                    ) :
                      (contactId !== "" ?
                        (
                          <div className="col-sm-2">
                            <div
                              className="card bg-success"
                              style={{ width: "6rem" }}
                            >
                              {requestStatus === "yes" ? (
                                <>
                                  {requestStage === 2 ? (
                                    <>
                                      <img
                                        src={`${IMAGE_URL}${image}`}
                                        className="card-img-top w-40px m-auto py-2 mt-2"
                                      />
                                      <div
                                        className="card-title text-center text-light"
                                        style={{ width: "6rem", cursor: "pointer" }}
                                        onClick={() => {
                                          route();
                                        }}
                                      >
                                        {name}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <img
                                        src={`${BASE_URL}/assets/images/Vector.png`}
                                        className="card-img-top w-40px m-auto mt-3"
                                      />
                                      <div
                                        className="card-title text-center text-light"
                                        style={{ width: "6rem" }}
                                      >
                                       Member ID
                                      </div>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <img
                                    src={`${BASE_URL}/assets/images/Vector.png`}
                                    className="card-img-top w-40px m-auto mt-3"
                                  />
                                  <div
                                    className="card-title text-center text-light"
                                    style={{ width: "6rem", cursor: "pointer" }}
                                    onClick={() => {
                                      route();
                                    }}
                                  >
                                    {contactId}
                                  </div>
                                </>
                              )}
                              <img
                                className=""
                                src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                              />
                            </div>
                          </div>
                        ) :
                        (
                          <div className="col-sm-2">
                            <div
                              className="card bg-success"
                              style={{ width: "6rem" }}
                            >
                              <img
                                src={`${BASE_URL}/assets/images/Vector.png`}
                                className="card-img-top w-40px m-auto mt-3"
                              />

                              <div
                                className="card-title text-center text-light"
                                style={{ width: "6rem" }}
                              >
                                Member ID
                              </div>
                              <img
                                className=""
                                src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                              />
                            </div>
                          </div>
                        )
                      )
                    }
                    <div className="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{
                            width: "6rem",
                          }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{ width: "6rem" }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{ width: "6rem" }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{ width: "6rem" }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{ width: "6rem" }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn_view d-flex justify-content-end me-5">
                  VIEW MORE
                </button>
              </div>
              <div>
              </div>
            </div>
          </div>
          <div className="card mt-5" style={{ backgroundColor: "#D9D9D9" }}>
              <div
                className="card-header "
                style={{backgroundColor:'#00917C'}}
              >
                <h5 className="text-white mt-4 mx-auto">
                  REQUESTS BY MEMBERS
                </h5>
              </div>

            <div className="card-body" style={{background:"rgb(191, 216, 210)"}}>
              <p>
                Based upon your Profile, We have Following{" "}
                <strong>Requests</strong> to Offer
              </p>
              <div className="row">
                <div
                  className="card  border-0 w-100"
                  style={{
                    width: "auto",
                    backgroundColor: "rgb(191, 216, 210)",
                  }}
                >
                  <div class="row d-flex justify-content-center">
                    {requestStageMember === 1 || requestStageMember === 2 ? (
                      <div className="col-sm-2">
                        <div
                          className="card"
                          style={{
                            width: "6rem",
                            fontWeight: "bold",
                            backgroundColor: "rgb(32, 155, 98)",
                          }}
                        >
                          <img
                            src={`${IMAGE_URL}${imageRequest}`}
                            className="card-img-top w-40px m-auto mt-3"
                          />
                          <div
                            className="card-title text-light text-center"
                            style={{ width: "6rem", cursor: "pointer" }}
                            onClick={() => {
                              route();
                            }}
                          >
                            {nameRequest}
                          </div>
                          <img
                            className=""
                            src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                          />
                        </div>
                      </div>
                    ) : (
                      contactRequestId !== "" ? (
                        requestStageMember === 3 ? (
                          <div className="col-sm-2">
                            <div
                              className="card bg-success"
                              style={{ width: "6rem" }}
                            >
                              <img
                                src={`${BASE_URL}/assets/images/Vector.png`}
                                className="card-img-top w-40px m-auto mt-3"
                              />

                              <div
                                className="card-title text-center text-light"
                                style={{ width: "6rem" }}
                              >
                                Member ID
                              </div>
                              <img
                                className=""
                                src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="col-sm-2">
                            <div
                              className="card bg-success"
                              style={{ width: "6rem", cursor: "pointer" }}
                            >
                              <img
                                src={`${BASE_URL}/assets/images/Vector.png`}
                                className="card-img-top w-40px m-auto mt-3"
                              />

                              <div
                                className="card-title text-center text-light"
                                style={{ width: "6rem", cursor: "pointer" }}
                                onClick={() => {
                                  route();
                                }}
                              >
                                {contactRequestId}
                              </div>
                              <img
                                className=""
                                src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                              />
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="col-sm-2">
                          <div
                            className="card bg-success"
                            style={{ width: "6rem" }}
                          >
                            <img
                              src={`${BASE_URL}/assets/images/Vector.png`}
                              className="card-img-top w-40px m-auto mt-3"
                            />

                            <div
                              className="card-title text-center text-light"
                              style={{ width: "6rem" }}
                            >
                              Member ID
                            </div>
                            <img
                              className=""
                              src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                            />
                          </div>
                        </div>
                      )
                    )}

                    <div className="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{
                            width: "6rem",
                          }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{ width: "6rem" }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{ width: "6rem" }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{ width: "6rem" }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div
                        className="card bg-success"
                        style={{ width: "6rem" }}
                      >
                        <img
                          src={`${BASE_URL}/assets/images/Vector.png`}
                          className="card-img-top w-40px m-auto mt-3"
                        />

                        <div
                          className="card-title text-center text-light"
                          style={{ width: "6rem" }}
                        >
                          Member ID
                        </div>
                        <img
                          className=""
                          src={`${BASE_URL}/assets/images/downlineofmembericon.png`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn_view d-flex justify-content-end me-5">
                  VIEW MORE
                </button>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommuterLinkSuggestions;
