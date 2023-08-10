import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand className="text-white" as={Link} to="/">
          Job Site
        </Navbar.Brand>
        <Nav className="ml-auto">
          <div>
            <NavLink
              as={Link}
              to="/"
              className={({ isActive }) =>
                `my-2 btn ${isActive ? "btn-primary" : "btn-light"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              as={Link}
              to="/contact"
              className={({ isActive }) =>
                `my-2 btn ${isActive ? "btn-primary" : "btn-light"}`
              }
            >
              Contact
            </NavLink>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
