import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {DropdownButton, Dropdown, Image} from 'react-bootstrap';
import { logout } from "../../actions/userActions";

export default function Header() {
  const {isAuthenticated, user} = useSelector(state => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout)
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          <img width="75rem" src="./images/maxicabride-logo.png" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
            {
              isAuthenticated ? (
                <Dropdown className="d-inline" >
                  <Dropdown.Toggle id="dropdown-basic" variant="default text-black pr-5">
                  <figure className="avatar avatar-nav">
                      <Image width="50px" src={user.avatar??'./images/default_avatar.png'}/>
                  </figure>
                  <span>{user.name}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {navigate('/myprofile')}} className="text-dark">Profile</Dropdown.Item>
                    <Dropdown.Item onClick={logoutHandler} className="text-danger">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : 
            <Link to="/login" class="btn btn-outline-primary my-2 my-sm-0 mx-5" >
            Login
            </Link>
            }
              
          </form>
        </div>
      </nav>
    </>
  );
}
