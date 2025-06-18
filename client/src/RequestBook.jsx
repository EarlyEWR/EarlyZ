import React, { useState } from "react";
import axios from "axios";
import "./RequestBook.css";

export default function RequestBook() {
    const [form, setForm] = useState({
      title: '',
      author: '',
      isbn: '',
    });

    const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post('http://localhost:5000/api/books/request', form);
        alert(`Book request sent: ${res.data.title}`);
      } catch (err) {
      console.error(err);
      alert('Failed to send book request');
      }
  };

  return (
    <div className="reqBookDiv">
    <form className="reqBookForm" onSubmit={handleSubmit}>
      <div className="reqBookInput">
        <p>本をリクエスト</p>
      <input className="inputField" type="text" name="title" placeholder="タイトル" onChange={handleChange} required />
      <input className="inputField" type="text" name="author" placeholder="著者名" onChange={handleChange} required />
      <div className="inputBtnDiv">
        <input className="inputField" type="text" name="isbn" placeholder="ISBN" onChange={handleChange} required />
      </div>
      <button className="reqButton" type="submit">リクエスト</button>
      </div>
    </form>
  </div>
  )
}