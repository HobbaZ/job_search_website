import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    console.log("Scrolled:", scrolled);
    if (scrolled > 300) {
      console.log("Setting visible to true");
      setVisible(true);
    } else {
      console.log("Setting visible to false");
      setVisible(false);
    }
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <a
      href="#search"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className={`btn scrollButton ${
        document.body.scrollTop > 300 ? "visible" : "invisisble"
      }`}
    >
      <i class="fa-solid fa-arrow-up"></i>
    </a>
  );
};

export default ScrollButton;
