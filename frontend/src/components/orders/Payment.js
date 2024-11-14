import { useElements, useStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../actions/orderActions";

export default function Payment() {

  let bookingData = JSON.parse(sessionStorage.getItem("bookingData"));
  console.log('bookingData  : ', bookingData)
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = bookingData.customerDetails.name
  const email = bookingData.customerDetails.email
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Singapore');
  const [state, setState] = useState('Singapore');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Singapore');
  const phone = bookingData.customerDetails.phone

  const amount = bookingData.rate.fullAmount;

  // const {user} = useSelector(state=>state.authState);

  const paymentData = {
                    "amount" : Math.round(amount*100) ,
                    "shipping": {
                        "name" : `${name}`,
                        "address" : {
                            "city" : `${city}`,
                            "postal_code" : `${postalCode}`,
                            "country" : `${country}`,
                            "state" : `${state}`,
                            "line1" : `${address}`
                        },
                        "phone" : `${phone}`
                    }
                }
    
    const submitHandler = async (e) => {
        e.preventDefault();
        document.querySelector('#submit_btn').disabled = true;
        try {
            const {data} = await axios.post('/api/v1/payment/process', paymentData)
            const clientSecret = data.client_secret
            const result = stripe.confirmCardPayment(clientSecret, {
                payment_method : {
                    card : elements.getElement(CardNumberElement),
                    billing_details : {
                        name: name,
                        email : email
                    }
                }
            })

            console.log("PAYMENT RESULT : ", await result)
            // for (const property in await result) {
            //   console.log(`${property}: 001`);
            // }

            if((await result).error) {
                toast((await result).error.message, {
                    position: "bottom-center",
                    type : 'error',
                    
                })
                console.log("ERROR...")
            } else {

                if((await result).paymentIntent.status === 'succeeded') {


                  
                    toast('Payment Success', {
                        position: "bottom-center",
                        type : 'success',
                        
                    })
                console.log("SUCCEEDED...")
                
                dispatch(createOrder({
                  ...bookingData,
                  paymentDetails: {
                    paymentMode: "PAYNOW_QR",
                    paymentStatus: "PAID",
                    paidAt: new Date.now(),
                    paymentTxnId: "qwe458g7g885fdfjg78952g",
                  },
                  

                }));

                    navigate('/')
                }else {
                    toast('Please try again!', {
                        position: "bottom-center",
                        type : 'warning',
                        
                    })
                console.log("WARNING...")

                }
            }

        } catch (error) {
          console.log("trycatch error...", error)
            
        }

    }

  return (
    <>
    {/* <MetaData title={`Login`}/> */}
    <section className="" style={{backgroundColor: "#508bfc"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Payment</h3>

           

            <div data-mdb-input-init className="form-outline mb-2 text-start">
            <label className="form-label" htmlFor="typeEmailX-2">Address</label>

              <input type="text" id="typeEmailX-3" className="form-control form-control-lg" 
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-2 text-start">
            <label className="form-label" htmlFor="typeEmailX-3">City</label>

              <input type="text" id="typeEmailX-3" className="form-control form-control-lg" 
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-2 text-start">
            <label className="form-label" htmlFor="typeEmailX-4">State</label>

              <input type="text" id="typeEmailX-4" className="form-control form-control-lg" 
              placeholder="State"
              value={state}
              onChange={e => setState(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-2 text-start">
            <label className="form-label" htmlFor="typeEmailX-4">State</label>

              <input type="text" id="typeEmailX-4" className="form-control form-control-lg" 
              placeholder="Postal code"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4 text-start">
            <label className="form-label" htmlFor="typeEmailX-4">Country</label>

              <input type="text" id="typeEmailX-4" className="form-control form-control-lg" 
              placeholder="Country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              />
            </div>
            


            <div data-mdb-input-init className="form-outline mb-4">
              <CardNumberElement type="email" id="typeEmailX-2" className="form-control form-control-lg" 
              placeholder="Email"
            //   value={email}
            //   onChange={e => setEmail(e.target.value)}
              />
              {/* <label className="form-label" htmlFor="typeEmailX-2">Email</label> */}
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <CardExpiryElement type="email" id="typeEmailX-2" className="form-control form-control-lg" 
              placeholder="Email"           
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <CardCvcElement type="email" id="typeEmailX-2" className="form-control form-control-lg" 
              placeholder="Email"           
              />
            </div>


            

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" 
            type="submit"
            id="submit_btn"
            // disabled={loading}
            onClick={(e) => submitHandler(e)}
            >Pay ${amount}</button>

            <hr className="my-4"/>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
