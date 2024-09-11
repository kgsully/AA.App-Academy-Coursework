
// Phase 6 - Import the useClimate custom react hook
import { useClimate } from '../../context/ClimateContext';
import './ClimateStats.css';

function ClimateStats() {

  const {temperature, humidity} = useClimate();

  return (
    <div className="climate-stats">
      <div className="temperature">
        Temperature {temperature}°F   {/* Phase 6 - Update to use state variable */}
      </div>
      <div className="humidity">
        Humidity {humidity}%          {/* Phase 6 - Update to use state variable */}
      </div>
    </div>
  )
}

export default ClimateStats;
