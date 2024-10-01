import React from "react";
import ErrorBoundary from "./common/ErrorBoundary";
import Country from "./components/Country";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <Country />
      </ErrorBoundary>
    </div>
  );
};

export default App;
