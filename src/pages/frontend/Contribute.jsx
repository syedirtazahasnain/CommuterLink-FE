import React from 'react'
import imgcontribute1 from '../../Images/contribute-1.jpg';
import imgcontribute2 from '../../Images/contribute-2.jpg';
import imgcontribute3 from '../../Images/contribute-3.jpg';
import Navbar from './Hompage-components/Navbar';

const Contribute = () => {
  return (
    <div>
      <Navbar/>
<section id="contribute" className="bg-light">
      <div class="section-title text-center">
        <h2 className="heading-color text-black">Contribute</h2>
        <p>
          Let's Do Our Part to Make Pakistan a Better Living Place for Future
          Generations
        </p>
      </div>
      <div className="container contenedor text-center">
        <div className="container text-center">
          <div className="row">
            <div className="col-lg-4 container_foto">
              <div className="ver_mas text-center">
                <span className="lnr lnr-eye"></span>
              </div>
              <article className="text-left">
                <h2>Help Reduce Traffic Congestion</h2>
                <button onclick="window.location.href = 'signup.html';"
                  className="btn btn-sm btn-join-us my-2 my-sm-0 mr-2 btn-outline-custom"
                  type="submit"
                >
                  JOIN NOW
                </button>
              </article>
              <img src={imgcontribute1} alt="" />
            </div>
            <div className="col-lg-4 container_foto">
              <div className="ver_mas text-center">
                <span className="lnr lnr-eye"></span>
              </div>
              <article className="text-left">
                <h2>Help Reduce Traffic Congestion</h2>
                <button onclick="window.location.href = 'signup.html';"
                  className="btn btn-sm btn-join-us my-2 my-sm-0 mr-2 btn-outline-custom"
                  type="submit"
                >
                  JOIN NOW
                </button>
              </article>
              <img src={imgcontribute2} alt="" />
            </div>
            <div className="col-lg-4 container_foto">
              <div className="ver_mas text-center">
                <span className="lnr lnr-eye"></span>
              </div>
              <article className="text-left">
                <h2>Help Reduce Traffic Congestion</h2>
                <button onclick="window.location.href = 'signup.html';"
                  className="btn btn-sm btn-join-us my-2 my-sm-0 mr-2 btn-outline-custom"
                  type="submit"
                >
                  JOIN NOW
                </button>
              </article>
              <img src={imgcontribute3} alt="" />
            </div>
            
            </div></div></div>
      
      
      </section>

    </div>
  )
}

export default Contribute