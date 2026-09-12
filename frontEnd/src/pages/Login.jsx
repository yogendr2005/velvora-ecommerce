import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  FaEnvelope,
  FaLock
} from "react-icons/fa";

import { login } from "../store/slices/authSlice";

import { loginUser } from "../services/authService";

import { ROUTES } from "../routes/routerConstants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
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
    setLoading(true);

    try {
      const data = await loginUser(formData);

      dispatch(
        login({
          user: data.user,
          token: data.token
        })
      );

      if (data.user.role === "admin") {
        navigate(ROUTES.ADMIN_ORDERS);
      } else {
        navigate(ROUTES.HOME);
      }
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
            <h1>Welcome Back</h1>

            <p>
              Sign in to your Velvora account
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="auth-field">
              <label>Email</label>

              <div className="auth-input">
                <FaEnvelope />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
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
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <p className="auth-error">
                {error}
              </p>
            )}

            <div className="auth-options">
              <label className="remember-me">
                <input type="checkbox" />

                <span>
                  Remember me
                </span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              Login
            </button>
          </form>

          <div className="auth-footer">
            <span>
              Don't have an account?
            </span>

            <Link to={ROUTES.REGISTER}>
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;