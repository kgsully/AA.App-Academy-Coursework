import ReactSlider from "react-slider";
// Phase 5 - Hygrometer: import the useClimate custom react hook for interacting with the ClimateContext
import { useClimate } from "../../context/ClimateContext";
import "./Hygrometer.css";

function Hygrometer() {
  // Phase 5 - destructure the humidity value and setHumidity function from the state variable in the context
  const {humidity, setHumidity} = useClimate();

  return (
    <section>
      <h2>Hygrometer</h2>
      <div className="actual-humid">Actual Humidity: {humidity}%</div>  {/* Phase 5 - Update actual humidity to use state variable from context */}
      <ReactSlider
        value={humidity}                              // Phase 5 - Update actual humidity to use state variable from context
        onAfterChange={(val) => {setHumidity(val)}}   // Phase 5 - update the event handler callback to use the setHumidity function for the context state variable
        className="hygrometer-slider"
        thumbClassName="hygrometer-thumb"
        trackClassName="hygrometer-track"
        ariaLabel={"Hygrometer"}
        orientation="vertical"
        min={0}
        max={100}
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

export default Hygrometer;
