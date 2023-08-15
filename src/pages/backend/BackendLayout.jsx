import React, { useEffect, useState } from "react";
import { ThemeProvider, Tooltip, createTheme } from "@mui/material";
//import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { setCurrentPage, setSidebarState } from "../../redux/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../redux/loginSlice";
import { BASE_URL } from "../../constants";
// import Dashboard from "../../frontend/Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ff4815",
      contrastText: "white",
    },
  },
});

// const backgroundLogo = {
//   backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
//   backgroundRepeat: "no-repeat",
//   backgroundColor: "white",

// };

const BackendLayout = ({ children }) => {
  // const { instance } = useMsal();
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const sidebarOpened = useSelector((s) => s.general.sidebarOpened);
  const currentPage = useSelector((s) => s.general.currentPage);
  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };
  
  useEffect(() => {
    // dispatch(setCurrentPage(""));
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);
  
  const logout = () => {
    dispatch(setloginState(""));
    document.getElementById("root").classList.add("w-100");
    document.getElementById("root").classList.remove("d-flex");
    document.getElementById("root").classList.remove("flex-grow-1");
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <ThemeProvider theme={customTheme}>
            <link rel="stylesheet" href={`/assets/css/backend.css`} />
            <link rel="stylesheet" href={"/assets/frontend.css"} />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700"
            />
            <div
              className="d-flex flex-column flex-root app-root"
              id="kt_app_root"
            >
              <div
                className="app-page flex-column flex-column-fluid"
                id="kt_app_page"
              >
                <div id="kt_app_header" className="app-header">
                  <div
                    className="w-100 d-flex align-items-stretch justify-content-between"
                    id="kt_app_header_container"
                  >
                    <div
                      className="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2"
                      title="Show sidebar menu"
                    >
                      <button
                        className="btn btn-icon btn-active-color-primary w-35px h-35px"
                        id="kt_app_sidebar_mobile_toggle"
                        onClick={() =>
                          dispatch(setSidebarState(!sidebarOpened))
                        }
                      >
                        <span className="svg-icon svg-icon-2 svg-icon-md-1">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                              fill="currentColor"
                            ></path>
                            <path
                              opacity="0.3"
                              d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                    <div className="header card-dashboardheader border border-secondary d-flex py-1 w-100 ps-4">
                      <div className="header-left mr-auto mx-4 d-flex flex-grow-1 py-2">
                        <div className="d-block">
                          <p className=" my-auto pvs-title fw-normal text-uppercase">
                            Monday, July 04, 2022{" "}
                          </p>
                          <h5>Welcome Yasir Abbas Mirza!</h5>
                        </div>
                      </div>
                      <div className="header-right">
                        <div
                          className="app-navbar-item"
                          id="kt_header_user_menu_toggle"
                        >
                          <div
                            className="d-flex"
                            data-kt-menu-trigger="{default: 'click', lg: 'hover'}"
                            data-kt-menu-attach="parent"
                            data-kt-menu-placement="bottom-end"
                          >
                            <div className="text-center">
                              <div className="mt-3 px-4">
                                <Tooltip title="Notifications">
                                  <Link to="#" className="d-inline-block">
                                    <i className="fa-solid fa-bell fs-3 icon-green mt-2 mx-4"></i>
                                  </Link>
                                </Tooltip>
                                <Tooltip title="Logout">
                                  <button
                                    className="btn btn-sm btn-green text-white rounded rounded-2"
                                    data-bs-toggle="modal"
                                    data-bs-target="#kt_modal_new_target"
                                    onClick={logout}
                                  >
                                    LOG OUT
                                  </button>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="d-flex align-items-stretch justify-content-between flex-lg-grow-1"
                      id="kt_app_header_wrapper"
                    >
                      <div
                        className="app-header-menu app-header-mobile-drawer align-items-stretch"
                        data-kt-drawer="true"
                        data-kt-drawer-name="app-header-menu"
                        data-kt-drawer-activate="{default: true, lg: false}"
                        data-kt-drawer-overlay="true"
                        data-kt-drawer-width="250px"
                        data-kt-drawer-direction="end"
                        data-kt-drawer-toggle="#kt_app_header_menu_toggle"
                        data-kt-swapper="true"
                        data-kt-swapper-mode="{default: 'append', lg: 'prepend'}"
                        data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}"
                      ></div>
                    </div>
                  </div>
                </div>
                <div
                  className="app-wrapper flex-column flex-row-fluid"
                  id="kt_app_wrapper"
                >
                  <div
                    id="kt_app_sidebar"
                    className="app-sidebar flex-column"
                    data-kt-drawer="true"
                    data-kt-drawer-name="app-sidebar"
                    data-kt-drawer-activate="{default: true, lg: false}"
                    data-kt-drawer-overlay="true"
                    data-kt-drawer-width="225px"
                    data-kt-drawer-direction="start"
                    data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
                    style={{ backgroundColor: "#198754" }}
                  >
                    <div
                      className="app-sidebar-logo bg-white border-0"
                      id="kt_app_sidebar_logo"
                      // style={backgroundLogo}
                    >
                      <div className="container text-center">
                        <img
                          src={`${BASE_URL}/assets/images/CL-logo.png`}
                          className="img-fluid"
                          style={{ height: "50px", width: "auto" }}
                          alt=""
                        />
                      </div>
                      <button
                        id="kt_app_sidebar_toggle"
                        className="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
                        data-kt-toggle="true"
                        data-kt-toggle-state="active"
                        data-kt-toggle-target="body"
                        data-kt-toggle-name="app-sidebar-minimize"
                      >
                        <span className="svg-icon svg-icon-2 rotate-180">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              opacity="0.5"
                              d="M14.2657 11.4343L18.45 7.25C18.8642 6.83579 18.8642 6.16421 18.45 5.75C18.0358 5.33579 17.3642 5.33579 16.95 5.75L11.4071 11.2929C11.0166 11.6834 11.0166 12.3166 11.4071 12.7071L16.95 18.25C17.3642 18.6642 18.0358 18.6642 18.45 18.25C18.8642 17.8358 18.8642 17.1642 18.45 16.75L14.2657 12.5657C13.9533 12.2533 13.9533 11.7467 14.2657 11.4343Z"
                              fill="currentColor"
                            />
                            <path
                              d="M8.2657 11.4343L12.45 7.25C12.8642 6.83579 12.8642 6.16421 12.45 5.75C12.0358 5.33579 11.3642 5.33579 10.95 5.75L5.40712 11.2929C5.01659 11.6834 5.01659 12.3166 5.40712 12.7071L10.95 18.25C11.3642 18.6642 12.0358 18.6642 12.45 18.25C12.8642 17.8358 12.8642 17.1642 12.45 16.75L8.2657 12.5657C7.95328 12.2533 7.95328 11.7467 8.2657 11.4343Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                    <div className="app-sidebar-menu overflow-hidden flex-column-fluid bg-dark">
                      <div
                        id="kt_app_sidebar_menu_wrapper"
                        className="app-sidebar-wrapper hover-scroll-overlay-y d-flex flex-column"
                        data-kt-scroll="true"
                        data-kt-scroll-activate="true"
                        data-kt-scroll-height="auto"
                        data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
                        data-kt-scroll-wrappers="#kt_app_sidebar_menu"
                        data-kt-scroll-offset="5px"
                        data-kt-scroll-save-state="true"
                      >
                        <div
                          className="menu menu-column menu-rounded menu-sub-indention"
                          id="#kt_app_sidebar_menu"
                          data-kt-menu="true"
                          data-kt-menu-expand="false"
                        >
                          <div className="menu-item">
                            <div className="d-flex align-items-center mx-3  me-5 me-xl-13">
                              {/*begin::Symbol*/}
                              <div className="symbol symbol-50px symbol-circle me-3">
                                <img
                                  src={`${BASE_URL}/assets/images/pic.png`}
                                />
                              </div>
                              {/*end::Symbol*/}
                              {/*begin::Info*/}
                              <div className="m-0">
                                <span className="fw-semibold text-white d-block fs-5">
                                  Yasir Abbas Mirza
                                </span>
                                <button
                                  href="/"
                                  className="btn btn-sm Profile fw-bold text-white  text-hover-dark fs-6 rounded-4"
                                >
                                  Profile
                                </button>
                              </div>
                              {/*end::Info*/}
                            </div>
                          </div>
                          <hr />

                          <div className="menu-item">
                            <Link
                              className={`menu-link ${
                                currentPage == "dashboard" ? "active" : ""
                              }`}
                              to={"/portal"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i className="fas fa-home fa-2x"></i>
                              </span>
                              <span className="menu-title text-white">
                                Dashboard
                              </span>
                            </Link>
                          </div>

                          <hr />
                          <div className="menu-item">
                            <Link
                              className={`menu-link ${
                                currentPage == "insights-generator"
                                  ? "active"
                                  : ""
                              }`}
                              to={"/portal/insights-generator"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i class="fa-solid fa-equals"></i>
                              </span>
                              <span className="menu-title text-white">
                                Matches
                              </span>
                            </Link>
                          </div>

                          <hr />
                          <div className="menu-item">
                            <Link
                              className={`menu-link ${
                                currentPage == "insights-generator"
                                  ? "active"
                                  : ""
                              }`}
                              to={"/portal/insights-generator"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i class="fa-solid fa-code-pull-request"></i>
                              </span>
                              <span className="menu-title text-white">
                                Requests
                              </span>
                            </Link>
                          </div>

                          <hr />
                          <div className="menu-item">
                            <Link
                              className={`menu-link ${
                                currentPage == "news-management" ? "active" : ""
                              }`}
                              to={"/portal/news-management"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i class="fa-solid fa-bell"></i>
                              </span>

                              <span className="menu-title text-white">
                                Notification
                              </span>
                            </Link>
                          </div>
                          <hr />
                          <div className="menu-item">
                            <Link
                              className={`menu-link ${
                                currentPage == "news-management" ? "active" : ""
                              }`}
                              to={"/portal/news-management"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i class="fa-solid fa-handshake"></i>
                              </span>
                              <span className="menu-title text-white">
                                Partner Details
                              </span>
                            </Link>
                          </div>

                          <hr />
                          <div className="menu-item">
                            <Link
                              className={`menu-link ${
                                currentPage == "news-management" ? "active" : ""
                              }`}
                              to={"/portal/news-management"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i class="fa-solid fa-computer"></i>
                              </span>
                              <span className="menu-title text-white">
                                My Computer Records
                              </span>
                            </Link>
                          </div>

                          <hr />
                          <div className="menu-item">
                            <Link
                              className={`menu-link ${
                                currentPage == "news-management" ? "active" : ""
                              }`}
                              to={"/portal/news-management"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i class="fa-solid fa-wallet"></i>
                              </span>
                              <span className="menu-title text-white">
                                My Wallet
                              </span>
                            </Link>
                          </div>

                          <hr />
                        </div>
                        <div
                          className={
                            sidebarOpened
                              ? "text-center mt-auto"
                              : "px-7 mt-auto"
                          }
                        >
                          {/* <Link to='/changelog' className='text-secondary'>{APP_VERSION}</Link> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Dashboard Content */}

                  <div className="px-4">
                    {children}
                    <div className="d-flex flex-column flex-column-fluid">
                      <div
                        id="kt_app_content"
                        className="app-content flex-column-fluid"
                      >
                        <div
                          id="kt_app_content_container"
                          className="app-container container-fluid"
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* to be deleted */}
                  <div className="bg-primary w-100">
                    <div className="card bg-light w-100 ">
                      <div className="card-body p-0">
                        <div className="row">
                          <div
                            className="col-lg-12 col-md-6 col-sm-4 d-flex p-0 justify-content-center"
                            style={{ backgroundColor: "#8FC4B7", border: "0" }}
                          >
                            <div className="col-lg-9 px-5">
                              <div
                                className="card d-flex  d-flex justify-content-center"
                                style={{
                                  width: "65rem",
                                  backgroundColor: "rgba(157,233,222,0.75)",
                                }}
                              >
                                <div
                                  id="kt_app_toolbar_container"
                                  className="app-container container-fluid d-flex flex-stack"
                                ></div>

                                <div
                                  className="card"
                                  style={{
                                    border: "1",
                                    backgroundColor: "#D9D9D9",
                                  }}
                                >
                                  <div class="card-header bg-dark mb-2">
                                    <h3 className="text-center text-warning m-auto">
                                      {" "}
                                      TRAVEL BUDDIES FOR YOUR CAR{" "}
                                    </h3>
                                  </div>
                                  <div className="row d-flex m-auto">
                                    <div className="col-12">
                                      <div className="card rounded-4">
                                        <div
                                          className="card-header rounded-top-4 "
                                          style={{ backgroundColor: "#2a402a" }}
                                        >
                                          <h4 className="m-auto text-white">
                                            COMMUTERSLINK SUGGESTIONS
                                          </h4>
                                        </div>
                                        <div
                                          className="card-body border border-1 border-dark py-5"
                                          style={{ backgroundColor: "#D9D9D9" }}
                                        >
                                          <p className="card-title text-center">
                                            Based upon your Profile, We have
                                            Following{" "}
                                            <span className="fs-5 fw-bold">
                                              Matches{" "}
                                            </span>
                                            to Offer
                                          </p>
                                          <div
                                            className="card m-auto border-0"
                                            style={{
                                              width: "50rem",
                                              backgroundColor: "#D9D9D9",
                                            }}
                                          >
                                            <div class="row d-flex justify-content-center">
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
                                                    className="card-title text-light text-center"
                                                    style={{
                                                      width: "6rem",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                      route();
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
                                                    style={{
                                                      width: "6rem",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                      route();
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

                                          <button className="btn btn_view d-flex justify-content-end">
                                            VIEW MORE
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="card"
                                  style={{
                                    border: "1",
                                    backgroundColor: "#D9D9D9",
                                  }}
                                >
                                  <div class="card-header bg-dark  mb-2">
                                    <h3 className="text-center text-warning m-auto">
                                      {" "}
                                      GET A SEAT/S IN THEIR CAR{" "}
                                    </h3>
                                  </div>
                                  <div className="row d-flex m-auto ">
                                    <div className="col-12">
                                      <div className="card rounded-4">
                                        <div
                                          className="card-header rounded-top-4"
                                          style={{ backgroundColor: "#2a402a" }}
                                        >
                                          <h4 className="m-auto text-white">
                                            REQUESTS BY MEMBERS
                                          </h4>
                                        </div>
                                        <div
                                          className="card-body border border-1 border-dark"
                                          style={{ backgroundColor: "#D9D9D9" }}
                                        >
                                          <p className="card-title text-center">
                                            Based upon your Profile, We have
                                            Following{" "}
                                            <span className="fs-5 fw-bold">
                                              Requests{" "}
                                            </span>
                                            to Offer
                                          </p>
                                          <div
                                            className="card m-auto border-0"
                                            style={{
                                              width: "50rem",
                                              backgroundColor: "#D9D9D9",
                                            }}
                                          >
                                            <div class="row d-flex justify-content-center">
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

                                          <button className="btn btn_view d-flex justify-content-end">
                                            VIEW MORE
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className="card"
                                  style={{
                                    border: "1",
                                    backgroundColor: "#D9D9D9",
                                  }}
                                >
                                  <div class="card-header bg-dark mb-2">
                                    <h3 className="text-center text-warning m-auto">
                                      {" "}
                                      MY TRAVEL PARTNERS{" "}
                                    </h3>
                                  </div>
                                  <div className="row m-auto">
                                    <div className="col-12">
                                      <div
                                        className="card rounded-4 border-1"
                                        style={{ backgroundColor: "#D9D9D9" }}
                                      >
                                        <div className="card-body border border-1 border-dark">
                                          <div
                                            className="card m-auto border-0"
                                            style={{
                                              width: "50rem",
                                              backgroundColor: "#D9D9D9",
                                            }}
                                          >
                                            <div class="row d-flex justify-content-center">
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

                                          <button className="btn btn_view d-flex text-success justify-content-end">
                                            Change My Partner
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div></div>

                                <div
                                  className="card py-2"
                                  style={{
                                    border: "1",
                                    backgroundColor: "#D9D9D9",
                                  }}
                                >
                                  <div className="row d-flex m-auto ">
                                    <div className="col-12">
                                      <div className="card rounded-4">
                                        <div
                                          className="card-body border border-1 border-dark"
                                          style={{ backgroundColor: "#D9D9D9" }}
                                        >
                                          <div
                                            className="card m-auto border-0"
                                            style={{
                                              width: "50rem",
                                              backgroundColor: "#D9D9D9",
                                            }}
                                          >
                                            <div
                                              className="card border-0"
                                              style={{
                                                backgroundColor: "#D9D9D9",
                                              }}
                                            >
                                              <div className="row d-flex justify-content-between">
                                                <div className="col-4 mx-2">
                                                  <div
                                                    className="card "
                                                    style={{ width: "22rem" }}
                                                  >
                                                    <div
                                                      className="card-header text-white"
                                                      style={{
                                                        backgroundColor:
                                                          "#2a402a",
                                                      }}
                                                    >
                                                      <h4 className="text-center text-white m-auto">
                                                        MY WALLET
                                                      </h4>
                                                    </div>
                                                  </div>
                                                  <div className="row d-flex justify-content-between ">
                                                    <div className="col-md-2">
                                                      <i className=" p-3 fa-solid text-success fa-wallet"></i>
                                                      <button className="btn btn_view text-success d-flex justify-contnet-end">
                                                        Recharge
                                                      </button>
                                                    </div>
                                                    <div className="col-md-2">
                                                      <div
                                                        className="card border-0"
                                                        style={{
                                                          width: "6rem",
                                                          backgroundColor:
                                                            "#D9D9D9",
                                                        }}
                                                      >
                                                        {" "}
                                                        <p className="py-3 text-center fw-bold text-success">
                                                          Rs.0/
                                                        </p>
                                                        <button className="btn btn_view text-success d-flex justify-content-end">
                                                          View Transaction
                                                          History
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                <div className="col-6">
                                                  <div
                                                    className="card mx-3"
                                                    style={{
                                                      width: "20rem",
                                                      backgroundColor:
                                                        "#D9D9D9",
                                                    }}
                                                  >
                                                    <div
                                                      className="card-header"
                                                      style={{
                                                        backgroundColor:
                                                          "#2a402a",
                                                      }}
                                                    >
                                                      <h4 className="m-auto  text-white">
                                                        Cost Per Seat per day
                                                      </h4>
                                                    </div>
                                                    <div className="">
                                                      <div
                                                        className="card-body mx-5"
                                                        style={{
                                                          width: "15rem",
                                                        }}
                                                      >
                                                        <div class="row d-flex fw-bold text-center text-success justify-content-center">
                                                          Rs.0000/-
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
                                <div
                                  className="card"
                                  style={{
                                    border: "1",
                                    backgroundColor: "#D9D9D9",
                                  }}
                                >
                                  <div class="card-header bg-dark mb-2">
                                    <h3 className="text-center text-warning m-auto">
                                      TRAVEL CONFIRMATION
                                    </h3>
                                  </div>
                                  <div className="row d-flex m-auto">
                                    <div className="col-12">
                                      <div className="card rounded-4">
                                        <div
                                          className="card-body border border-1 border-dark"
                                          style={{ backgroundColor: "#D9D9D9" }}
                                        >
                                          <div
                                            className="card m-auto border-0"
                                            style={{
                                              width: "50rem",
                                              backgroundColor: "#D9D9D9",
                                            }}
                                          >
                                            <p className="text-success text-center fw-bold">
                                              After starting travelling with
                                              someone you will be able to
                                              confirm your date of travel
                                            </p>
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
                  {/* to be deleted */}
                </div>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default BackendLayout;
