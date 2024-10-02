import { useEffect } from "react";  // Phase 5 - import useEffect to dispatch thunk action creator when id changes
import { useSelector, useDispatch } from "react-redux"; // Phase 5 - add useDispatch to import
import { getPokemonItems, deletePokemonItem } from "../store/items"; // Phases 5 (thunk action creator getPokemonItems) & 6 (thunk action creator deletePokemonItem)

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

  const handleDelete = async (itemId) => {
    dispatch(deletePokemonItem(itemId, pokemon.id));
  }

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
          <button onClick={() => handleDelete(item.id)}>
            Delete
          </button>
        </td>

      )}
    </tr>
  ));
};

export default PokemonItems;
