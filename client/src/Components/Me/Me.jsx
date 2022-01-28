import React from "react";
import "./Me.css";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

const Me = () => {
  const navigate = useNavigate();

  const { user, loading } = useSelector((state) => state.userOptions);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="me_background">
          <h3 className="me_head">PROFILE</h3>
          <div className="me_container">
            <img src={user && user.profilePic.url} alt="profile pic" />
            <div className="me_info">
              <h3>
                {" "}
                <span>Name : &nbsp;</span>
                {user && user.username}
              </h3>
              <h3>
                {" "}
                <span>Email : &nbsp;</span>
                {user && user.email}
              </h3>
            </div>
            <div className="me_button">
              <button
                className="reset_pw"
                onClick={() => navigate("/reset_password")}
              >
                Reset Password
              </button>
              <button
                className="reset_pw"
                onClick={() => navigate("/edit_profile")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Me;
