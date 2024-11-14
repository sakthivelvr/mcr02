import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, updateProfile } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import { clearUpdateProfile } from "../../slices/authSlice";

export default function UpdateProfile() {
    const {error, user, isUpdated} = useSelector(state => state.authState);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");

    const dispatch = useDispatch();

    const onChangeAvatar = (e) => {
        const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
            }
            reader.readAsDataURL(e.target.files[0])
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email); 
        formData.append('avatar', avatar); 

        dispatch(updateProfile(formData))
    }

    useEffect(() => {
        
        if(user){
            setName(user.name);
            setEmail(user.email);
            if(user.avatar){
                setAvatarPreview(user.avatar)
            }

        }
        if(isUpdated) {
            toast('Profile updated successfully', {
                position: "bottom-center",
                type : 'success',
                onOpen : () => dispatch(clearUpdateProfile())
            })
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
    }, [error, isUpdated, dispatch])


  return (
    <>
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div className="user-profile">
                    <div className="user-avatar">
                      <img
                        src={avatarPreview}
                        alt="Maxwell Admin"
                        width='100%'
                      />
                    </div>
                    
                    <input
                        id="submit"
                        name="avatar"
                        className=""
                        type='file'
                        onChange={onChangeAvatar}
                        width='100%'

                      />
                       
                    <h5 className="user-name">Yuki Hayashi</h5>
                    <h6 className="user-email">yuki@Maxwell.com</h6>
                  </div>
                  <div className="about">
                    <h5>About</h5>
                    <p>
                      I'm Yuki. Full Stack Designer I enjoy creating
                      user-centric, delightful and human experiences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        placeholder="Enter full name"
                        name='name'
                        value={name}
                        onChange={e=>setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="eMail">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="eMail"
                        placeholder="Enter email ID"
                        name='email'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="website">Website URL</label>
                      <input
                        type="url"
                        className="form-control"
                        id="website"
                        placeholder="Website url"
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mt-3 mb-2 text-primary">Address</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="Street">Street</label>
                      <input
                        type="name"
                        className="form-control"
                        id="Street"
                        placeholder="Enter Street"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="ciTy">City</label>
                      <input
                        type="name"
                        className="form-control"
                        id="ciTy"
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="sTate">State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="sTate"
                        placeholder="Enter State"
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="zIp">Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="zIp"
                        placeholder="Zip Code"
                      />
                    </div>
                  </div>
                </div>
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        id="submit"
                        name="submit"
                        className="btn btn-primary"
                        onClick={(e) => submitHandler(e)}
                      >
                        Update
                      </button>
                    </div>
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
