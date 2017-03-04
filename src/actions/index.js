export const API_URL = 'https://lazybuffs.herokuapp.com';
import axios from 'axios';

export const stylePhone = (num) => `${num.slice(0,3)}-${num.slice(3,6)}-${num.slice(6,10)}`;

export function submitOrder(order, auth) {
  return (dispatch) => {
    dispatch(submitOrderLoading());
    axios.post(`${API_URL}/dispatch/orders/create`, { order, auth })
    .then(({ data }) => {
      // TODO: handle with UI instead refresh
      if (data.err) {
        return dispatch(clearSubmitOrderLoading());
      }
      dispatch(clearSubmitOrderLoading());
      dispatch(submitOrderSuccess(data));
    })
    .catch(err => {
      console.log(err);
      dispatch(clearSubmitOrderLoading());
    });
  }
}
function submitOrderSuccess(orderId) {
  return {
    type: 'POST_ORDER_SUCCESS',
    payload: orderId,
  };
}
function submitOrderLoading() {
  return {
    type: 'SUBMIT_ORDER_LOADING',
  };
}
function clearSubmitOrderLoading() {
  return {
    type: 'CLEAR_SUBMIT_ORDER_LOADING',
  };
}

export function toggleActiveListItem(orderId) {
  return {
    type: 'TOGGLE_ACTIVE_LIST_ITEM',
    payload: orderId,
  };
}


export function toggleOrderUpdate(orderId){
  return {
    type: 'TOGGLE_ORDER_UPDATE',
    payload: orderId,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function login (email, password) {
  return (dispatch) => {
    dispatch(clearLoginError());
    dispatch(loginLoading());
    axios.post(`${API_URL}/login`, { email, password })
    .then(({ data }) => {
      if(data.profile) dispatch(loginSuccess(data.profile));
      console.log('clear login loading');
      dispatch(clearLoginLoading());
      if(data.err) dispatch(loginError(data.err));
    })
    .catch((err) => {
      dispatch(loginError(err));
      dispatch(clearLoginLoading());
    });
  }
}
function loginSuccess(profileWithJWT) {
  return {
    type: 'LOGIN_SUCCESS',
    payload: profileWithJWT,
  };
}
function loginError(err) {
  return {
    type: 'LOGIN_ERROR',
    payload: err,
  };
}
function clearLoginError(err) {
  return {
    type: 'CLEAR_LOGIN_ERROR',
  };
}
function loginLoading() {
  return {
    type: 'LOADING_LOGIN',
  };
}
function clearLoginLoading() {
  return {
    type: 'CLEAR_LOADING_LOGIN',
  };
}

export function saveUpdatedCustomer(newCustomerState, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/store/customer/update`, { newCustomerState, auth })
    .then(({ data }) => {
      dispatch(clearActiveSave());
      dispatch(getStoreActiveOrders(auth));
    })
    .catch(err => {
      console.log('error updating customer: ', err);
    })
  }
}

export function saveUpdatedOrder(orderId) {
  return {
    type: 'SAVE_UPDATED_ORDER',
    payload: orderId,
  };
}

export function clearActiveSave() {
  return {
    type: 'CLEAR_ACTIVE_SAVE',
  };
}


function clearActiveListItem(){
  return {
    type: 'CLEAR_ACTIVE_LIST_ITEM',
  };
}


export function getStoreActiveOrders(auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/store/orders/active`, { auth })
    .then(({ data }) => {
      console.log(data);
      dispatch(getStoreActiveOrdersSuccess(data));
    })
    .catch(err => console.log(err));
  };
}
function getStoreActiveOrdersSuccess(data) {
  return {
    type: 'GET_STORE_ACTIVE_ORDERS_SUCCESS',
    payload: data,
  };
}

export function getStoreCompletedOrders(auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/store/orders/completed`, { auth })
    .then(({ data }) => {
      dispatch(getStoreCompletedOrdersSuccess(data));
    })
    .catch(err => console.log(err));
  };
}
function getStoreCompletedOrdersSuccess(data) {
  return {
    type: 'GET_STORE_COMPLETED_ORDERS_SUCCESS',
    payload: data,
  };
}

export function getStoreCompletedOrdersSortBy(sortStr, auth) {
  return (dispatch) => {
    axios.post(`${API_URL}/store/orders/completed/sort`, { sortStr, auth })
    .then(({ data }) => dispatch(getStoreCompletedOrdersSortBySuccess(data)))
    .catch(err => console.log(err));
  }
}

function getStoreCompletedOrdersSortBySuccess(orders) {
  return {
    type: 'GET_STORE_COMPLETED_ORDERS_SORT_SUCCESS',
    payload: orders,
  };
}
