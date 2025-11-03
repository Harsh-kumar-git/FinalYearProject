import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/api';
import './Users.css';

const Users = () => {
  const { token } = useAuth(); // If you're using token for authorization
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]); // Initialize with empty array, not static users
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterAdGroup, setFilterAdGroup] = useState('');

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/admin/dashboard/users');
      console.log('Fetched users:', response.data); // Check the data
      setUsers(response.data || []); // Update state with fetched users
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users when component mounts
    setLoading(false); // Set loading to false after fetch completes
  }, []); // Empty dependency array ensures it only runs once when the component mounts

  // Filter users based on search term, status, and ad group
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === '' || user.status.toLowerCase() === filterStatus.toLowerCase();

    const matchesAdGroup =
      filterAdGroup === '' || user.adgroups.toLowerCase().includes(filterAdGroup.toLowerCase());

    return matchesSearch && matchesStatus && matchesAdGroup;
  });

  // Handle revoking user access
  const handleRevokeAccess = async (userId, username) => {
    try {
      await api.post('/api/admin/users/Revoke', { id: userId });
      fetchUsers(); // Refresh users after revoking access
      alert(`Access revoked for user: ${username}`);
    } catch (error) {
      console.error('Error revoking access:', error);
      alert('Failed to revoke access');
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="mb-4">
        <h2 className="fw-bold text-dark mb-1">User Management</h2>
        <p className="text-muted">Manage user access and permissions</p>
      </div>

      {/* Cards displaying user statistics */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card border-primary">
            <div className="card-body text-center">
              <h3 className="text-primary">{users.length}</h3>
              <p className="mb-0 text-muted">Total Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-success">
            <div className="card-body text-center">
              <h3 className="text-success">{users.filter(u => u.status === 'active').length}</h3>
              <p className="mb-0 text-muted">Active Users</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-secondary">
            <div className="card-body text-center">
              <h3 className="text-secondary">{users.filter(u => u.status === 'inactive').length}</h3>
              <p className="mb-0 text-muted">Inactive Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Users Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <h5 className="mb-3">Filter Users</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search by Bank ID, username, or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                onChange={(e) => setFilterStatus(e.target.value)}
                value={filterStatus}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filterAdGroup}
                onChange={(e) => setFilterAdGroup(e.target.value)}
              >
                <option value="">All Groups</option>
                {Array.from(new Set(users.flatMap(u => u.adgroups))).map((group, index) => (
                  <option key={index} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setFilterStatus('');
                  setFilterAdGroup('');
                }}
              >
                <i className="bi bi-x-circle me-2"></i>Clear
              </button>
            </div>
          </div>
        </div>

        {/* Table displaying filtered users */}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Username</th>
                  <th className="p-3">AD Groups</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="p-3 align-middle">{user.id}</td>
                      <td className="p-3 align-middle">{user.username}</td>
                      <td className="p-3 align-middle">{user.adgroups}</td>
                      <td className="p-3 align-middle">{user.status}</td>
                      <td className="p-3 align-middle">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRevokeAccess(user.id, user.username)}
                          disabled={user.status === 'inactive'}
                        >
                          <i className="bi bi-x-circle me-1"></i>Revoke Access
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      No users found matching your filters
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

export default Users;
