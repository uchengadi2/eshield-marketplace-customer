import { formValues } from "redux-form";
import data from "../apis/local";
import history from "../history";

import {
  SIGN_IN,
  SIGN_OUT,
  SIGN_UP,
  CREATE_CATEGORY,
  FETCH_CATEGORIES,
  FETCH_CATEGORY,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  CREATE_USER,
  FETCH_USERS,
  FETCH_USER,
  DELETE_USER,
  EDIT_USER,
  CHANGE_OWN_PASSWORD,
  CHANGE_OWN_NAME,
  CREATE_CITY,
  FETCH_CITIES,
  FETCH_CITY,
  DELETE_CITY,
  EDIT_CITY,
  CREATE_VENDOR,
  FETCH_VENDORS,
  FETCH_VENDOR,
  DELETE_VENDOR,
  EDIT_VENDOR,
  CREATE_PRODUCT,
  FETCH_PRODUCTS,
  FETCH_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CREATE_POLICY,
  FETCH_POLICIES,
  FETCH_POLICY,
  DELETE_POLICY,
  EDIT_POLICY,
  CREATE_ORDER,
  FETCH_ORDERS,
  FETCH_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  FETCH_ASSIGNED_ORDERS,
  FETCH_COMPLETED_ORDERS,
  FETCH_ONTRANSIT_ORDERS,
  MAKE_PAYMENT,
  FETCH_PAYMENTS,
  FETCH_PAYMENT,
  DELETE_PAYMENT,
  EDIT_PAYMENT,
  CREATE_FULLFILLED_PAYMENT,
  FETCH_FULLFILLED_PAYMENTS,
  FETCH_FULLFILLED_PAYMENT,
  DELETE_FULLFILLED_PAYMENT,
  EDIT_FULLFILLED_PAYMENT,
  CREATE_PARTIAL_PAYMENT,
  FETCH_PARTIAL_PAYMENTS,
  FETCH_PARTIAL_PAYMENT,
  DELETE_PARTIAL_PAYMENT,
  EDIT_PARTIAL_PAYMENT,
  CREATE_CART,
  FETCH_CARTS,
  FETCH_CART,
  EDIT_CART,
  DELETE_CART,
  CREATE_RATE,
  FETCH_RATES,
  FETCH_RATE,
  EDIT_RATE,
  DELETE_RATE,
  CREATE_LOGISTICSPARTNER,
  FETCH_LOGISTICSPARTNERS,
  FETCH_LOGISTICSPARTNER,
  EDIT_LOGISTICSPARTNER,
  DELETE_LOGISTICSPARTNER,
  CREATE_TRANSACTION,
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
} from "./types";

//authentication and authorization  operations

// export const signIn = (userId) => {
//   return {
//     type: SIGN_IN,
//     payload: userId,
//   };
// };

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const signUp = (formValues) => {
  return async (dispatch) => {
    const response = await data.post("/users/signup", formValues);
    dispatch({ type: SIGN_UP, payload: response.data });
  };
};

export const signIn = (formValues) => {
  return async (dispatch) => {
    const response = await data.post("/users/login", formValues);

    if (response.status === 200) {
      //document.cookie = "jwt=" + response.data.token;
      //localStorage.setItem("token", JSON.stringify(response.data.token));
      // console.log("this token is:", token);
      dispatch({ type: SIGN_IN, payload: response.data });
      // history.push("/");
    } else {
      console.log("something went wrong here");
    }
  };
};
//category resources crud operations
export const createCategory = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/categories", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CATEGORY, payload: response.data });
    history.push("/");
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    const response = await data.get("/categories");
    dispatch({ type: FETCH_CATEGORIES, payload: response.data.data.data });
  };
};

export const fetchCategory = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/categories/${id}`);
    dispatch({ type: FETCH_CATEGORY, payload: response.data.data });
  };
};

export const editCategory = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/categories/${id}`, formValues);
    dispatch({ type: EDIT_CATEGORY, payload: response.data.data });
    history.push("/");
  };
};

export const deleteCategory = (id) => {
  return async (dispatch) => {
    await data.delete(`/categories/${id}`);
    dispatch({ type: DELETE_CATEGORY, payload: id });
    history.push("/");
  };
};

