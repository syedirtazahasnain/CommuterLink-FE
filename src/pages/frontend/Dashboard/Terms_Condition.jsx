import React from "react";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import { BASE_URL } from "../../../constants";

const Terms_Condition = () => {
  const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
    // backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
    // Set the desired height of the background area
  };
  const backgroundStyle1 = {
    backgroundImage: `url(${BASE_URL}/assets/images/Sysreformslogo2.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
  };
  const backgroundMember = {
    backgroundImage: `url(${BASE_URL}/assets/images/Group 40.png)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
    backgroundColor: "#198754",
  };
  return (
   
            <div
              className="card bg-light w-100 "
           
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
                            <img src={`${BASE_URL}/assets/images/pic.png`} className alt />
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
                          border:'0'
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
                       <div className="card-body" style={{}}>
                        <div className="card-title">
                            <h2 className="text-success">MEMBERS REQUESTS</h2>
                        </div>
                       </div>
                        </div>

                        <div className="card px-5 py-5" style={{ border: "0", backgroundColor: "rgba(162 229 198)" }}>
                          <div class="card-header bg-light mb-2">
                            <h1 className="text-center text-success m-auto">
                              TERMS & CONDITIONS
                            </h1>
                          
                               <div className="card bg-light justify-content-center" style={{border:'0'}}>

                               <div className="card-body"><p>1.Your car is in a good shape and is roadworthy</p>
                                    <p className="">2. You are committed to provide the car for commuting of partners on all days
                                        mentioned in the agreement</p>
                                        
                                        <p>3.If due to any unforeseen reason you cannot commute on certain day, no fee will be paid for that day</p>
                                        <p>4.You will inform the partners well in advance (atleast 12 hours) about your inability to cummute on a certain day.
                                            In case of an emergency this can be waived off under exceptional circumstances
                                        </p>
                                        <p>5.You will be paid on daily basis for actual number of days that your car is used</p>
                                        <p>6.If a commuting partner misses the car and fails to commute due to late arrival/time off you will still be paid for that day</p>
                                       <p>7. You will wait at least 15 minute after the agreed time for commuting partner to join you.</p>
                                            <p>8. You will update the scheduler in your dashboard on daily(as and when required basis)</p>
                                            <p>9. You will receive your share of fee through CommutersLink and there will be no direct transaction between 
                                                you and your commuting partner
                                            </p>
                                            <p>
                                                10. If you wish to discontinue your partnership with a member due  a reason or other CommutersLink will inform 
                                                the partner on your behalf (insert alink here "why to receive payment through commutersLink")
                                            </p>
                                            11. Any complaints, grievances will be addressed to CommutersLink for resolution
                                        </div>
                             <div className="card-body">
                                <button href="/" className=" btn_view1 btn-block ">I Accept</button>
                             </div>
                               </div>
                              
                              
                           
                                        </div>

                         <div className="card">
                           
                         </div>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
       
  );
};

export default Terms_Condition;
