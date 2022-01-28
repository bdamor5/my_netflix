import React from "react";
import "./Footer.css";
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className="footer_container">
        <h2>Questions? Call <span>000-800-040-1843</span> </h2>
        <div className="footer_links">
          <ul className="fl">
            <li> <Link to='#'>FAQ</Link> </li>
            <li> <Link to='#'>Investor Relations</Link> </li>
            <li> <Link to='#'>Privacy</Link> </li>
            <li> <Link to='#'>Speed Test</Link> </li>
          </ul>

          <ul className="fl">
            <li> <Link to='#'>Help Centre</Link> </li>
            <li> <Link to='#'>Jobs</Link> </li>
            <li> <Link to='#'>Cookie Preferences</Link> </li>
            <li> <Link to='#'>Legal Notices</Link> </li>
          </ul>

          <ul className="fl">
            <li> <Link to='#'>Account</Link> </li>
            <li> <Link to='#'>Ways to Watch</Link> </li>
            <li> <Link to='#'>Corporate Information</Link> </li>
            <li> <Link to='#'>Only on Netflix</Link> </li>
          </ul>

          <ul className="fl">
            <li> <Link to='#'>Media Centre</Link> </li>
            <li> <Link to='#'>Terms of Use</Link> </li>
            <li> <Link to='#'>Contact Us</Link> </li>
            <li> <Link to='#'>Rate Us</Link> </li>
          </ul>
        </div>
        <h5>Netflix India</h5>
      </div>
    </>
  );
};

export default Footer;
