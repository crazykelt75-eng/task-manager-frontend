import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

const API_URL = "https://task-manager-backend-lv2a.onrender.com"; 

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function doLogin(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(API_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      console.log("login response", data);

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // save token so user stays logged in
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      setUser(data.username);
      navigate("/list");
    } catch {
      setError("Could not connect to server");
    }
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h1>Login</h1>
      <form onSubmit={doLogin} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">
        No account? <Link to="/register">Register here</Link>
      </p>
    </div>
  )
}

export default Login;