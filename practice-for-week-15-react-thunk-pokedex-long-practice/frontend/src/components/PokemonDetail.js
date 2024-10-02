import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Phase 2 - added useDispatch to the import
import { getPokemonDetails } from '../store/pokemon';   // Phase 2 - Import getPokemonDetails thunk action creator
import PokemonItems from './PokemonItems';
import EditPokemonForm from './EditPokemonForm';
import ItemForm from './ItemForm';

const PokemonDetail = () => {
  const dispatch = useDispatch(); // Phase 2 - declare variable for useDispatch method
  const { pokemonId } = useParams();
  const pokemon = useSelector(state => state.pokemon[pokemonId]);
  const [showEditPokeForm, setShowEditPokeForm] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  useEffect(() => {
    setShowEditPokeForm(false);
    setEditItemId(null);
    dispatch(getPokemonDetails(pokemonId));   // Phase 2 - when id param changes, dispatch getPokemonDetails thunk action creator
  }, [pokemonId, dispatch]);    // Phase 2 - added dispatch to the depenency array

  if (!pokemon || !pokemon.moves) {
    return null;
  }

  let content = null;

  if (editItemId) {
    content = (
      <ItemForm
        itemId={editItemId}
        pokemonId={pokemonId}   // Bonus Phase 2 - pass the pokemonId into the ItemForm as it is required for add new item functionality
        hideForm={() => setEditItemId(null)}
      />
    );
  } else if (showEditPokeForm && pokemon.captured) {
    content = (
      <EditPokemonForm
        pokemon={pokemon}
        hideForm={() => setShowEditPokeForm(false)}
      />
    );
  } else {
    content = (
      <div className="pokemon-detail-lists">
        <div>
          <h2>Information</h2>
          <ul>
            <li>
              <b>Number</b> {pokemon.number}
            </li>
            <li>
              <b>Type</b> {pokemon.type}
            </li>
            <li>
              <b>Attack</b> {pokemon.attack}
            </li>
            <li>
              <b>Defense</b> {pokemon.defense}
            </li>
            <li>
              <b>Moves</b>
              <ul>
                {pokemon.moves && pokemon.moves.map((move, i) => (
                  <li key={move+i}>{move}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <h2>
            Items
            <button onClick={() => setEditItemId(-1)}> + </button>
          </h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Happiness</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <PokemonItems pokemon={pokemon} setEditItemId={setEditItemId} />
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-detail">
      <div className={`pokemon-detail-image-background`}>
        <div
          className="pokemon-detail-image"
          style={{ backgroundImage: `url('${pokemon.imageUrl}')` }}
        ></div>
        <div>
          <h1 className="bigger">{pokemon.name}</h1>
          {(!showEditPokeForm && pokemon.captured) && (
            <button onClick={() => setShowEditPokeForm(true)}>Edit</button>
          )}
        </div>

      </div>
      {content}
    </div>
  );
};

export default PokemonDetail;
