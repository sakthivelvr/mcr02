import React from "react";
import { useNavigate } from "react-router-dom";

export default function VehicleList() {

  const navigate = useNavigate();

  return (
    
    <>


        {/* <!-- Vehicle Section--> */}
        <section className="page-section portfolio" id="portfolio">
            <div className="container">
                {/* <!-- Portfolio Section Heading--> */}
                <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" 
                >Our Vehicles</h2>
                {/* <!-- Icon Divider--> */}
                <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                    <div className="divider-custom-line"></div>
                </div>
                {/* <!-- Portfolio Grid Items--> */}
                <div className="row justify-content-center">
                    {/* <!-- Portfolio Item 1--> */}
                   
                    <div className="col-md-6 col-lg-4 mb-5"  onClick={() => navigate("/booknow")}>
                        <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100"
                            >
    
                                <div className="portfolio-item-caption-content text-center text-white"
                                ><i className="fas fa-plus fa-3x"></i></div>
                            </div>
                            <div className="justify-content-center text-center">
                            <img className="img-fluid" src="./images/portfolio/6_seater.png" alt="..." />
                            <h5 className="pt-2" style={{color: "#091057"}}>6 Seater Toyota Alphard / Vellfire</h5>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Portfolio Item 2--> */}
                    <div className="col-md-6 col-lg-4 mb-5" onClick={() => navigate("/booknow")}>
                        <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal2">
                            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                            </div>
                            <div className="justify-content-center text-center">
                            <img className="img-fluid" src="./images/portfolio/app.png" alt="..." />
                            <h5 className="pt-2" style={{color: "#091057"}}>Download our App</h5>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Portfolio Item 3--> */}
                    <div className="col-md-6 col-lg-4 mb-5" onClick={() => navigate("/booknow")}>
                        <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal3">
                            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                            </div>
                            
                            <div className="justify-content-center text-center">
                            <img className="img-fluid" src="./images/portfolio/7_seater.png" alt="..." />
                            <h5 className="pt-2" style={{color: "#091057"}}>7 Seater Maxicab</h5>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Portfolio Item 4--> */}
                    <div className="col-md-6 col-lg-4 mb-5 mb-lg-0" onClick={() => navigate("/booknow")}>
                        <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal4">
                            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                            </div>
                            

                            <div className="justify-content-center text-center">
                            <img className="img-fluid" src="./images/portfolio/13_seater.png" alt="..." />
                            <h5 className="pt-2" style={{color: "#091057"}}>9/13 Seater Minibus</h5>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Portfolio Item 5--> */}
                    <div className="col-md-6 col-lg-4 mb-5 mb-md-0" onClick={() => navigate("/booknow")}>
                        <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal5">
                            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                            </div>
                            
                            
                            <div className="justify-content-center text-center">
                            <img className="img-fluid" src="./images/portfolio/23_seater.png" alt="..." />
                            <h5 className="pt-2" style={{color: "#091057"}}>23 Seater Coach</h5>
                            </div>

                        </div>
                    </div>
                    {/* <!-- Portfolio Item 6--> */}
                    <div className="col-md-6 col-lg-4" onClick={() => navigate("/booknow")}>
                        <div className="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal6">
                            <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                            </div>
                            

                            <div className="justify-content-center text-center">
                            <img className="img-fluid" src="./images/portfolio/45_seater.png" alt="..." />
                            <h5 className="pt-2" style={{color: "#091057"}}>40/45 Seater Coach</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>




    </>
  );
}
