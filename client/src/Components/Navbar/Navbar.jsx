import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./netflixlogo.png";
import { useNavigate, Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutUser } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";


const Navbar = () => {
  const [scroll, setScroll] = useState(false);
  const [logoutError, setlogoutError] = useState(false);

  window.onscroll = () => {
    if (window.pageYOffset === 0) setScroll(false);
    else setScroll(true);

    return () => (window.onscroll = null);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLoggedOut, error } = useSelector((state) => state.loggingOutUser);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setlogoutError(false);
  };

  useEffect(() => {
    if (isLoggedOut === true) {
      navigate("/");
    }
  }, [dispatch, isLoggedOut, error]);

  return (
    <>
      <div
        className={scroll ? "navbar_container scrolled" : "navbar_container"}
      >
        <div className="navbar_logo">
          <img src={logo} alt="netflix logo" onClick={() => navigate("/")} />
        </div>

        <div className="navbar_left">
          <Link
            to="/series"
            className={location.pathname === "/series" && "active_link"}
          >
            Series
          </Link>
          <Link
            to="/movies"
            className={location.pathname === "/movies" && "active_link"}
          >
            Movies
          </Link>
          
          <Link
            to="/mylist"
            className={location.pathname === "/mylist" && "active_link"}
          >
            My List
          </Link>
        </div>

        <div className="navbar_options">
        <Tooltip title="Profile">
          <Link to="/me">
            <AccountCircleIcon className="search_icon" title="User Profile" />
          </Link>
          </Tooltip>
          <Tooltip title="Log Out">
            <Link to="/welcome" onClick={() => dispatch(logoutUser())}>
              <LogoutIcon className="profile_icon" />
            </Link>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default Navbar;
