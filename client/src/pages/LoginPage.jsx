import React, { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => e.target.value}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => e.target.value}
            required
          />
          <button type="submit">Login</button>
        </form>
        <a href="/register">Don't have an account? Sign up</a>
      </div>
    </div>
  );
};

export default LoginPage;
