import React, { useReducer } from "react";
import Speedometer from "react-d3-speedometer";

// Başlangıç durumu
const initialState = {
  started: false,
  speed: 0,
};

// Reducer fonksiyonu
function carReducer(state, action) {
  switch (action.type) {
    case "TURN_ON":
      if (state.speed === 0) {
        return { ...state, started: true };
      }
      return state; // Araba hareket ediyorsa açılmaz
    case "TURN_OFF":
      if (state.speed === 0) {
        return { ...state, started: false };
      }
      return state; // Araba hızlanıyorsa kapatılamaz
    case "ACCELERATE":
      if (state.started) {
        return { ...state, speed: Math.min(state.speed + 5, 200) }; // Hız 200 km/h'yi geçmesin
      }
      return state;
    case "BRAKE":
      return { ...state, speed: Math.max(state.speed - 5, 0) }; // Hız negatif olamaz
    default:
      return state;
  }
}

const Car = () => {
  const [state, dispatch] = useReducer(carReducer, initialState);

  return (
    <div>
      <h1>Auto Control Panel</h1>

      {/* Speedometer Bileşeni */}
      <Speedometer
        value={state.speed}
        minValue={0}
        maxValue={200}
        needleColor="red"
        width={300}
        height={300}
      />

      <div>
        {/* Araba Açma / Kapatma */}
        <button onClick={() => dispatch({ type: "TURN_ON" })}>
          Turn On Auto
        </button>
        <button onClick={() => dispatch({ type: "TURN_OFF" })}>
          Turn Off Auto
        </button>

        {/* Hızlanma ve Fren Butonları */}
        <button
          onClick={() => dispatch({ type: "ACCELERATE" })}
          disabled={!state.started}
        >
          Accelerate
        </button>
        <button onClick={() => dispatch({ type: "BRAKE" })}>Breake</button>
      </div>

      {/* Durum ve Hız Görüntüleme */}
      <p>Speed: {state.speed} km/h</p>
      <p>{state.started ? "Auto on" : "Auto off"}</p>
    </div>
  );
};

export default Car;
