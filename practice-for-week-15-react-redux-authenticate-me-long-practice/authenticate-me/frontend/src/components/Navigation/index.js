import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session'
import ProfileButton from './ProfileButton';

// Navigation Header
// The navigation functional component renders an unordered list with a navigation link to the home page.
// It should only contain navigation links to the login and signup routes when there is no session user and a logout button when there is.
const Navigation = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    }

    return (
        <div>
            <ul>
                <NavLink to="/">Home</NavLink>
                {sessionUser ? (        // ternary operator to change rendered elements depending on whether there is a session user or not
                    // session user true
                    <>
                        <button onClick={handleLogout}>Logout</button>
                        <ProfileButton />
                    </>
                ) : (
                    // session user false
                    <>
                        <NavLink to="/login">Login</NavLink>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </>
                )
                }
            </ul>
        </div>
    );
}

export default Navigation;
