import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import syllabus from "./data/syllabus";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [student, setStudent] = useState({
    name: "",
    className: "",
    section: "",
    exam: "",
    examDate: "",
  });

  const updateStudent = (field, value) => {
    setStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const continueToSubjects = () => {
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

  const openSubject = (subject) => {
    setSelectedSubject(subject);
    setScreen("chapters");
  };

  // WELCOME
  if (screen === "welcome") {
    return (
      <div className="app">
        <div className="setup-card">
          <h1>StudyPilot</h1>
          <p>Your intelligent study companion.</p>

          <button onClick={() => setScreen("setup")}>
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // STUDENT SETUP
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

          <button onClick={continueToSubjects}>
            Continue
          </button>

          <button
            className="secondary"
            onClick={() => setScreen("welcome")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // SUBJECT SELECTION
  if (screen === "subjects") {
    return (
      <div className="app">
        <div className="setup-card">
          <h1>Select Subject</h1>

          <p>
            Class {student.className} • Section{" "}
            {student.section}
          </p>

          <div className="subject-list">
            <button onClick={() => openSubject("english")}>
              📖 English
            </button>

            <button
              onClick={() => openSubject("mathematics")}
            >
              📐 Mathematics
            </button>

            <button onClick={() => openSubject("science")}>
              🔬 Science
            </button>

            <button
              onClick={() => openSubject("socialScience")}
            >
              🌍 Social Science
            </button>
          </div>

          <button
            className="secondary"
            onClick={() => setScreen("setup")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // CHAPTER LIST
  if (screen === "chapters") {
    const classData =
      student.className === "9"
        ? syllabus.class9
        : syllabus.class10;

    const subjectData =
      classData.subjects[selectedSubject];

    let chapters = [];

    if (selectedSubject === "socialScience") {
      chapters = [
        ...(subjectData.chapters || []),
        ...(subjectData.history || []),
        ...(subjectData.geography || []),
        ...(subjectData.politicalScience || []),
        ...(subjectData.economics || []),
      ];
    } else if (subjectData.chapters) {
      chapters = subjectData.chapters;
    } else if (subjectData.units) {
      chapters = subjectData.units;
    }

    return (
      <div className="app">
        <div className="setup-card">
          <h1>
            {selectedSubject === "english"
              ? "📖 English"
              : selectedSubject === "mathematics"
              ? "📐 Mathematics"
              : selectedSubject === "science"
              ? "🔬 Science"
              : "🌍 Social Science"}
          </h1>

          <p>
            {classData.syllabus}
          </p>

          <div className="chapter-list">
            {chapters.map((chapter, index) => (
              <div
                className="chapter-card"
                key={index}
              >
                <span>
                  {index + 1}. {chapter}
                </span>

                <span className="status red">
                  🔴 Not Started
                </span>
              </div>
            ))}
          </div>

          {chapters.length === 0 && (
            <p>
              No chapters have been added for this
              subject yet.
            </p>
          )}

          <button
            className="secondary"
            onClick={() => setScreen("subjects")}
          >
            Back to Subjects
          </button>
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
