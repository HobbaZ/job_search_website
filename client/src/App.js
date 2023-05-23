import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import AppNavBar from "./components/Navbar.js";

import "./App.css";

function App() {
  return (
    <>
      <Router>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route render={() => <h1>404! This page doesn't exist</h1>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
