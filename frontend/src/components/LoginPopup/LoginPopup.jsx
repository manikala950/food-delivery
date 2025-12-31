import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ FRONTEND-ONLY DEMO LOGIN (NO JWT / NO BACKEND)
  const onLogin = (event) => {
    event.preventDefault();

    if (!data.email || !data.password) {
      alert("Please enter email and password");
      return;
    }

    // store demo user in localStorage
    localStorage.setItem(
      "demoUser",
      JSON.stringify({
        name: data.name || "Demo User",
        email: data.email,
      })
    );

    setShowLogin(false);
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            src={assets.cross_icon}
            alt=""
            onClick={() => setShowLogin(false)}
          />
        </div>

        <div className="login-popup-inputs">
          {currentState === "Sign Up" && (
            <input
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              type="text"
              placeholder="Your name"
              required
            />
          )}

          <input
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="email"
            placeholder="Your email"
            required
          />

          <input
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
