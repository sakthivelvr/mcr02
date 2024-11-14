import axios from 'axios';
import {productsRequest, productsSuccess, productsFail} from '../slices/productsSlice';



export const getProducts = async (dispatch) => {
    try {
        dispatch(productsRequest());
        const {data} = await axios.get('/api/v1/products');
        dispatch(productsSuccess(data));

    } catch (error) {
        dispatch(productsFail(error.response.data.message));    
    }
}