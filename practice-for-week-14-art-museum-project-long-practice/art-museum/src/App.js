import { Route } from 'react-router-dom';
import harvardArt from './data/harvardArt.js';
// The 'records' key offers info about the gallery, the 'objects' key within the records key gives info about the individual pieces
// console.log(harvardArt.records[0].objects[0]);
import GalleryNavigation from './components/GalleryNavigation/index.js';
import GalleryView from './components/GalleryView/index.js';

function App() {
  return (
    <div className='page-wrapper'>
      <GalleryNavigation galleries={harvardArt.records}/>
      <Route path="/galleries/:galleryId">
        <GalleryView galleries={harvardArt.records} />
      </Route>

    </div>

  );
}

export default App;
