import React from "react";
import MetaData from "../layouts/MetaData";
import { useEffect } from "react";
// import { getProducts } from "../actions/productsActions";
// import { useDispatch, useSelector } from "react-redux";
// import { getVehicles } from "../actions/vehicleActions";
// import Hero from './hero/Hero'
import VehicleList from "../contents/VehicleList";
import { useNavigate } from "react-router-dom";

export default function OurServices() {
     const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { vehicles } = useSelector((state) => state.vehicleState);
//   const { loading, userLoading, error, isAuthenticated, user } = useSelector(
//     (state) => state.authState
//   );
//   useEffect(() => {
//     dispatch(getVehicles);
//   }, []);

  return (
    
    <>
      <MetaData title={"Our Fleets"} />
        
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
                    <div className="col-lg-4 ms-auto"><p className="lead">Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets htmlFor easy customization.</p></div>
                    <div className="col-lg-4 me-auto"><p className="lead">You can create your own custom avatar htmlFor the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!</p></div>
                </div>
                {/* <!-- About Section Button--> */}
                <div className="text-center mt-4">
                    <a className="btn btn-xl btn-outline-light" href="https://startbootstrap.com/theme/freelancer/">
                        <i className="fas fa-download me-2"></i>
                        Free Download!
                    </a>
                </div>
            </div>


        </section>
        {/* <!-- Contact Section--> */}
        <section className="page-section" id="contact">
            <div className="container">
                {/* <!-- Contact Section Heading--> */}
                <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0">Contact Me</h2>
                {/* <!-- Icon Divider--> */}
                <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                    <div className="divider-custom-line"></div>
                </div>
                {/* <!-- Contact Section Form--> */}
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-7">
                        {/* <!-- * * * * * * * * * * * * * * *-->
                        <!-- * * SB Forms Contact Form * *-->
                        <!-- * * * * * * * * * * * * * * *-->
                        <!-- This form is pre-integrated with SB Forms.-->
                        <!-- To make this form functional, sign up at-->
                        <!-- https://startbootstrap.com/solution/contact-forms-->
                        <!-- to get an API token!--> */}
                        <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                            {/* <!-- Name input--> */}
                            <div className="form-floating mb-3">
                                <input className="form-control input-sm" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                <label htmlFor="name">Full name</label>
                                <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                            </div>
                            {/* <!-- Email address input--> */}
                            <div className="form-floating mb-3">
                                <input className="form-control input-sm" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                <label htmlFor="email">Email address</label>
                                <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                            {/* <!-- Phone number input--> */}
                            <div className="form-floating mb-3">
                                <input className="form-control input-sm" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                <label htmlFor="phone">Phone number</label>
                                <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                            </div>
                            {/* <!-- Message input--> */}
                            <div className="form-floating mb-3">
                                <textarea className="form-control input-sm" id="message" type="text" placeholder="Enter your message here..." style={{height: "10rem"}} data-sb-validations="required"></textarea>
                                <label htmlFor="message">Message</label>
                                <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                            {/* <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted--> */}
                            <div className="d-none" id="submitSuccessMessage">
                                <div className="text-center mb-3">
                                    <div className="fw-bolder">Form submission successful!</div>
                                    To activate this form, sign up at
                                    <br />
                                    <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                            </div>
                            {/* <!-- Submit error message-->
                            <!---->
                            <!-- This is what your users will see when there is-->
                            <!-- an error submitting the form--> */}
                            <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
                            {/* <!-- Submit Button--> */}
                            <button className="btn btn-primary btn-xl disabled" style={{backgroundColor: "#091057"}} id="submitButton" type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        
    </>
  );
}
