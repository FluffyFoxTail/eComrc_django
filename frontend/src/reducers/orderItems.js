export function orderItems(
  state = { orderItems: [], deliveryAddress: {} },
  action
) {
  switch (action.type) {
    case "ORDER_ADD_ITEM":
      const item = action.payload;
      const exitstItem = state.orderItems.find(
        (x) => x.product === item.product
      );

      if (exitstItem) {
        //exitstItem.product.count += item.product.count
        return {
          ...state,
          orderItems: state.orderItems.map((x) =>
            x.product === exitstItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          orderItems: [...state.orderItems, item],
        };
      }
    case "ORDER_REMOVE_ITEM":
      return {
        ...state,
        orderItems: state.orderItems.filter(
          (x) => x.product !== action.payload
        ),
      };
    case "ORDER_SAVE_DELIVERY_ADDRESS":
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    case "ORDER_SAVE_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case "ORDER_CLEAR_ITEMS":
      return {
        ...state,
        orderItems: [],
      };
    default:
      return state;
  }
}
