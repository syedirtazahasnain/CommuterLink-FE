import React from 'react';
import { Link } from 'react-router-dom';
import { Link as DomLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';


const Footer = () => {
  const navigate = useNavigate();
  const home=()=>{
    navigate("/")
  }
  return (
    <div>
        <footer id="footer">
      <div className="footer-top ">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-info">
              <h3>CommutersLink</h3>
              <p>
                Office 8, Ground Floor, Hamadan Heights, <br />Koral
                Interchange, Express Highway, <br />Islamabad, 46000.<br /><br />
                <strong>Phone:</strong> +92 315 1502443<br />
                <strong>Email:</strong> info@commuterslink.com<br/>
              </p>
              <div className="social-links mt-3">
                <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                <a href="#" className="instagram">
                  <i className="bx bxl-instagram"></i>
                </a>
                <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right"></i> <DomLink to="/" >Home</DomLink>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="concept" onClick={home} smooth="true" offset={30} duration={50}>Concept</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="howworks" onClick={home}  offset={30} duration={50}>How It Works?</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="contribure" smooth="true" onClick={home}  offset={30} duration={50}>Contribute</Link>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                  <Link to="contact" smooth="true" onClick={home} offset={30} duration={50}>Contact</Link>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>FAQs</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right1 mb-3"></i>
                  <Link to="/faq">
                    How is CommutersLink different than other carpooling
                    Apps?</Link>
                 
                </li>
                <li>
                  <i className="bx bx-chevron-right1 "></i>
                  <Link to="/faq">
                    How the cost is calculated and distributed?</Link>
                  
                </li>
                <li>
                  <i className="bx bx-chevron-right1"></i>
                  <Link to="/faq">
                    As a travel buddy with someone who owns a car, how my
                    payment is calculated and paid?</Link>
                 
                </li>
                <li>
                  <i className="bx bx-chevron-right1"></i>
                  <Link to="/faq">Click here for more FAQs </Link>
                </li>
                
              </ul>
            </div>

           
            <div className="col-lg-4 col-md-6 footer-newsletter">
            
              <h4>Download App</h4>
              <p>(Application coming soon)</p>
              <div className="container">
                <ul className="list-unstyled d-flex">
                  <li className="mr-3">
                    <img
                      className="img-fluid"
                      src="https://www.commuterslink.com/front_assets/img/google-play-store.png"/>
                    
                  </li>
                  <li>
                    <img
                      className="img-fluid"
                      src="https://www.commuterslink.com/front_assets/img/Apple-store.png" />
                   
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="copyright text-center mt-3">
          <img
            className="img-fluid"
            src="https://www.commuterslink.com/front_assets/img/Sysreformslogo.png"
            style={{width: '300px'}}
          />
        </div>
      </div>
      <div className="container">
        <div className="copyright text-center mt-3">
          © Copyright <strong><span>CommutersLink</span></strong>
          . All Rights Reserved
        </div>
        <div className="credits"></div>
      </div>
    </footer>
    </div>
  )
}

export default Footer