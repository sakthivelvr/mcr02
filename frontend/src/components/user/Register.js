import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom';

export default function Register() {
    const [userData, setUserData] = useState({
        name : "",
        email : "",
        password : ""
    })
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.png')
    const dispatch = useDispatch();
    const {loading, error, isAuthenticated} = useSelector(state => state.authState)

    const navigate = useNavigate();

    const onChange = (e) => {
        if(e.target.name === 'avatar') {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
    
        } else {
            setUserData({...userData, [e.target.name] : e.target.value})

        }
    }
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email); 
        formData.append('password', userData.password); 
        formData.append('avatar', avatar); 

        dispatch(register(formData))
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
      <div className="card bg-light">
        <br/>
        <br/>
        <article className="card-body mx-auto" style={{maxWidth: "400px"}}>
          <h4 className="card-title mt-3 text-center">Create Account</h4>
          {/* <p className="text-center">Get started with your free account</p> */}
          <p>
            {/* <a href="" className="btn btn-block btn-twitter">
              {" "}
              <i className="fab fa-twitter"></i>   Login via Twitter
            </a>
            <a href="" className="btn btn-block btn-facebook">
              {" "}
              <i className="fab fa-facebook-f"></i>   Login via facebook
            </a> */}
          </p>
          <p className="reg-divider-text">
            {/* <span className="bg-light">OR</span> */}
          </p>
          <form onSubmit={submitHandler}> 
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
              </div>
              <input
                name="name"
                onChange={onChange}
                className="form-control"
                placeholder="Full name"
                type="text"
                

              />
            </div>
            {/* {<!-- form-group// -->} */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-envelope"></i>{" "}
                </span>
              </div>
              <input
                name="email"
                onChange={onChange}
                className="form-control"
                placeholder="Email address"
                type="email"
              />
            </div>
            {/* {<!-- form-group// -->} */}
            {/* <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-phone"></i>{" "}
                </span>
              </div>
              <select className="custom-select" style={{maxWidth: "120px"}}>
                <option selected="">+65</option>
                <option value="1">+91</option>
                <option value="2">+198</option>
                <option value="3">+701</option>
              </select>
              <input
                name=""
                className="form-control"
                placeholder="Phone number"
                type="text"
              />
            </div> */}
            {/* {<!-- form-group// -->} */}
            {/* <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-building"></i>{" "}
                </span>
              </div>
              <select className="form-control">
                <option selected=""> Select job type</option>
                <option>Designer</option>
                <option>Manager</option>
                <option>Accaunting</option>
              </select>
            </div> */}
            {/* {<!-- form-group end.// -->} */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                name="password"
                onChange={onChange}
                className="form-control"
                placeholder="Create password"
                type="password"
              />
            </div>
            {/* {<!-- form-group// -->} */}
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                className="form-control"
                placeholder="Repeat password"
                type="password"
              />
            </div>

            <div className="" >
              {/* <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div> */}
              
              <br/>
              <div className="d-flex flex-row">
              <div>
              <label>Choose avatar</label>
              <input style={{width:"75%"}}
                className=""
                type="file"
                name= "avatar"
                onChange={onChange}
                id=""
                placeholder="avatar-image"
              /> 
              </div>

              <div className="d-flex justify-content-center">
              <figure className="avatar mt-2 mr-3 item-rtl ">
                    <img 
                        width="50rem"
                        src={avatarPreview}
                        className="rounded-circle"
                        alt='avatar-image'
                    />
                </figure>
                </div>
                </div>
            
              
              {/* <label className='custom-file-label' htmlFor='customFile'>
                            Choose Avatar
                
                            
                        </label> */}
                
            </div>
           

            {/* <div className="form-group input-group">
            <figure className="avatar mr-3 item-rtl">
                    <img 
                        src={avatarPreview}
                        className="rounded-circle"
                        alt='avatar-image'
                    />
                </figure>
                </div> */}
                <br/>
         
            {/* {<!-- form-group// -->}                                       */}
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block" disabled={loading} >
                {" "}
                Create Account{" "}
              </button>
            </div>
            {/* {<!-- form-group// -->}       */}
           
             
              <Link className="text-center" to="/login" class="my-4 my-sm-0" >Have an account? Log In</Link>
           
          </form>
        </article>
      </div>
      {/* {<!-- card.// -->} */}

      {/* {<!--container end.//-->} */}

      <br />
      <br />

    </>
  );
}
