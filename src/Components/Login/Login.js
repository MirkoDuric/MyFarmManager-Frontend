// src/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Dodajemo useNavigate za preusmeravanje

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Kreiramo useNavigate za preusmeravanje

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validacija email-a
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validacija lozinke (mora biti najmanje 6 karaktera)
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Ako je validacija uspešna, resetujemo error i šaljemo podatke backend-u
    setError("");

    // Pozivamo funkciju za autentifikaciju
    authenticateUser(email, password);
  };

  const authenticateUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8001/login", {
        // Proveri da li je backend na pravom URL-u
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Autorizacija uspešna, sačuvaj token i preusmeri korisnika
        localStorage.setItem("token", data.token); // Sačuvaj JWT token u localStorage
        navigate("/dashboard"); // Preusmeravanje na dashboard
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <p className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
