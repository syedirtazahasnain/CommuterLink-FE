import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
const Loading = () => {
  return (
    <div>
      <div className='pt-15 text-center'>

        <div className="container text-center py-5">
          <div className="row">  <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          /></div>
        
        </div>
      </div>
    </div>

  )
}

export default Loading
