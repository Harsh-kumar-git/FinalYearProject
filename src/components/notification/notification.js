import React from 'react';
import './notification.css';

const Notification = ({ reports, isOpen, onClose }) => {
  if (!isOpen) return null;

  const pendingReports = reports.filter(report => report.status === 'Pending');

  return (
    <div className='notification-panel'>
      <div className='notification-header'>
        <h5>Pending Reports to Sync</h5>
        <button className='close-btn' onClick={onClose}>×</button>
      </div>
      <div className='notification-body'>
        {pendingReports.length > 0 ? (
          <ul className='notification-list'>
            {pendingReports.map((report) => (
              <li key={report.id} className='notification-item'>
                <div className='notification-item-header'>
                  <span className='report-id'>#{report.id}</span>
                  <span className='report-date'>{report.date}</span>
                </div>
                <div className='report-name'>{report.name}</div>
                <span className='status-badge pending'>Needs Sync</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className='no-notifications'>
            <p>No pending reports to sync</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
