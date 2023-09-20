import React from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const signupRoute = () => {
    navigate("/signup");

  };
  return (
    <div>
      <section className="mt-5">
        <div id="parallax-world-of-ugg">
          <div className="parallax-two">
            <div className="container">
              <div className="text-center text-black">
                <h1>Register</h1>
                <h3 className=" mb-3">Care to Share - Carpool with Your Neighbourhood</h3>
                <button
                  className="btn-custom2 border-1 border-black px-4 py-2 rounded rounded-2 text-black fw-bold" onClick={signupRoute}>
                  Join Now
                </button>
              </div>
            </div>
          </div></div>
      </section>
    </div>
  )
}

export default Register