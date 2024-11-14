import { createSlice } from "@reduxjs/toolkit";

const hourlyDataSlice = createSlice({
    name : "hourlyData",
    initialState : {
        loading : false,
        hourlyData : []
    },
    reducers : {
        hourlyDataRequest(state, action) {
            return {
                loading : true
            }
        },
        hourlyDataSuccess(state, action) {
            return {
                loading : false,
                hourlyData : action.payload.hourlyData
            }
        },
        hourlyDataFail(state, action) {
            return {
                loading : false,
                error : action.payload
            }
        },

    }
})

const {actions, reducer} = hourlyDataSlice;

export const {
   hourlyDataRequest, hourlyDataSuccess, hourlyDataFail
} = actions;

export default reducer;
