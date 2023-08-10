import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Navbar from "../Hompage-components/Navbar";
import Footer from "../Hompage-components/Footer";
import Button from "react-bootstrap/Button";
import img from "../../../Images/contribute-1.jpg";
import logo from '../../../Images/CL-logo.png';

const Verification = () => {

  const backgroundStyle = {
    backgroundImage: `url(${logo})`,
    // backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100',
    height: '20vh'
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
                            src={img}
                            alt="Sample photo"
                            style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '60%' }}
                          />
                        </div>
                        <div className="text-white my-3">hassan3<br />hassan3@test.com</div>
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
                          <button variant="success" className="btn-custom mx-2 text-white bg-success px-4 py-2 rounded rounded-5 text-custom fw-bold">
                            Close
                          </button>
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