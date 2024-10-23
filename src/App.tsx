import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlightTable from "./components/FlightTable";
import FlightDetail from "./components/FlightDetail";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<FlightTable />} />
        <Route path="/flight/:id" element={<FlightDetail/>}/>
      </Routes>
    </Router>
  );
};

export default App;
