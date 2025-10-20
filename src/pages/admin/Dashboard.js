import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [requests] = useState([
    { id: 1, bankId: 'BNK001', username: 'john.doe', adGroup: 'Finance_Team', status: 'Pending' },
    { id: 2, bankId: 'BNK002', username: 'jane.smith', adGroup: 'IT_Admin', status: 'Pending' },
    { id: 3, bankId: 'BNK003', username: 'mike.johnson', adGroup: 'HR_Department', status: 'Pending' },
    { id: 4, bankId: 'BNK004', username: 'sarah.williams', adGroup: 'Marketing_Team', status: 'Pending' },
    { id: 5, bankId: 'BNK005', username: 'tom.brown', adGroup: 'Sales_Team', status: 'Pending' },
    { id: 6, bankId: 'BNK006', username: 'emily.davis', adGroup: 'Finance_Team', status: 'Pending' },
    { id: 7, bankId: 'BNK007', username: 'david.wilson', adGroup: 'IT_Admin', status: 'Pending' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAdGroup, setFilterAdGroup] = useState('');

  const handleGrantAccess = (requestId) => {
    alert(`Access granted for request ID: ${requestId}`);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.id.toString().includes(searchTerm) ||
      request.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.adGroup.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAdGroup = filterAdGroup === '' || request.adGroup === filterAdGroup;

    return matchesSearch && matchesAdGroup;
  });

  const uniqueAdGroups = [...new Set(requests.map(r => r.adGroup))];

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">Dashboard</h2>
        <p className="text-muted">Access Request Management</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon bg-primary">
                <i className="bi bi-people"></i>
              </div>
              <div>
                <h3 className="fs-2 fw-bold mb-0 text-dark">150</h3>
                <p className="mb-0 text-muted small">Total Users</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon bg-warning">
                <i className="bi bi-clock-history"></i>
              </div>
              <div>
                <h3 className="fs-2 fw-bold mb-0 text-dark">{requests.length}</h3>
                <p className="mb-0 text-muted small">Pending Requests</p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border">
            <div className="card-body d-flex align-items-center gap-3">
              <div className="stat-icon bg-success">
                <i className="bi bi-check-circle"></i>
              </div>
              <div>
                <h3 className="fs-2 fw-bold mb-0 text-dark">45</h3>
                <p className="mb-0 text-muted small">Approved Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                  <option key={index} value={group}>{group}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setFilterAdGroup('');
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
                      <td className="p-3 align-middle">
                        <span className="bank-id-badge">{request.bankId}</span>
                      </td>
                      <td className="p-3 align-middle">
                        <div className="d-flex align-items-center">
                          <i className="bi bi-person-circle me-2 fs-5 text-secondary"></i>
                          {request.username}
                        </div>
                      </td>
                      <td className="p-3 align-middle">{request.adGroup}</td>
                      <td className="p-3 align-middle">
                        <button 
                          className="btn btn-grant-access px-3 py-2"
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
