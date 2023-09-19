import React from 'react';
import { Link } from 'react-router-dom';
import { Link as DomLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants';


const Footer = () => {
  const navigate = useNavigate();

  const home = () => {
    navigate("/")
  }

  return (
    <div>
      <footer id="footer">
        <div className="footer-top ">
          <div className="container-fluid">
            <div className="p-4 row bg-grey">
              <div className="col-md-4">
                <h1 className='text-white text-center'>Our Newsletter</h1>
              </div>
              <div className="col-md-4">
                <p className="text-white fs-4 mt-3">To Remain Updated, Please Subscribe to Our Newsletters</p>
              </div>
              <div class="col-md-4 mt-2 text-center">
                <form >
                  <input
                    className='fs-5'
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <input className='btn-custom1 fs-5 fw-bold text-white my-2' type="submit" value="Subscribe" />
                </form>
              </div>
            </div>
            <div className="row bg-light-secondary">
              <div className="col-lg-3 col-md-6 footer-info text-center my-4">
                <img src={`${BASE_URL}/assets/images/CL-logo.png`} className='text-center mb-3' height="60px" alt="logoimg" />
                <p>
                  Break free from High Fuel Costs and Daily
                  Commuting Expenses to offices, universities
                  and schools!
                </p>
                <div className="social-links mt-3">
                  <a className="twitter"><i className="bx bxl-twitter"></i></a>
                  <a className="facebook"><i className="bx bxl-facebook"></i></a>
                  <a className="instagram">
                    <i className="bx bxl-instagram"></i>
                  </a>
                  <a className="google-plus"><i className="bx bxl-skype"></i></a>
                  <a className="linkedin"><i className="bx bxl-linkedin"></i></a>
                </div>
              </div>

              <div className="col-lg-2 col-md-6 footer-links  my-4">
                <h4>Useful Links</h4>
                <ul>
                  <li className='cursor-pointer'>
                    <i className="bx bx-chevron-right cursor-pointer"></i> <DomLink to="carousel" onClick={home} smooth="true" offset={20} duration={50}>Home</DomLink>
                  </li>
                  <li className='cursor-pointer'>
                    <i className="bx bx-chevron-right cursor-pointer"></i>
                    <DomLink to="carousel" onClick={home} smooth="true" offset={20} duration={50}>Concept</DomLink>
                  </li>
                  <li className='cursor-pointer'>
                    <i className="bx bx-chevron-right"></i>
                    <DomLink to="howworks" onClick={home} offset={20} duration={50}>How It Works?</DomLink>
                  </li>
                  <li className='cursor-pointer'>
                    <i className="bx bx-chevron-right"></i>
                    <DomLink to="contribute" smooth="true" onClick={home} offset={20} duration={50}>Contribute</DomLink>
                  </li>
                  <li className='cursor-pointer'>
                    <i className="bx bx-chevron-right"></i>
                    <DomLink to="contact" onClick={home} smooth="true" offset={20} duration={50}>Contact</DomLink>
                  </li>
                  <li className='cursor-pointer'>
                    <i className="bx bx-chevron-right"></i>
                    <Link to="/faq" onClick={home} smooth="true" offset={20} duration={50}>Faqs</Link>
                  </li>
                </ul>
              </div>

              <div className="col-lg-4 col-md-6 footer-links  my-4">
                <h4>Contact Us</h4>
                <ul>
                  <li className='mb-2'>
                    <i className="fa-solid fa-location-dot text-success me-1"></i>
                    <span className="ml-2">
                      Office 8, Ground Floor, Hamadan Heights, <br />
                    </span>
                    <span className='ms-4'>
                      Koral Interchange, Express Highway, <br />
                    </span>
                    <span className='ms-4'>
                      Islamabad, 46000.
                    </span>
                  </li>
                  <li className='mb-2'>
                    <i className="fa-solid fa-phone text-success"></i>
                    <span className="ml-2">
                      +92 322 5121234 <br />
                    </span>
                    <span className='ms-4'>
                      +92 345 5115722
                    </span>
                  </li>
                  <li className='mb-2'>
                    <i className="fa-solid fa-envelope text-success"></i>
                    <span className="ml-2">info@commuterslink.com</span>
                  </li>
                  <li className='mb-2'>
                    <i className="fa-solid fa-clock text-success"></i>
                    <span className="ml-2">
                      Mon - Fri: 9AM to 5PM <br />
                    </span>
                    <span className='ms-4'>
                      Sunday: 9AM to 1PM
                    </span>
                  </li>
                </ul>

              </div>


              <div className="col-lg-3 col-md-6 footer-newsletter  my-4">

                <h4>Download App</h4>
                <div className="container">
                  <ul className="list-unstyled d-flex">
                    <li className="mr-3">
                      <img
                        className="img-fluid"
                        src="https://www.commuterslink.com/front_assets/img/google-play-store.png" style={{ width: "200px" }} />

                    </li>
                    <li>
                      <img
                        className="img-fluid"
                        src="https://www.commuterslink.com/front_assets/img/Apple-store.png" style={{ width: "200px" }} />

                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-0 bg-teal">
          <div className="copyright text-center my-3">
            <img
              className="img-fluid"
              src="https://www.commuterslink.com/front_assets/img/Sysreformslogo.png"
              style={{ width: '250px' }}
            />
            <div className="copyright text-center mt-3">
              © Copyright <strong><span>CommutersLink</span></strong>
              . All Rights Reserved
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer