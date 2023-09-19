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
        <Slider {...settings}>
          <div className="">
            <div className="row bg-pink g-0">
              <div className="col-md-6 text-center d-flex">
                <div className="m-auto p-4">
                  <h1 className="text-white fw-bold mb-3">Help Reduce Traffic Congestion</h1>
                  <button
                    className="btn-custom2  border-1 border-white px-4 py-2 rounded rounded-2 text-white fw-bold">
                    Join Now
                  </button>
                </div>

              </div>
              <div className="col-md-6">
                <img className="crousel img-fluid" src={`${BASE_URL}/assets/images/contribute-1.jpg`} alt="image1" style={{ width: "500px" }} />


              </div>
            </div>
          </div>
          <div className="">
            <div className="row bg-col-3 g-0">
              <div className="col-md-6 text-center d-flex">
                <div className="m-auto p-4">
                  <h1 className="text-white fw-bold mb-3">Help Reduce Air & Noise Pollution</h1>
                  <button
                    className="btn-custom2  border-1 border-white px-4 py-2 rounded rounded-2 text-white fw-bold">
                    Join Now
                  </button>
                </div>

              </div>
              <div className="col-md-6">
                <img className="crousel img-fluid" src={`${BASE_URL}/assets/images/contribute-2.jpg`} alt="image1" style={{ width: "500px" }} />


              </div>
            </div>
          </div>
          <div className="">
            <div className="row bg-col-2 g-0">
              <div className="col-md-6 text-center d-flex">
                <div className="m-auto p-4">
                  <h1 className="text-white fw-bold mb-3">Help Conserve Energy</h1>
                  <button
                    className="btn-custom2  border-1 border-white px-4 py-2 rounded rounded-2 text-white fw-bold">
                    Join Now
                  </button>
                </div>

              </div>
              <div className="col-md-6">
                <img className="crousel img-fluid" src={`${BASE_URL}/assets/images/contribute-3.jpg`} alt="image1" style={{ width: "500px" }} />

              </div>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
