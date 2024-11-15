import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DropdownButton, Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import "../../../node_modules/bootstrap/js/src/collapse.js";

// import "../../../node_modules/jquery/dist/jquery.min.js";
// import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  };

  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbarNew"
      style={{color:  "#ffffff"}}>
  {/* <a className="navbar-brand" href="#">Navbar</a> */}
  <Link  className="navbar-brand" to="/" >MaxicabRide</Link>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      
      <li className="nav-item">
        
        <Link to='/our-fleets' className="nav-link"  value="" id="form1Example345" >Our Fleets</Link>

      </li>
      <li className="nav-item">
      
      <Link to='/our-services' className="nav-link"  value="" id="form1Example345" >Our Services</Link>

      </li>
  
    </ul>
    <form className="form-inline my-2 my-lg-0">
      {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/> */}

    

    {isAuthenticated && (
        <Link
        className="nav-link  px-0 px-lg-3 rounded"
        to="/myprofile"
      >
        <figure className="avatar avatar-nav mt-3">
            <Image
              width="30rem"
              src={user.avatar ?? "./images/default_avatar.png"}
            />
          </figure>
       
</Link>
    )}


    {isAuthenticated ? (
                <Dropdown className="d-flex flex-column">

                  <Dropdown.Toggle
                    id="dropdown-basic"
                    variant="default text-white pr-5"
                  >

                    <span>{user.name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        navigate("/myprofile");
                      }}
                      className="text-dark"
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={logoutHandler}
                      className="text-danger"
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link
                  to="/login"
                  class="btn btn-outline-primary my-2 my-sm-0 mx-5"
                >
                  Login
                </Link>
              )}


      {/* <button className="btn btn-success my-2 my-sm-0 ms-4" type="button">Book Now</button> */}
      <Link
                  className="btn btn-success my-2 my-sm-0 ms-lg-4"
                  to="/booknow"
                >
                  Book now
                </Link>

    </form>
  </div>
</nav>
    </>
  );
}
