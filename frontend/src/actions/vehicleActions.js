import axios from 'axios';
import { vehiclesFail, vehiclesRequest, vehiclesSuccess } from '../slices/vehiclesSlice';



export const getVehicles = async (dispatch) => {
    try {
        dispatch(vehiclesRequest());
        const {data} = await axios.get('/api/v1/vehicles');
        dispatch(vehiclesSuccess(data));

    } catch (error) {
        dispatch(vehiclesFail(error.response.data.message));    
    }
}