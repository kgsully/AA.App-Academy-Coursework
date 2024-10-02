export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

// Phase 5 - Create a thunk action creator for feetching the items for a single Pokemon based on the id of the Pokemon in the 'PokemonItems' component.
// After the response comes back, use the data to dispatch the return of the load action creator for items.
// Dispatch the thunk action when the 'id' of the Pokemon changes in the 'PokemonItems' component

export const getPokemonItems = (id) => async dispatch => {
  const response = await fetch(`/api/pokemon/${id}/items`); // fetch default action is GET

  if (response.ok) {
    const pokemonItems = await response.json();
    // console.log(pokemonItems);
    dispatch(load(pokemonItems, id));
  }
};
// -----------------------------------------------------------------------------------------

const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS:
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    case REMOVE_ITEM:
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    case ADD_ITEM:
    case UPDATE_ITEM:
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;
