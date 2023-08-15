import React, { useEffect, useState } from "react";
import Navbar from "./Hompage-components/Navbar";
import { Helmet } from "react-helmet-async";
import Footer from "./Hompage-components/Footer";
import { BASE_URL } from "../../constants";

const FrontendLayout = ({ children }) => {
  useEffect(() => {
    document.getElementById("root").classList.add("w-100");
    document.getElementById("root").classList.remove("d-flex");
    document.getElementById("root").classList.remove("flex-grow-1");
  }, []);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href={`${BASE_URL}/assets/css/frontend.css`} />
      </Helmet>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default FrontendLayout;
