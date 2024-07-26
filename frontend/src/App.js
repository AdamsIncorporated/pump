import "./App.css";
import Header from "./components/Header";
import Bmr from "./components/Bmr";

function App() {
  return (
    <div>
      <Header />
      <div className="m-5">
        <Bmr />
      </div>
    </div>
  );
}

export default App;
