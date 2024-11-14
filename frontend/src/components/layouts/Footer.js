import React from "react";

export default function Footer() {
  return (
    <>
    {/* <!-- Footer--> */}
    <footer className="footer text-center">
            <div className="container">
                <div className="row">
                    {/* <!-- Footer Location--> */}
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h4 className="text-uppercase mb-4">Location</h4>
                        <p className="lead mb-0">
                        722 Jurong West Ave 5
                            <br />
                            Singapore, 640722
                        </p>
                    </div>
                    {/* <!-- Footer Social Icons--> */}
                    <div className="col-lg-4 mb-5 mb-lg-0">
                        <h4 className="text-uppercase mb-4">Around the Web</h4>
                        <a className="btn btn-outline-light btn-social mx-1" href="#"><i className="fab fa-fw fa-facebook-f"></i></a>
                        <a className="btn btn-outline-light btn-social mx-1" href="#"><i className="fab fa-fw fa-twitter"></i></a>
                        <a className="btn btn-outline-light btn-social mx-1" href="#"><i className="fab fa-fw fa-linkedin-in"></i></a>
                        <a className="btn btn-outline-light btn-social mx-1" href="#"><i className="fab fa-fw fa-dribbble"></i></a>
                    </div>
                    {/* <!-- Footer About Text--> */}
                    <div className="col-lg-4">
                        <h4 className="text-uppercase mb-4">Contact us</h4>
                        <p className="lead mb-0">
                            HP : +65 9127 5193, +65 8190 6162
                            <br/>
                            Email : info@maxicabride.com
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        {/* <!-- Copyright Section--> */}
        <div className="copyright py-4 text-center text-white">
            <div className="container"><small>Copyright &copy; Aslesh Technologies 2024</small></div>
        </div>
        {/* <!-- Portfolio Modals-->
        <!-- Portfolio Modal 1--> */}
        <div className="portfolio-modal modal fade" id="portfolioModal1" tabindex="-1" aria-labelledby="portfolioModal1" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header border-0"><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <div className="modal-body text-center pb-5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    {/* <!-- Portfolio Modal - Title--> */}
                                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Log Cabin</h2>
                                    {/* <!-- Icon Divider--> */}
                                    <div className="divider-custom">
                                        <div className="divider-custom-line"></div>
                                        <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                                        <div className="divider-custom-line"></div>
                                    </div>
                                    {/* <!-- Portfolio Modal - Image--> */}
                                    <img className="img-fluid rounded mb-5" src="assets/img/portfolio/cabin.png" alt="..." />
                                    {/* <!-- Portfolio Modal - Text--> */}
                                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
                                    <button className="btn btn-primary" data-bs-dismiss="modal">
                                        <i className="fas fa-xmark fa-fw"></i>
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Portfolio Modal 2--> */}
        <div className="portfolio-modal modal fade" id="portfolioModal2" tabindex="-1" aria-labelledby="portfolioModal2" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header border-0"><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <div className="modal-body text-center pb-5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    {/* <!-- Portfolio Modal - Title--> */}
                                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Tasty Cake</h2>
                                    {/* <!-- Icon Divider--> */}
                                    <div className="divider-custom">
                                        <div className="divider-custom-line"></div>
                                        <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                                        <div className="divider-custom-line"></div>
                                    </div>
                                    {/* <!-- Portfolio Modal - Image--> */}
                                    <img className="img-fluid rounded mb-5" src="assets/img/portfolio/cake.png" alt="..." />
                                    {/* <!-- Portfolio Modal - Text--> */}
                                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
                                    <button className="btn btn-primary" data-bs-dismiss="modal">
                                        <i className="fas fa-xmark fa-fw"></i>
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Portfolio Modal 3--> */}
        <div className="portfolio-modal modal fade" id="portfolioModal3" tabindex="-1" aria-labelledby="portfolioModal3" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header border-0"><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <div className="modal-body text-center pb-5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    {/* <!-- Portfolio Modal - Title--> */}
                                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Circus Tent</h2>
                                    {/* <!-- Icon Divider--> */}
                                    <div className="divider-custom">
                                        <div className="divider-custom-line"></div>
                                        <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                                        <div className="divider-custom-line"></div>
                                    </div>
                                    {/* <!-- Portfolio Modal - Image--> */}
                                    <img className="img-fluid rounded mb-5" src="assets/img/portfolio/circus.png" alt="..." />
                                    {/* <!-- Portfolio Modal - Text--> */}
                                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
                                    <button className="btn btn-primary" data-bs-dismiss="modal">
                                        <i className="fas fa-xmark fa-fw"></i>
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Portfolio Modal 4--> */}
        <div className="portfolio-modal modal fade" id="portfolioModal4" tabindex="-1" aria-labelledby="portfolioModal4" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header border-0"><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <div className="modal-body text-center pb-5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    {/* <!-- Portfolio Modal - Title--> */}
                                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Controller</h2>
                                    {/* <!-- Icon Divider--> */}
                                    <div className="divider-custom">
                                        <div className="divider-custom-line"></div>
                                        <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                                        <div className="divider-custom-line"></div>
                                    </div>
                                    {/* <!-- Portfolio Modal - Image--> */}
                                    <img className="img-fluid rounded mb-5" src="assets/img/portfolio/game.png" alt="..." />
                                    {/* <!-- Portfolio Modal - Text--> */}
                                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
                                    <button className="btn btn-primary" data-bs-dismiss="modal">
                                        <i className="fas fa-xmark fa-fw"></i>
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Portfolio Modal 5--> */}
        <div className="portfolio-modal modal fade" id="portfolioModal5" tabindex="-1" aria-labelledby="portfolioModal5" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header border-0"><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <div className="modal-body text-center pb-5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    {/* <!-- Portfolio Modal - Title--> */}
                                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Locked Safe</h2>
                                    {/* <!-- Icon Divider--> */}
                                    <div className="divider-custom">
                                        <div className="divider-custom-line"></div>
                                        <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                                        <div className="divider-custom-line"></div>
                                    </div>
                                    {/* <!-- Portfolio Modal - Image--> */}
                                    <img className="img-fluid rounded mb-5" src="assets/img/portfolio/safe.png" alt="..." />
                                    {/* <!-- Portfolio Modal - Text--> */}
                                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
                                    <button className="btn btn-primary" data-bs-dismiss="modal">
                                        <i className="fas fa-xmark fa-fw"></i>
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- Portfolio Modal 6--> */}
        <div className="portfolio-modal modal fade" id="portfolioModal6" tabindex="-1" aria-labelledby="portfolioModal6" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header border-0"><button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button></div>
                    <div className="modal-body text-center pb-5">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-8">
                                    {/* <!-- Portfolio Modal - Title--> */}
                                    <h2 className="portfolio-modal-title text-secondary text-uppercase mb-0">Submarine</h2>
                                    {/* <!-- Icon Divider--> */}
                                    <div className="divider-custom">
                                        <div className="divider-custom-line"></div>
                                        <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                                        <div className="divider-custom-line"></div>
                                    </div>
                                    {/* <!-- Portfolio Modal - Image--> */}
                                    <img className="img-fluid rounded mb-5" src="assets/img/portfolio/submarine.png" alt="..." />
                                    {/* <!-- Portfolio Modal - Text--> */}
                                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.</p>
                                    <button className="btn btn-primary" data-bs-dismiss="modal">
                                        <i className="fas fa-xmark fa-fw"></i>
                                        Close Window
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}
