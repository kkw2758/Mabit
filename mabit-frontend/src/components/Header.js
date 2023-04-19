import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
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
          <a href="/joinForm"> 태그</a>
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
