import React, { useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import { clearAuthError, register } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const {user} = useSelector(state => state.authState);


  return (
    <>
      <h3>Admin Page</h3>
    </>
  );
}
