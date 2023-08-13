import React from "react";
import { BASE_URL } from "../../../constants";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setsignupState } from "../../../redux/signupSlice";
import { setloginState } from "../../../redux/loginSlice";
import { useNavigate } from "react-router-dom";
import { setOption0State, setOption1State } from "../../../redux/generalSlice";
import { Button } from "react-bootstrap";

const Verification = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector((s) => s.signup.data.name);
  const email = useSelector((s) => s.signup.data.email);

  const route = () => {
    dispatch(setsignupState(""));
    dispatch(setloginState(""));
    dispatch(setOption0State(""));
    dispatch(setOption1State(""));
    navigate("/");
  };
    
  const backgroundStyle = {
    backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
      // backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width:'100',
      height:'20vh'
        // Set the desired height of the background area
  };
  
    
    return (
    
    <div>
      <Navbar />
      <div className="container py-5 ">
        <div className="row justify-content-center pt-15 ">
          <div className="col-lg-4 col-md-4 col-sm-4">
            <div
              className="card text-center border-1 border-success rounded rounded-4"
            >
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
                      className="card-body cardpadding mb-5 py-5 rounded rounded-4"
                      style={{ background: "rgb(22,70,57)" }}
                    >
                      <div>
                  <div>
                          {" "}
                          <img
                            src={`${BASE_URL}/assets/images/CL-logo.png`}
                            alt="Sample photo"
                            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '60%' }}
                          />
                        </div>
                  <div className="text-white">{name}<br/>{email}</div>
                  <h5 className="card-title mt-4" style={{ color: "yellow" }}>
                    Pending Verificaiton
                  </h5>
                </div>
                <div>
                  <p className="text-white text-justify">
                    Thank you for providing all the information. Your membership
                    approval will be notified through email and your mobile
                    number after which, you will be able to access your
                    dashboard and available choices to commute with
                  </p>
                </div>

                <form id="numberForm">
                  <div className="mb-3">
                    
                    <Button variant="success" className="btn-sm" onClick={route}>
                      Close
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
            

      <Footer />
    </div>
  );
};

export default Verification;