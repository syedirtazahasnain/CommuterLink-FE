import React from 'react'
import { useNavigate } from 'react-router-dom';

const  Register=()=> {

  const navigate = useNavigate();
  const loginRoute = () => {
  navigate("/login");

};
  return (
    <div>
        <section className="mt-5">
        <div id="parallax-world-of-ugg">
        <div className="parallax-two mt-3">
          <div className="container">
            <div className="text-center text-white">
              <h3>Register</h3>
              <p className="fs-5">Care to Share - Carpool with Your Neighbourhood</p>
              <button
                className="btn btn-sm btn-join-us my-2 my-sm-0 mr-2 rounded rounded-5 fw-bold"
              onClick={loginRoute}
              >
                JOIN NOW
              </button>
            </div>
          </div>
        </div></div>
      </section>
    </div>
  )
}

export default Register