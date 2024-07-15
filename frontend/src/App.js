import './App.css';
import Form from './component/form.js';
import Header from './component/Header.js';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex flex-row items-end justify-start m-5 text-white">
        <Form />
      </div>
    </div>
  );
}

export default App;
