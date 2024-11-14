import axios from 'axios';
import { hourlyDataFail, hourlyDataRequest, hourlyDataSuccess } from '../slices/hourlyDataSlice';



export const getHourlyData = async (dispatch) => {
    try {
        dispatch(hourlyDataRequest());
        const {data} = await axios.get('/api/v1/hourlydata');
        dispatch(hourlyDataSuccess(data));

    } catch (error) {
        dispatch(hourlyDataFail(error.response.data.message));    
    }
}

// export const getServicesOfSelectedVehicle = (vehicleCategory) => async (dispatch) => {
//     try {
//         dispatch(getServicesOfSelectedVehicleRequest());
//         const {data} = await axios.get(`/api/v1/services?vehicleCategory=${vehicleCategory}`);
//         dispatch(getServicesOfSelectedVehicleSuccess(data));

//     } catch (error) {
//         dispatch(getServicesOfSelectedVehicleFail(error.response.data.message));    
//     }
// }