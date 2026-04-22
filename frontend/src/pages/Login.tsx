import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await API.post("/auth/login", { email });
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: 50 }}>
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}