import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const orderItemsFromStorage = localStorage.getItem("orderItems")
  ? JSON.parse(localStorage.getItem("orderItems"))
  : [];

const deliveryAddressFromStorage = localStorage.getItem("deliveryAddress")
  ? JSON.parse(localStorage.getItem("deliveryAddress"))
  : {};

const userDataFromStorage = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const initialState = {
  orderItems: {
    orderItems: orderItemsFromStorage,
    deliveryAddress: deliveryAddressFromStorage,
  },
  userLogin: { userData: userDataFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
