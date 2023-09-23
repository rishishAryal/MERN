import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // You might want to set the form data to the body of the request
    // using the credentials state.

    const response = await axios.post("http://localhost:5000/api/createUser", credentials);

    const json = await response.data;
    console.log(json);
    if (!json.success) {
      alert("Invalid Credentials");
    }
  
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <>
      <div>
        <form className="container mt-4" onSubmit={handleSubmit} method="post">
          <div className="form-group ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control "
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="form-group  mt-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group  mt-3">
            <label htmlFor="geolocation">geolocation</label>
            <input
              type="text"
              className="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>
          <div className="form-group  mt-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              placeholder="Password"
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className=" m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className=" btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
}
