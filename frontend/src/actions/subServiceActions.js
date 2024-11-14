import axios from 'axios';
import { subServicesRequest, subServicesSuccess, subServicesFail, 
    getSubServicesOfSelectedServiceRequest,
    getSubServicesOfSelectedServiceSuccess, getSubServicesOfSelectedServiceFail
 } from '../slices/subServicesSlice';



export const getSubServices = async (dispatch) => {
    try {
        dispatch(subServicesRequest());
        const {data} = await axios.get('/api/v1/subServices');
        dispatch(subServicesSuccess(data));

    } catch (error) {
        dispatch(subServicesFail(error.response.data.message));    
    }
}

export const getSubServicesOfSelectedService = (serviceCategory) => async (dispatch) => {
    try {
        //api/v1/subservices/?subServiceCategory=ONE_WAY_TRANSFER
        dispatch(getSubServicesOfSelectedServiceRequest());
        const {data} = await axios.get(`/api/v1/subservices?subServiceCategory=${serviceCategory}`);
        dispatch(getSubServicesOfSelectedServiceSuccess(data));

    } catch (error) {
        dispatch(getSubServicesOfSelectedServiceFail(error.response.data.message));    
    }
}