import React, { useState } from "react";
import "./login.css";
import { saveToken } from "../../utils/tokenStorage";
import { useNavigate } from "react-router-dom";

function Login({ switchToSignup }) {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userID)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(
        "https://backendreal-lywv.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userID, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      saveToken(data.token);
      alert("Login successful!");
      navigate("/dashboard", { state: { email: data.email, name: data.name } });
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="logo-text">Logo</h2>
        <p className="subtitle">
          Enter your credentials to access your account
        </p>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="User ID"
            className="input-field"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            ></span>
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
        <button className="signup-link" onClick={switchToSignup}>
          Sign Up
        </button>
      </div>
      <p className="bottom-signup">
        Don’t have an account?{" "}
        <span className="bottom-signup-link" onClick={switchToSignup}>
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;
