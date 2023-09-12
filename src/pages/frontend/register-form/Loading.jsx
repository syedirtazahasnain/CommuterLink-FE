import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
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
  )
}

export default Loading
