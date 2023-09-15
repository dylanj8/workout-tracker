import "./index.css";
import Workout from "./Workout";
import DetailedWorkout from "./DetailedWorkout";
import Login from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/workout" element={<Workout />} />
        <Route path="/workout/:id" element={<DetailedWorkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
