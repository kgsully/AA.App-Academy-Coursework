import { useState } from 'react';
import './UseState.css';

const UseState = () => {
  const [ theme, setTheme ] = useState('light');
  const [ count, setCount ] = useState(0);

  const handleClick = () => theme === 'light' ? setTheme('dark') : setTheme('light');

  return (
    <div className={`state ${theme}`}>

      <h1>UseState Component</h1>

      {/* Original button logic with onClick event handler to change the theme */}
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>

      {/* Updated button logic to toggle the theme with a single button */}
      <button onClick={handleClick}>Toggle Theme</button>

      <h2>{`Click Count: ${count}`}</h2>

      {/* Original button logic with onClick event handler / count increment */}
      {/* <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button> */}

      {/* Using callback function as an argument - the updater function will pass the previous state as an argument to the callback when invoking it */}
      {/* This ensures the state is updated based upon the actual previous state */}
      {/* Using a callback to update state whenever the update depends on the previous state is advisable because state updates are handled asynchronously */}
      {/* and can be bundled together. In other words, without the callback, you cannot be sure that the value stored in count when the update is invoked will always represent the most current value.  */}
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>
        Increment
      </button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>
        Decrement
      </button>
    </div>
  );
};

export default UseState;
