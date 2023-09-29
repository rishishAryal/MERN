import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("authToken");

    window.location.reload();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            goFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto  mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-4 "
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li>
                  <Link className="nav-link active fs-5" to="/">
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            <div className="d-flex">
              {localStorage.getItem("authToken") ? (
                <div>
                  <button
                    onClick={logout}
                    className="btn btn-danger m-2"
                  >
                    Logout
                  </button>
                  <button
                    
                    className="btn bg-white text-success"
                  >
                    My Cart
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    className="btn bg-white text-dark
                
                mx-1"
                    to="/login"
                  >
                    Login
                  </Link>

                  <Link
                    className="btn bg-white text-dark mx-1"
                    to="/createuser"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
