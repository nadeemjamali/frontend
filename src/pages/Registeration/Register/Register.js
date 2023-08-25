import React, { useState, useEffect } from "react";
import "../Registeration.scss";
import { SignupLogin } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";

function Register() {
  const initialData = {
    name: "",
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [formError, setError] = useState(initialData);
  const [isUserSubmit, setUserSubmit] = useState(false);
  const [isSellerSubmit, setSellerSubmit] = useState(false);
  const [commingError, setCommingError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(validate({ ...formData, [name]: value }));
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    setUserSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isUserSubmit) {
      SignupLogin("/Auth/signup", { ...formData, role: "user" })
        .then((res) => {
           (res.status);
          if (res.status === 200) {
            navigate("/login");
          } else {
            setCommingError("signup fail");
          }
        })
        .catch((error) => {
           (error);
          setCommingError(error.response.data);
        })
        .finally(() => {
          setUserSubmit(false);
        });
    }
  }, [formError, formData, navigate, SignupLogin, isUserSubmit]);

  const handleSellerSubmit = (e) => {
    e.preventDefault();
    setSellerSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isSellerSubmit) {
      SignupLogin("/Auth/signup", { ...formData, role: "seller" })
        .then((res) => {
           (res.status);
          if (res.status === 200) {
            navigate("/login");
          } else {
            setCommingError("signup fail");
          }
        })
        .catch((error) => {
           (error);
          setCommingError(error.response.data);
        })
        .finally(() => {
          setUserSubmit(false);
        });
    }
  }, [formError, formData, isSellerSubmit]);

  function validate(value) {
    const error = {};
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*[a-zA-Z]).{8,}$/;

    const alphabet = /^[A-Za-z]+$/;
    if (!value.name) {
      error.name = "name is required";
    } else if (value.name.length > 20) {
      error.name = "name always less than 20";
    } else if (!alphabet.test(value.name)) {
      error.name = "only alphabet are allowed";
    } else if (!value.email) {
      error.email = "email.required";
    } else if (!regex.test(value.email)) {
      error.email = "this is not a valid format";
    } else if (!value.password) {
      error.password = "password.required";
    } else if (!passwordRegex.test(value.password)) {
      error.password =
        "minimum length of 8 char and must include at least one alphabet";
    }
    return error;
  }

  return (
    <main className="registration">
      <section className="formPage">
        <div className="formcontainer" role="main">
          <h2 className="title">Register</h2>
          <form>
            <div className="formField">
              <label htmlFor="name">Username:</label>
              <input
                id="name"
                type="text"
                placeholder="username"
                onChange={handleChange}
                name="name"
                value={formData.name}
                aria-required="true"
                autoComplete="username"
                aria-label="Username"
                aria-invalid={formError.name ? "true" : "false"}
              />
              {formError.name && (
                <p className="error" aria-live="polite">
                  {formError.name}
                </p>
              )}
            </div>
            <div className="formField">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="email address"
                onChange={handleChange}
                name="email"
                value={formData.email}
                aria-required="true"
                autoComplete="email"
                aria-label="Email"
                aria-invalid={formError.email ? "true" : "false"}
              />
              {formError.email && (
                <p className="error" aria-live="polite">
                  {formError.email}
                </p>
              )}
            </div>
            <div className="formField">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="password"
                onChange={handleChange}
                name="password"
                value={formData.password}
                aria-required="true"
                autoComplete="new-password"
                aria-label="Password"
                aria-invalid={formError.password ? "true" : "false"}
              />
              {formError.password && (
                <p className="error" aria-live="polite">
                  {formError.password}
                </p>
              )}
            </div>
            <p>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                role="button"
                tabIndex="0"
                aria-label="Login"
              >
                Login
              </span>
            </p>
            {commingError && (
              <p className="error" aria-live="polite">
                {commingError}
              </p>
            )}
            <div className="btnContainer">
              <button
                type="button"
                className="submit"
                onClick={handleUserSubmit}
                aria-label="Register as Customer"
              >
                Customer
              </button>
              <button
                type="button"
                className="submit"
                onClick={handleSellerSubmit}
                aria-label="Register as Seller"
              >
                Seller
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
