import { Route, useParams } from 'react-router-dom';
import ArtImageTile from '../ArtImageTile/index.js';
import ArtDescription from '../ArtDescription';
import './GalleryView.css';

const GalleryView = ({ galleries }) => {
    const { galleryId } = useParams();

    const gallery = galleries.find(({id}) => id === parseInt(galleryId));

    // handle case that gallery id is not found
    if(gallery) {
        const { name, labeltext } = gallery

        // Dynamically generate art image tiles
        const tiles = gallery.objects.map((object) => {
            return (
                <ArtImageTile key={object.id} art={object} galleryId={galleryId}/>
            )
        });

        return (
            <div>
                <Route exact path='/galleries/:galleryId'>
                    <h2>{name}</h2>
                    <p>{labeltext}</p>
                    <div className="art-image-tiles">   {/* Create div as a container for aranging / styling tiles */}
                        {tiles}
                    </div>
                </Route>
                <Route exact path='/galleries/:galleryId/art/:artId'>
                    <ArtDescription gallery={gallery}/>
                </Route>
            </div>
        )
    } else {
        return (
            <h2>Page Not Found</h2>
        )
    }
}

export default GalleryView;
