import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, forgotPassword } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';

const ForgotPassword = (props) => {
    const [email, setEmail] =useState('')
    const {loading, error, message} = useSelector((state)=> state.authState);
    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        if(email.trim() === ''){
          return
        }
        
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData))
    }

    useEffect(() => {
        
      if(message) {
          toast(message, {
              position: "bottom-center",
              type : 'success',
          })
          setEmail('');
          return
      }

      if(error){
          toast(error, {
              position: "bottom-center",
              type : 'error',
              onOpen : () => {dispatch(clearAuthError)}
          })
          return
      }
  }, [error, message, dispatch])


  return (
    <>
    <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Forgot Password</h3>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg" 
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
              {/* <label className="form-label" htmlFor="typeEmailX-2">Email</label> */}
            {/* </div> */}

              {/* <label className="form-label" htmlFor="typePasswordX-2">Password</label> */}
            </div>

            {/* <!-- Checkbox --> */}
            

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4" 
            type="submit"
            disabled={loading}
            onClick={(e) => submitHandler(e)}
            >Send Email</button>


<Link className="text-center mt-4" to="/login"  >Back to Log In</Link>

           

           
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
    </>
  )
};

export default ForgotPassword;
