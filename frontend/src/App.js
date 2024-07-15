import "./App.css";
import Header from "./component/Header.js";
import Lift from "./component/Lift.js";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-body">
        <Lift />
      </div>
    </div>
  );
}

export default App;
