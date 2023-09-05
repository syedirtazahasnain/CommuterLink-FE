import React, { useEffect, useState } from "react";
import { ThemeProvider, Tooltip, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { setSidebarState } from "../../redux/generalSlice";
import { useSelector, useDispatch } from "react-redux";
import { setloginState } from "../../redux/loginSlice";
import { API_URL, BASE_URL, IMAGE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { setsignupState } from "../../redux/signupSlice";
import { Button } from "@mui/base";
import Swal from "sweetalert2";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ff4815",
      contrastText: "white",
    },
  },
});

const BackendLayout = ({ children }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const currentPage = useSelector((s) => s.general.currentPage);
  const sidebarOpened = useSelector((s) =>s.general.sidebarOpened);
  const [name , setName] = useState("");
  const [image , setImage] = useState("");
  const [submitbtn , setSubmit] = useState(false); 

  // For getting current date
  const currentDate = new Date();

  // Define arrays for days and months
  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];

  const monthsOfYear = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Format the date
  const formattedDate = `${daysOfWeek[currentDate.getDay()]}, ${monthsOfYear[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const route = () => {
    setSubmit(true);
    
    if(!submitbtn){
      navigate("/commuter-profile");
    }
  }

  const logout = () => {
    if (
      Swal.fire({
        position:'top',
        title: 'Are you sure?',
        text: "You are about to logout from commuterLink",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Logout'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position:'top',
            title: 'Logout',
            text:'Successful'
          })
          dispatch(setloginState(""));
          dispatch(setsignupState(""));
          navigate("/login");
        }
      })
  
    ){
    }
  }
  
  useEffect(() => {
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try{
      const response = await fetch(
        `${API_URL}/api/v1/profile`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization : `Bearer ${userToken}`,
          },
        }
      );

      const jsonresponse = await response.json();
      if(jsonresponse){
        setName(jsonresponse[0].name);
        setImage(jsonresponse[0].contact.commuter_image);
        //console.log("Image", jsonresponse[0].contact.commuter_image);
      }
      else {
        setName("");
        setImage("");
      }

      if(jsonresponse.statusCode === 500){
        Swal.fire({
          position:'top',
          icon: 'error',
          text: `${jsonresponse.message}`
        })
      }

      console.log("Profile Data", jsonresponse);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 bg-light-lime" >
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
                className="app-page flex-column flex-column-fluid bg-light-lime"
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
                    <div className="header shadow shadow-sm card-dashboardheader bg-white d-flex py-1 w-100 ps-4">
                      <div className="header-left mr-auto mx-4 d-flex flex-grow-1 py-2">
                        <div className="d-block">
                          <p className=" my-auto fw-normal text-uppercase">
                            {formattedDate}
                          </p>
                          {name ? (<h5 className="fw-bold">Welcome {name}!</h5>) : (<h5 className="fw-bold">Welcome Yasir Abbas Mirza!</h5>)}
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
                      <div className="text-end d-none d-sm-flex flex-column justify-content-start py-2">
                        <span className="align-self-end lead">
                        <div className="d-block">
                          {/* <p className=" my-auto fw-normal text-uppercase">
                            {formattedDate}
                          </p> */}
                          {name ? (<h6 className="fs-7 fw-bold"> {name}</h6>) : (<h6 className="fs-7 fw-bold">Yasir Abbas Mirza</h6>)}
                          <p className="fw-bold fs-6 text-dark">USER ROLE</p>
                        </div>                        </span>
                        {/* <div>
                          <span
                            className="{font-family-default cursor-pointer text-decoration-underline"
                                
                          >
                            EN
                          </span>
                          <span className="line">|</span>
                          <span
                            className="{font-family-default cursor-pointer text-decoration-underline"
                                
                          >
                            FR
                          </span>
                          <span className="line">|</span>
                          <span
                            className="{font-family-default cursor-pointer text-decoration-underline"
                                
                          >
                            ES
                          </span>
                        </div> */}
                      </div>
                      <div className="text-center">
                        <div className="symbol symbol-50px symbol-circle me-3" style={{height:"10px"}}>
                              {image ? 
                                (
                                  <img
                                    src={`${IMAGE_URL}${image}`}
                                    style={{height:"35px", width:"35px"}}
                                  />
                                ) : 
                                (
                                  <img
                                    src={`${BASE_URL}/assets/images/pic.png`}
                                    style={{height:"35px", width:"35px"}}
                                  />
                                )} 
                              </div>                        
                        {/* <div className="border border-pvs border-1 cursor-pointer symbol symbol symbol-circle symbol-35px mb-2">
                              </div> */}
                        <div className="h-15px me-3 mt-3">
                          {/* <Notifications /> */}

                          <Tooltip title="Notifications">
                            <Link
                              to='/notification'
                              className='mx-1 h-15px d-inline-block'
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fa-regular fs-6 fa-bell icon-green mt-2"></i>
                            </Link>
                          </Tooltip>
                          <Tooltip title="Settings">
                            <Link
                              to='/portal/profile'
                              className='mx-1 h-15px d-inline-block'
                              style={{ cursor: "pointer" }}
                            >
                              <img className=" mb-2"
                            src={`${BASE_URL}/assets/images/settings.png`}
                          />
                              {/* <i className="fa-solid fa-gear icon-green mt-2"></i> */}
                            </Link>
                          </Tooltip>

                          <Tooltip title="Logout">
                            <a
                              onClick={logout}
                              className='mx-1 h-15px d-inline-block'
                              style={{ cursor: "pointer" }}
                            >
                              <i className="fa-solid fa-power-off fs-6 icon-green mt-2"></i>
                            </a>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                      {/* <div className="header-right">
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
                                  <Link to="/notification" className="d-inline-block">
                                    <i className="fa-solid fa-bell fs-3 icon-green mt-2 mx-4"></i>
                                  </Link>
                                </Tooltip>
                                <Tooltip title="Logout">
                                  <Button
                                    className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
                                    onClick={logout}
                                  >
                                    LOG OUT
                                  </Button>
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
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
                  >
                    <div
                      className="app-sidebar-logo sidebar-bg border-1"
                      id="kt_app_sidebar_logo"
                    >
                      <div className="container text-center" id="kt_app_sidebar_logo">
                        <img
                          src={`${BASE_URL}/assets/images/CL-logo.png`}
                          className="img-fluid app-sidebar-logo-default"
                          style={{ height: "50px", width: "auto" }}
                          alt=""
                        />
                         <img
                          src={`${BASE_URL}/assets/images/CL-logo-small.png`}
                          className="h-40px app-sidebar-logo-minimize img-fluid w-auto"
                          style={{ height: "50px", width: "auto" }}
                          alt=""
                        />
                      </div>
                      <button
                        id="kt_app_sidebar_toggle"
                        className="app-sidebar-toggle btn btn-icon  btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
                        data-kt-toggle="true"
                        data-kt-toggle-state="active"
                        data-kt-toggle-target="body"
                        data-kt-toggle-name="app-sidebar-minimize"
                      >
                        <span className="svg-icon svg-icon-2 rotate-180 text-success">
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
                    <div className="app-sidebar-menu overflow-hidden fw-normal flex-column-fluid sidebar-bg">
                      <div
                        id="kt_app_sidebar_menu_wrapper"
                        className="app-sidebar-wrapper fw-normal hover-scroll-overlay-y d-flex flex-column"
                        data-kt-scroll="true"
                        data-kt-scroll-activate="true"
                        data-kt-scroll-height="auto"
                        data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
                        data-kt-scroll-wrappers="#kt_app_sidebar_menu"
                        data-kt-scroll-offset="5px"
                        data-kt-scroll-save-state="true"
                      >
                        <div
                          className="menu menu-column fw-normal menu-rounded menu-sub-indention"
                          id="#kt_app_sidebar_menu"
                          data-kt-menu="true"
                          data-kt-menu-expand="false"
                        >
                          {/* <div >
                            <div className="d-flex align-items-center mx-3  me-xl-13">
                              <div className="symbol symbol-50px symbol-circle me-3">
                              {image ? 
                                (
                                  <img
                                    src={`${IMAGE_URL}${image}`}
                                  />
                                ) : 
                                (
                                  <img
                                    src={`${BASE_URL}/assets/images/pic.png`}
                                  />
                                )} 
                              </div>
                              <div className="m-0">
                                <span className="fw-semibold text-white d-block fs-5 mb-1">
                                {name ? (name) : ("Yasir Abbas Mirza")}
                                </span>
                                <Link
                                  to="/viewprofile"
                                  className=" btn-sm Profile fw-bold text-white  text-hover-dark fs-6 py-2 px-3 rounded-4"
                                >
                                  Profile
                                </Link>
                              </div>
                            </div>
                          </div> */}
                          {/* <hr /> */}

                          <div className="menu-item border-custom">
                            <Link
                              className={`menu-link ${
                                currentPage == "dashboard" ? "active" : ""
                              }`}
                              to={"/dashboard"}
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
                          <div className="menu-item border-custom">
                            <Link
                              className={`menu-link ${
                                currentPage == "profile" ? "active" : ""
                              }`}
                              to={"/viewprofile"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i className="fas fa-solid fa-user fa-2x"></i>
                              </span>
                              <span className="menu-title text-white">
                                Profile
                              </span>
                            </Link>
                          </div>
                          <div className="menu-item border-custom">
                            <Link
                              className={`menu-link ${
                                currentPage == "termscondition"
                                  ? "active"
                                  : ""
                              }`}
                              to={"/termscondition"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                              <i class="fa-regular fa-file-lines"></i>
                              {/* <i className="fa-solid fa-terminal"></i> */}
                              </span>
                              <span className="menu-title text-white">
                                Terms and Conditions
                              </span>
                            </Link>
                          </div>
                          <div className="menu-item border-custom">
                            <Link
                              className={`menu-link ${
                                currentPage == "notification" ? "active" : ""
                              }`}
                              to={"/notification"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i className="fa-solid fa-bell"></i>
                              </span>

                              <span className="menu-title text-white">
                                Notifications
                              </span>
                            </Link>
                          </div>
                          <div className="menu-item border-custom">
                            <Link
                              className={`menu-link ${
                                currentPage == "matchingupdate" ? "active" : ""
                              }`}
                              to={"/driver"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i className="fas fa-solid fa-user fa-2x"></i>
                              </span>
                              <span className="menu-title text-white">
                                Update Matching Criteria
                              </span>
                            </Link>
                          </div>
                          <div className="menu-item border-custom">
                            <Link
                              className={`menu-link ${
                                currentPage == "contactus" ? "active" : ""
                              }`}
                              to={"/contactus"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                              <i className="fa-solid fa-address-card"></i>
                              </span>
                              <span className="menu-title text-white">
                                Contact Us
                              </span>
                            </Link>
                          </div>
                          <div className="menu-item border-custom">
                            <Link
                              className={`menu-link ${
                                currentPage == "whatsapp" ? "active" : ""
                              }`}
                              to={"/whatsapp"}
                              style={{
                                borderRadius: "0%",
                                marginLeft: "0%",
                                marginRight: "0%",
                              }}
                            >
                              <span className="menu-icon">
                                <i className="fa-solid fa-phone"></i>
                              </span>
                              <span className="menu-title text-white">
                                WhatsApp
                              </span>
                            </Link>
                          </div>
                         
                        </div>
                        <div
                          className={
                            sidebarOpened
                              ? "text-center mt-auto"
                              : "px-7 mt-auto"
                          }
                        >
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Content */}

                  <div>
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

