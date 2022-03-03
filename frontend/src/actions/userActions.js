import axios from "axios";
// import jwt_decode from "jwt-decode";

export const loginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const { data } = await axios.post(
      `/api/users/login/`,
      { username: email, password: password },
      { "Content-type": "application/json" }
    );

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userData", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logoutAction = () => (dispatch) => {
  localStorage.removeItem("userData");
  dispatch({ type: "USER_DETAIL_RESET" });
  dispatch({ type: "USER_LOGIOUT" });
  dispatch({ type: "ORDERS_LIST_DETAIL_RESET" });
};

export const registerAction = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: "USER_REGISTER_REQUEST" });

    const { data } = await axios.post(
      `/api/users/register/`,
      { name: name, email: email, password: password },
      { "Content-type": "application/json" }
    );

    dispatch({
      type: "USER_REGISTER_SUCCESS",
      payload: data,
    });
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userData", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_REGISTER_FAIL",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userDetailAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_DETAIL_REQUEST" });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}/`, config);

    dispatch({
      type: "USER_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "USER_DETAIL_FAIL",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUserProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: "USER_UPDATE_PROFILE_REQUEST" });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/users/profile/update/`,
      user,
      config
    );

    dispatch({
      type: "USER_UPDATE_PROFILE_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: data,
    });

    localStorage.setItem("userData", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "USER_UPDATE_PROFILE_FAIL",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
