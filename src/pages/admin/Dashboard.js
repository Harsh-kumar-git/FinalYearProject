import React, { useState, useEffect } from "react";
import api from "../../api/api";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_User: 0,
    pendingRequests: 0,
    approved_Today: 0,
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAdGroup, setFilterAdGroup] = useState("");

  // ✅ Fetch dashboard stats + requests
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch stats
        const statsResponse = await api.get("/admin/dashboard/stats");
        const statsData = Array.isArray(statsResponse.data)
          ? statsResponse.data[0]
          : statsResponse.data;
        setStats(statsData || {});

        // Fetch requests (optional)
        const requestsResponse = await api.get("/admin/dashboard/requests");
        setRequests(requestsResponse.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ✅ Handle approve action
  const handleGrantAccess = async (requestId) => {
    try {
      const response = await api.post(`/admin/dashboard/access-requests/${requestId}/approve`);
      if (response.status === 200) {
        alert(`✅ Access granted for request ID: ${requestId}`);
        setRequests((prev) => prev.filter((req) => req.id !== requestId));
      }
    } catch (err) {
      console.error("Error granting access:", err);
      alert("❌ Failed to grant access");
    }
  };

  // ✅ Filtering logic
  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.id.toString().includes(searchTerm) ||
      request.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.adGroup.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAdGroup = !filterAdGroup || request.adGroup === filterAdGroup;
    return matchesSearch && matchesAdGroup;
  });

  const uniqueAdGroups = [...new Set(requests.map((r) => r.adGroup))];

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Admin Panel</h2>
        <p className="text-muted">Access Request Management</p>
      </div>

      {/* ==== Stats Section ==== */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon bg-primary text-white rounded-circle p-3">
                <i className="bi bi-people fs-4"></i>
              </div>
              <div>
                <h3 className="fs-2 fw-bold mb-0 text-dark">{stats.total_User}</h3>
                <p className="mb-0 text-muted small">Total Users</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon bg-warning text-white rounded-circle p-3">
                <i className="bi bi-clock-history fs-4"></i>
              </div>
              <div>
                <h3 className="fs-2 fw-bold mb-0 text-dark">{stats.pendingRequests}</h3>
                <p className="mb-0 text-muted small">Pending Requests</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon bg-success text-white rounded-circle p-3">
                <i className="bi bi-check-circle fs-4"></i>
              </div>
              <div>
                <h3 className="fs-2 fw-bold mb-0 text-dark">{stats.approved_Today}</h3>
                <p className="mb-0 text-muted small">Approved Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==== Requests Table ==== */}
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-3">Filter Requests</h5>
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label small text-muted">Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by ID, username, or AD group..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-5">
              <label className="form-label small text-muted">Filter by AD Group</label>
              <select
                className="form-select"
                value={filterAdGroup}
                onChange={(e) => setFilterAdGroup(e.target.value)}
              >
                <option value="">All Groups</option>
                {uniqueAdGroups.map((group, index) => (
                  <option key={index} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm("");
                  setFilterAdGroup("");
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="fw-bold text-dark p-3">Bank ID</th>
                  <th className="fw-bold text-dark p-3">Username</th>
                  <th className="fw-bold text-dark p-3">AD Group</th>
                  <th className="fw-bold text-dark p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td className="p-3 align-middle">{request.bankId}</td>
                      <td className="p-3 align-middle">{request.username}</td>
                      <td className="p-3 align-middle">{request.adGroup}</td>
                      <td className="p-3 align-middle">
                        <button
                          className="btn btn-success px-3 py-2"
                          onClick={() => handleGrantAccess(request.id)}
                        >
                          <i className="bi bi-check-circle me-2"></i>
                          Grant Access
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      No requests found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
