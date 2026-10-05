import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getActivityLogs } from "../services/activityService";

const ACTION_LABELS = {
  login: "Login",
  login_failed: "Failed login",
  register: "Register",
};

const AdminActivity = () => {
  const token = useSelector((state) => state.auth.token);

  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [uniqueIps, setUniqueIps] = useState(0);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const [action, setAction] = useState("");
  const [ipInput, setIpInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [filters, setFilters] = useState({ ip: "", email: "" });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchLogs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getActivityLogs(token, {
          page,
          action,
          ip: filters.ip,
          email: filters.email,
        });

        setLogs(data.logs);
        setTotal(data.total);
        setUniqueIps(data.uniqueIps);
        setPages(data.pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [token, page, action, filters]);

  const handleSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setFilters({ ip: ipInput.trim(), email: emailInput.trim() });
  };

  const handleActionChange = (event) => {
    setPage(1);
    setAction(event.target.value);
  };

  return (
    <div className="admin-orders-page">
      <div className="admin-orders-container">
        <div className="admin-orders-header">
          <h1>User Activity</h1>

          <div className="admin-orders-count">
            Total Records: {total} &nbsp;|&nbsp; Unique IPs: {uniqueIps}
          </div>
        </div>

        <form className="activity-filters" onSubmit={handleSearch}>
          <select value={action} onChange={handleActionChange}>
            <option value="">All actions</option>
            <option value="login">Login</option>
            <option value="login_failed">Failed login</option>
            <option value="register">Register</option>
          </select>

          <input
            type="text"
            placeholder="Filter by IP"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
          />

          <input
            type="text"
            placeholder="Filter by email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />

          <button type="submit">Search</button>
        </form>

        {error && <div className="admin-orders-message">{error}</div>}

        {!error && loading && (
          <div className="admin-orders-message">Loading activity...</div>
        )}

        {!error && !loading && logs.length === 0 && (
          <div className="admin-orders-message">No activity found.</div>
        )}

        {!error && !loading && logs.length > 0 && (
          <div className="activity-table-wrapper">
            <table className="activity-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>User</th>
                  <th>Action</th>
                  <th>IP Address</th>
                  <th>Device</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td>
                      {new Date(log.createdAt).toLocaleString("en-IN")}
                    </td>
                    <td>
                      {log.user?.name && <div>{log.user.name}</div>}
                      <div className="activity-email">
                        {log.user?.email || log.email || "Unknown"}
                      </div>
                    </td>
                    <td>
                      <span className={`activity-badge ${log.action}`}>
                        {ACTION_LABELS[log.action] || log.action}
                      </span>
                    </td>
                    <td>{log.ip}</td>
                    <td className="activity-device">{log.userAgent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pages > 1 && (
          <div className="activity-pagination">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </button>

            <span>
              Page {page} of {pages}
            </span>

            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActivity;