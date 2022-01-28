import {
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  CLEAR_USER_DETAILS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  EDIT_FAIL,
  EDIT_REQUEST,
  EDIT_SUCCESS,
  RESETPW_FAIL,
  RESETPW_REQUEST,
  RESETPW_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST
} from "../constants/userConstants";

import axios from "axios";

//user register
export const userRegister = (user) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const { data } = await axios.post("/api/user/register", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error });
  }
};

//user login
export const userLogin = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const { data } = await axios.post("/api/user/login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error });
  }
};

//logged in user details
export const userDetails = () => async(dispatch) =>{
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const { data } = await axios.get("/api/user/me");

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error });
  }
}

//user logout
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });

    await axios.get("api/user/logout");

    dispatch({ type: LOGOUT_SUCCESS });
    dispatch({ type: CLEAR_USER_DETAILS });
    
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error });
  }
};

//edit user
export const userEdit = (user) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_REQUEST });

    const { data } = await axios.put("/api/user/update", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({type : EDIT_SUCCESS})
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: EDIT_FAIL, payload: error });
  }
};

//reset pw
//logged in user details
export const userResetPw = (newpassword) => async(dispatch) =>{
  try {
    dispatch({ type: RESETPW_REQUEST });

    await axios.put("/api/user/reset",newpassword,{
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({ type: RESETPW_SUCCESS});
    
  } catch (error) {
    dispatch({ type: RESETPW_FAIL, payload: error });
  }
}
