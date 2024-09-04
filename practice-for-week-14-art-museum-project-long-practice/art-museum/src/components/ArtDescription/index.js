import { Link, useParams } from 'react-router-dom';
import './ArtDescription.css';

const ArtDescription = ({ gallery }) => {
    const { artId } = useParams();
    const { objects } = gallery;
    const art = objects.find(({id}) => id === parseInt(artId));
    const { description, images, labeltext, title, technique, url } = art;
    const artImgs = images.map((image) => {
        return (
        <div className="art-preview">
            <img key={image.imageid} className="art-image" src={`${image.baseimageurl}`} alt={`${image.alttext}`} />
            <p className='photo-credit'>{image.copyright ? `Photo © ${image.copyright}` : ''}</p>
        </div>
        )
    })


    return (
        <div>

            <a target="_blank" rel="noreferrer" href={url}>
                <h2>{title}</h2>
            </a>

            <div className="art-info">
                <p>Technique: {technique ? technique: 'Unavailable'}</p>
                <p>Description: {description ? description : 'Unavailable'}</p>
            </div>

            <p>{labeltext ? labeltext : 'Exhibit Text Unavailable'}</p>

            <div className='art-preview-wrapper'>
                {artImgs}
            </div>


            <Link to={`/galleries/${gallery.id}`}>{
                `Back to Gallery - ${gallery.name}`}
            </Link>
        </div>
    )

}

export default ArtDescription;
