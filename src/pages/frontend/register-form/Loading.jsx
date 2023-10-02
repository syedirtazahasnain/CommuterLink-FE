import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
import { API_URL, BASE_URL, IMAGE_URL } from "../../../constants";
const Loading = () => {
  return (
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
  )
}
export default Loading
