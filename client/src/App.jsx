import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Search from "./Search";
import RequestBook from "./RequestBook";
import AddBook from "./AddBook"
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/request" element={<RequestBook />} />
        <Route path="/add" element={<AddBook />} />
      </Routes>
    </Router>
  );
}