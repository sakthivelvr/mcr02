// const { createSlice } = require("@reduxjs/toolkit");
import { createSlice } from "@reduxjs/toolkit";

const totalPriceSlice = createSlice({
  name: "totalPrice",
  initialState: {
    priceDetails: {
      servicePrice: 0,
      midnightSurcharge: 0,
      tuasSouthBoulevard: 0,
      additionalStopAlongtheWay: 0,
      additionalStopOutoftheWay: 0,
    },
    totalPrice: 0,
    paymentMethod : 'CASH_PAYMENT'
  },
  reducers: {
    totalPriceModify(state, action) {
      return {
        ...action.payload        

      };
    },
  },
});

const { actions, reducer } = totalPriceSlice;

export const { totalPriceModify } = actions;

export default reducer;
