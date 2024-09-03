import { useParams } from 'react-router-dom';

const GalleryView = ({ galleries }) => {
    const { galleryId } = useParams();
    // console.log(galleries);
    // console.log(galleryId);

    const gallery = galleries.find(({id}) => id === parseInt(galleryId));
    // console.log(gallery);

    // handle case that gallery id is not found
    if(gallery) {
        return (
            <div>
                {/* <h1>Hello from GalleryView</h1> */}
                <h2>{gallery.name}</h2>
                <p>{gallery.labeltext}</p>
            </div>
        )
    } else {
        return (
            <h2>Page Not Found</h2>
        )
    }
}

export default GalleryView;
