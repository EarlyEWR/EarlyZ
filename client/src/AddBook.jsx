import React, { useState } from "react";
import axios from "axios";
import "./AddBook.css";

export default function AddBook() {
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
        const res = await axios.post('http://localhost:5000/api/books/add', form);
        alert(`Book added: ${res.data.title}`);
      } catch (err) {
      console.error(err);
      alert('Failed to add book');
      }
  };

  return (
    <div className="addBookDiv">
    <form className="addBookForm" onSubmit={handleSubmit}>
      <div className="addBookInput">
        <p>本棚に本を追加する</p>
      <input className="inputField" type="text" name="title" placeholder="タイトル" onChange={handleChange} required />
      <input className="inputField" type="text" name="author" placeholder="著者名" onChange={handleChange} required />
      <div className="inputBtnDiv">
        <input className="inputField" type="text" name="isbn" placeholder="ISBN" onChange={handleChange} required />
      </div>
      <button className="addButton" type="submit">追加</button>
      </div>
    </form>
  </div>
  )
}