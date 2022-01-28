import React, { useState, useEffect } from "react";
import "./ResetPw.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {userResetPw} from '../../redux/actions/userActions'
import { RESETPW_RESET } from "../../redux/constants/userConstants";

const ResetPw = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Npassword, setNPassword] = useState("");
  const [Cpassword, setCPassword] = useState("");
  const [viewN, setViewN] = useState(false);
  const [viewC, setViewC] = useState(false);

  const [emailError, setemailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [pwError, setPwError] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setemailError(false);
    setNameError(false);
    setPwError(false)
  };

  const handleReset = (e) => {
    e.preventDefault();

    if(Cpassword !== Npassword)
      setemailError(true)
    else if(Npassword.length < 4)
      setNameError(true)
    else{
      const myForm = new FormData()
      myForm.set("newpassword",Npassword)

      dispatch(userResetPw(myForm))
    }
  };

  const {isResetpw,error,loading} = useSelector(state => state.resetPw)

  useEffect(()=>{
    if(isResetpw){
      dispatch({type:RESETPW_RESET});
      navigate(-1)
    }

    if(error){
      setemailError(true);
      dispatch({type:RESETPW_RESET});
    }

  },[dispatch,navigate,isResetpw,error])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="me_background">
          <h3 className="me_head">RESET PASSWORD</h3>
          <div className="me_container">
            <form
              className="edit_info"
              style={{ marginTop: "-20px" }}
              onSubmit={handleReset}
            >
              <div className="icon_input">
                {viewN ? (
                  <RemoveRedEyeIcon
                    className="view_btn"
                    onClick={() => setViewN(false)}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="view_btn"
                    onClick={() => setViewN(true)}
                  />
                )}

                <input
                  type={viewN ? "text" : "password"}
                  name="new_password"
                  value={Npassword}
                  onChange={(e) => setNPassword(e.target.value)}
                  placeholder="New Password"
                  className="edit_input"
                />
              </div>

              <div className="icon_input">
                {viewC ? (
                  <RemoveRedEyeIcon
                    className="view_btn"
                    onClick={() => setViewC(false)}
                  />
                ) : (
                  <VisibilityOffIcon
                    className="view_btn"
                    onClick={() => setViewC(true)}
                  />
                )}
                <input
                  type={viewC ? "text" : "password"}
                  name="confirm_password"
                  value={Cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="edit_input"
                />
              </div>
              <div className="me_button">
                <button className="reset_pw" onClick={() => navigate(-1)}>
                  Go Back
                </button>
                <button className="reset_pw" type="submit">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Snackbar open={emailError} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Passwords Do Not Match
        </Alert>
      </Snackbar>
      <Snackbar open={nameError} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Passwords Must Be Of Atleast 4 Characters
        </Alert>
      </Snackbar>
      <Snackbar open={pwError} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Something Went Wrong , Please Try Again
        </Alert>
      </Snackbar>
    </>
  );
};

export default ResetPw;
