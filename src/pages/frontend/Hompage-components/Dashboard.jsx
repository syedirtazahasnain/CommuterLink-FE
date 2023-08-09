import React, {useState} from "react";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import logo from "../../../Images/CL-logo.png";
import img1 from "../../../Images/pic.png";
import logo2 from "../../../Images/Sysreforms logo 2.png";
import membericon from "../../../Images/Group 40.png";
import membericon1 from '../../../Images/Vector.png'
import downline from '../../../Images/downline of membericon.png'
import  questionmark from "../../../Images/qustionmark.png";
import { useNavigate } from "react-router-dom";
import CommuterProfile from "../Dashboard/CommuterProfile";
import { useDispatch, useSelector } from "react-redux";
import { setloginState } from "../../../redux/loginSlice";

const Dashboard = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userToken = useSelector((s) => s.login.data.token);
  const [submitbtn , setSubmit] = useState(false);

  // console.log(userToken);

  const route = () => {
    setSubmit(true);
    
    if(!submitbtn){
      navigate("/commuter-profile");
    }
  }

  const logout = () => {
    dispatch(setloginState(""));
    navigate("/login");
  }

  const backgroundStyle = {
    backgroundImage: `url(${logo})`,
    // backgroundSize: 'cover',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "100",
    height: "20vh",
    // Set the desired height of the background area
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
    
            <div
              className="card bg-light w-100 "
            
            >
              <div className="card-body">
                <h5 className="card-title text_underline">
                  OFFERING A CAR TO OFFICE (SYSTEM SUGGESTED MATCHES)
                </h5>
                <h2 className="card-subtitle mb-2  second_heading">
                  OFFERING A CAR TO OFFICE (SYSTEM SUGGESTED MATCHES)
                </h2>
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
                          backgroundColor: "rgba(157,233,222,0.75)",
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
                           
                          </div>
                         
                          <div className="d-flex align-items-center gap-2 gap-lg-3">
                          
                            <i
                              className="fas fa-bell text-success"
                              style={{ fontSize: "2rem" }}
                            ></i>
                           
                            <a
                              className="btn btn-sm fw-bold btn-success"
                              data-bs-toggle="modal"
                              data-bs-target="#kt_modal_new_target"
                              onClick={logout}
                            >
                              LOG OUT
                            </a>
                           
                          </div>

                         
                        </div>
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-4 ml-4">
                          <div className="border border-bottom border-success justify-content-center ml-3"></div>
                          <p className="justify-content-center px-3">
                            You are looking for travel buddles to ride your car,
                            others who want to share their car and to connect
                            with members with whom you can take{" "}
                          </p>
                        </div>

                        <div className="card" style={{ border: "1" }}>
                          <div class="card-header bg-dark text-warning mb-2">
                            <h3 className="text-center m-auto">
                              {" "}
                              TRAVEL BUDDIES FOR YOUR CAR{" "}
                            </h3>
                          </div>
                          <div className="row d-flex m-auto ">
                            <div className="col-6">
                              <div className="card rounded-4">
                                <div
                                  className="card-header rounded-top-4  text-white"
                                  style={{ backgroundColor: "#2a402a" }}
                                >
                                  <h4 className="m-auto">COMMUTERSLINK SUGGESTIONS</h4>
                                </div>
                                <div className="card-body">
                                  <p className="card-title text-center">
                                    Based upon your Profile, We have Following
                                    Matches to Offer
                                  </p>
                                  <div
                                    className="card m-auto"
                                    style={{ width: "20rem" }}
                                  >
                                    <div class="row d-flex justify-content-center">
                                      <div className="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem", cursor: "pointer"}} onClick={()=>{route()}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                      <div className="col-sm-4">
                                        <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                        
                                      </div>
                                      <div class="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <button className="btn btn_view d-flex justify-content-end">VIEW MORE</button>
                                  </div>
                                  
                             
                              </div>
                            </div>
   
                            <div className="col-6">
                              <div className="card">
                                <div
                                  className="card-header  text-white"
                                  style={{ backgroundColor: "#2a402a" }}
                                >
                                  <h4 className="m-auto">Request By Members</h4>
                                </div>
                                <div className="card-body">
                                  <p className="card-title text-center">
                                    Based upon your Profile, We have Following
                                    Matches to Offer
                                  </p>
                                  <div
                                    className="card m-auto"
                                    style={{ width: "20rem" }}
                                  >
                                    <div class="row d-flex justify-content-center">
                                      <div className="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <button className="btn btn_view d-flex justify-content-end">VIEW MORE</button>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card" style={{ border: "1" }}>
                          <div class="card-header bg-dark text-warning mb-2">
                            <h3 className="text-center m-auto">
                              {" "}
                              GET A SEAT/S IN THEIR CAR{" "}
                            </h3>
                          </div>
                          <div className="row d-flex m-auto ">
                            <div className="col-6">
                              <div className="card rounded-4">
                                <div
                                  className="card-header rounded-top-4  text-white"
                                  style={{ backgroundColor: "#2a402a" }}
                                >
                                  <h4 className="m-auto">COMMUTERSLINK SUGGESTIONS</h4>
                                </div>
                                <div className="card-body">
                                  <p className="card-title text-center">
                                    Based upon your Profile, We have Following
                                    Matches to Offer
                                  </p>
                                  <div
                                    className="card m-auto"
                                    style={{ width: "20rem" }}
                                  >
                                    <div class="row d-flex justify-content-center">
                                      <div className="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <button className="btn btn_view d-flex justify-content-end">VIEW MORE</button>
                                  </div>
                                  
                             
                              </div>
                            </div>
   
                            <div className="col-6">
                              <div className="card">
                                <div
                                  className="card-header  text-white"
                                  style={{ backgroundColor: "#2a402a" }}
                                >
                                  <h4 className="m-auto">Request By Members</h4>
                                </div>
                                <div className="card-body">
                                  <p className="card-title text-center">
                                    Based upon your Profile, We have Following
                                    Matches to Offer
                                  </p>
                                  <div
                                    className="card m-auto"
                                    style={{ width: "20rem" }}
                                  >
                                    <div class="row d-flex justify-content-center">
                                      <div className="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "6rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                            <div className="card-title m-auto text-light"
                                             style={{width:"5rem"}}>Member ID</div>
                                         <img className="" src={downline}/>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <button className="btn btn_view d-flex justify-content-end">VIEW MORE</button>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="card" style={{ border: "1" }}>
                        
                          <div className="row d-flex">
                            <div className="col-5 px-4">
                              <div className="card rounded-4" style={{width:'22rem'}}>
                                <div
                                  className="card-header rounded-top-4  text-white"
                                  style={{ backgroundColor: "#2a402a" }}
                                >
                                  <h4 className="m-auto">MY COMMUTE RECORD</h4>
                                </div>
                                <div className="card-body">
                                  </div>
                                  
                             
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="card rounded-4" style={{width:'16rem'}}>
                                <div
                                  className="card-header rounded-top-4  text-white"
                                  style={{ backgroundColor: "#2a402a" }}
                                >
                                  <h4 className="m-auto">MY WALLET</h4>
                                </div>
                                <div className="card-body">
                                <div className="title text-success px-5  fw-bolder">Rs.</div>
                                  </div>
                                  
                             
                              </div>
                            </div>
                            <div className="col-3 px-5">
                              <div className="card rounded-4" style={{width:'16rem'}}>
                                <div
                                  className="card-header rounded-top-4  text-white"
                                  style={{ backgroundColor: "#2a402a" }}
                                >
                                  <h4 className="m-auto">PARTNERS DETAILS</h4>
                                </div>
                               <div className="">
                               <div
                                    className="card"
                                    style={{ width: "15rem" }}
                                  >
                                    <div class="row d-flex justify-content-center">
                                      <div className="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "5rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                        
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "5rem" }}
                                        >
                                          <img
                                            src={membericon1}
                                            className="card-img-top w-40px m-auto "
                                            
                                          />
                                
                                        
                                        </div>
                                      </div>
                                      <div class="col-sm-4">
                                      <div
                                          className="card bg-success"
                                          style={{ width: "5rem" }}
                                        >
                                          <img
                                            src={questionmark}
                                            className="card-img-top w-35px m-auto "
                                            
                                          />
                                
                                         
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
              </div>
            </div>
       
  );
};

export default Dashboard;
