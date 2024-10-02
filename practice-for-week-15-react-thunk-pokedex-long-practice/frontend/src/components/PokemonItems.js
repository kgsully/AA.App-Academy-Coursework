import { useEffect } from "react";  // Phase 5 - import useEffect to dispatch thunk action creator when id changes
import { useSelector, useDispatch } from "react-redux"; // Phase 5 - add useDispatch to import
import { getPokemonItems } from "../store/items"; // Phase 5 - Import thunk action creator getPokemonItems

const PokemonItems = ({ pokemon, setEditItemId }) => {
  const dispatch = useDispatch()
  const items = useSelector((state) => {
    if (!pokemon.items) return null;
    return pokemon.items.map(itemId => state.items[itemId]);
  });

  // Phase 5 - Dispatch pokemon items thunk action creator whenever pokemon id param changes
  useEffect(() => {
    dispatch(getPokemonItems(pokemon.id));
  }, [pokemon.id, dispatch])
  // -------------------------------------------------------

  if (!items) {
    return null;
  }

  return items.map((item) => (
    <tr key={item.id}>
      <td>
        <img
          className="item-image"
          alt={item.imageUrl}
          src={`${item.imageUrl}`}
        />
      </td>
      <td>{item.name}</td>
      <td className="centered">{item.happiness}</td>
      <td className="centered">${item.price}</td>
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => setEditItemId(item.id)}>
            Edit
          </button>
        </td>
      )}
      {pokemon.captured && (
        <td className="centered">
          <button>
            Delete
          </button>
        </td>

      )}
    </tr>
  ));
};

export default PokemonItems;
