import { NavLink } from 'react-router-dom';
import './GalleryNavigation.css';

const GalleryNavigation = ({ galleries }) => {  // destructure galleries prop
    // debugger;

    // Dynamically generate NavLink JSX Nodes from gallery data - route will be /galleries/:galleryid with display of gallery name
    // choosing to do this outside of the 'return' - following syntax and structure per docs
    const navLinks = galleries.map(item => {
        // destructure id and name from map element to make NavLink syntax cleaner
        const { id, name } = item;
        // because arrow function includes curly braces due to const declaration, need to explicitly return JSX node
        return (
            <NavLink to={`/galleries/${id}`}>{name}</NavLink>
        )
    });

    return (
        <nav>
            <h1>Galleries</h1>
            <NavLink exact to="/">Home</NavLink>
            {navLinks}
        </nav>
    )
}

export default GalleryNavigation;
