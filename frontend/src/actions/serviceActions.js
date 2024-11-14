import axios from 'axios';
import { getServicesOfSelectedVehicleFail, getServicesOfSelectedVehicleRequest, getServicesOfSelectedVehicleSuccess, 
    servicesFail, servicesRequest, servicesSuccess } from '../slices/servicesSlice';



export const getServices = async (dispatch) => {
    try {
        dispatch(servicesRequest());
        const {data} = await axios.get('/api/v1/services');
        dispatch(servicesSuccess(data));

    } catch (error) {
        dispatch(servicesFail(error.response.data.message));    
    }
}

export const getServicesOfSelectedVehicle = (vehicleCategory) => async (dispatch) => {
    try {
        dispatch(getServicesOfSelectedVehicleRequest());
        const {data} = await axios.get(`/api/v1/services?vehicleCategory=${vehicleCategory}`);
        dispatch(getServicesOfSelectedVehicleSuccess(data));

    } catch (error) {
        dispatch(getServicesOfSelectedVehicleFail(error.response.data.message));    
    }
}