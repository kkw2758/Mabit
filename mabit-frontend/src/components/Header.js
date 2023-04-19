import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        {/* <Navbar.Brand href="#home">홈</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">
          Mabit
        </Link>
        <Nav className="me-auto">
          <Link to="/joinForm" className="nav-link">
            회원가입
          </Link>
          <Link to="/loginForm" className="nav-link">
            로그인
          </Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
