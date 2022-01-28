import React, { useState, useEffect } from "react";
import "./Header.css";
import Helmet from "react-helmet";
import logo from "./netflixlogo.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { userRegister, userLogin } from "../../redux/actions/userActions";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { CLEAR_ERRORS } from "../../redux/constants/userConstants";
import validator from 'validator'

const Header = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [Semail, setSemail] = useState("");
  const [Spassword, setSpassword] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const [emailError, setemailError] = useState("");
  const [pwError, setpwError] = useState("");
  const [registerError , setRegisterError] = useState(false)
  const [signinError , setSigninError] = useState(false)


  const dispatch = useDispatch();

  const handleEmail = (e) => {
    if (!validator.isEmail(email) || email.length < 13)
      setemailError(true)
    else setShowPw(true);
  };

  const handlePassword = (e) => {
    e.preventDefault();

    if (password.length < 3) {
      setpwError(true)
    } else {
      const myForm = new FormData();
      myForm.set("email", email);
      myForm.set("password", password);

      dispatch(userRegister(myForm));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setRegisterError(false)
    setSigninError(false)
    setemailError(false)
    setpwError(false)
    dispatch({type : CLEAR_ERRORS})
  };

  const handleSignin = (e) => {
    e.preventDefault();

    if (!validator.isEmail(Semail) || Semail.length < 13) {
      setemailError(true)
    } else if (Spassword.length < 3) {
      setpwError(true)
    } else {
      const myForm = new FormData();
      myForm.set("email", Semail);
      myForm.set("password", Spassword);

      dispatch(userLogin(myForm));
    }
  };

  const { signin_error,register_error, loading } = useSelector(
    (state) => state.userOptions
  );

  useEffect(() => {    
    if (register_error === true)
      setRegisterError(true)

    if (signin_error === true){
      setShowLogin(true)
      setSigninError(true)
    }

  }, [signin_error,register_error]);

  return (
    <>
      <Helmet>
        <title>
          Netflix India - Watch TV Shows Online, Watch Movies Online
        </title>
      </Helmet>
      {loading === true ? (
        <Loader />
      ) : (
        <div className="header_container">
          <div className="header_nav">
            <img
              src={logo}
              alt="netflix logo"
              onClick={() => setShowLogin(false)}
            />
            <button onClick={() => setShowLogin(!showLogin)}>Sign In</button>
          </div>
          {showLogin ? (
            <div className="signin">
              <h3>Sign In</h3>
              <form>
                <input
                  type="email"
                  name="email"
                  value={Semail}
                  onChange={(e) => setSemail(e.target.value)}
                  placeholder="Email"
                  className="signin_input"
                  autoComplete="off"
                />
                <input
                  type="password"
                  name="password"
                  value={Spassword}
                  onChange={(e) => setSpassword(e.target.value)}
                  placeholder="Password"
                  className="signin_input"
                />
                <button
                  className="signin_input_btn"
                  type="submit"
                  onClick={handleSignin}
                >
                  Sign In
                </button>
              </form>
              <div className="signin_options">
                <span>
                  <input type="checkbox" />
                  Remember Me
                </span>

                <Link to="#">Need Help?</Link>
              </div>
              <h4>
                New To Netflix? &nbsp;{" "}
                <span onClick={() => setShowLogin(false)}>Sign Up now</span>{" "}
              </h4>
            </div>
          ) : (
            <div className="header_text">
              <h2>Unlimited movies, TV shows and more.</h2>
              <h4>Watch anywhere. Cancel anytime.</h4>
              <h5>
                Ready to watch? Enter your email to create or restart your
                membership.
              </h5>
              {!showPw ? (
                <div className="header_input">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                  />
                  <button className="header_input_btn" onClick={handleEmail}>
                    <span>Get Started </span>
                    <ChevronRightIcon style={{ transform: "scale(2)" }} />{" "}
                  </button>
                </div>
              ) : (
                <form className="header_input">
                  <input
                    type="password"
                    name="email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                  />
                  <button
                    className="header_input_btn"
                    onClick={handlePassword}
                    type="submit"
                  >
                    <span>Start Now</span>
                    <ChevronRightIcon style={{ transform: "scale(2)" }} />{" "}
                  </button>
                </form>
              )}
            </div>
          )}
          <Snackbar
              open={emailError}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
                variant="filled"
              >
                Please Enter A Valid Email Address
              </Alert>
            </Snackbar>

            <Snackbar
              open={pwError}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
                variant="filled"
              >
                Password Must Of Atleast 4 Characters
              </Alert>
            </Snackbar>

          <Snackbar
              open={registerError}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
                variant="filled"
              >
                User Already Exists , Please Try Logging In
              </Alert>
            </Snackbar>

            <Snackbar
              open={signinError}
              autoHideDuration={2000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
                variant="filled"
              >
                Invalid Credentials , Please Try Again
              </Alert>
            </Snackbar>
        </div>
      )}
    </>
  );
};

export default Header;
