import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://backend-schoolapp.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // ✅ Save token in localStorage
        localStorage.setItem("token", data.token);

        alert("Login successful ✅");

        // Redirect user after login
        navigate("/students");
      } else {
        alert(data.message || "Invalid credentials ❌");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <form
        onSubmit={handleLogin}
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          width: "300px",
          textAlign: "center",
        }}
      >
        <h2>Login</h2>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px",
            width: "100%",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
