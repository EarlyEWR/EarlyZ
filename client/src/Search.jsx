import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Search.css";
import axios from "axios";

  function Search() {
  const [title, setTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/books/search", {
        title: title,
      });

      if (res.data.length > 0) {
        setBooks(res.data);
        setMessage("");
      } else {
        setBooks([]);
        setMessage("No books found.");
      }
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div>
      <div id="searchBarContainer">
        <form onSubmit={handleSearch}>
          <input id="searchBarInput"
            type="text"
            placeholder="タイトル・著者名・ISBN"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button id="searchBarBtn" type="submit">検索</button>
        </form>
        {message && <p>{message}</p>}
        {books.length > 0 && (
          <ul>
            {books.map((book) => (
              <li key={book.id}>{book.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Search;