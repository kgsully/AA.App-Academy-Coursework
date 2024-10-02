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

// Phase 6 - Create a thunk action creator for editing an item in the 'ItemForm'. Per documentation, hit the PUT /api/items/:id route with appropriate payload body.
// After the response comes back, use the data to dispatch the return of the 'update' POJO action creator for items.
// Dispatch the thunk action on submission of the 'ItemForm'

export const editPokemonItem = (id, payload) => async dispatch => {
  const body = JSON.stringify(payload);

  const response = await fetch(`/api/items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });

  if (response.ok) {
    const editedItem = await response.json();
    dispatch(update(editedItem));
    return editedItem;
  }
};
// -----------------------------------------------------------------------------------------

// Bonus Phase 1 - Create a thunk action creator for deleting an item. Per docs, hit the DELETE /api/items/:id route.
// Dispatch the thunk action you just created when a user clicks the `DELETE` button next to an item in the Pokemon Detail view.
export const deletePokemonItem = (itemId, pokemonId) => async dispatch => {
  const response = await fetch(`/api/items/${itemId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    const { id } = await response.json();
    dispatch(remove( id, pokemonId));
    return itemId;
  }
};
// -----------------------------------------------------------------------------------------

// Bonus Phase 2 - Create and dispatch a thunk action to create an item
export const addPokemonItem = (pokemonId, payload) => async dispatch => {
  const body = JSON.stringify(payload);
  const response = await fetch(`/api/pokemon/${pokemonId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  });

  if (response.ok) {
    const newItem = await response.json();
    dispatch(add(newItem));
    return newItem;
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
      return {
        ...state,
        [action.item.id]: action.item
      };
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
