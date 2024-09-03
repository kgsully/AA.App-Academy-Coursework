import { Route, Switch } from 'react-router-dom';
import harvardArt from './data/harvardArt.js';
// The 'records' key offers info about the gallery, the 'objects' key within the records key gives info about the individual pieces
// console.log(harvardArt.records[0].objects[0]);
import GalleryNavigation from './components/GalleryNavigation/index.js';
import GalleryView from './components/GalleryView/index.js';

function App() {
  return (
    <div className='page-wrapper'>
      <GalleryNavigation galleries={harvardArt.records}/>

      <Switch>
        <Route exact path="/">
          <h2>Harvard Art Museum</h2>
          <p>Look, but Don't Touch. Please select a Gallery in the navigation bar.</p>
        </Route>
        <Route path="/galleries/:galleryId">
          <GalleryView galleries={harvardArt.records} />
        </Route>
        <Route>
          <h2>Page not found</h2>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
