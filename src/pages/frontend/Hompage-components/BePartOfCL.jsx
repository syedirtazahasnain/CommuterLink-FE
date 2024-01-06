import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../constants';

const BePartOfCL = () => {
    const [autoplay, setAutoplay] = useState(false);
    const videoRef = useRef();
    const navigate = useNavigate();
    const signupRoute = () => {
        navigate("/signup");

    };

    const handleVideoClick = () => {
        setAutoplay(true);
        videoRef.current.src = videoRef.current.src;
    };

    return (
        <div className='container-fluid px-0 bg-pink my-5'>
            <div className="row g-0">
                <div className="col-md-7">
                    <div class="ratio ratio-16x9"

                    >
                        <iframe src={`${BASE_URL}/assets/images/CommutersLinkVid.mp4`}
                            ref={videoRef}
                            title="Your Second Video Title"
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            autoPlay={autoplay}
                            muted  // Muted is required for autoplay on many browsers
                            onClick={handleVideoClick}></iframe>
                    </div>
                </div>
                <div className="col-md-5 text-center d-flex">
                    <div className="m-auto p-4">
                        {/* <p className="text-white fs-4 mb-3">Break Free from <strong className='text-dark'>High Fuel Costs</strong>  and <strong className='text-dark'>Daily Commuting Expenses </strong>  to offices, universities and schools!</p> */}
                        <h1 className="text-white mb-3 font-custom"> Join CommutersLink for a Better, Affordable daily Commute Today!</h1>

                        <button
                            className="btn-custom2  border-1 border-white px-4 py-2 rounded rounded-2 text-white fw-bold" onClick={signupRoute}>
                            Join Now
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BePartOfCL
