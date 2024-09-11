import ReactSlider from "react-slider";
// Phase 4 - Thermometer: import the useClimate custom react hook for interacting with the ClimateContext
import { useClimate } from "../../context/ClimateContext";
import './Thermometer.css';

function Thermometer() {
  // Phase 4 - destructure the temperature value and seTemperature function from the state variable in the context
  const {temperature, setTemperature} = useClimate();

  return (
    <section>
      <h2>Thermometer</h2>
      <div className="actual-temp">Actual Temperature: {temperature}°F</div>  {/* Phase 4 - Update actual temperature to use state variable from context */}
      <ReactSlider
        value={temperature}                              // Phase 4 - Update actual temperature to use state variable from context
        onAfterChange={(val) => {setTemperature(val)}}   // Phase 4 - update the event handler callback to use the setTemperature function for the context state variable
        className="thermometer-slider"
        thumbClassName="thermometer-thumb"
        trackClassName="thermometer-track"
        ariaLabel={"Thermometer"}
        orientation="vertical"
        min={0}
        max={120}
        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
        renderTrack={(props, state) => (
          <div {...props} index={state.index}></div>
        )}
        invert
        pearling
        minDistance={1}
      />
    </section>
  );
}

export default Thermometer;
