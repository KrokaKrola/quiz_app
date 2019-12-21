import React from "react";
import "./scss/main.scss";
import Header from "./components/Header";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main>
        <div className="container">
          <Register></Register>
        </div>
      </main>
    </div>
  );
}

export default App;
