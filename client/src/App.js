import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import AppNavBar from "./components/Navbar.js";

import "./App.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Router basename="/job_search_website">
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route render={() => <h1>404! This page doesn't exist</h1>} />
        </Routes>
      </Router>
      <Container>
        <Footer />
      </Container>
    </>
  );
}

export default App;
