const ADD_TO_CART = 'cart/ADD_TO_CART';

export function addToCart(produceId) {
    return {
        type: ADD_TO_CART,
        produceId
    }
}

function cartReducer(state = {}, action) {
    const newState = {
        ...state,
        [action.produceId] : {
            id: action.produceId,
            count: 1
        }
    }

    switch(action.type) {
        case ADD_TO_CART:
            return newState;
        default:
            return state;
    };
}

export default cartReducer;
