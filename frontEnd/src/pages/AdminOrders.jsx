import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    getAllOrders,
    updateOrderStatus
} from "../services/orderService";

const AdminOrders = () => {
    const token = useSelector((state) => state.auth.token);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getAllOrders(token);

            setOrders(data.orders);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    const handleStatusChange = async (orderId, status) => {
        try {
            const data = await updateOrderStatus(
                orderId,
                status,
                token
            );

            setOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order._id === orderId
                        ? data.order
                        : order
                )
            );
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="admin-orders-message">
                Loading orders...
            </div>
        );
    }

    if (error) {
        return (
            <div className="admin-orders-message">
                {error}
            </div>
        );
    }

    return (
        <div className="admin-orders-page">
            <div className="admin-orders-container">

                <div className="admin-orders-header">
                    <h1>Admin Orders</h1>

                    <div className="admin-orders-count">
                        Total Orders: {orders.length}
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="admin-orders-message">
                        No orders found.
                    </div>
                ) : (
                    orders.map((order) => (
                        <div
                            key={order._id}
                            className="admin-order-card"
                        >

                            {/* Order Header */}

                            <div className="admin-order-header">
                                <div>
                                    <div className="admin-order-id">
                                        Order #{order._id}
                                    </div>

                                    <div className="admin-order-date">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString("en-IN")}
                                    </div>
                                </div>

                                <div className="admin-status-control">
                                    <label>
                                        Order Status:
                                    </label>

                                    <select
                                        value={order.orderStatus}
                                        onChange={(event) =>
                                            handleStatusChange(
                                                order._id,
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Processing">
                                            Processing
                                        </option>

                                        <option value="Shipped">
                                            Shipped
                                        </option>

                                        <option value="Delivered">
                                            Delivered
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Order Information */}

                            <div className="admin-order-content">

                                <div className="admin-order-section">
                                    <h3>Customer</h3>

                                    <p>
                                        <strong>Name:</strong>{" "}
                                        {order.user?.name}
                                    </p>

                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {order.user?.email}
                                    </p>
                                </div>

                                <div className="admin-order-section">
                                    <h3>Payment</h3>

                                    <p>
                                        <strong>Method:</strong>{" "}
                                        {order.paymentMethod}
                                    </p>

                                    <p>
                                        <strong>Status:</strong>

                                        <span className="admin-payment-status">
                                            {order.paymentStatus}
                                        </span>
                                    </p>
                                </div>

                            </div>

                            {/* Products */}

                            <div className="admin-order-items">

                                <h3>Products</h3>

                                {order.orderItems.map((item) => (
                                    <div
                                        key={`${order._id}-${item.product._id}`}
                                        className="admin-order-item"
                                    >
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                        />

                                        <div className="admin-order-item-details">
                                            <h4>
                                                {item.product.name}
                                            </h4>

                                            <p>
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <div className="admin-order-item-price">
                                            ₹
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toLocaleString("en-IN")}
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* Total */}

                            <div className="admin-order-footer">
                                <div className="admin-order-total">
                                    Total: ₹
                                    {order.totalPrice.toLocaleString(
                                        "en-IN"
                                    )}
                                </div>
                            </div>

                        </div>
                    ))
                )}

            </div>
        </div>
    );
};

export default AdminOrders;