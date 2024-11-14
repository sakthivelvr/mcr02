import { createSlice } from "@reduxjs/toolkit";


const subServicesSlice = createSlice({
    name : "subServices",
    initialState : {
        loading : false,
        subServices : []
    },
    reducers : {
        subServicesRequest(state, action) {
            return {
                loading : true
            }
        },
        subServicesSuccess(state, action) {
            return {
                loading : false,
                subServices : action.payload.subServices
            }
        },
        subServicesFail(state, action) {
            return {
                loading : false,
                error : action.payload
            }
        },


        getSubServicesOfSelectedServiceRequest(state, action) {
            return {
                ...state,
                loading : true
            }
        },
        getSubServicesOfSelectedServiceSuccess(state, action) {
            return {
                ...state,
                loading : false,
                subServicesForSelectedService : action.payload.services
            }
        },
        getSubServicesOfSelectedServiceFail(state, action) {
            return {
                ...state,
                loading : false,
                error : action.payload
            }
        },
    }
})

const {actions, reducer} = subServicesSlice;

export const {
    subServicesRequest, subServicesSuccess, subServicesFail, 
    getSubServicesOfSelectedServiceRequest,
    getSubServicesOfSelectedServiceSuccess, getSubServicesOfSelectedServiceFail
} = actions;

export default reducer;
