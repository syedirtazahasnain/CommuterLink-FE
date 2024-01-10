import React, { useEffect, useState } from "react";
import Navbar from "./Hompage-components/Navbar";
import Footer from "./Hompage-components/Footer";
import { BASE_URL } from "../../constants";
import Loading from "./register-form/Loading";

const FrontendLayout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.getElementById("root").classList.add("w-100");
    document.getElementById("root").classList.remove("d-flex");
    document.getElementById("root").classList.remove("flex-grow-1");
    window.KTToggle.init();
    window.KTScroll.init();
  }, []);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 5000 milliseconds (5 seconds)

    return () => clearTimeout(loaderTimeout);
  }, []);

  return (
    <div className="pt-5">
     
      <link rel="stylesheet" href={`${BASE_URL}/public/assets/css/frontend.css`} />
      {isLoading ? (<div className="d-flex align-items-center mx-auto my-auto justify-content-center">
          <Loading />
        </div>):(
           <>
           <Navbar />
      {children}
      <Footer /></>
      )}
     
    </div>
  );
};

export default FrontendLayout;
