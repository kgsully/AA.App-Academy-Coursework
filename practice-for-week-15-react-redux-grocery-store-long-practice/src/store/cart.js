const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';
const INCREMENT_QTY = 'cart/INCREMENT_QTY';
const DECREMENT_QTY = 'cart/DECREMENT_QTY';
const SET_QTY = 'cart/SET_QTY';
const EMPTY_CART = 'cart/EMPTY_CART';

// Created selector function and handle mapping of the items to an array HERE
// map over the cart ORDER in order to determine the order in which the values
// are set in the return array. Items mapped - because the order array only includes the produce ID,
// build the object using the id as a key REFERENCE, not passing the whole object with id and count, etc within the
// order array
export const getCartItems = (state) => {
    const {cart, produce} = state;
    return Object.values(cart.order)
        .map(item => {
            return {
            ...cart.items[item],
            ...produce[cart.items[item].id]
            };
        });
}

export function addToCart(produceId) {
    return {
        type: ADD_TO_CART,
        produceId
    }
}

export function removeFromCart(produceId) {
    return {
        type: REMOVE_FROM_CART,
        produceId
    }
}

export function incrementQty(produceId) {
    return {
        type: INCREMENT_QTY,
        produceId
    }
}

export function decrementQTY(produceId) {
    return {
        type: DECREMENT_QTY,
        produceId
    }
}

export function setQty(produceId, qty) {
    return {
        type: SET_QTY,
        payload: {
            produceId,
            qty
        }
    }
}

export function emptyCart() {
    return {
        type: EMPTY_CART
    }
}

const removeItem = (stateVar, id) => {
    delete stateVar.items[id];
    stateVar.order = stateVar.order.filter((item) => item !== id);
    return stateVar;
}

function cartReducer(state = {items: {}, order: []}, action) {
    // create new object to mutate and leave original state object alone
    const newState = {...state};

    switch(action.type) {
        case ADD_TO_CART:
            if (!newState.items[action.produceId]) {
                newState.items[action.produceId] = {
                    id: action.produceId,
                    count: 1
                }
                // Order array stores the order in which items are added by the produce ID
                // items object sets produce id / qty
                newState.order.push(action.produceId);
            } else {
                newState.items[action.produceId].count += 1;
            }
            return newState;
        case REMOVE_FROM_CART:
            // DRY up item removal code --
            // delete newState.items[action.produceId];
            // newState.order = newState.order.filter((item) => item !== action.produceId);
            // return newState;
            return removeItem(newState, action.produceId);
        case INCREMENT_QTY:
            newState.items[action.produceId].count += 1;
            return newState;
        case DECREMENT_QTY:
            newState.items[action.produceId].count -= 1;
            if (newState.items[action.produceId].count <= 0) {
                // DRY up item removal code --
                // delete newState.items[action.produceId];
                // newState.order = newState.order.filter((item) => item !== action.produceId);
                return removeItem(newState, action.produceId);
            }
            return newState;
        case SET_QTY:
            if (newState.items[action.payload.produceId].count <= 0) {
                // DRY up item removal code --
                // delete newState.items[action.payload.produceId];
                // newState.order = newState.order.filter((item) => item !== action.produceId);
                return removeItem(newState, action.produceId);
            } else {
                newState.items[action.payload.produceId].count = action.payload.qty;
            }
            return newState;
        case EMPTY_CART:
            return {items: {}, order: []};
        default:
            return state;
    };
}

export default cartReducer;
