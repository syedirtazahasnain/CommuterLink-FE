import React from 'react'
import { Carousel } from 'react-bootstrap';
import imgSlider1 from '../../Images/slide-1.jpg'
import imgSlider2 from '../../Images/slide-2.jpg'
import imgSlider3 from '../../Images/slide-3.jpg'
import imgSlider4 from '../../Images/slide-4.jpg'
import imgSlider5 from '../../Images/slide-5.jpg'
import imgSingup3 from '../../Images/signup-3.png'
function Slider() {
  return (
    <div>
        
<Carousel fade>
  
      <Carousel.Item interval={1500}>
        <img src={imgSlider1} alt='image1'/>
        <Carousel.Caption>
        <h1
              id="white-heading"
              className="mb-3 animate__animated animate__fadeInDown"
            >
              Welcome to CommutersLink
            </h1>
            <p className="mb-3 fs-2" animate__animated animate__fadeInDown>
              "Share to care"
            </p>
            <button
              className="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
              type="submit"
            >
              GET STARTED
            </button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
      <img src={imgSlider2} alt='image2'/>
        <Carousel.Caption>
        <div className="carousel-caption d-none d-md-block">
            <h1
              id="white-heading"
              class="mb-3 animate__animated animate__fadeInDown"
            >
              Share Car Ride with Your Neighbourhood for Daily/Monthly Commute
            </h1>
            <button
              class="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
              type="submit"
            >
              GET STARTED
            </button>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
      <img src={imgSlider3} alt='image3'/>
        <Carousel.Caption>
        <h1
              id="white-heading"
              className="mb-3 animate__animated animate__fadeInDown"
            >
              Share Your Car or Ride with Others
            </h1>
            <button
              className="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
              type="submit"
            >
              GET STARTED
            </button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
      <img src={imgSlider4} alt='image4'/>
        <Carousel.Caption>
        <h1
              id="white-heading"
              className="animate__animated animate__fadeInDown m3-5"
            >
              Let's Go Together to Offices, School and Universities
            </h1>
            <button
              className="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
              type="submit"
            >
              GET STARTED
            </button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
      <img src={imgSlider5} alt='image5'/>
        <Carousel.Caption>
        <h1
              id="white-heading"
              className="mb-3 animate__animated animate__fadeInDown"
            >
              Share Actual Cost and Save
            </h1>
            <button
              className="animate__animated animate__fadeInUp scrollto btn btn-sm btn-get-started mt-5 my-sm-0 mr-2 btn-outline-custom"
              type="submit"
            >
              GET STARTED
            </button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

    <section id="concept">
      <div className="section-title text-center p-5">
        <h2 className="heading-color">
          It's Not About Earning but Cost Sharing and Saving
        </h2>
        <p>
          The basic difference between other carpooling Apps and CommutersLink
          is that we are offering long term solutions for daily commute instead
          of a onetime ride. The concept is to collectively defeat the impact of
          price hike by cost sharing. It’s not a source of earning but saving
        </p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <div className="container">
              <div className="accordion">
                <div className="card">
                  <div className="card-header" id="heading1">
                    <div className="mb-0">
                      <a
                        id="accordion-link"
                        className="collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapse1"
                        aria-expanded="false"
                        aria-controls="collapse1"
                      >
                        1. Choose Between
                        Using Your Car or Ride with Others
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse1"
                    className="collapse show"
                    aria-labelledby="heading1"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body small-text">
                      CommutersLink simultaneously offers you partners, who are
                      a suitable match to ride your car and at the same time
                      matches you up with car owners with whom we think you can
                      ride with. Both choices are made available at the same
                      time
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="heading2">
                    <div className="mb-0">
                      <a
                        id="accordion-link"
                        className="collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapse2"
                        aria-expanded="false"
                        aria-controls="collapse2"
                      >
                        2.Long Term
                        Commitment
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse2"
                    className="collapse"
                    aria-labelledby="heading2"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body small-text">
                      The commuting buddies would mostly belong to same
                      neighbourhood and community. It’s a long term solution for
                      cost effective commute to Work/Office or University/School
                      and not a one-time drop off.
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="heading3">
                    <div className="mb-0">
                      <a
                        id="accordion-link"
                        className="collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapse3"
                        aria-expanded="false"
                        aria-controls="collapse3"
                      >
                        3. Share Cost of
                        Commuting
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse3"
                    className="collapse"
                    aria-labelledby="heading3"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body small-text">
                      CommutersLink aims to empower society to manage ever
                      increasing cost of living and inflation by distributing
                      the burden of commuting in a respectable manner
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header" id="heading4">
                    <div className="mb-0">
                      <a
                        id="accordion-link"
                        className="collapsed"
                        type="button"
                        data-toggle="collapse"
                        data-target="#collapse4"
                        aria-expanded="false"
                        aria-controls="collapse4"
                      >
                        4. Socioeconomic
                        Angle
                      </a>
                    </div>
                  </div>
                  <div
                    id="collapse4"
                    className="collapse"
                    aria-labelledby="heading"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body small-text">
                      Commuterslink has a socioeconomic welfare angle by
                      reducing traffic, hazards, pollution, government spending
                      on communication infrastructure and improving citizen
                      mental health
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="container mt-5">
              <img className="img-fluid" src={imgSingup3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <div id="parallax-world-of-ugg">
      <section>
        <div className="parallax-one">
          <div className="container">
            <div className="text-center text-white">
              <h3>Be Part of CommutersLink</h3>
              <p>It's not about EARNING but cost sharing and SAVING</p>
              <button onclick="window.location.href = 'signup.html';"
                className="btn btn-sm btn-join-us my-2 my-sm-0 mr-2 btn-outline-custom"
                type="submit"
              >
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <div className="section-title heading-color" data-aos="fade-up">
            <h2>
              Share Ride (your car or others) with suitable matches to commute
              to
            </h2>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div
                className="service-card"
                data-aos="fade-up"
                style={{
                  background: 'url(https://www.commuterslink.com/front_assets/img/commute-to-office-1.jpg)'}}
              >
                <h4 className="title">
                  <a href="signup.html" style={{color: "#ffffff", fontSize: "34px"}}
                    >Office</a
                  >
                </h4>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="service-card"
                data-aos="fade-up"
                style={{
                  background: "url(https://www.commuterslink.com/front_assets/img/uni-school.jpg)"
                }}
              >
                <h4 className="title">
                  <a href="signup.html" style={{color: "#ffffff", fontSize: "34px"}}
                    >School/University</a
                  >
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>

    
    </div>
  )
}

export default Slider