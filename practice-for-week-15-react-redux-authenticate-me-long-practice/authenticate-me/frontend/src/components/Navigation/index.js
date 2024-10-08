import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

// Navigation Header
// The navigation functional component renders an unordered list with a navigation link to the home page.
// It should only contain navigation links to the login and signup routes when there is no session user and a logout button when there is.
const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector((state) => state.session.user);
    let sessionLinks;

    if(sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </div>
        );
    }

    return (
        <div className="navbar">
            <NavLink to="/">Home</NavLink>
            {isLoaded && sessionLinks}
        </div>
    );
}

export default Navigation;

// Previous code
/*
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
*/
