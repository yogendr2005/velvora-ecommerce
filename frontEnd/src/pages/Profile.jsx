import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  FaUser,
  FaEnvelope,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { logout } from "../store/slices/authSlice";

import { updateProfile, fetchOrders } from "../store/slices/userSlice";

import { getUserProfile } from "../services/userService";

import { ROUTES } from "../routes/routerConstants";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(
    (state) => state.auth.token
  );

  const authUser = useSelector(
    (state) => state.auth.user
  );

  const profile = useSelector(
    (state) => state.user.profile
  );

  const orders = useSelector(
    (state) => state.user.orders
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getUserProfile(token);

        dispatch(updateProfile(data.user));

        dispatch(fetchOrders());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, dispatch]);

  const user = profile?.name
    ? profile
    : authUser;

  const handleLogout = () => {
    dispatch(logout());

    navigate(ROUTES.LOGIN);
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <h1>Loading Profile...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <h1>Unable to load profile</h1>
            <p>{error}</p>
          </div>

          <button
            className="profile-logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-card">

        {/* ===========================
          PROFILE HEADER
      =========================== */}

        <div className="profile-header">
          <div className="profile-avatar">
            <FaUser />
          </div>

          <h1>{user?.name}</h1>

          <p>{user?.email}</p>
        </div>

        {/* ===========================
          ACCOUNT INFORMATION
      =========================== */}

        <div className="profile-details">
          <h2>Account Information</h2>

          <div className="profile-detail">
            <FaUser />

            <div>
              <span>Name</span>

              <strong>
                {user?.name}
              </strong>
            </div>
          </div>

          <div className="profile-detail">
            <FaEnvelope />

            <div>
              <span>Email</span>

              <strong>
                {user?.email}
              </strong>
            </div>
          </div>
        </div>

        {/* ===========================
          MY ORDERS
      =========================== */}

        <div className="profile-orders">

          <div className="profile-orders-header">
            <h2>My Orders</h2>

            <span>
              {orders.length}{" "}
              {orders.length === 1
                ? "Order"
                : "Orders"}
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="no-orders">
              <p>
                You haven't placed any orders yet.
              </p>
            </div>
          ) : (
            <div className="orders-list">

              {orders.map((order) => (
                <div
                  key={order._id}
                  className="order-card"
                >

                  {/* ORDER HEADER */}

                  <div className="order-header">

                    <div>
                      <span>Order ID</span>

                      <strong>
                        #{order._id}
                      </strong>
                    </div>

<div>
  <span>Payment</span>
  <strong
    className={`order-status payment-status-${order.paymentStatus.toLowerCase()}`}
  >
    {order.paymentStatus}
  </strong>
</div>

<div>
  <span>Status</span>
  <strong
    className={`order-status order-status-${order.orderStatus.toLowerCase()}`}
  >
    {order.orderStatus}
  </strong>
</div>

                  </div>

                  {/* ORDER ITEMS */}

                  <div className="order-items">

                    {order.orderItems.map(
                      (item) => (
                        <div
                          key={item.product._id}
                          className="order-item"
                        >

                          <img
                            src={
                              item.product.image
                            }
                            alt={
                              item.product.name
                            }
                          />

                          <div className="order-item-details">

                            <h3>
                              {
                                item.product.name
                              }
                            </h3>

                            <p>
                              Quantity:{" "}
                              {item.quantity}
                            </p>

                          </div>

                          <strong>
                            ₹
                            {(
                              item.price *
                              item.quantity
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </strong>

                        </div>
                      )
                    )}

                  </div>

                  {/* ORDER FOOTER */}

                  <div className="order-footer">

                    <span>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString(
                        "en-IN"
                      )}
                    </span>

                    <strong>
                      Total: ₹
                      {order.totalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* ===========================
          LOGOUT
      =========================== */}

        <button
          className="profile-logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
};

export default Profile;