import React, { useState } from "react";
import reportsData from "../../Data/reports.json";
import "./OpsPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Notification from '../../components/notification/notification';

const OpsPage = () => {
  const [reports, setReports] = useState(
    reportsData.map((r) => ({ ...r, status: "Pending" }))
  );
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const simulateSync = (report) => {
    updateReportStatus(report.id, "Syncing...");
    
    setTimeout(() => {
      const success = Math.random() > 0.2;
      const newStatus = success ? "Success" : "Failed";
      updateReportStatus(report.id, newStatus);

      const newLog = {
        id: logs.length + 1,
        name: report.name,
        status: newStatus,
        time: new Date().toLocaleTimeString(),
      };
      setLogs((prev) => [newLog, ...prev]);
    }, 1500);
  };

  const updateReportStatus = (id, newStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const handleSyncAll = () => {
    reports.filter((r) => r.status === "Pending").forEach(simulateSync);
  };

  const filteredLogs = logs.filter((log) =>
    log.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalReports = reports.length;
  const syncedReports = reports.filter((r) => r.status === "Success").length;
  const pendingReports = reports.filter((r) => r.status === "Pending").length;
  const failedReports = reports.filter((r) => r.status === "Failed").length;

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">Operations Dashboard</h2>
          <p className="text-secondary mb-0">
            Monitor and manage report synchronization
          </p>
        </div>
        <div className="notification-bell-container">
          <button 
            className="notification-bell-btn"
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            title="View pending reports"
          >
            🔔
            {pendingReports > 0 && (
              <span className="notification-badge">{pendingReports}</span>
            )}
          </button>
          <Notification 
            reports={reports}
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
          />
        </div>
      </div>

      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <div className="card border-start border-primary shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Total Reports</h6>
              <p className="card-text">{totalReports}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-start border-success shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Synced</h6>
              <p className="card-text">{syncedReports}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-start border-warning shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Pending</h6>
              <p className="card-text">{pendingReports}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-start border-danger shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Failed</h6>
              <p className="card-text">{failedReports}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Reports to be Synced</h5>
          <button className="btn btn-primary btn-sm" onClick={handleSyncAll}>
            🔄 Sync All
          </button>
        </div>
        <div className="card-body p-0">
          <table className="table table-bordered table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Report Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.name}</td>
                  <td>{report.date}</td>
                  <td>
                    <span
                      className={`badge ${
                        report.status === "Success"
                          ? "bg-success"
                          : report.status === "Pending"
                          ? "bg-warning text-dark"
                          : report.status === "Failed"
                          ? "bg-danger"
                          : "bg-primary"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td>
                    {report.status === "Pending" ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => simulateSync(report)}
                      >
                        Sync
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Transfer Log</h5>
          <input
            type="text"
            className="form-control form-control-sm w-auto"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="card-body p-0">
          <table className="table table-bordered table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Report Name</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.name}</td>
                    <td>
                      <span
                        className={`badge ${
                          log.status === "Success"
                            ? "bg-success"
                            : log.status === "Failed"
                            ? "bg-danger"
                            : "bg-primary"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td>{log.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No transfer logs yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OpsPage;
