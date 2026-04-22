import { useState } from "react";
import API from "../services/api";

type ApiResponse = {
  data: unknown;
  latency: number;
};

export default function Tester() {
  const [url, setUrl] = useState("");
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const execute = async () => {
    const res = await API.post("/execute", {
      url,
      method: "GET",
    });

    setResponse(res.data);
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>API Tester</h2>

      <input
        placeholder="Enter API URL"
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={execute}>Execute</button>

      {response && (
        <pre>{JSON.stringify(response, null, 2)}</pre>
      )}
    </div>
  );
}