import "./App.css";
import Weather from "./components/weather";
import Hourly from "./components/hourly/index.jsx";

function App() {
  return (
    <div className="App">
      <Weather></Weather>
      <div>
        <Hourly></Hourly>
      </div>
    </div>
  );
}

export default App;
