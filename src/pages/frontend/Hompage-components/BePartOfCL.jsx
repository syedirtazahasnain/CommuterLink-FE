import React from 'react'
import { useNavigate } from 'react-router-dom';

const BePartOfCL = () => {

const navigate = useNavigate();
const signupRoute = () => {
    navigate("/signup");

    };

    return (
        <div className='container-fluid px-0 bg-pink my-5'>
            <div className="row g-0">
                <div className="col-md-7">
                    <div class="ratio ratio-16x9">
                        <iframe src="https://www.youtube.com/embed/_SoviSNZjso" title="How Teslas Upgrade Over Time!" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                </div>
                <div className="col-md-5 text-center d-flex">
                    <div className="m-auto p-4">
                        <h1 className="text-white fw-bold mb-3">Be Part of CommutersLink</h1>
                        <h3 className="text-white mb-3">It's not about EARNING but cost sharing and SAVING</h3>

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
