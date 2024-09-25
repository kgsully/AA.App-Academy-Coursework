import { useDispatch } from "react-redux";
import { addToCart } from '../../store/cart';
import { likeProduce } from "../../store/produce";

function ProduceDetails({ produce }) {
  const cartItem = {};
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(produce.id));
  }

  const handleLike = () => {
    dispatch(likeProduce(produce.id));
  }

  return (
    <li className="produce-details">
      <span>{produce.name}</span>
      <span>
        <button
          className={"like-button" + (produce.liked ? " selected" : "")}
          onClick={handleLike}
        >
          <i className={"fas fa-heart"} />
        </button>
        <button
          className={"plus-button" + (cartItem ? " selected" : "")}
          onClick={handleAddToCart}
        >
          <i className="fas fa-plus" />
        </button>
      </span>
    </li>
  );
}

export default ProduceDetails;
