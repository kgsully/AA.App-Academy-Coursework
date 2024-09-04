import { Link, useParams } from 'react-router-dom';

const ArtDescription = ({ gallery }) => {
    const { artId } = useParams();
    const { objects } = gallery;
    const art = objects.find(({id}) => id === parseInt(artId));
    const { description, images, labeltext, title, technique, url } = art;
    const artImgs = images.map((image) => {
        return (
        <div className="art-preview">
            <img key={image.imageid} className="art-image" src={`${image.baseimageurl}`} alt={`${image.alttext}`} />
            <p>Photo © {image.copyright}</p>
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

            {artImgs}

            <p>Exhibit Text: {labeltext ? labeltext : 'Unavailable'}</p>

            <Link to={`/galleries/${gallery.id}`}>{
                `Back to Gallery - ${gallery.name}`}
            </Link>
        </div>
    )

}

export default ArtDescription;
