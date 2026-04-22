import { useEffect, useState } from "react";
import API from "../services/api";
import { APIItem } from "../types/api";

export default function APIs() {
  const [apis, setApis] = useState<APIItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await API.get("/apis");
      setApis(res.data);
    };

    load();
  }, []);

  return (
    <div>
      <h2>APIs</h2>
      {apis.map((api) => (
        <div key={api.id}>{api.name}</div>
      ))}
    </div>
  );
}