import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/loginUser", credentials);
      const json = response.data;
    
      if (!json.success) {
        alert("Invalid Credentials");
      } 
      if(json.success){
        localStorage.setItem("authToken", json.authToken);
        console.log(localStorage.getItem("authToken"));
        //code to store the token in session storage
        

        navigate("/");
      }
    } catch (error) {
      console.error("There was an error!", error);
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
          <button type="submit" className=" m-3 btn btn-success">
            Log In
          </button>
          <Link to="/createuser" className=" btn btn-danger">
            Create an Account
          </Link>
        </form>
      </div>
    </>
  );
}
