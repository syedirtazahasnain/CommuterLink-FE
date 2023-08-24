import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequestsByMembers = () => {
  const navigate = useNavigate();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn, setSubmit] = useState(false);

  // For Dashboard Data
  const [contactId, setContactId] = useState("");
  const [name, setName] = useState("");
  const [requestStage, setRequestStage] = useState("");

  useEffect(() => {
    getMemberData();
  }, []);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };

  const getMemberData = async () => {
    try {
      const response = await fetch(
        "https://staging.commuterslink.com/api/v1/requests",
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
        setContactId(jsonresponse.data[0].contact_id);
        setName(jsonresponse.data[0].user[0].name);
        setRequestStage(jsonresponse.data[0].request_stage);
      }
      console.log("Request Member Data:", jsonresponse);
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
            GET A SEAT/S IN THEIR CAR{" "}
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
            <div
              className="card-header "
              style={{ backgroundColor: "#2a402a" }}
            >
              <h3 className="text-white mt-4 mx-auto">
                REQUESTS BY MEMBERS
              </h3>
            </div>

            <div className="card-body card-body-bg">
              <p>
                Based upon your Profile, We have Following{" "}
                <strong>Requests</strong> to Offer
              </p>
              <div className="row">
                <div
                  className="card  border-0 w-100"
                  style={{
                    width: "auto",
                    backgroundColor: "#D9D9D9",
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
                            src={`${BASE_URL}/assets/images/Vector.png`}
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
                                {contactId}
                              </div>
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
                              style={{ width: "6rem", cursor: "pointer" }}
                            >
                              <img
                                src={`${BASE_URL}/assets/images/Vector.png`}
                                className="card-img-top w-40px m-auto mt-3"
                              />

                              <div
                                className="card-title text-center text-light"
                                style={{ width: "6rem", cursor: "pointer" }}
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
                            cursor: "pointer",
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
                          style={{ width: "6rem", cursor: "pointer" }}
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

              <div></div>

            </div>
          </div>
          {/* <div className="container">
          
          
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default RequestsByMembers;
