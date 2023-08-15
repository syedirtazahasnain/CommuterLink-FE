import React, { useEffect } from "react";
import Navbar from "./Hompage-components/Navbar";
import Footer from "./Hompage-components/Footer";
import { BASE_URL } from "../../constants";

const FrontendLayout = ({ children }) => {
  
  useEffect(() => {
    document.getElementById("root").classList.add("w-100");
    document.getElementById("root").classList.remove("d-flex");
    document.getElementById("root").classList.remove("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  return (
    <>
      <link rel="stylesheet" href={`${BASE_URL}/public/assets/css/frontend.css`} />
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default FrontendLayout;
