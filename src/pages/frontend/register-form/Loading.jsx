import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
    <ThreeCircles
      height={100}
      width={100}
      color="#4fa94d"
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  </div>
//   <div className="d-flex justify-content-center align-items-center vh-100">
//   <img
//     src={`${BASE_URL}/assets/images/CL-logo-small.png`} // Replace with the URL of your image
//     alt="Your Image Alt Text"
//     width={100} // Adjust the width as needed
//     height={100} // Adjust the height as needed
//   />
// </div>
  )
}

export default Loading