//user resource crud operation
export const createUser = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/users", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_USER, payload: response.data });
    history.push("/");
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    const response = await data.get("/users");
    dispatch({ type: FETCH_USERS, payload: response.data.data.data });
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/users/${id}`);
    dispatch({ type: FETCH_USER, payload: response.data });
  };
};

export const editUser = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/users/${id}`, formValues);
    dispatch({ type: EDIT_USER, payload: response.data });
    history.push("/users");
  };
};

export const changeOwnName = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log("this is the formvalues:", formValues, "token is:", token);
  return async (dispatch) => {
    const response = await data.patch(`/users/${id}`, formValues);
    console.log("this is the response at indexjs:", response);
    dispatch({ type: CHANGE_OWN_NAME, payload: response.data.status });
    //history.push("/profile");
  };
};

export const changeOwnPassword = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/users/updateMyPassword/`, formValues);
    dispatch({ type: CHANGE_OWN_PASSWORD, payload: response.data });
    // history.push("/profile");
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    await data.delete(`/users/${id}`);
    dispatch({ type: DELETE_USER, payload: id });
    history.push("/");
  };
};

////////////////////////////////////////////////////////

//city resource crud operation
export const createCity = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/cities", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_CITY, payload: response.data });
    history.push("/");
  };
};

export const fetchCities = () => {
  return async (dispatch) => {
    const response = await data.get("/cities");
    dispatch({ type: FETCH_CITIES, payload: response.data.data.data });
  };
};

export const fetchCity = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/cities/${id}`);
    dispatch({ type: FETCH_CITY, payload: response.data });
  };
};

export const editCity = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/cities/${id}`, formValues);
    dispatch({ type: EDIT_CITY, payload: response.data });
    history.push("/");
  };
};

export const deleteCity = (id) => {
  return async (dispatch) => {
    await data.delete(`/cities/${id}`);
    dispatch({ type: DELETE_CITY, payload: id });
    history.push("/");
  };
};

/////////////////////////////////////////////////////////////////////

//vendor resource crud operation
export const createVendor = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return async (dispatch) => {
    const response = await data.post("/vendors", formValues);
    console.log("this is the response from vendor creation");

    dispatch({ type: CREATE_VENDOR, payload: response.data });
    // history.push("/orders");
  };
};

export const fetchVendors = () => {
  return async (dispatch) => {
    const response = await data.get("/vendors");
    dispatch({ type: FETCH_VENDORS, payload: response.data.data.data });
  };
};

export const fetchVendor = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/vendors/${id}`);
    dispatch({ type: FETCH_VENDOR, payload: response.data });
  };
};

export const editVendor = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/vendors/${id}`, formValues);
    dispatch({ type: EDIT_VENDOR, payload: response.data });
    history.push("/");
  };
};

export const deleteVendor = (id) => {
  return async (dispatch) => {
    await data.delete(`/vendors/${id}`);
    dispatch({ type: DELETE_VENDOR, payload: id });
    history.push("/");
  };
};

///////////////////////////////////////////////////////////////////

//product resource crud operation
export const createProduct = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/products", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_PRODUCT, payload: response.data });
    history.push("/");
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await data.get("/products");
    dispatch({ type: FETCH_PRODUCTS, payload: response.data.data.data });
  };
};

export const fetchProduct = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/products/${id}`);
    dispatch({ type: FETCH_PRODUCT, payload: response.data });
  };
};

export const editProduct = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/products/${id}`, formValues);
    dispatch({ type: EDIT_PRODUCT, payload: response.data });
    history.push("/");
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    await data.delete(`/products/${id}`);
    dispatch({ type: DELETE_PRODUCT, payload: id });
    history.push("/");
  };
};

//////////////////////////////////////////////////////////////////

//policy resource crud operation
export const createPolicy = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/policies", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: CREATE_POLICY, payload: response.data });
    history.push("/");
  };
};

export const fetchPolicies = () => {
  return async (dispatch) => {
    const response = await data.get("/policies");
    dispatch({ type: FETCH_POLICIES, payload: response.data.data.data });
  };
};

export const fetchPolicy = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/policies/${id}`);
    dispatch({ type: FETCH_POLICY, payload: response.data });
  };
};

