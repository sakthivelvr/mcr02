import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearAuthError, updatePassword as updatePasswordAction } from "../../actions/userActions";
import {toast} from 'react-toastify';

export default function UpdatePassword(){
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const dispatch = useDispatch();
    const {isUpdated, error} = useSelector(state => state.authState)

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('oldPassword', oldPassword);
        formData.append('password', password);
        dispatch(updatePasswordAction(formData))
        
    }

    useEffect(() => {
        if(isUpdated) {
            toast('Password updated successfully', {
                position: "bottom-center",
                type : 'success',
                onOpen : () => {dispatch(clearAuthError)}
            })

            setOldPassword('');
            setPassword('');

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
    },[error, isUpdated, dispatch])



    return (
    <>
<section className="vh-100" style={{backgroundColor: "#508bfc"}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-12 col-md-8 col-lg-6 col-xl-5">
        <div className="card shadow-2-strong" style={{borderRadius: "1rem"}}>
          <div className="card-body p-5 text-center">

            <h3 className="mb-5">Change password</h3>

            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" 
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e)=>{setOldPassword(e.target.value)}}
              />

              {/* <label className="form-label" htmlFor="typePasswordX-2">Password</label> */}
            </div>


            <div data-mdb-input-init className="form-outline mb-4">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg" 
              placeholder="New Password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              />
              {/* <label className="form-label" htmlFor="typePasswordX-2">Password</label> */}
            </div>

            <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg btn-block" 
            type="submit"
            // disabled={loading}
            onClick={(e) => submitHandler(e)}
            >Submit</button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  )
};


