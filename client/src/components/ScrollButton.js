import React, { useState } from "react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  return (
    <button
      onClick={() => document.getElementById("navBar").scrollIntoView()}
      className={`btn scrollButton`}
    >
      <i className="fa-solid fa-arrow-up"></i>
      <span className="d-block">Top</span>
    </button>
  );
};

export default ScrollButton;