export const editPolicy = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/policies/${id}`, formValues);
    dispatch({ type: EDIT_POLICY, payload: response.data });
    history.push("/");
  };
};

export const deletePolicy = (id) => {
  return async (dispatch) => {
    await data.delete(`/policies/${id}`);
    dispatch({ type: DELETE_POLICY, payload: id });
    history.push("/");
  };
};

///////////////////////////////////////////////////////////////////////

//order resource crud operation
export const createOrder = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.post("/orders", formValues);

    dispatch({ type: CREATE_ORDER, payload: response.data });
    // history.push("/orders");
  };
};

export const fetchOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({ type: FETCH_ORDERS, payload: response.data.data.data });
  };
};

export const fetchAssignedOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });
    console.log("the orders issssssnew:", response);
    dispatch({ type: FETCH_ASSIGNED_ORDERS, payload: response.data.data.data });
  };
};

export const fetchCompletedOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({
      type: FETCH_COMPLETED_ORDERS,
      payload: response.data.data.data,
    });
  };
};

export const fetchOnTransitOrders = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/orders", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({
      type: FETCH_ONTRANSIT_ORDERS,
      payload: response.data.data.data,
    });
  };
};

export const fetchOrder = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/orders/${id}`);
    dispatch({ type: FETCH_ORDER, payload: response.data });
  };
};

export const editOrder = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/orders/${id}`, formValues);
    dispatch({ type: EDIT_ORDER, payload: response.data });
    history.push("/");
  };
};

export const deleteOrder = (id) => {
  return async (dispatch) => {
    await data.delete(`/orders/${id}`);
    dispatch({ type: DELETE_ORDER, payload: id });
    history.push("/");
  };
};

//////////////////////////////////////////////////////////////////////

//payment resource crud operation
export const makePayment = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/payments", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({ type: MAKE_PAYMENT, payload: response.data });
    history.push("/");
  };
};

export const fetchPayments = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/payments", {
      params: { paymentStatus: status, customer: userId },
    });
    console.log("the payments:", response);
    dispatch({ type: FETCH_PAYMENTS, payload: response.data.data.data });
  };
};

export const fetchPayment = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/payments/${id}`);
    dispatch({ type: FETCH_PAYMENT, payload: response.data });
  };
};

export const editPayment = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/payments/${id}`, formValues);
    dispatch({ type: EDIT_PAYMENT, payload: response.data });
    history.push("/");
  };
};

export const deletePayment = (id) => {
  return async (dispatch) => {
    await data.delete(`/payments/${id}`);
    dispatch({ type: DELETE_PAYMENT, payload: id });
    history.push("/");
  };
};

/////////////////////////////////////Completed Payments Resources ///////////////////////////////////

export const fetchCompletedPayments = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/payments", {
      params: { paymentStatus: status, customer: userId },
    });

    dispatch({
      type: FETCH_FULLFILLED_PAYMENTS,
      payload: response.data.data.data,
    });
  };
};

export const fetchCompletedPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.get(`/payments/${id}`);
    dispatch({
      type: FETCH_FULLFILLED_PAYMENT,
      payload: response.data.data.data,
    });
  };
};

export const editCompletedPayment = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/payments/${id}`, formValues);
    dispatch({
      type: EDIT_FULLFILLED_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/orders");
  };
};

export const deleteCompletedPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/payments/${id}`);
    dispatch({ type: DELETE_FULLFILLED_PAYMENT, payload: id });
    //history.push("/orders");
  };
};

export const createCompletedPayment = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/payments", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({
      type: CREATE_FULLFILLED_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/utilities/clusters");
  };
};

//////////////////////////////////////Partial Payments Resources ///////////////////////////////////

export const fetchPartialPayments = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/payments", {
      params: { paymentStatus: status, customer: userId },
    });

    dispatch({
      type: FETCH_PARTIAL_PAYMENTS,
      payload: response.data.data.data,
    });
  };
};

export const fetchPartialPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.get(`/payments/${id}`);
    dispatch({
      type: FETCH_PARTIAL_PAYMENT,
      payload: response.data.data.data,
    });
  };
};

export const editPartialPayment = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/payments/${id}`, formValues);
    dispatch({
      type: EDIT_PARTIAL_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/orders");
  };
};

