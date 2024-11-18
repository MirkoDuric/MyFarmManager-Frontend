import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Signup.module.css";
import {
  isValidEmail,
  validatePasswordStrength,
  isNonEmptyString,
} from "../Utils/utils-ika/validation";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!isNonEmptyString(formData.firstName) || !isNonEmptyString(formData.lastName)) {
      setError("First Name and Last Name are required.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const passwordError = validatePasswordStrength(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Simulated API call
    setTimeout(() => {
      console.log("Form submitted successfully:", formData);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.formSection}>
        <div className={styles.formCard}>
          <h2>Create an Account</h2>
          <p>
            Already have an account?{" "}
            <Link to="/login" className={styles.loginLink}>
              Sign in
            </Link>
          </p>
          {error && <p className={styles.errorText}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
      <div className={styles.imageSection}></div>
    </div>
  );
};

export default Signup;

