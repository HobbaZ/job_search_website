import React from "react";
import ScrollButton from "./ScrollButton";

//Change year automatically
function year() {
  let date = new Date();
  return date.getFullYear();
}

const Footer = () => {
  return (
    <>
      <footer className="text-center row-sm-12">
        <h6 className="footerText d-inline text-white">Job Site, {year()}</h6>
        <p className="d-inline">
          <a
            className="footerLink"
            href="https://www.linkedin.com/in/zachary-hobba-52aaa182/"
            title="Zac's LinkedIn"
          >
            <i className="fab fa-linkedin footerIcon"></i>
          </a>
          <a
            className="footerLink"
            href="mailto:zachobba@gmail.com"
            title="zac's email address"
          >
            <i className="fas fa-envelope-square footerIcon"></i>
          </a>
          <a
            className="footerLink"
            href="https://github.com/HobbaZ"
            title="Zac's Github"
          >
            <i className="fab fa-github footerIcon"></i>
          </a>
        </p>
      </footer>
    </>
  );
};

export default Footer;
