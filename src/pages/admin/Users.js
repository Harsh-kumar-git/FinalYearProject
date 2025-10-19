import React, { useState } from 'react';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([
    { id: 1, bankId: 'BNK001', username: 'john.doe', adGroups: ['Finance_Team', 'Audit_Group'] },
    { id: 2, bankId: 'BNK002', username: 'jane.smith', adGroups: ['IT_Admin', 'Security_Team'] },
    { id: 3, bankId: 'BNK003', username: 'mike.johnson', adGroups: ['HR_Department'] },
    { id: 4, bankId: 'BNK004', username: 'sarah.williams', adGroups: ['Marketing_Team', 'Sales_Team'] },
    { id: 5, bankId: 'BNK005', username: 'tom.brown', adGroups: ['Finance_Team'] },
    { id: 6, bankId: 'BNK006', username: 'emily.davis', adGroups: ['IT_Admin', 'Finance_Team', 'Audit_Group'] },
    { id: 7, bankId: 'BNK007', username: 'david.wilson', adGroups: ['HR_Department', 'Marketing_Team'] }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAdGroup, setFilterAdGroup] = useState('');

  const handleRevokeAccess = (userId) => {
    if (window.confirm('Are you sure you want to revoke access for this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.adGroups.some(group => group.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAdGroup = filterAdGroup === '' || user.adGroups.includes(filterAdGroup);

    return matchesSearch && matchesAdGroup;
  });

  const uniqueAdGroups = [...new Set(users.flatMap(u => u.adGroups))];

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>User Management</h2>
        <p className="text-muted">Manage user access and AD group assignments</p>
      </div>

      <div className="users-section">
        <div className="users-controls">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select 
            className="form-select filter-select"
            value={filterAdGroup}
            onChange={(e) => setFilterAdGroup(e.target.value)}
          >
            <option value="">All AD Groups</option>
            {uniqueAdGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>

          <button 
            className="btn btn-outline-secondary btn-clear-filters"
            onClick={() => {
              setSearchTerm('');
              setFilterAdGroup('');
            }}
          >
            <i className="bi bi-x-circle me-2"></i>
            Clear Filters
          </button>
        </div>

        <div className="users-table-container">
          <table className="table users-table">
            <thead>
              <tr>
                <th>Bank ID</th>
                <th>Username</th>
                <th>AD Groups</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <span className="bank-id-badge">{user.bankId}</span>
                    </td>
                    <td>
                      <div className="username-cell">
                        <i className="bi bi-person-circle me-2"></i>
                        {user.username}
                      </div>
                    </td>
                    <td>
                      <div className="ad-groups-cell">
                        {user.adGroups.join(', ')}
                      </div>
                    </td>
                    <td>
                      <button 
                        className="btn btn-revoke-access"
                        onClick={() => handleRevokeAccess(user.id)}
                      >
                        <i className="bi bi-x-circle me-2"></i>
                        Revoke Access
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-4">
                    No users found matching your filters
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

export default Users;
