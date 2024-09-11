// Phase 2 - Lightswitch: import custom react context hook
import { useTheme } from '../../context/ThemeContext';

import './LightSwitch.css';

function LightSwitch() {

  const { themeName, setThemeName } = useTheme();

  return (
    <div className={`light-switch ${themeName}`}>
      <div
        className="on"
        onClick={() => setThemeName('day')}
      >
        DAY
      </div>
      <div
        className="off"
        onClick={() => setThemeName('night')}
      >
        NIGHT
      </div>
    </div>
  );
}

export default LightSwitch;
