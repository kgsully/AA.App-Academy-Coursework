import { useEffect, useState } from "react";
import Message from "./components/Message";
import PictureDisplay from "./components/PictureDisplay";

function App() {
  const [size, setSize] = useState('m');  // Bonus Phase C - changed default size to medium
  const [featherCount, setFeatherCount] = useState(0);
  const [featherColors, setFeatherColors] = useState([]);
  const [isRed, setIsRed] = useState(false);
  const [isOrange, setIsOrange] = useState(false);
  const [isBrown, setIsBrown] = useState(false);
  const [isLightBrown, setIsLightBrown] = useState(false);
  const [isYellow, setIsYellow] = useState(false);
  // Bonus Phase B - Refactor - declare state variable for size class name to be used for display
  const [ sizeClass, setSizeClass ] = useState(size);

  // Phase 2 - Log changes to color state variables
  //           Push color values to temp array if true
  //           Set state variable feather colors array to temp array value
  useEffect(() => {
    console.log(
      `Color Change:\n------------------------
              Red: ${isRed}
           Orange: ${isOrange}
            Brown: ${isBrown}
      Light Brown: ${isLightBrown}
           Yellow: ${isYellow}`);

    const colors = [];
    if(isRed) colors.push('red');
    if(isOrange) colors.push('orange');
    if(isBrown) colors.push('brown');
    if(isLightBrown) colors.push('lightbrown');
    if(isYellow) colors.push('yellow');

    setFeatherColors(colors);

  }, [isRed, isOrange, isBrown, isLightBrown, isYellow]);

  // Bonus Phase B - Refactor - Determine size value based upon button presses
  //                            Set class name in state variable for display size based upon size prop
  useEffect(() => {
    console.log('PictureDisplay - size:', size);
    let cSize = '';
    switch(size) {
      case 's':
        cSize = 'small';
        break;
      case 'm':
        cSize = 'medium';
        break;
      case 'l':
        cSize = 'large';
        break;
      case 'xl':
        cSize = 'xlarge';
        break;
      default:
        cSize = 'medium';
    }
    setSizeClass(cSize);
    console.log('Size Class:', cSize);
  }, [size]);

  return (
    <>
      <h1>Turkey Creator</h1>
      <h3 className="button-controls">Set the features of your turkey</h3>

      {/* User controls */}
      <div className="button-controls">
        Size:
        <button disabled={size === 's'} onClick={() => setSize('s')}>Small</button>
        <button disabled={size === 'm'} onClick={() => setSize('m')}>Medium</button>
        <button disabled={size === 'l'} onClick={() => setSize('l')}>Large</button>
        <button disabled={size === 'xl'} onClick={() => setSize('xl')}>X-Large</button>
      </div>
      <div className="button-controls">
        Feather Count:
        <input
          type="number"
          // BONUS PHASE C - Disallow entry of values outside of range 0-10 in feather count input box
          onChange={(e) => {
            const value = e.target.value;
            if (value !== '' && value <= 0) setFeatherCount(() => 0)
            else if (value >= 10) setFeatherCount(() => 10)
            else setFeatherCount(() => value);
            // setFeatherCount(e.currentTarget.value)
          }}
          // defaultValue={0}
          value={featherCount}
          min={0}
          max={10}
        />
      </div>
      <div className="button-controls">
        Feather Color(s):
        <label><input
          type="checkbox"
          onChange={(e) => setIsRed(e.currentTarget.checked)}
        />Red</label>
        <label><input
          type="checkbox"
          onChange={(e) => setIsOrange(e.currentTarget.checked)}
        />Orange</label>
        <label><input
          type="checkbox"
          onChange={(e) => setIsBrown(e.currentTarget.checked)}
        />Brown</label>
        <label><input
          type="checkbox"
          onChange={(e) => setIsLightBrown(e.currentTarget.checked)}
        />Light Brown</label>
        <label><input
          type="checkbox"
          onChange={(e) => setIsYellow(e.currentTarget.checked)}
        />Golden Yellow</label>
      </div>

      {/* Generated display based on user selections above */}
      <h3 className="button-controls">Enjoy your turkey</h3>
      <PictureDisplay
        sizeClass={sizeClass}
        featherCount={featherCount}
        featherColors={featherColors}
      />
      <Message
        sizeClass={sizeClass}
        featherCount={featherCount}
      />
    </>
  );
}

export default App;
