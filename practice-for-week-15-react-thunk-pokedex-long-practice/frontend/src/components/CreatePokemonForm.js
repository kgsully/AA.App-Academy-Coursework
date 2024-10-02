import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getPokemonTypes, createPokemon } from '../store/pokemon';  // Phase 3 - added import for createPokemon thunk action creator

const CreatePokemonForm = ({ hideForm }) => {
  const pokeTypes = useSelector(state => state.pokemon.types);
  const dispatch = useDispatch();
  const history = useHistory();
  const [number, setNumber] = useState(1);
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState(pokeTypes[0]);
  const [move1, setMove1] = useState('');
  const [move2, setMove2] = useState('');

  const [errors, setErrors] = useState(null); // Bonus Phase 3 - Error Validation

  const updateNumber = (e) => setNumber(e.target.value);
  const updateAttack = (e) => setAttack(e.target.value);
  const updateDefense = (e) => setDefense(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateType = (e) => setType(e.target.value);
  const updateMove1 = (e) => setMove1(e.target.value);
  const updateMove2 = (e) => setMove2(e.target.value);

  useEffect(() => {
    dispatch(getPokemonTypes());
  }, [dispatch]);

  useEffect(() => {
    if (pokeTypes.length && !type) {
      setType(pokeTypes[0]);
    }
  }, [pokeTypes, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Phase 3 - un-commented definition for `payload` object for use in dispatch of thunk action creator `createPokemon`
    const payload = {
      number,
      attack,
      defense,
      imageUrl,
      name,
      type,
      // move1,
      // move2,
      moves: [move1, move2]
    };

    // let createdPokemon;  // Phase 3 - change definition for createdPokemon variable
    try {   // Bonus Phase 3 - wrap in a try / catch for error handling
      let createdPokemon = await dispatch(createPokemon(payload));  // Phase 3 - assign value of createdPokemon to the value returned by the thunk action creator (new pokemon entry). Needs await as db interaction is async
      if (createdPokemon) {
        history.push(`/pokemon/${createdPokemon.id}`);
        hideForm();
      }
    } catch (error) { // Bonus Phase 3 - wrap in a try / catch for error handling
      if (error.errors) {
        setErrors(error.errors);
      } else {
        setErrors({title: 'An unexpected error occurred'});
      }
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="new-form-holder centered middled">
      <form className="create-pokemon-form" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Number"
          min="1"
          required
          value={number}
          onChange={updateNumber} />
        {errors?.number && <p className="error-message">{`Number: ${errors.number}`}</p>}
        <input
          type="number"
          placeholder="Attack"
          min="0"
          max="100"
          required
          value={attack}
          onChange={updateAttack} />
        {errors?.attack && <p className="error-message">{`Attack: ${errors.attack}`}</p>}
        <input
          type="number"
          placeholder="Defense"
          min="0"
          max="100"
          required
          value={defense}
          onChange={updateDefense} />
        {errors?.defense && <p className="error-message">{`Defense: ${errors.defense}`}</p>}
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        {errors?.imageUrl && <p className="error-message">{`Image URL: ${errors.imageUrl}`}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName} />
        {errors?.name && <p className="error-message">{`Name: ${errors.name}`}</p>}
        <input
          type="text"
          placeholder="Move 1"
          value={move1}
          onChange={updateMove1} />
        {errors?.move1 && <p className="error-message">{`Move 1: ${errors.move1}`}</p>}
        <input
          type="text"
          placeholder="Move 2"
          value={move2}
          onChange={updateMove2} />
        {errors?.move2 && <p className="error-message">{`Move 2: ${errors.move2}`}</p>}
        <select onChange={updateType} value={type}>
          {pokeTypes.map(type =>
            <option key={type}>{type}</option>
          )}
        </select>
        <button type="submit">Create new Pokemon</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default CreatePokemonForm;
