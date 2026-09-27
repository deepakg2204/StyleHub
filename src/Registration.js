import React, { useState } from "react";
import "./Registration.css";

function Registration({ goBack }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration Successful!");
        
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          gender: ""
        });
      } else {
        alert(data.message || "Registration failed!");
      }

    } catch (error) {
      console.error(error);
      alert("Cannot connect to backend server!");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-box">

        <button className="back-btn" onClick={goBack}>
          ← Back
        </button>

        <h1>StyleHub</h1>
        <h2>Create an Account</h2>
        <p>Register to explore the latest fashion trends.</p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label>Gender</label>

          <div className="gender">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                required
              />
              Male
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
              />
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                onChange={handleChange}
              />
              Other
            </label>
          </div>

          <button type="submit" className="register-btn">
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}

export default Registration;