import { useSelector, useDispatch } from 'react-redux';
import { emptyCart } from '../../store/cart';
import { getCartItems } from '../../store/cart';
import CartItem from './CartItem';
import './Cart.css';

function Cart() {
  const dispatch = useDispatch();

  // const produce = useSelector((state) => state.produce);
  // const cart = useSelector((state) => state.cart);
  // const cartItems = Object.values(cart)
  // .map(item => {
  //   return {
  //     ...item,
  //     ...produce[item.id]
  //   };
  // });

  // Refactor to use selector function:
  const cartItems = useSelector(getCartItems)

  if (!cartItems || !cartItems.length) return (
    <div className="cart">
      No items in the cart. Start selecting items to purchase.
    </div>
  );

  const onSubmit = (e) => {
    e.preventDefault();
    window.alert(
      "Purchased the following:\n" +
      `${cartItems.map(item => `${item.count} of ${item.name}`).join('\n')}`
    );
    dispatch(emptyCart());
  }

  return (
    <div className="cart">
      <ul>
        {cartItems.map(item => <CartItem key={item.id} item={item}/>)}
      </ul>
      <hr />
      <form onSubmit={onSubmit}>
        <button type="submit">Purchase</button>
      </form>
    </div>
  )
}

export default Cart;
