import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { Fragment, useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification'; 
let isInital=true ;
function App() {
  const dispatch=useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible)
  const cart = useSelector(state => state.cart);
  const notification=useSelector(state=>state.ui.notification)
 
  useEffect(() => {

    const sendCartData = async () => {
      dispatch(uiActions.showNotification({status:'pending' , title:'senting ..', message:'sending cart data'}))
      const response = await fetch('https://rect-aebe4-default-rtdb.firebaseio.com/cart.json', { method: 'PUT', body: JSON.stringify(cart) })
      if (!response.ok) {
        throw new Error('sending cart data faild')
      }
     
      dispatch(uiActions.showNotification({status:'success' , title:'success ..', message:'sending cart data successfully'}))
      if(isInital){
        isInital=false
        return
      }
      sendCartData().catch(err=>{
        dispatch(uiActions.showNotification({status:'error' , title:'error ..', message:'sending cart data unsuccessfully'}))
      })
    };

  }, [cart])
  return (
    <Fragment>
     {!notification && <Notification status={notification.status}
     title={notification.title} message={notification.message}></Notification>}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
