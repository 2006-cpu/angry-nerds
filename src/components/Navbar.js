import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Navigation = () => {
    return <div><Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">Codalorians</Navbar.Brand>
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

        <Nav.Link>
          <NavLink to="/users/login">Login</NavLink>
          <Link style={{color: 'lightgrey', padding: '.5rem'}} to="/orders/cart">Cart</Link>
        </Nav.Link>
        <Nav.Link eventKey={2}>
          Filler

        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar></div>
}

export default Navigation;