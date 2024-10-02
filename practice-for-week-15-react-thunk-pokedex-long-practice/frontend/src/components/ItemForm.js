import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // Phase 6 - also import useDispatch
import { editPokemonItem, addPokemonItem } from '../store/items';

const ItemForm = ({ itemId, pokemonId, hideForm }) => {
  let item = useSelector(state => state.items[itemId]);

  // Bonus Phase 2 - itemId passed as -1 if adding a new item, update useState default values using ternary operator based upon wheether
  // call to item form is a create new item action (itemId === -1) or an update action (itemId !== -1)
  const [happiness, setHappiness] = useState(itemId === -1 ? "" : item.happiness);
  const [price, setPrice] = useState(itemId === -1 ? "" : item.price);
  const [name, setName] = useState(itemId === -1 ? "" : item.name);
  const [imageUrl, setImageUrl] = useState(itemId === -1 ? "" : item.imageUrl);
  // -------------------------------------------------------------------------------------

  const updateName = (e) => setName(e.target.value);
  const updateHappiness = (e) => setHappiness(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateImageUrl = (e) => setImageUrl(e.target.value);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {   // Phase 6 - uncomment payload variable
      ...item,
      name,
      happiness,
      price
    };

    if (imageUrl) payload.imageUrl = imageUrl;  // Bonus Phase 2 - set image url if it is defined, otherwise don't and let the code randomly select an image to associate with the item.

    let returnedItem;
    // Bonus Phase 2 - dispatch to relevant thunk action creator based upon whether this is an add or update action
    // add: itemId === -1, update: itemId !== -1
    if (itemId === -1) {
      returnedItem = await dispatch(addPokemonItem(pokemonId, payload)); //
    } else {
      returnedItem = await dispatch(editPokemonItem(item.id, payload)); // Phase 6 - Change variable declaration to set it to the returned value from dispatching the thunk action creator
    }

    if (returnedItem) {
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="edit-form-holder centered middled">
      <form className="item-form" onSubmit={handleSubmit}>
        {/* Bonus Phase 2 - added h3 to indicate whether it is for adding an item or updating an item */}
        {itemId === -1 ? (<h3>New Item</h3>) : (<h3>Edit Item</h3>)}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
        />
        <input
          type="number"
          placeholder="Happiness"
          min="0"
          max="100"
          required
          value={happiness}
          onChange={updateHappiness}
        />
        <input
          type="number"
          placeholder="Price"
          required
          value={price}
          onChange={updatePrice}
        />
        {/* Bonus Phase 2 - Added additional input for image URL */}
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl}
        />
        {/* Bonus Phase 2 - Update submit button text based upon whether this is an add or update operation */}
        <button type="submit">{itemId === -1 ? "Add Item" : "Update Item"}</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default ItemForm;
