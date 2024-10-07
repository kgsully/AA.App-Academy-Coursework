import { csrfFetch } from './csrf';

const SET_SESSION_USER = 'session/SET_SESSION_USER';
const REMOVE_SESSION_USER = 'session/REMOVE_SESSION_USER';

// Action to set user session info to the store upon successful login
const setUser = (user) => ({
    type: SET_SESSION_USER,
    user
});

// Action to remove the user session info from the store upon logout
const removeUser = () => ({
    type: REMOVE_SESSION_USER
});

// Thunk action to call the csrfFetch function to make a POST request to the backend /api/session route
// to log in the user. csrfFetch is used instead of a standard fetch call as the XSRF-TOKEN must be included
// as the method is not GET and will be rejected by the backend without the token included.
// The POST / api/session route expects the request body to have a key of credential with an existing username or email
// and a key of password. After the response from the AJAX call comes back, the JSON body of the response is parsed
// and then dispatched to the action for setting the session user to the user in the response's body.
export const login = (loginInfo) => async (dispatch) => {
    const { credential, password } = loginInfo;
    const response = await csrfFetch('/api/session', {
        method: "POST",
        body: JSON.stringify({
            credential,
            password
        })
    });

    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
};

const initialState = { user: null };

function sessionReducer (state = initialState, action) {
    let newState = Object.assign({}, state);
    switch(action.type) {
        case SET_SESSION_USER:
            newState.user = action.user
            return newState;
        case REMOVE_SESSION_USER:
            newState.user = null;
            return newState;
        default:
            return state;
    }
}

export default sessionReducer;
