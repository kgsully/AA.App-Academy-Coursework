import { createContext, useState } from 'react';
// Using alias horoscopeObj - this works because horoscopes is the default export and we are using default import syntax
// Tried to use the {x as y} syntax to preserve the name from the default export, but got compile error
import horoscopeObj from '../data/horoscopes';

export const HoroscopeContext = createContext();

const HoroscopeProvider = (props) => {
    const [currentSign, setCurrentSign] = useState('Leo');
    const sign = horoscopeObj[currentSign];

    return (
        <HoroscopeContext.Provider value={{sign, setCurrentSign}}>
            {props.children}
        </HoroscopeContext.Provider>
    )
}

export default HoroscopeProvider;
