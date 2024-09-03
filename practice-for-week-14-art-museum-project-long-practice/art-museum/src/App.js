import harvardArt from './data/harvardArt.js'
// The 'records' key offers info about the gallery, the 'objects' key within the records key gives info about the individual pieces
// console.log(harvardArt.records[0].objects[0]);
import GalleryNavigation from './components/GalleryNavigation/index.js'

function App() {
  return (
    <GalleryNavigation galleries={harvardArt.records}/>
  );
}

export default App;
