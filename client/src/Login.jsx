import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        username, 
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        console.log("Token stored:", res.data.token); 
        setMessage("Login successful!");
        navigate("/home");
      } else {
        setMessage("Login failed: Invalid response from server.");
      }
    } catch (err) {
      setMessage("Login failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="login-box">
          <div className="login-header">
            <span>ログイン</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
              <label htmlFor="username" className="label">名前</label>
              <i className="bx bx-user icon"></i>
            </div>
            <div className="input-box">
              <input 
                type="password"
                placeholder="Enter password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="password" className="label">パスワード</label>
              <i className="bx bx-lock icon"></i>
            </div>
            <div className="input-box">
              <button type="submit" className="input-submit">ログイン</button>
            </div>
          </form>
          <div className="register">
            <span><a href="/signup">登録</a></span>
          </div>
          {message && <p className="">{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Login;