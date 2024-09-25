const ADD_TO_CART = 'cart/ADD_TO_CART';
const REMOVE_FROM_CART = 'cart/REMOVE_FROM_CART';

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

function cartReducer(state = {}, action) {
    // create new object to mutate and leave original state object alone
    const newState = {...state};

    switch(action.type) {
        case ADD_TO_CART:
            newState[action.produceId] = {
                id: action.produceId,
                count: 1
            }
            return newState;
        case REMOVE_FROM_CART:
            delete newState[action.produceId];
            return newState;
        default:
            return state;
    };
}

export default cartReducer;
