export default function(state = [], action){
  switch (action.type) {
    case 'GET_STORE_ACTIVE_ORDERS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}
