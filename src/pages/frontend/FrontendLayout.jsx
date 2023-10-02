import React, { useEffect, useState } from "react";
import Navbar from "./Hompage-components/Navbar";
import Footer from "./Hompage-components/Footer";
import { BASE_URL } from "../../constants";
import { useSelector } from "react-redux";

const FrontendLayout = ({ children }) => {

  const userToken = useSelector((s) => s.login.data.token);
  const [checkStatus, setCheckStatus] = useState(false);
  
  useEffect(() => {
    document.getElementById("root").classList.add("w-100");
    document.getElementById("root").classList.remove("d-flex");
    document.getElementById("root").classList.remove("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  // useEffect(() => {
  //   if (userToken) {
  //     setCheckStatus(true);
  //   }
  // }, [userToken]);

  return (
    <div className="pt-5">
      <link rel="stylesheet" href={`${BASE_URL}/public/assets/css/frontend.css`} />
      {checkStatus === true
        ? null
        : <Navbar />
      }
      {children}
      <Footer />
    </div>
  );
};

export default FrontendLayout;
