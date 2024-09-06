import { useEffect, useState } from 'react';

function Message({ sizeClass, featherCount }) {   // Bonus Phase B Refactor - changed prop from size to sizeClass
  // Phase 3 - declare state variable for size class name to be used for display
  // COMMENTED OUT DUE TO BONUS PHASE B REFACTOR
  // const [ sizeClass, setSizeClass ] = useState(size);

  // Phase 4 - declare state variable for user message
  const [ message, setMessage] = useState('');

  // Phase 1 - wrapped the console.log into a useEffect hook to only log when the prop value changes
  // console.log('Message', size);  // Original console.log
  // COMMENTED OUT DUE TO BONUS PHASE B REFACTOR
  // useEffect(() => {
  //   console.log('Message', size);
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

  // Phase 4 - set user message state variable based upon state variable (value of which is determined by the featherCount prop)
  useEffect(() => {
    // Original solution I came up with to set the message only whe bird had 0 feathers
    // setMessage(featherCount > 0 ? '' : '(Oh my! Your bird is naked!)');

    // Additional messages offered by the tutorial
    if(featherCount <= 0) {
      setMessage('(Oh my! Your bird is naked!');
    } else if (featherCount >= 10) {
      setMessage('Full Turkey!');
    } else {
      setMessage('Coming along...');
    }
  }, [featherCount]);

  return (
    // <div className="message medium">   // Original DIV with hard-coded size class name of 'medium'
    // Phase 3 - Set size class name based upon useEffect hook
    <div className={`message ${sizeClass}`}>
      {/* (Oh my! Your bird is naked!) */}
      {message}
    </div>
  );
};

export default Message;