export const deletePartialPayment = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/payments/${id}`);
    dispatch({ type: DELETE_PARTIAL_PAYMENT, payload: id });
    //history.push("/orders");
  };
};

export const createPartialPayment = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await data.post("/payments", {
      ...formValues,
      userId,
    });

    //console.log(response);
    dispatch({
      type: CREATE_PARTIAL_PAYMENT,
      payload: response.data.data.data,
    });
    //history.push("/utilities/clusters");
  };
};

////////////////////////////////////////////////CART //////////////////////////////////

export const createCart = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return async (dispatch, getState) => {
    const response = await data.post("/carts", formValues);
    dispatch({ type: CREATE_CART, payload: response.data.data.data });
  };
};

export const fetchCarts = (tokens) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/carts");

    dispatch({ type: FETCH_CARTS, payload: response.data.data.data });
  };
};

export const fetchCart = (id, token) => {
  return async (dispatch) => {
    const response = await data.get(`/carts/${id}`);
    dispatch({ type: FETCH_CART, payload: response.data });
  };
};

export const editCart = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/carts/${id}`, formValues);
    dispatch({ type: EDIT_CART, payload: response.data });
  };
};

export const deleteCart = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/carts/${id}`);
    dispatch({ type: DELETE_CART, payload: id });
  };
};

////////////////////////////////////////////////RATES //////////////////////////////////

export const createRate = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return async (dispatch, getState) => {
    const response = await data.post("/rates", formValues);
    dispatch({ type: CREATE_RATE, payload: response.data.data.data });
  };
};

export const fetchRates = (tokens) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/rates");

    dispatch({ type: FETCH_RATES, payload: response.data.data.data });
  };
};

export const fetchRate = (id, token) => {
  return async (dispatch) => {
    const response = await data.get(`/rates/${id}`);
    dispatch({ type: FETCH_RATE, payload: response.data });
  };
};

export const editRate = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/rates/${id}`, formValues);
    dispatch({ type: EDIT_RATE, payload: response.data });
  };
};

export const deleteRate = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/rates/${id}`);
    dispatch({ type: DELETE_RATE, payload: id });
  };
};

////////////////////////////////// LOGISTICS PARTNERS ///////////////////////////////

//vendor resource crud operation
export const createLogisticsPartner = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.post("/logisticspartners", formValues);

    //console.log(response);
    dispatch({
      type: CREATE_LOGISTICSPARTNER,
      payload: response.data.data.data,
    });
    //history.push("/vendors");
  };
};

export const fetchLogisticsPartners = (tokens) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/logisticspartners");

    dispatch({
      type: FETCH_LOGISTICSPARTNERS,
      payload: response.data.data.data,
    });
  };
};

export const fetchLogisticsPartner = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.get(`/logisticspartners/${id}`);
    dispatch({ type: FETCH_LOGISTICSPARTNER, payload: response.data });
  };
};

export const editLogisticsPartner = (id, formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.patch(`/logisticspartners/${id}`, formValues);
    dispatch({ type: EDIT_LOGISTICSPARTNER, payload: response.data });
  };
};

export const deleteLogisticsPartner = (id, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    await data.delete(`/logisticspartners/${id}`);
    dispatch({ type: DELETE_LOGISTICSPARTNER, payload: id });
  };
};

///////////////////////////////////////////////////////////////////////

//transaction resource crud operation
export const createTransaction = (formValues, token) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return async (dispatch) => {
    const response = await data.post("/transactions", formValues);

    dispatch({ type: CREATE_TRANSACTION, payload: response.data });
  };
};

export const fetchTransactions = (tokens, status, userId) => {
  data.defaults.headers.common["Authorization"] = `Bearer ${tokens}`;
  return async (dispatch) => {
    const response = await data.get("/transactions", {
      params: { status: status, orderedBy: userId },
    });

    dispatch({ type: FETCH_TRANSACTIONS, payload: response.data.data.data });
  };
};

export const fetchTransaction = (id) => {
  return async (dispatch) => {
    const response = await data.get(`/transactions/${id}`);
    dispatch({ type: FETCH_TRANSACTION, payload: response.data });
  };
};

export const editTransaction = (id, formValues) => {
  return async (dispatch) => {
    const response = await data.patch(`/transactions/${id}`, formValues);
    dispatch({ type: EDIT_TRANSACTION, payload: response.data });
  };
};

export const deleteTransaction = (id) => {
  return async (dispatch) => {
    await data.delete(`/transactions/${id}`);
    dispatch({ type: DELETE_TRANSACTION, payload: id });
  };
};
