import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';
export const fetchCartData=()=>{
    return  async dispatch=>{
        const fetchData=async()=>{
            const response = await fetch('https://rect-aebe4-default-rtdb.firebaseio.com/cart.json')
            if(!response.ok){
                throw new Error('could not fetch')
            }
            const data= await response.json()
            return data
        }
        try{
           const cartData=await  fetchData();
dispatch(cartActions.replaceCart(cartData))
        }catch(error){
            dispatch(uiActions.showNotification({status:'error' , title:'error ..', message:'fetcihing cart data unsuccessfully'}))
        }
    }
}



export const sendCartData=(cart)=>{
    return async (dispatch)=>{
      dispatch(uiActions.showNotification({status:'pending' , title:'senting ..', message:'sending cart data'}))
      const sendRequest=async()=>{
        const response = await fetch('https://rect-aebe4-default-rtdb.firebaseio.com/cart.json', { method: 'PUT', body: JSON.stringify(cart) })
      if (!response.ok) {
        throw new Error('sending cart data faild')
      }
      }
      try{
     await sendRequest()
     dispatch(uiActions.showNotification({status:'success' , title:'success ..', message:'sending cart data successfully'}))
      }catch(error){
        dispatch(uiActions.showNotification({status:'error' , title:'error ..', message:'sending cart data unsuccessfully'}))
      }
    
      
      
     
    }
    }