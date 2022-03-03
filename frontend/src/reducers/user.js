export function userLogin(state = {}, action) {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };
    case "USER_LOGIN_SUCCESS":
      return { loading: false, userData: action.payload };
    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "USER_LOGIOUT":
      return {};
    default:
      return state;
  }
}

export function userRegister(state = {}, action) {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, userData: action.payload };
    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export function userDetail(state = { user: {} }, action) {
  switch (action.type) {
    case "USER_DETAIL_REQUEST":
      return { ...state, loading: true };
    case "USER_DETAIL_SUCCESS":
      return { loading: false, user: action.payload };
    case "USER_DETAIL_FAIL":
      return { loading: false, error: action.payload };
    case "USER_DETAIL_RESET":
      return { user: {} };
    default:
      return state;
  }
}

export function userUpdateProfile(state = {}, action) {
  switch (action.type) {
    case "USER_UPDATE_PROFILE_REQUEST":
      return { loading: true };
    case "USER_UPDATE_PROFILE_SUCCESS":
      return { loading: false, success: true, userData: action.payload };
    case "USER_UPDATE_PROFILE_FAIL":
      return { loading: false, error: action.payload };
    case "USER_UPDATE_PROFILE_RESET":
      return {};
    default:
      return state;
  }
}
