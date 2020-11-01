const Cookies = require("js-cookie");

const { createStore, combineReducers, applyMiddleware } = require("redux");

const thunk = require("redux-thunk").default;

const { composeWithDevTools } = require("redux-devtools-extension");

const {
  productListReducer,
  productDetailsReducer,
} = require("./reducers/productReducers.js");

const { cartReducer } = require("./reducers/cartReducers.js");

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

// need cookies instead of local storage because of ssr
// const cartItemsFromStorage = localStorage.getItem("cartItems")
//   ? JSON.parse(localStorage.getItem("cartItems"))
//   : [];

const cartItemsFromStorage = Cookies.get("cartItems")
  ? JSON.parse(Cookies.get("cartItems"))
  : [];

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
