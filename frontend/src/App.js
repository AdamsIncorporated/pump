import "./App.css";
import Header from "./components/Header";
import {EntryForm} from './components/calculator/EntryForm';


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
