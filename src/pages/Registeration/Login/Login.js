import React, { useState } from "react";
import "../Registeration.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { UserFun } from "../../../Store/UserAuth";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  const initialData = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [error, seterror] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/Auth/login", formData)
      .then((res) => {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        dispatch(UserFun(user));
        toast.success("login Sucessfully");
        navigate("/")
      })
      .catch((error) => {
        toast.error(`${error.response.data}`);
        seterror(error.response.data);
        return error;
      });
  };

  return (
    <main className="login">
    <section className="formPage">
      <div className="formcontainer" role="main">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="formField">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              placeholder="email address"
              type="email"
              onChange={handleChange}
              name="email"
              value={formData.email}
              required
              aria-required="true"
              autoComplete="email"
              aria-label="Email"
            />
          </div>
          <div className="formField">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              required
              type="password"
              placeholder="password"
              onChange={handleChange}
              name="password"
              value={formData.password}
              aria-required="true"
              autoComplete="current-password"
              aria-label="Password"
            />
          </div>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              role="button"
              tabIndex="0"
              aria-label="Register"
            >
              Register
            </span>{" "}
          </p>
          {error && (
            <p className="error" aria-live="polite">
              {error}
            </p>
          )}
          <button type="submit" className="submit">
            Login
          </button>
        </form>
      </div>
    </section>
    <ToastContainer />
  </main>
  
  );
}

export default Login;
