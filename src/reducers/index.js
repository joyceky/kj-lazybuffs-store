import { combineReducers } from 'redux';
import auth from './auth';
import confirmation from './confirmation';
import errors from './errors';
import loading from './loading';

import activeListItem from './toggle_active_list_item';
import activeOrderUpdateId from './toggle_order_update';

import saveUpdatedOrderId from './save_updated_order';

import storeActiveOrders from './store_active_orders';
import storeCompletedOrders from './store_completed_orders';

const rootReducer = combineReducers({
  errors,
  activeListItem,
  activeOrderUpdateId,
  auth,
  confirmation,
  loading,
  saveUpdatedOrderId,
  storeActiveOrders,
  storeCompletedOrders,
});
export default rootReducer;
