import React, { useEffect, useRef, useState } from 'react';
import TransitionItem from './TransitionItem';
import { TransitionGroup } from 'react-transition-group';

const Autocomplete = ({names}) => {

    const [ inputVal, setInputVal ] = useState('');
    const [ showList, setShowList ] = useState(false);
    const inputRef = useRef();

    useEffect(() => {
      if (showList) {
        document.addEventListener('click', handleOutsideClick);
      }

      return () => {
        console.log("Cleaning up event listener from Autocomplete!");
        document.removeEventListener('click', handleOutsideClick);
      }
    }, [showList]);

    function handleInput(e) {
        setInputVal(e.target.value);
      }

      function selectName(e) {
        e.stopPropagation();
        setInputVal(e.target.innerHTML);
        setShowList(false);
      }

      function handleOutsideClick() {
        // Leave dropdown visible as long as input is focused
        if (document.activeElement === inputRef.current) return;
        else setShowList(false);
      }

      function matches() {
        const inputLength = inputVal.length;
        const matches = [];

        if (inputLength === 0) return names;

        names.forEach(name => {
          const nameSegment = name.slice(0, inputLength);
          if (nameSegment.toLowerCase() === inputVal.toLowerCase()) {
            matches.push(name);
          }
        });

        if (matches.length === 0) matches.push('No matches');

        return matches;
      }

      const results = matches().map((result) => {
        return (
          // Bonus Phase 1 - Replace createRef() with useRef() -
          // To do this, need to break code for transition item out into it's own individual functional component
          // because you cannot use hooks in a loop, must be done at function component top level
          <TransitionItem key={result} result={result} selectName={selectName}/>
        )
      });

      return (
        <section className="autocomplete-section">
          <h1>Autocomplete</h1>
          <div className="auto">
            <input
              placeholder="Search..."
              ref={inputRef}
              onChange={handleInput}
              value={inputVal}
              onFocus={() => setShowList(true)}
            />
            {showList && (
              <ul className="auto-dropdown">
                <TransitionGroup>
                  {results}
                </TransitionGroup>
              </ul>
            )}
          </div>
        </section>
      );
}

export default Autocomplete;
