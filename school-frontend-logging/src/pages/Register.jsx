import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "parent",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Step 1: Register
      await API.post("/auth/register", form);

      // Step 2: Login after register
      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);
      setUser(user);

      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <br />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
        </select>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        Already have an account?{" "}
        <a href="/login" style={{ textDecoration: "underline" }}>
          Login here
        </a>
      </p>
    </div>
  );
}
