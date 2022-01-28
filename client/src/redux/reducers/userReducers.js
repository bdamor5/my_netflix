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
  CLEAR_ERRORS,
  EDIT_FAIL,
  EDIT_REQUEST,
  EDIT_SUCCESS,
  EDIT_RESET,
  RESETPW_FAIL,
  RESETPW_REQUEST,
  RESETPW_SUCCESS,
  RESETPW_RESET,
  USER_DETAILS_FAIL,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_REQUEST
} from "../constants/userConstants";

//user register & login
export const userOptions = (state = {user:{}}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
        user:null,
        signin_error: false,
        register_error:false
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        signin_error: false,
        register_error:false
      };

    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        register_error:true,
        user: null
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        signin_error: true,
        user: null
      };
    
    case CLEAR_USER_DETAILS:
    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        signin_error: false,
        register_error:false,
        user: null
      };

    case CLEAR_ERRORS:
      return{
        ...state,
        signin_error: false,
        register_error:false
      }
    

    default:
      return state;
  }
};

//logged in user details, logging out the user
export const loggingOutUser = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        isLoggedOut:false
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedOut:true,
      };

      case LOGOUT_FAIL:
        return{
          ...state,
          loading:false,
          isLoggedOut:false,
          error:true
        }

    default:
      return state;
  }
};

//edit user
export const editUser = (state = {}, action) => {
  switch (action.type) {
    case EDIT_REQUEST:
      return {
        ...state,
        loading: true,
        isEdit:false
      };

    case EDIT_SUCCESS:
      return {
        ...state,
        loading: false,
        isEdit:true,
      };

      case EDIT_FAIL:
        return{
          ...state,
          loading:false,
          isEdit:false,
          error:true
        }

      case EDIT_RESET:
        return{
          ...state,
          isEdit:false,
          loading:false,
          error:false
        }

    default:
      return state;
  }
};

//reset pw user
export const resetPw = (state = {}, action) => {
  switch (action.type) {
    case RESETPW_REQUEST:
      return {
        ...state,
        loading: true,
        isResetpw:false
      };

    case RESETPW_SUCCESS:
      return {
        ...state,
        loading: false,
        isResetpw:true,
      };

      case RESETPW_FAIL:
        return{
          ...state,
          loading:false,
          isResetpw:false,
          error:true
        }

      case RESETPW_RESET:
        return{
          ...state,
          isResetpw:false,
          loading:false,
          error:false
        }

    default:
      return state;
  }
};
