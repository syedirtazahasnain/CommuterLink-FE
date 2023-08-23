import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/base";

const backgroundLogo = {
  backgroundImage: `url(${BASE_URL}/assets/images/CL-logo.png)`,
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
};

const Congratulations = () => {
  const navigate = useNavigate();
  const [submitbtn, setSubmit] = useState(false);

  const route = () => {
    setSubmit(true);

    if (!submitbtn) {
      navigate("/finalstep");
    }
  };

  useEffect(() => {
    document.getElementById("root").classList.remove("w-100");
    document.getElementById("root").classList.add("d-flex");
    document.getElementById("root").classList.add("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

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


            <div className="text-center">
              <span><i className="fa-solid fa-thumbs-up text-warning" style={{ fontSize: '100px' }}></i></span>

            </div>

            <div className="text-center">
              <Button
                className="btn btn-sm fs-6 fw-bold btn-dark-green text-white rounded-4 px-3 py-2 mb-3"
                onClick={route}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Congratulations;
