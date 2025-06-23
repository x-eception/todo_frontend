// src/pages/AboutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AboutPage = () => {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value === "google") {
      navigate("/google-login");
    } else if (value === "mobile") {
      navigate("/phone-login");
    }
  };

  return (
    <div className="container">
      {/* Left: Login Options */}
      <div className="left-panel">
        <div className="app-brand">ToDo AI</div>
        <h2>Choose The Login Options Below</h2>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              value="google"
              checked={selected === "google"}
              onChange={handleChange}
            />
            Login with Google
          </label>
          <label>
            <input
              type="checkbox"
              value="mobile"
              checked={selected === "mobile"}
              onChange={handleChange}
            />
            Login with Mobile
          </label>
        </div>
      </div>

      {/* Right: About Info */}
      <div className="right-panel">
        <img src="/images/OIP.webp" alt="About" />
        <p>
          Welcome to our productivity app! Plan tasks, manage time, and reach your goals efficiently.
        </p>
        <a
          href="/privacy-policy.html"
          target="_blank"
          rel="noopener noreferrer"
          className="privacy-link"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default AboutPage;
