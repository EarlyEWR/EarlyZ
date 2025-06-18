import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/auth/signup", {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      setMessage("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage("Registration failed.");
    }
  };

  return (
    <>
     <div className="wrapper">
      <div className="register-box">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="register-header">
          <span>登録</span>
        </div>
        <div className="input-box">
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter username"
        />
          <label htmlFor="user" className="label">名前</label>
          <i className="bx bx-user icon"></i>
        </div>
        <div className="input-box">
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Enter password"
        />
          <label htmlFor="password" className="label">パスワード</label>
          <i className="bx bx-lock icon"></i>
        </div>
        <div className="input-box">
          <button type="submit" className="input-submit">登録</button>
        </div>
        <div className="register">
          <span><a href="/Login">ログイン</a></span>
        </div>
        {message && <p className="">{message}</p>}
        </form>
      </div>
    </div>

  
    </>
  );
}