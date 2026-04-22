import { useEffect, useState } from "react";
import API from "../services/api";

interface Log {
  status: number;
  latency: number;
}

export default function Logs() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    API.get("/logs").then((res) => setLogs(res.data));
  }, []);

  return (
    <div>
      <h2>Logs</h2>
      {logs.map((log, i) => (
        <div key={i}>
          Status: {log.status} | Latency: {log.latency}
        </div>
      ))}
    </div>
  );
}