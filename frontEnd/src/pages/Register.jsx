import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  FaUser,
  FaEnvelope,
  FaLock
} from "react-icons/fa";

import { login } from "../store/slices/authSlice";

import { registerUser } from "../services/authService";

import { ROUTES } from "../routes/routerConstants";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      dispatch(
        login({
          user: data.user,
          token: data.token
        })
      );

      navigate(ROUTES.HOME);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Create Account</h1>

          <p>
            Join Velvora and start shopping
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="auth-field">
            <label>Full Name</label>

            <div className="auth-input">
              <FaUser />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Email</label>

            <div className="auth-input">
              <FaEnvelope />

              <input
                type="email"
                name="email"
                value={formData.email}
                autoComplete="off"
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>

            <div className="auth-input">
              <FaLock />

              <input
                type="password"
                name="password"
                value={formData.password}
                autoComplete="new-password"
                onChange={handleChange}
                placeholder="Create a password"
              />
            </div>
          </div>

          <div className="auth-field">
            <label>Confirm Password</label>

            <div className="auth-input">
              <FaLock />

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                autoComplete="new-password"
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <span>
            Already have an account?
          </span>

          <Link to={ROUTES.LOGIN}>
            Login
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;