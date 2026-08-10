import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <div className="setup-card">
        <h1>Student Setup</h1>

        <p>Let's create your StudyPilot profile.</p>

        <input
          type="text"
          placeholder="Student name"
        />

        <select defaultValue="">
          <option value="">Select class</option>
          <option value="9">Class 9</option>
          <option value="10">Class 10</option>
        </select>

        <select defaultValue="">
          <option value="">Select section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
          <option value="D">Section D</option>
        </select>

        <select defaultValue="">
          <option value="">Select exam</option>
          <option value="Unit Test">Unit Test</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Annual">Annual</option>
        </select>

        <label>Exam Date</label>

        <input type="date" />

        <button>
          Continue
        </button>
      </div>
    </div>
  );
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
