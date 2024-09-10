import { useContext, useState } from 'react';
import { HoroscopeContext } from '../context/HoroscopeContext';

const Match = () => {

    const [match, setMatch] = useState(false);
    const {sign} = useContext(HoroscopeContext);

    // console.log(sign);

    return (
        <div>
            <button
                onClick={() => setMatch((prevMatch) => !prevMatch)}
            >{match ? 'Hide Match' : 'See Match'}</button>
            {match &&
            <h4 style={{textAlign: 'center'}}>{sign.match}</h4>
            }
        </div>
    )
}

export default Match;
