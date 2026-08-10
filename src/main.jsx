import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function App() {
  const [screen, setScreen] = useState("welcome");

  const [student, setStudent] = useState({
    name: "",
    className: "",
    section: "",
    exam: "",
    examDate: "",
  });

  const updateStudent = (field, value) => {
    setStudent((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const startSetup = () => {
    setScreen("setup");
  };

  const continueSetup = () => {
    if (
      !student.name ||
      !student.className ||
      !student.section ||
      !student.exam ||
      !student.examDate
    ) {
      alert("Please complete all fields.");
      return;
    }

    setScreen("subjects");
  };

  if (screen === "welcome") {
    return (
      <div className="app">
        <h1>StudyPilot</h1>
        <p>Your intelligent study companion.</p>

        <button onClick={startSetup}>
          Get Started
        </button>
      </div>
    );
  }

  if (screen === "setup") {
    return (
      <div className="app">
        <div className="setup-card">
          <h1>Student Setup</h1>

          <p>Let's create your StudyPilot profile.</p>

          <input
            type="text"
            placeholder="Student name"
            value={student.name}
            onChange={(e) =>
              updateStudent("name", e.target.value)
            }
          />

          <select
            value={student.className}
            onChange={(e) =>
              updateStudent("className", e.target.value)
            }
          >
            <option value="">Select class</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>

          <select
            value={student.section}
            onChange={(e) =>
              updateStudent("section", e.target.value)
            }
          >
            <option value="">Select section</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
            <option value="D">Section D</option>
          </select>

          <select
            value={student.exam}
            onChange={(e) =>
              updateStudent("exam", e.target.value)
            }
          >
            <option value="">Select exam</option>
            <option value="Unit Test">Unit Test</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Annual">Annual</option>
          </select>

          <label>Exam Date</label>

          <input
            type="date"
            value={student.examDate}
            onChange={(e) =>
              updateStudent("examDate", e.target.value)
            }
          />

          <button onClick={continueSetup}>
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (screen === "subjects") {
    return (
      <div className="app">
        <div className="setup-card">
          <h1>Select Subjects</h1>

          <p>
            Class {student.className} • Section{" "}
            {student.section}
          </p>

          <div className="subject-list">
            <button>English</button>
            <button>Mathematics</button>
            <button>Science</button>
            <button>Social Science</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
