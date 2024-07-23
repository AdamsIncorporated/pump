import "./App.css";
import Header from "./component/Header.js";
import Lift from "./component/Lift.js";
import SideBar from "./component/SideBar.js";

function App() {
  return (
    <div className="App">
      <Header />
      <SideBar />
      <div className="App-body">
        <Lift />
      </div>
    </div>
  );
}

export default App;
