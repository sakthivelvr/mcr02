import axios from 'axios';
import { totalPriceModify } from '../slices/totalPriceSlice';



export const modifyTotalPriceAction =(newPrice,  paymentMethod='CASH_PAYMENT') =>  async (dispatch) => {
    // let temp =  {
    //     priceDetails: {
    //       servicePrice: 0,
    //       midnightSurcharge: 0,
    //       tuasSouthBoulevard: 0,
    //       additionalStopAlongtheWay: 0,
    //       additionalStopOutoftheWay: 0,
    //     },
    //     totalPrice: 0
    //   }
    
      let tempPrice = {...newPrice}
      let tot = 0;
      for (const property in tempPrice.priceDetails) {
        tot = tot + tempPrice.priceDetails[property]
      }

      if(paymentMethod === 'CARD_PAYMENT'){
        console.log("tot bef: ", tot)

        tot = tot + (tot*0.10)
        console.log("tot aft: ", tot)
        tempPrice.totalPrice = tot;
      }else {
      tempPrice.totalPrice = tot;

      }


      
      console.log('INSIDE THE MODIFY USER ACTION : newPrice => ', tempPrice)

      dispatch(totalPriceModify({...tempPrice, paymentMethod}))


}

