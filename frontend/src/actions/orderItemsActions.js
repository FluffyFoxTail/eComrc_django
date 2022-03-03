import axios from "axios";

export const addToOrder = (id, count) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}/`);

  dispatch({
    type: "ORDER_ADD_ITEM",
    payload: {
      product: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      available: data.available,
      count,
    },
  });

  localStorage.setItem(
    "orderItems",
    JSON.stringify(getState().orderItems.orderItems)
  );
};

export const removeFromOrder = (id) => async (dispatch, getState) => {
  dispatch({
    type: "ORDER_REMOVE_ITEM",
    payload: id,
  });

  localStorage.setItem(
    "orderItems",
    JSON.stringify(getState().orderItems.orderItems)
  );
};

export const saveDeliveryAddress = (data) => async (dispatch) => {
  dispatch({
    type: "ORDER_SAVE_DELIVERY_ADDRESS",
    payload: data,
  });

  localStorage.setItem("deliveryAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: "ORDER_SAVE_PAYMENT_METHOD",
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
