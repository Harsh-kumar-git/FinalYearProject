import React, { useState } from 'react';
import './AdminPathConfig.css';

const AdminPathConfig = () => {
  const [alert, setAlert] = useState('');

  const pathConfigs = [
    {
      adGroup: 'Wealth Compliance',
      description: 'Compliance Reports',
      path: 'SG/Retail/Customer',
      reports: 'KYC Reports, Dormant Reports, AML Reports'
    },
    {
      adGroup: 'Wealth User Admin',
      description: 'Global User Management',
      path: 'Global/User',
      reports: 'Active User, Inactive User'
    }
  ];

  const handleApiCall = async (config) => {
    try {
      const response = await fetch('http://localhost:8080/api/path-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        setAlert('API call successful!');
      } else {
        setAlert('API call failed!');
      }
    } catch (error) {
      console.error('Error calling API:', error);
      setAlert('API call failed!');
    }

    // Clear alert after 3 seconds
    setTimeout(() => setAlert(''), 3000);
  };

  return (
    <div className="admin-path-config">
      <h2>Path Configuration</h2>
      <table className="path-config-table">
        <thead>
          <tr>
            <th>AD Group</th>
            <th>Description</th>
            <th>Path</th>
            <th>Reports</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pathConfigs.map((config, index) => (
            <tr key={index}>
              <td>{config.adGroup}</td>
              <td>{config.description}</td>
              <td>{config.path}</td>
              <td>{config.reports}</td>
              <td>
                <button
                  className="call-api-btn"
                  onClick={() => handleApiCall(config)}
                >
                  Call API
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {alert && <div className="alert">{alert}</div>}
    </div>
  );
};

export default AdminPathConfig;
