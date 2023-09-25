import React, { Component } from "react";
import Slider from "react-slick";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router-dom";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      arrows: false
    };
    return (
      <div className="my-4" id="contribute">
        <div className="section-title text-center">
          <h1 className="heading-color text-black">Socioeconomic
            Angle</h1>
          <h3 className="fs-5 mb-3">Commuterslink has a socioeconomic welfare angle by reducing traffic, hazards, pollution, government spending on communication infrastructure and improving citizen mental health
          </h3>
        </div>
        <Slider {...settings}>
          <div className="">
            <div className="row bg-pink g-0">
              <div className="col-md-7 text-center d-flex">
                <div className="m-auto p-4">
                  <h1 className="text-white fw-bold mb-3">Help Reduce Traffic Congestion</h1>
                  <p className="text-white fs-4">With less traffic easy to regulate the traffic and enforce discipline </p>
                  {/* <img className="img-fluid" src={`${BASE_URL}/assets/images/orange-car.png`} alt="image1" style={{ width: "80px" }} /> */}

                </div>

              </div>
              <div className="col-md-5">
                <img className="crousel img-fluid" src={`${BASE_URL}/assets/images/contribute-1.jpg`} alt="image1" style={{ width: "500px" }} />


              </div>
            </div>
          </div>
          <div className="">
            <div className="row bg-col-3 g-0">
              <div className="col-md-7 text-center d-flex">
                <div className="m-auto p-4">
                  <h1 className="text-white fw-bold mb-3">Help Reduce Air & Noise Pollution</h1>
                  <p className="text-white fs-4">Reduced air, noise pollution and improved mental health</p>
                  {/* <img className="img-fluid" src={`${BASE_URL}/assets/images/orange-car.png`} alt="image1" style={{ width: "80px" }} /> */}
                </div>

              </div>
              <div className="col-md-5">
                <img className="crousel img-fluid" src={`${BASE_URL}/assets/images/contribute-2.jpg`} alt="image1" style={{ width: "500px" }} />


              </div>
            </div>
          </div>
          <div className="">
            <div className="row bg-col-2 g-0">
              <div className="col-md-7 text-center d-flex">
                <div className="m-auto p-4">
                  <h1 className="text-white fw-bold mb-3">Gender inclusion in national development </h1>
                  <p className="text-white fs-4">A large number of our female workforce does not contribute <br />
                    to economy owing to commuting problems
                  </p>
                  {/* <img className="img-fluid" src={`${BASE_URL}/assets/images/orange-car.png`} alt="image1" style={{ width: "80px" }} /> */}

                </div>

              </div>
              <div className="col-md-5">
                <img className="crousel img-fluid" src={`${BASE_URL}/assets/images/taxi-driver-client-car.jpg`} alt="image1" style={{ width: "500px" }} />

              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
