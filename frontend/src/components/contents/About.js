import React from "react";
import { useNavigate } from "react-router-dom";

export default function About() {

  const navigate = useNavigate();

  return (
    
    <>


        {/* <!-- About Section--> */}
        <section className="page-section bg-primary text-white mb-0" id="about">
            <div className="container">
                {/* <!-- About Section Heading--> */}
                <h2 className="page-section-heading text-center text-uppercase text-white">About</h2>
                {/* <!-- Icon Divider--> */}
                <div className="divider-custom divider-light">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                    <div className="divider-custom-line"></div>
                </div>
                {/* <!-- About Section Content--> */}
                <div className="row">
                    <div className="col-lg-4 ms-auto"><p className="lead">
                    MaxiCabRide*
                    Reliable Transportation Since 2016</p>
                    <ul className="lead">
                        <li>Airport transfers</li>
                        <li>City transfers</li>
                        <li>Events</li>
                        <li>Corporate transport</li>
                        <li>Wheelchair transport</li>
                        
                    </ul>
                    </div>
                    <div className="col-lg-4 me-auto">
                    <p className="lead"> Key Features:</p>
                    <ul className="lead">
                        <li>Clean & well-maintained vehicles</li>
                        <li>Experienced drivers</li>
                        <li>Real-time tracking</li>
                        <li>Competitive pricing</li>
                        <li>24/7 support</li>
        
                    </ul>
                    
                    </div>
                </div>
                {/* <!-- About Section Button--> */}
                <div className="text-center mt-4">
                    <a className="btn btn-xl btn-outline-light" href="#">
                        <i className="fas fa-download me-2"></i>
                        Download Our App
                    </a>
                </div>
            </div>


        </section>  

    </>
  );
}
