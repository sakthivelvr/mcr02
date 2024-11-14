import {combineReducers, configureStore, createAsyncThunk} from "@reduxjs/toolkit";
import {thunk} from 'redux-thunk'
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';
import vehiclesReducer from './slices/vehiclesSlice';
import serviceReducer from './slices/servicesSlice';
import orderReducer from './slices/ordersSlice';
import totalPriceReducer from './slices/totalPriceSlice';
import subServiceReducer from './slices/subServicesSlice';
import hourlyDataReducer from './slices/hourlyDataSlice';

const reducer = combineReducers({
    productState : productsReducer,
    authState : authReducer,
    vehicleState : vehiclesReducer,
    serviceState : serviceReducer,
    orderState : orderReducer,
    totalPriceState : totalPriceReducer,
    subServiceState : subServiceReducer,
    hourlyDataState : hourlyDataReducer,


});

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          thunk
        })

})
export default store;

