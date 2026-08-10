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

  const [progress, setProgress] = useState({});

  const updateStudent = (field, value) => {
    setStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getClassData = () => {
    return student.className === "9"
      ? syllabus.class9
      : syllabus.class10;
  };

  const getChapters = (subject) => {
    const subjectData = getClassData().subjects[subject];

    if (!subjectData) return [];

    if (subject === "socialScience") {
      return [
        ...(subjectData.chapters || []),
        ...(subjectData.history || []),
        ...(subjectData.geography || []),
        ...(subjectData.politicalScience || []),
        ...(subjectData.economics || []),
      ];
    }

    if (subjectData.chapters) {
      return subjectData.chapters;
    }

    if (subjectData.units) {
      return subjectData.units;
    }

    return [];
  };

  const getProgress = (subject) => {
    const chapters = getChapters(subject);

    if (chapters.length === 0) return 0;

    const completed = chapters.filter((_, index) => {
      const key = `${student.className}-${subject}-${index}`;
      return progress[key] === "completed";
    }).length;

    return Math.round(
      (completed / chapters.length) * 100
    );
  };

  const getOverallProgress = () => {
    const subjects = [
      "english",
      "mathematics",
      "science",
      "socialScience",
    ];

    const values = subjects.map((subject) =>
      getProgress(subject)
    );

    return Math.round(
      values.reduce((a, b) => a + b, 0) /
        values.length
    );
  };

  const changeStatus = (subject, index) => {
    const key = `${student.className}-${subject}-${index}`;

    setProgress((prev) => {
      const current = prev[key] || "not-started";

      const next =
        current === "not-started"
          ? "ongoing"
          : current === "ongoing"
          ? "completed"
          : "not-started";

      return {
        ...prev,
        [key]: next,
      };
    });
  };

  const continueToDashboard = () => {
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

    setScreen("dashboard");
  };

  const openSubject = (subject) => {
    setSelectedSubject(subject);
    setScreen("chapters");
  };

  const subjectName = (subject) => {
    if (subject === "english") return "📖 English";
    if (subject === "mathematics")
      return "📐 Mathematics";
    if (subject === "science") return "🔬 Science";
    return "🌍 Social Science";
  };

  const statusText = (status) => {
    if (status === "completed")
      return "🟢 Completed";

    if (status === "ongoing")
      return "🟡 Ongoing";

    return "🔴 Not Started";
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

  // SETUP
  if (screen === "setup") {
    return (
      <div className="app">
        <div className="setup-card">
          <h1>Student Setup</h1>

          <p>Create your StudyPilot profile.</p>

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
              updateStudent(
                "className",
                e.target.value
              )
            }
          >
            <option value="">Select class</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </select>

          <select
            value={student.section}
            onChange={(e) =>
              updateStudent(
                "section",
                e.target.value
              )
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
              updateStudent(
                "exam",
                e.target.value
              )
            }
          >
            <option value="">Select exam</option>
            <option value="Unit Test">
              Unit Test
            </option>
            <option value="Half-Yearly">
              Half-Yearly
            </option>
            <option value="Annual">
              Annual
            </option>
          </select>

          <label>Exam Date</label>

          <input
            type="date"
            value={student.examDate}
            onChange={(e) =>
              updateStudent(
                "examDate",
                e.target.value
              )
            }
          />

          <button onClick={continueToDashboard}>
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

  // DASHBOARD
  if (screen === "dashboard") {
    const overall = getOverallProgress();

    return (
      <div className="app">
        <div className="setup-card dashboard">
        

<div className="branding">
  <img
    src="/IMG-20260810-WA0057.jpg"
    alt="StudyPilot Logo"
    className="branding-logo"
  />

  <h1 className="branding-title">
    StudyPilot
  </h1>

  <p className="branding-tagline">
    Navigate Your Success!!
  </p>
</div>
          
          <h2>
            Welcome, {student.name} 👋
          </h2>

          <p>
            Class {student.className} • Section{" "}
            {student.section}
          </p>

          <div className="exam-box">
            <strong>{student.exam}</strong>
            <br />
            Exam Date: {student.examDate}
          </div>

          <div className="progress-box">
            <h2>Overall Progress</h2>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${overall}%`,
                }}
              />
            </div>

            <h2>{overall}%</h2>
          </div>

          <div className="dashboard-subjects">
            {[
              "english",
              "mathematics",
              "science",
              "socialScience",
            ].map((subject) => (
              <button
                key={subject}
                onClick={() =>
                  openSubject(subject)
                }
              >
                <span>
                  {subjectName(subject)}
                </span>

                <strong>
                  {getProgress(subject)}%
                </strong>
              </button>
            ))}
          </div>

          <button
            onClick={() => setScreen("subjects")}
          >
            📚 My Syllabus
          </button>
        </div>
      </div>
    );
  }

  // SUBJECTS
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
            {[
              ["english", "📖 English"],
              ["mathematics", "📐 Mathematics"],
              ["science", "🔬 Science"],
              ["socialScience", "🌍 Social Science"],
            ].map(([key, name]) => (
              <button
                key={key}
                onClick={() => openSubject(key)}
              >
                {name}
              </button>
            ))}
          </div>

          <button
            className="secondary"
            onClick={() => setScreen("dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  // CHAPTERS
  if (screen === "chapters") {
    const chapters = getChapters(selectedSubject);
    const percentage = getProgress(selectedSubject);

    const completed = chapters.filter(
      (_, index) => {
        const key = `${student.className}-${selectedSubject}-${index}`;
        return progress[key] === "completed";
      }
    ).length;

    return (
      <div className="app">
        <div className="setup-card chapter-screen">
          <h1>{subjectName(selectedSubject)}</h1>

          <div className="progress-box">
            <h2>{percentage}% Complete</h2>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>

            <p>
              {completed} / {chapters.length}{" "}
              chapters completed
            </p>
          </div>

          <p className="status-hint">
            Tap a chapter:
            <br />
            🔴 → 🟡 → 🟢 → 🔴
          </p>

          <div className="chapter-list">
            {chapters.map((chapter, index) => {
              const key = `${student.className}-${selectedSubject}-${index}`;

              const status =
                progress[key] || "not-started";

              return (
                <button
                  className={`chapter-card ${status}`}
                  key={key}
                  onClick={() =>
                    changeStatus(
                      selectedSubject,
                      index
                    )
                  }
                >
                  <span className="chapter-name">
                    {index + 1}. {chapter}
                  </span>

                  <span className="status">
                    {statusText(status)}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            className="secondary"
            onClick={() =>
              setScreen("dashboard")
            }
          >
            Back to Dashboard
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
