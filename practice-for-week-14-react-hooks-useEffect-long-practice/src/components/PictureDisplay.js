import { useEffect, useState } from 'react';

import turkey from "../images/turkey.png";
import feather1 from "../images/feather1.svg";
import feather2 from "../images/feather2.svg";
import feather3 from "../images/feather3.svg";
import feather4 from "../images/feather4.svg";
import feather5 from "../images/feather5.svg";
import feather6 from "../images/feather6.svg";
import feather7 from "../images/feather7.svg";
import feather8 from "../images/feather8.svg";
import feather9 from "../images/feather9.svg";
import featherA from "../images/featherA.svg";

const feathers = [
  feather1,
  feather2,
  feather3,
  feather4,
  feather5,
  feather6,
  feather7,
  feather8,
  feather9,
  featherA,
];

function PictureDisplay ({ sizeClass, featherCount, featherColors }) {   // Changed Prop from size to sizeClass
  // Phase 3 - declare state variable for size class name to be used for display
  // COMMENTED OUT DUE TO BONUS PHASE B REFACTOR
  // const [ sizeClass, setSizeClass ] = useState(size);

  // Bonus Phase A -
  const [ colors, setColors ] = useState([]);

  // Phase 1 - Split then individually wrapped the console.log statements
  //           for each of the props to only log changes to each of the variables individually
  // console.log('PictureDisplay', size, featherCount, featherColors);    // Original console.log
  // COMMENTED OUT DUE TO BONUS PHASE B REFACTOR
  // useEffect(() => {
  //   console.log('PictureDisplay - size:', size);
  //   // Phase 3 - Determine size value based upon button presses
  //   //           Set class name in state variable for display size based upon size prop
  //   let cSize = '';
  //   switch(size) {
  //     case 's':
  //       cSize = 'small';
  //       break;
  //     case 'm':
  //       cSize = 'medium';
  //       break;
  //     case 'l':
  //       cSize = 'large';
  //       break;
  //     case 'xl':
  //       cSize = 'xlarge';
  //       break;
  //     default:
  //       cSize = 'small';
  //   }
  //   setSizeClass(cSize);
  //   console.log('Size Class:', cSize);
  // }, [size]);
  useEffect(() => {
    console.log('PictureDisplay - featherCount:', featherCount);
  }, [featherCount]);
  useEffect(() => {
    console.log('PictureDisplay - featherColors:', featherColors);
  }, [featherColors]);

  // TODO: Wrap in useEffect
  // const colors = [];   // Original colors declaration
  useEffect(() => {
    const tempColors = [];
    if (!featherColors || featherColors.length === 0) featherColors = [''];
    for (let i=0; i<featherCount; i++) {
      tempColors.push(featherColors[i % featherColors.length]);
    }
    setColors(tempColors);
  }, [featherColors, featherCount])

  return (
    //
    // <div className={`image-area medium`}>    // Original DIV with hard-coded size class name of 'medium
    // Phase 3 - Set size class name based upon useEffect hook
    <div className={`image-area ${sizeClass}`}>
      {colors.map((c, i) =>
        <img
          key={feathers[i]}
          src={feathers[i]}
          className={`image-feather ${c}`}
          alt=""
        />
      )}

      <img src={turkey} className="image-turkey" alt="turkey" />
    </div>
  );
}

export default PictureDisplay;
