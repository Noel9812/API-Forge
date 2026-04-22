import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: 30 }}>
      <h1>APIForge Dashboard</h1>

      <div style={{ marginTop: 20 }}>
        <Link to="/apis">Manage APIs</Link>
      </div>

      <div>
        <Link to="/tester">API Tester</Link>
      </div>

      <div>
        <Link to="/logs">View Logs</Link>
      </div>
    </div>
  );
}