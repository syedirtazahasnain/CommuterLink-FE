import React from 'react'
import { BASE_URL } from "../../../constants";
import Navbar from './Navbar';

const Contribute = () => {
  return (
    <div>
      <Navbar/>
      <section id="contribute" className="section-bg">
      <div className="section-title text-center">
        <h2 className="heading-color">Contribute</h2>
        <p>
          Let's Do Our Part to Make Pakistan a Better Living Place for Future
          Generations
        </p>
      </div>
      <div className="container">
          <div className="row">
            <div className="col-md-4 mb-2">
            <div className="container_foto">
              <div className="ver_mas text-center">
                <span className="lnr lnr-eye"></span>
              </div>
              <article className="text-left">
                <h2>Help Reduce Traffic Congestion</h2>
                <button
                  onClick={() => {
                    window.location.href = 'signup.html';
                  }}
                  className="btn btn-sm btn-join-us my-2 my-sm-0 mr-2 rounded rounded-5 fw-bold"
                  type="submit"
                >
                  JOIN NOW
                </button>
              </article>
              <img src={`${BASE_URL}/assets/images/contribute-1.jpg`} alt="" />
            </div>
            </div>
            <div className="col-md-4 mb-2">
            <div className="container_foto">
              <div className="ver_mas text-center">
                <span id="click" className="lnr lnr-eye"></span>
              </div>
              <article className="text-left">
                <h2>Help Reduce Air & Noise Pollution</h2>
                <button
                  onClick={() => {
                    window.location.href = 'signup.html';
                  }}
                  className="btn btn-sm btn-join-us my-2 my-sm-0 mr-2 rounded rounded-5 fw-bold"
                  type="submit"
                >
                  JOIN NOW
                </button>
              </article>
              <img src={`${BASE_URL}/assets/images/contribute-2.jpg`} alt="" />
            </div>
            </div>
            <div className="col-md-4 mb-2">
            <div className="container_foto">
              <div className="ver_mas text-center">
                <span className="lnr lnr-eye"></span>
              </div>
              <article className="text-left">
                <h2>Help Conserve Energy</h2>
                <button
                  onClick={() => {
                    window.location.href = 'signup.html';
                  }}
                  className="btn btn-sm btn-join-us my-2 my-sm-0 mr-2 rounded rounded-5 fw-bold"
                  type="submit"
                >
                  JOIN NOW
                </button>
              </article>
              <img src={`${BASE_URL}/assets/images/contribute-3.jpg`} alt="" />
            </div>
            </div>
          </div>
      </div>
    </section>
    </div>
  )
}

export default Contribute