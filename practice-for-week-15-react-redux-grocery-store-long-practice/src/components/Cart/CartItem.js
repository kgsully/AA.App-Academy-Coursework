import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, incrementQty, decrementQTY, setQty } from '../../store/cart';

function CartItem({ item }) {
  const [count, setCount] = useState(item.count);
  const dispatch = useDispatch();

  useEffect(() => {
    setCount(item.count);
  }, [item.count]);

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.id));
  }

  const handleIncrementQty = () => {
    dispatch(incrementQty(item.id));
  }

  const handleDecrementQty = () => {
    dispatch(decrementQTY(item.id));
  }

  const handleSetQty = () => {
    const qty = parseInt(count);
    if (qty <= 0) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(setQty(item.id, qty));
    }
  }

  return (
    <li className="cart-item">
      <div className="cart-item-header">{item.name}</div>
      <div className="cart-item-menu">
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(() => e.target.value)}
          onBlur={handleSetQty}
          // onKeyDown={(e) => {
          //   if(e.key === 'Enter') handleSetQty();
          // }}
        />
        <button
          className="cart-item-button"
          onClick={handleIncrementQty}
        >
          +
        </button>
        <button
          className="cart-item-button"
          onClick={handleDecrementQty}
        >
          -
        </button>
        <button
          className="cart-item-button"
          onClick={handleRemoveItem}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartItem;
