// This App.js file compiles to components to display the user interface.
// The BrowserRouter imports from react-router-dom allows for the adding
// more routes to the App.
import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/kino" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
