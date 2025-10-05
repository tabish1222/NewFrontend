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
      marginBottom: "10px",
    }}
  >
    Login
  </button>

  {/* Inline Register link */}
  <p>
    Don’t have an account?{" "}
    <span
      style={{ color: "blue", cursor: "pointer" }}
      onClick={() => navigate("/register")}
    >
      Register here
    </span>
  </p>
</form>
