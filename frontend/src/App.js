import "./App.css";
import Header from "./component/Header";
import { BMR } from "./component/calculator/BMR";

function App() {
  return (
    <div>
      <Header />
      <div className="m-5">
        <BMR />
      </div>
    </div>
  );
}

export default App;
