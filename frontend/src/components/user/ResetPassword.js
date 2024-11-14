import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, resetPassword } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';

const ResetPassword = (props) => {
    const [password, setPassword] =useState('');
    const [confirmPassword, setConfirmPassword] =useState('');


    const {loading, error, user, message, isAuthenticated} = useSelector((state)=> state.authState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();

    const submitHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('password', password);
        formData.append('confirmPassword', confirmPassword);
        dispatch(resetPassword(formData, token))
    }

    useEffect(() => {
      if(isAuthenticated) {
        toast('Password reset successfully', {
            position: "bottom-center",
            type : 'success',
        })
        navigate('/');
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
    <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Reset Password</h3>


            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" 
              placeholder="Password"
              value={password}
            onChange={e => setPassword(e.target.value)}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" 
              placeholder="Confirm Password"
              value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
              />
            </div>

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" 
            type="submit"
            disabled={loading}
            onClick={(e) => submitHandler(e)}
            >Send Email</button>

           

           
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    
    </>
  )
};

export default ResetPassword;
