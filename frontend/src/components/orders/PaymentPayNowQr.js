import {
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../actions/orderActions";
import { clearOrderCreated } from "../../slices/ordersSlice";
import { clearAuthError } from "../../actions/userActions";

export default function PaymentPayNowQr() {
  const [heading, setHeading] = useState("Processing!");
  const [resultText, setResultText] = useState("Please wait ...");
  const [pageResult, setPageResult] = useState(false);
  const [textColor, setTextColor] = useState("text-success");

  let bookingData = JSON.parse(sessionStorage.getItem("bookingData"));
  console.log("bookingData  : ", bookingData);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const amount = bookingData.rate.fullAmount;

  const { isOrderCreated, order } = useSelector((state) => state.orderState);
  // const { loading, error, isAuthenticated, user } = useSelector(
  //   (state) => state.authState
  // );

  //   const name = bookingData.customerDetails.name
  //   const email = bookingData.customerDetails.email

  //   const [address, setAddress] = useState('');
  //   const [city, setCity] = useState('Singapore');
  //   const [state, setState] = useState('Singapore');
  //   const [postalCode, setPostalCode] = useState('');
  //   const [country, setCountry] = useState('Singapore');
  //   const phone = bookingData.customerDetails.phone

  //   const amount = bookingData.rate.fullAmount;

  //   // const {user} = useSelector(state=>state.authState);

  const paymentData = {
    amount: Math.round(amount * 100),
  };

  useEffect(() => { 

    if (isOrderCreated) {
      setHeading("Done!");
      setResultText("Your payment is successful");
      setPageResult(true);
      toast("Booking successful , You will receive email soon", {
        position: "bottom-center",
        type: "success",
        onOpen: () => {
          setTimeout(() => {
            document.getElementById("submitBtn").disabled = false;
          }, "5000");
          dispatch(clearOrderCreated());
        },
      });
      return;
    }
  }, [ dispatch, navigate, isOrderCreated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    document.querySelector("#submit_btn").disabled = true;
    try {
      const { data } = await axios.post(
        "/api/v1/payment/process/paynowqr",
        paymentData
      );
      const clientSecret = data.client_secret;

      const res1 = stripe
        .confirmPayNowPayment(clientSecret)
        .then(function ({ error, paymentIntent }) {
          if (error) {
            // Inform the customer that there was an error.
            console.log("ERROR FOUND : ", error);
            console.log("res1 : ", res1);

            toast(error.message, {
              position: "bottom-center",
              type: "error",
            });
            setHeading("Oops!");
            setResultText("Your payment is unsuccessful");

            setPageResult(true);
          } else if (paymentIntent.status === "succeeded") {
            console.log("SUCCEEDED : ", paymentIntent);
            console.log("res1 : ", res1);
            dispatch(
              createOrder({
                ...bookingData,
                paymentDetails: {
                  paymentMode: "PAYNOW_QR",
                  paymentStatus: "PAID",
                  paidAt: new Date.now(),
                  paymentTxnId: "qwe458g7g885fdfjg78952g",
                },
              })
            );

          // Inform the customer that the payment was successful
          } else if (paymentIntent.status === "requires_action") {
            console.log("REQUIRES DAY : ", paymentIntent);
            console.log("res1 : ", res1);

            setHeading("Something went wrong!");
            setResultText("Please try again");

            setPageResult(true);
            // Inform the customer that the payment did not go through
          }

        });

      console.log("PAYMENT RESULT : ", await res1);
    } catch (error) {
      console.log("trycatch error...", error);
    }
  };

  return (
    <>
      {/* <MetaData title={`Login`}/> */}
      <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">{heading}</h3>
                  <h6 className={textColor}>{resultText}</h6>

                  <hr className="my-4" />
                  
                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-primary btn-lg "
                      type="button"
                      id="submit_btn"
                      disabled={!pageResult}
                      onClick={() => navigate("/")}
                    >
                      Go to Home Page
                    </button>
                  

                  {/* <div data-mdb-input-init className="form-outline mb-2 text-start">
            <label className="form-label" htmlFor="typeEmailX-2">Address</label>

              <input type="text" id="typeEmailX-3" className="form-control form-control-lg" 
              placeholder="Address"
            //   value={address}
            //   onChange={e => setAddress(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-2 text-start">
            <label className="form-label" htmlFor="typeEmailX-3">City</label>

              <input type="text" id="typeEmailX-3" className="form-control form-control-lg" 
              placeholder="City"
            //   value={city}
            //   onChange={e => setCity(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-2 text-start">
            <label className="form-label" htmlFor="typeEmailX-4">State</label>

              <input type="text" id="typeEmailX-4" className="form-control form-control-lg" 
              placeholder="State"
            //   value={state}
            //   onChange={e => setState(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-2 text-start">
            <label className="form-label" htmlFor="typeEmailX-4">State</label>

              <input type="text" id="typeEmailX-4" className="form-control form-control-lg" 
              placeholder="Postal code"
            //   value={postalCode}
            //   onChange={e => setPostalCode(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4 text-start">
            <label className="form-label" htmlFor="typeEmailX-4">Country</label>

              <input type="text" id="typeEmailX-4" className="form-control form-control-lg" 
              placeholder="Country"
            //   value={country}
            //   onChange={e => setCountry(e.target.value)}
              />
            </div>
            


            

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" 
            type="submit"
            id="submit_btn"
            // disabled={loading}
            onClick={(e) => submitHandler(e)}
            >`Pay ${'amount'}`</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
