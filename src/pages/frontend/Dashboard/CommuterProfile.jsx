import React from "react";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import logo from "../../../Images/CL-logo.png";
import img1 from "../../../Images/pic.png";
import logo2 from "../../../Images/Sysreforms logo 2.png";
import { useNavigate } from "react-router-dom";
import membericon from "../../../Images/Group 40.png";
import membericon1 from "../../../Images/Vector.png";
import downline from "../../../Images/downline of membericon.png";
import questionmark from "../../../Images/qustionmark.png";
import imgZafar from "../../../Images/Sir Zafar.png";
const CommuterProfile = () => {
  const backgroundStyle = {
    backgroundImage: `url(${logo})`,
    // backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
  };
  const backgroundStyle1 = {
    backgroundImage: `url(${logo2})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
  };
  const backgroundMember = {
    backgroundImage: `url(${membericon})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
    backgroundColor: "#198754",
  };
  return (
    <div>
      <div className="container bg-light mt-5">
        <div className="row d-flex p-0">
          <div className="col-lg-12 col-md-6 col-sm-4 mt-5 d-flex justify-content-center p-0">
            <div
              className="card bg-light "
              style={{ width: "100rem", border: "0" }}
            >
              <div className="card-body">
                <div className="row">
                  <div
                    className="col-lg-12 col-md-6 col-sm-4 d-flex p-0 "
                    style={{ backgroundColor: "rgb(162 229 198)", border: "0" }}
                  >
                    <div className="col-lg-3 p-0">
                      <div
                        className="card d-flex bg-success d-flex justify-content-left"
                        style={{ width: "23rem" }}
                      >
                        <div
                          className="bg-light w-100 mt-1 p-5"
                          style={backgroundStyle}
                        ></div>

                        <div className="d-flex align-items-center mt-3 me-5 me-xl-13">
                          {/*begin::Symbol*/}
                          <div className="symbol symbol-50px symbol-circle me-3">
                            <img src={img1} className alt />
                          </div>
                          {/*end::Symbol*/}
                          {/*begin::Info*/}
                          <div className="m-0">
                            <span className="fw-semibold text-white d-block fs-5">
                              Yasir Abbas Mirza
                            </span>
                            <button
                              href="/"
                              className="btn-success fw-bold text-white text-hover-success fs-6"
                            >
                              Profile
                            </button>
                          </div>
                          {/*end::Info*/}
                        </div>
                        <div
                          className="card"
                          style={{
                            width: "23rem",
                            backgroundColor: "rgb(32 155 98)",
                            border: "0",
                          }}
                        >
                          <div className="card-body menu">
                            <ul>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white ">
                                    DASHBOARD
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    MATCHES
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    REQUESTS
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    NOTIFICATIONS
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    PARTNER DETAILS
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    MY COMPUTER RECORDS
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    MY WALLET
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    COST CALCULATIONS
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    <br />
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    FAQS
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    TERMS
                                  </li>
                                </a>
                              </div>
                              <div className="item">
                                <a href="">
                                  <li className="border-bottom text-white">
                                    CONTACT US
                                  </li>
                                </a>
                              </div>
                            </ul>
                          </div>
                          <div
                            className="bg-dark w-100 mt-1"
                            style={backgroundStyle1}
                          ></div>
                        </div>
                      </div>{" "}
                    </div>
                    <div className="col-lg-9 px-5">
                      <div
                        className="card d-flex  d-flex justify-content-left"
                        style={{
                          width: "60.5rem",
                          backgroundColor: "rgba(162 229 198)",
                        }}
                      >
                        <div
                          id="kt_app_toolbar_container"
                          className="app-container container-fluid d-flex flex-stack"
                        >
                          {/*begin::Page title*/}
                          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            {/*begin::Title*/}
                            <span className="justify-content-center text-success">
                              Monday, July 04, 2022
                            </span>
                            <h2 className="page-heading d-flex  text-success  fw-bold fs-3 flex-column justify-content-center my-0">
                              Welcome to Yasir Abbas Mirza
                            </h2>
                            {/*end::Title*/}
                            {/*begin::Breadcrumb*/}
                            {/*end::Breadcrumb*/}
                          </div>
                          {/*end::Page title*/}
                          {/*begin::Actions*/}
                          <div className="d-flex align-items-center gap-2 gap-lg-3">
                            {/*begin::Secondary button*/}
                            <i
                              className="fas fa-bell text-success"
                              style={{ fontSize: "2rem" }}
                            ></i>
                            {/*end::Secondary button*/}
                            {/*begin::Primary button*/}
                            <a
                              href="#"
                              className="btn btn-sm fw-bold btn-success"
                              data-bs-toggle="modal"
                              data-bs-target="#kt_modal_new_target"
                            >
                              LOG OUT
                            </a>
                            {/*end::Primary button*/}
                          </div>

                          {/*end::Actions*/}
                        </div>
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-4 ml-4">
                          <div className="border border-bottom border-success justify-content-center ml-3"></div>
                          <p className="justify-content-center px-3">
                            You are looking for travel buddles to ride your car,
                            others who want to share their car and to connect
                            with members with whom you can take{" "}
                          </p>
                        </div>

                        <div
                          className="card px-5 py-5"
                          style={{
                            border: "0",
                            backgroundColor: "rgba(162 229 198)",
                          }}
                        >
                          <div class="card-header d-flex flex-column bg-light mb-2">
                            <div>
                              {" "}
                              <h5 className="text-success ">Zafar Jamil</h5>
                            </div>

                            <div className="card" style={{ border: "0" }}>
                              <div className="row d-flex justify-content-between">
                                <div className="col-4">
                                  <div
                                    className="card border-0"
                                    style={{ width: "50rem" }}
                                  >
                                    <p className="">
                                      <b>Gender:</b> <u>Male</u>
                                      <br />
                                      <b> Age:45</b> <u>Years</u> <br />
                                      <b>Home Address:</b>{" "}
                                      <u>
                                        H-1150, St-09, DHA Phase 2, Islamabad
                                      </u>
                                      <br />
                                      <b>Profession:</b> <u>Web Developer</u>{" "}
                                      <br />
                                      <b>Education:</b>
                                      <u>Masters</u>
                                      <br />
                                      <b>Cell:</b> <u>XXXXXXXXXXX</u>
                                    </p>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="card">
                                    <img src={imgZafar} />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h5 className="text-success">Details</h5>
                                <div className="row d-flex">
                                  <div className="col-4">
                                    <div className="card border-0">
                                      <div className="card border-0">
                                        <p>
                                          <b>Gender:</b> <u>Female</u> <br />
                                          <b>Point of Origin</b>{" "}
                                          <u>
                                            (If different from home address)
                                          </u>
                                          :-
                                          <br />
                                          <b>Pickup Timings:</b> <u>6am</u>{" "}
                                          <br />
                                          <b>Destination:</b>{" "}
                                          <u>The City School, H-8, Islamabad</u>
                                          <br />
                                          <b>Contact No:</b> <u>0334-9594377</u>
                                          <br />
                                          <b>Return Timings:</b> <u>2pm</u>
                                          <br />
                                          <b>Days:</b> <u>Mon-Fri</u>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-2">
                                    <div
                                      className="card mx-2 border-0"
                                      style={{ width: "20rem" }}
                                    >
                                      <p>
                                        <b>Age:</b> <u>16Years</u> <br />
                                        <b>No.of Seats:</b> 1 <br />
                                        <b>Seat for:</b> <u> Girl</u>
                                        <br />
                                        <b>Payment Terms (perDay):</b>{" "}
                                        <u>Rs.350</u>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card-body">
                                <button
                                  href="/"
                                  className=" btn_view1 btn-block "
                                >
                                  Approve
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CommuterProfile;
