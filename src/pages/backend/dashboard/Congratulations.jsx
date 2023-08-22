import React, { useEffect, useState } from "react";
import { setloginState } from "../../../redux/loginSlice";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const backgroundLogo = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
};

const Congratulations = ({ children }) => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);
  const dispatch = useDispatch();
  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/commuter-profile");
    }
  };
  useEffect(() => {
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);
  const logout = () => {
    dispatch(setloginState(""));
    navigate("/login");
  };

  return (
    <div>
      <div className="page-title">
        <h3 className="card p-4 text-success my-2 fw-bold">
          Congratulations!
        </h3>
        
      </div>
      <h5 className="card p-2 text-success text-center my-2 fw-bold">
         Your Payment has been Received Successfully and credited to your Wallet 
        </h5>
      <div className="card p-4 bg-light p-2">
        <div className="card" style={{ backgroundColor: "#e5f8f3" }}>
          <div className="card-body">
         
            {/* <h5>Dear XYZ</h5><br/>
            <p className="">
            Thank you for sending me the request for sharing my car.
            </p>
            <p>
            Based upon your profile, I feel that we are a good match. I approve your request
            to commute togeter.
            </p>
            <p>
            Looking forward to sharing
            </p>
          
           <br/>
           
            <p>
             Best Regards
            </p>
            <p>
             hassan raza
            </p>
            */}
<div className="text-center">
<span><i className="fa-solid fa-thumbs-up text-warning"style={{ fontSize: '100px' }}></i></span>

</div>
            
          </div>
         
          <div className="text-center">
            <button
              to="/"
              className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
