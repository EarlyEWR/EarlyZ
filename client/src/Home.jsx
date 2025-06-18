import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './home.css';
import Navbar from "./NavbarSU";
import AddBook from "./AddBook";
import RequestBook from "./RequestBook";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token in Home:", token);
      if (!token) {
        navigate("/login");
        return;
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <>
    <div>
      <Navbar />
      <div className="welcomeTitle">

      </div>
      <div className="bookForms">
        <AddBook />
        <RequestBook />
      </div>
    </div> 
  </>
  );
}

export default Home;