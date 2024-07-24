import "./App.css";
import Header from "./component/Header";
import { EntryForm } from "./component/calculator/EntryForm";

function App() {
  return (
    <div>
      <Header />
      <div className="m-5">
        <EntryForm />
      </div>
    </div>
  );
}

export default App;
