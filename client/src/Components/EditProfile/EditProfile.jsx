import React, { useState, useCallback, useEffect } from "react";
import "./EditProfile.css";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { CLEAR_ERRORS, EDIT_RESET } from "../../redux/constants/userConstants";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import validator from "validator";
import { userDetails, userEdit } from "../../redux/actions/userActions";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileFileName, setProfileFileName] = useState();
  const [emailError, setemailError] = useState("");
  const [nameError, setNameError] = useState("");

  const { user } = useSelector((state) => state.userOptions);

  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.username);
  const [profileFile, setProfileFile] = useState("");

  const onDrop = useCallback((acceptedFile) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileFile(reader.result);
      }
    };

    reader.readAsDataURL(acceptedFile[0]);
    setProfileFileName(acceptedFile[0].name);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleEdit = (e) => {
    e.preventDefault();
    if (name.length < 3) setNameError(true);
    else if (!validator.isEmail(email) || email.length < 13)
      setemailError(true);
    else {
      const myForm = new FormData();
      myForm.set("username", name);
      myForm.set("email", email);
      myForm.set("profilePic", profileFile);

      dispatch(userEdit(myForm));
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setemailError(false);
    setNameError(false);
    dispatch({ type: CLEAR_ERRORS });
  };

  const { isEdit, error,loading} = useSelector((state) => state.editUser);

  useEffect(() => {
    if (isEdit === true) {
      dispatch({ type: EDIT_RESET });
      dispatch(userDetails());
      navigate(-1);
    }

    if (error === true) {
      dispatch({ type: EDIT_RESET });
      setNameError(true);
    }
  }, [dispatch,navigate, isEdit, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="me_background">
          <h3 className="me_head edit_head">EDIT PROFILE</h3>
          <div className="me_container edit_container">
            <div
              {...getRootProps()}
              className="drag_drop"
              style={
                profileFile
                  ? {
                      color: "white",
                      border: "2px dashed white",
                      backgroundColor: "gray",
                    }
                  : { color: "gray", border: "1px dashed gray" }
              }
            >
              <input {...getInputProps()} />
              <div>
                {profileFile
                  ? profileFileName
                  : "Click here or Drag & drop to upload your image"}
              </div>
            </div>
            <form
              className="edit_info"
              encType="multipart/form-data"
              onSubmit={handleEdit}
            >
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="edit_input"
                autoComplete="off"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="edit_input"
                autoComplete="off"
              />
              <div className="me_button">
                <button className="reset_pw" onClick={() => navigate(-1)}>
                  Go Back
                </button>
                <button className="reset_pw" type="submit">
                  Save Profile
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
          Please Enter A Valid Email Address
        </Alert>
      </Snackbar>
      <Snackbar open={nameError} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Name Must Be Of Atleast 3 Characters
        </Alert>
      </Snackbar>
      <Snackbar open={nameError} autoHideDuration={2000} onClose={handleClose}>
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

export default EditProfile;
