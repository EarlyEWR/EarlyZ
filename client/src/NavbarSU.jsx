import React from 'react';
import './NavbarSU.css';
import Search from './Search';

export default function Navbar() {
  console.log("navbar rendered")
  return (
    <header className="header">
      <div className="header-container">
        <a className="brand" href="/">
          <span className="logo-icon">
            <img src="/logo.png" alt="Early 蔵書" />
          </span>
        </a>

        <input className="nav-toggle" type="checkbox" id="navbar-open" />
        <label className="nav-toggle-label" htmlFor="navbar-open">
          <svg xmlns="http://www.w3.org/2000/svg" width="0.88em" height="1em" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M0 96c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32h384c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zm448 160c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h384c17.7 0 32 14.3 32 32z"
            />
          </svg>
        </label>

        <nav className="nav-menu" aria-label="Header Navigation">
          <ul className='navBarList'>
            <li><Search /></li>
            <li><a href="./Library">蔵書一覧</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}


