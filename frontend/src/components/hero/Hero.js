import React from "react";

export default function Home() {

  return (
    
    <>
     
        <header className="masthead bg-primary text-white text-center vh-lg-100" >
            <div className="container d-flex align-items-center flex-column">
                {/* <!-- Masthead Avatar Image--> */}
                <img className="masthead-avatar mb-5" src="./images/maxicabride-logo.png" alt="logo" />
                {/* <!-- Masthead Heading--> */}
                <h1 className="masthead-heading text-uppercase mb-0">MAXICABRIDE</h1>
                {/* <!-- Icon Divider--> */}
                <div className="divider-custom divider-light">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                    <div className="divider-custom-line"></div>
                </div>
                {/* <!-- Masthead Subheading--> */}
                <p className="masthead-subheading font-weight-light mb-0">Download Our Mobile App & Get Discount</p>
            </div>
        </header>

    </>
  );
}
