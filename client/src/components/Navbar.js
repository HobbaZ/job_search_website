import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Nav className="navbar navbar-expand-lg navbar-light">
      <Container fluid>
        <Navbar.Brand as={Link} className="ml-3" to="/">
          Job Site
        </Navbar.Brand>

        {/*Navbar collapse and expand */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navBarResponsive"
          aria-controls="navBarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span id="hamburgerIcon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navBarResponsive">
          <Nav className="navbar-nav ml-auto mb-2 mb-lg-0">
            <NavLink
              as={Link}
              to="/"
              className={({ isActive }) =>
                `ml-3 my-2 btn ${isActive ? "btn-primary" : "btn-light"}`
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
          </Nav>
        </div>
      </Container>
    </Nav>
  );
};

export default AppNavbar;
