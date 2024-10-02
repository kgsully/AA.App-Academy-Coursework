import { LOAD_ITEMS, REMOVE_ITEM, ADD_ITEM } from './items';

const LOAD = 'pokemon/LOAD';
const LOAD_TYPES = 'pokemon/LOAD_TYPES';
const ADD_ONE = 'pokemon/ADD_ONE';

const load = list => ({
  type: LOAD,
  list
});

const loadTypes = types => ({
  type: LOAD_TYPES,
  types
});

const addOnePokemon = pokemon => ({
  type: ADD_ONE,
  pokemon
});

export const getPokemon = () => async dispatch => {
  const response = await fetch(`/api/pokemon`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getPokemonTypes = () => async dispatch => {
  const response = await fetch(`/api/pokemon/types`);

  if (response.ok) {
    const types = await response.json();
    dispatch(loadTypes(types));
  }
};
// Phase 2 - Create thunk action creator for fetching a single Pokemon's details by their id
// dispatch returned value to addOnePokemon action creator
export const getPokemonDetails = (id) => async dispatch => {
  const response = await fetch(`/api/pokemon/${id}`);

  if (response.ok) {
    const pokemonDetails = await response.json();
    dispatch(addOnePokemon(pokemonDetails));
  }
};
// -----------------------------------------------------------------------------------------

// Phase 3 - Create thunk action creator for creating a Pokemon using the CreatePokemonForm by hitting the POST /api/pokemon backend route
// After response comes back, add the newly created Pokemon to the Redux store by dispatching the appropriate regular POJO action
export const createPokemon = (payload) => async dispatch => {
  const body = JSON.stringify(payload);
  try{
    const response = await fetch(`/api/pokemon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    });

    if (response.ok) {
      const newPokemon = await response.json();
      dispatch(addOnePokemon(newPokemon));
      return newPokemon;
    } else {  // Bonus Phase 3 - provide error checking feedback
      if (response.status === 422) {
        const errorData = await response.json();
        const error = new Error(errorData.title);
        error.errors = errorData.errors;
        throw error;
      }
    }
  } catch (error) {
    if (!error.data) {
      error.data = { title: error.message, errors: { general: 'An unexpected error occurred' } };
    }
    console.log(error.errors);
    throw(error);
  }
};
// -----------------------------------------------------------------------------------------

// Phase 4 - Create a thunk action creator for editing a Pokemon in the EditPokemonForm. Check API docs for which route and url path / request body formatting.
// After the response comes back, add the updated information Pokemon to the Redux store by dispatching the 'addOnePokemon' action.
// Dispatch the thunk action on the submission of EditPokemonForm

export const editPokemon = (id, payload) => async dispatch => {
  const body = JSON.stringify(payload);
  const response = await fetch(`/api/pokemon/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });

  if (response.ok) {
    const updatedPokemon = await response.json();
    dispatch(addOnePokemon(updatedPokemon));
    return updatedPokemon;
  }
};

// -----------------------------------------------------------------------------------------

const initialState = {
  list: [],
  types: []
};

const sortList = (list) => {
  return list.sort((pokemonA, pokemonB) => {
    return pokemonA.number - pokemonB.number;
  }).map((pokemon) => pokemon.id);
};

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allPokemon = {};
      action.list.forEach(pokemon => {
        allPokemon[pokemon.id] = pokemon;
      });
      return {
        ...allPokemon,
        ...state,
        list: sortList(action.list)
      };
    case LOAD_TYPES:
      return {
        ...state,
        types: action.types
      };
    case ADD_ONE:
      if (!state[action.pokemon.id]) {
        const newState = {
          ...state,
          [action.pokemon.id]: action.pokemon
        };
        const pokemonList = newState.list.map(id => newState[id]);
        pokemonList.push(action.pokemon);
        newState.list = sortList(pokemonList);
        return newState;
      }
      return {
        ...state,
        [action.pokemon.id]: {
          ...state[action.pokemon.id],
          ...action.pokemon
        }
      };
    case LOAD_ITEMS:
      return {
        ...state,
        [action.pokemonId]: {
          ...state[action.pokemonId],
          items: action.items.map(item => item.id)
        }
      };
    case REMOVE_ITEM:
      return {
        ...state,
        [action.pokemonId]: {
          ...state[action.pokemonId],
          items: state[action.pokemonId].items.filter(
            (itemId) => itemId !== action.itemId
          )
        }
      };
    case ADD_ITEM:
      console.log(action.item);
      return {
        ...state,
        [action.item.pokemonId]: {
          ...state[action.item.pokemonId],
          items: [...state[action.item.pokemonId].items, action.item.id]
        }
      };
    default:
      return state;
  }
}

export default pokemonReducer;
