import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="app">
        <h1>StudyPilot</h1>

        <p>Your intelligent study companion.</p>

        <button onClick={() => setStarted(true)}>
          Get Started
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <h1>Student Setup</h1>

      <p>Let's set up your StudyPilot profile.</p>

      <input
        type="text"
        placeholder="Enter your name"
      />

      <button>
        Continue
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
