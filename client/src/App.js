import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/game/:gameID" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
