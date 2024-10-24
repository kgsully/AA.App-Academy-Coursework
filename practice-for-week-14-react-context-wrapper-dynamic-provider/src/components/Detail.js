import { useContext } from 'react';
import { HoroscopeContext } from '../context/HoroscopeContext';

const Detail = () => {
  const { sign: {backgroundImg, name, element, traits} } = useContext(HoroscopeContext);

  return (
    <div className='details'>
      <img
        src={backgroundImg}
        alt={name}
      />
      {/* <h2>Current Sign Name</h2>
      <h4>Element: </h4>
      <h4>Traits: </h4> */}
      <h2>{name}</h2>
      <h4>Element: {element}</h4>
      <h4>Traits: {traits}</h4>
    </div>
  );
};

export default Detail;
