import axios from "axios";

export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_CREATE_REQUEST" });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders/add/`, order, config);

    dispatch({
      type: "ORDER_CREATE_SUCCESS",
      payload: data,
    });

    dispatch({
      type: "ORDER_CLEAR_ITEMS",
      payload: data,
    });
    localStorage.removeItem("orderItems");
  } catch (error) {
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrderAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_DETAIL_REQUEST" });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/`, config);

    dispatch({
      type: "ORDER_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDER_DETAIL_FAIL",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getAllOrdersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDERS_LIST_DETAIL_REQUEST" });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders/`, config);

    dispatch({
      type: "ORDERS_LIST_DETAIL_SUCCESS",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "ORDERS_LIST_DETAIL_FAIL",
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
