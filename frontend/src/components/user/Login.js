import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, login } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";
import googleButton from '../../assets/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png';
import axios from "axios";

function navigate1(url) {
  window.location.href = url;
}

async function auth() {

  // const response = await fetch('http://127.0.0.1:8000/api/v1/request',
  //   {method:'post'});
  //   const data = await response.json();

    try {
      console.log('inside oauth func')
    const {data} = await axios.post(`/api/v1/request`);  
    console.log('TRY SUCCESS')

    navigate1(data.url);
    
    } catch (error) {
      console.log('google oAuth error ', error)      
    }
    
    

}

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {loading, error, isAuthenticated} = useSelector(state => state.authState);
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        console.log("event type", e.type)
        dispatch(login(email, password))
    }
    useEffect(() => {
        if(isAuthenticated){
          navigate("/");
        }
        if(error){
            toast(error, {
                position: "bottom-center",
                type : 'error',
                onOpen : () => {dispatch(clearAuthError)}
            })
            return
        }
    }, [error, isAuthenticated, dispatch, navigate])
  return (
    <>
    <MetaData title={`Login`}/>
    <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Sign in</h3>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg" 
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
              {/* <label className="form-label" htmlFor="typeEmailX-2">Email</label> */}
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" 
              placeholder="Password"
              value={password}
            onChange={e => setPassword(e.target.value)}
              />
              {/* <label className="form-label" htmlFor="typePasswordX-2">Password</label> */}
            </div>

            

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" 
            type="submit"
            disabled={loading}
            onClick={(e) => submitHandler(e)}
            >Login</button>

            <hr className="my-4"/>

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-lg btn-block btn-primary" style={{backgroundColor: "#dd4b39"}}
              type="button"
              onClick={() => auth()}
              ><i className="fab fa-google me-2"></i > <span className="px-2">Sign in with google</span> </button>
            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-lg btn-block btn-primary mb-2" style={{backgroundColor: "#3b5998"}}
              type="button"><i className="fab fa-facebook-f me-2"></i> <span className="px-2">Sign in with facebook</span></button>
            <Link to="/register" class="my-4 my-sm-0" >Create account? Register here</Link>

            {/* <!-- Forgot password --> */}
            <div className="mt-4">
              <Link to='/password/forgot' className=""  value="" id="form1Example345" >Forgot Password?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
}
