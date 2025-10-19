import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard() {
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
                <div className="stat-icon bg-success">
                  <i className="bi bi-diagram-3"></i>
                </div>
                <div>
                  <h3 className="fs-2 fw-bold mb-0 text-dark">24</h3>
                  <p className="mb-0 text-muted small">Total AD Groups</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border">
              <div className="card-body d-flex align-items-center gap-3">
                <div className="stat-icon bg-warning">
                  <i className="bi bi-file-earmark-text"></i>
                </div>
                <div>
                  <h3 className="fs-2 fw-bold mb-0 text-dark">342</h3>
                  <p className="mb-0 text-muted small">Total Files</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card border rounded">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0 fw-bold">Requests</h4>
          </div>

          <div className="bg-light p-3 border-bottom d-flex gap-2 align-items-center flex-wrap">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Keyword " 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ height: '40px' }}
              />
            </div>
            
            <select 
              className="form-select"
              value={filterAdGroup}
              onChange={(e) => setFilterAdGroup(e.target.value)}
              style={{ flex: '1', minWidth: '180px', height: '40px' }}
            >
              <option value="">All AD Groups</option>
              {uniqueAdGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>

            <button 
              className="btn btn-outline-secondary"
              onClick={() => {
                setSearchTerm('');
                setFilterAdGroup('');
              }}
              style={{ height: '40px', whiteSpace: 'nowrap' }}
            >
              <i className="bi bi-x-circle me-2"></i>
              Clear Filters
            </button>
          </div>

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
  );
}

export default Dashboard;
