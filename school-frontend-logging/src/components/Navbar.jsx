import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/dashboard" style={{ marginRight: "15px", color: "white" }}>Dashboard</Link>
      <button onClick={handleLogout} style={{ background: "red", color: "white" }}>Logout</button>
    </nav>
  );
};

export default Navbar;
