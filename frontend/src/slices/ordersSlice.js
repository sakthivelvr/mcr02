// const { createSlice } = require("@reduxjs/toolkit");
import { createSlice } from "@reduxjs/toolkit";


const ordersSlice = createSlice({
    name : "orders",
    initialState : {
        loading : false,
        isOrderCreated : false,
        order : null
        // products : []
    },
    reducers : {
        orderRequest(state, action) {
            return {
                loading : true
            }
        },
        orderSuccess(state, action) {
            return {
                loading : false,
                isOrderCreated : true,
                order : action.payload.order
            }
        },
        orderFail(state, action) {
            return {
                loading : false,
                error : action.payload
            }
        },
        clearOrderCreated(state, action) {
            return {
                ...state,
                isOrderCreated : false

            }
        },
    }
})

const {actions, reducer} = ordersSlice;

export const {orderRequest, orderSuccess, orderFail, clearOrderCreated} = actions;

export default reducer;


