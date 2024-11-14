import { createSlice } from "@reduxjs/toolkit";


const servicesSlice = createSlice({
    name : "services",
    initialState : {
        loading : false,
        services : []
    },
    reducers : {
        servicesRequest(state, action) {
            return {
                loading : true
            }
        },
        servicesSuccess(state, action) {
            return {
                loading : false,
                services : action.payload.services
            }
        },
        servicesFail(state, action) {
            return {
                loading : false,
                error : action.payload
            }
        },


        getServicesOfSelectedVehicleRequest(state, action) {
            return {
                ...state,
                loading : true
            }
        },
        getServicesOfSelectedVehicleSuccess(state, action) {
            return {
                ...state,
                loading : false,
                servicesForSelectedVehicle : action.payload.services
            }
        },
        getServicesOfSelectedVehicleFail(state, action) {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
    }
})

const {actions, reducer} = servicesSlice;

export const {servicesRequest, servicesSuccess, servicesFail,
    getServicesOfSelectedVehicleRequest, getServicesOfSelectedVehicleSuccess, getServicesOfSelectedVehicleFail
} = actions;

export default reducer;
