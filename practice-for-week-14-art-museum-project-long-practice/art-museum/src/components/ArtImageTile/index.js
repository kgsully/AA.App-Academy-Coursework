import { Link } from 'react-router-dom';
import './ArtImageTile.css';

const ArtImageTile = ({ art, galleryId }) => {
    const { baseimageurl, alttext } = art.images[0];

    return (
        <Link to={`/galleries/${galleryId}/art/${art.id}`}>
            <img className='tile-img' src={baseimageurl} alt={alttext}></img>
        </Link>
    )
}

export default ArtImageTile;
