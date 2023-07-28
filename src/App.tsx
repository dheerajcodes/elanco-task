import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Resources from './pages/Resources'
import Header from "./Components/Header";
import ResourceDetails from "./Components/ResourceDetails";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceDetails />} />
          {/* Add more routes here if needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
