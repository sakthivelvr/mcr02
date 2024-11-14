// const { createSlice } = require("@reduxjs/toolkit");
import { createSlice } from "@reduxjs/toolkit";


const vehiclesSlice = createSlice({
    name : "vehicles",
    initialState : {
        loading : false,
        vehicles : []
    },
    reducers : {
        vehiclesRequest(state, action) {
            return {
                loading : true
            }
        },
        vehiclesSuccess(state, action) {
            return {
                loading : false,
                vehicles : action.payload.vehicles
            }
        },
        vehiclesFail(state, action) {
            return {
                loading : false,
                error : action.payload
            }
        },
    }
})

const {actions, reducer} = vehiclesSlice;

export const {vehiclesRequest, vehiclesSuccess, vehiclesFail} = actions;

export default reducer;
