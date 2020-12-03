import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiUser, FiShoppingCart } from "react-icons/fi";

import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Navigation = (props) => {


  const {token, setToken, user, setUser} = props;

  //for the logout
  function clearCurrentUser() {
    localStorage.removeItem('token');
  }

  const handleLogout = () => {
    clearCurrentUser();
    console.log("See Ya!", "You Have Succesfully Logged Out!", "success");
    setUser({});
    setToken('');
  }


    return <div><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <NavLink to="/home">
      <Navbar.Brand>Codalorians</Navbar.Brand>
    </NavLink>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/products">Products</Link>
        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
          <NavDropdown.Item>Action</NavDropdown.Item>
          <NavDropdown.Item>Another action</NavDropdown.Item>
          <NavDropdown.Item>Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>

      { !token
      ? <>
      <Nav.Link>
      <NavLink to="/users/login"><Navbar.Brand>Login{<FiUser/>}</Navbar.Brand></NavLink>
      <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/orders/cart"><Navbar.Brand>Cart{<FiShoppingCart/>}</Navbar.Brand></Link>
        </Nav.Link>
        <Nav.Link eventKey={2}>
          <NavLink to="/users/register"><Navbar.Brand>Register</Navbar.Brand></NavLink>
        </Nav.Link>
        </>

        : <>
        <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/orders/cart"><Navbar.Brand>Cart{<FiShoppingCart/>}</Navbar.Brand></Link>
        <Nav.Link>
         <a onClick={handleLogout}className="nav-link" /* href="#" */>Logout</a>
        </Nav.Link>
        </>

      }
    
      </Nav>
    </Navbar.Collapse>
  </Navbar></div>




}

export default Navigation;