export function orderCreate(state = {}, action) {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return {
        loading: true,
      };
    case "ORDER_CREATE_SUCCESS":
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case "ORDER_CREATE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "ORDER_CREATE_RESET":
      return {};
    default:
      return state;
  }
}

export function orderDetail(state = { loading: true, order: {} }, action) {
  switch (action.type) {
    case "ORDER_DETAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ORDER_DETAIL_SUCCESS":
      return {
        loading: false,
        order: action.payload,
      };
    case "ORDER_DETAIL_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function userListOrders(state = { loading: true, orders: [] }, action) {
  switch (action.type) {
    case "ORDERS_LIST_DETAIL_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ORDERS_LIST_DETAIL_SUCCESS":
      return {
        loading: false,
        orders: action.payload,
      };
    case "ORDERS_LIST_DETAIL_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "ORDERS_LIST_DETAIL_RESET":
      return {
        orders: [],
      };
    default:
      return state;
  }
}
