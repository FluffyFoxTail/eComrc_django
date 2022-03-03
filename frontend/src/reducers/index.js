import { combineReducers } from "redux";

import { productList, productDetail } from "./product";
import { orderItems } from "./orderItems";
import { orderCreate, orderDetail, userListOrders } from "./order";
import { userLogin, userRegister, userDetail, userUpdateProfile } from "./user";
export default combineReducers({
  productList,
  productDetail,
  orderItems,
  orderCreate,
  orderDetail,
  userListOrders,
  userLogin,
  userRegister,
  userDetail,
  userUpdateProfile,
});
