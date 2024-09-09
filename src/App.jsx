import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";


function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/Confirmation" element/>
      </Routes>
    </div>
  );
}

export default App;
