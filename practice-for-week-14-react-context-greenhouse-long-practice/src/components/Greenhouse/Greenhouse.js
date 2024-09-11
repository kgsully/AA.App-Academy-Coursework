// Phase 1: Greenhouse Theme - Import useTheme custom react hook
import { useTheme } from '../../context/ThemeContext';

import dayImage from './images/greenhouse-day.jpg';
import nightImage from './images/greenhouse-night.jpg';
import './Greenhouse.css';

import LightSwitch from './LightSwitch';
import ClimateStats from './ClimateStats';

function Greenhouse() {
  // Phase 1 - destructure themeName from useTheme context hook to determine theme name
  const { themeName } = useTheme();
  // console.log(themeName);

  return (
    <section>
      <img  className='greenhouse-img'
            src={themeName === 'day' ? dayImage : nightImage}
            alt='greenhouse'
      />
      <LightSwitch />
      <ClimateStats />
    </section>
  );
}

export default Greenhouse;
