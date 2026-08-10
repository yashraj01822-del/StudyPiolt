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

  const getChapters = (subject) => {
    const classData =
      student.className === "9"
        ? syllabus.class9
        : syllabus.class10;

    const subjectData = classData.subjects[subject];

    if (!subjectData) {
      return [];
    }

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

  const changeStatus = (subject, index) => {
    const key = `${student.className}-${subject}-${index}`;

    setProgress((prev) => {
      const current = prev[key] || "not-started";

      let next;

      if (current === "not-started") {
        next = "ongoing";
      } else if (current === "ongoing") {
        next = "completed";
      } else {
        next = "not-started";
      }

      return {
        ...prev,
        [key]: next,
      };
    });
  };

  const getSubjectName = (subject) => {
    if (subject === "english") return "📖 English";
    if (subject === "mathematics") return "📐 Mathematics";
    if (subject === "science") return "🔬 Science";
    return "🌍 Social Science";
  };

  const getStatusText = (status) => {
    if (status === "completed") {
      return "🟢 Completed";
    }

    if (status === "ongoing") {
      return "🟡 Ongoing";
    }

    return "🔴 Not Started";
  };

  const getProgress = (subject) => {
    const chapters = getChapters(subject);

    if (chapters.length === 0) {
      return 0;
    }

    const completed = chapters.filter((_, index) => {
      const key = `${student.className}-${subject}-${index}`;
      return progress[key] === "completed";
    }).length;

    return Math.round((completed / chapters.length) * 100);
  };

  // ---------------- WELCOME ----------------

  if (screen === "welcome") {
    return (
      <div className="app">
        <div className="setup-card">
          <h1>StudyPilot</h1>

          <p>
            Your intelligent study companion.
          </p>

          <button onClick={() => setScreen("setup")}>
            Get Started
          </button>
        </div>
      </div>
    );
  }

  // ---------------- STUDENT SETUP ----------------

  if (screen === "setup") {
    return (
      <div className="app">
        <div className="setup-card">
          <h1>Student Setup</h1>

          <p>
            Let's create your StudyPilot profile.
          </p>

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
            <option value="Half-Yearly">
              Half-Yearly
            </option>
            <option value="Annual">Annual</option>
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

  // ---------------- SUBJECTS ----------------

  if (screen === "subjects") {
    return (
      <div className="app">
        <div className="setup-card">
          <h1>Select Subject</h1>

          <p>
            Class {student.className} • Section{" "}
            {student.section}
          </p>

          <p>
            {student.exam} • {student.examDate}
          </p>

          <div className="subject-list">
            <button
              onClick={() => openSubject("english")}
            >
              📖 English
            </button>

            <button
              onClick={() =>
                openSubject("mathematics")
              }
            >
              📐 Mathematics
            </button>

            <button
              onClick={() => openSubject("science")}
            >
              🔬 Science
            </button>

            <button
              onClick={() =>
                openSubject("socialScience")
              }
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

  // ---------------- CHAPTERS ----------------

  if (screen === "chapters") {
    const chapters = getChapters(selectedSubject);

    const subjectProgress =
      getProgress(selectedSubject);

    const completedCount = chapters.filter(
      (_, index) => {
        const key = `${student.className}-${selectedSubject}-${index}`;
        return progress[key] === "completed";
      }
    ).length;

    return (
      <div className="app">
        <div className="setup-card chapter-screen">
          <h1>
            {getSubjectName(selectedSubject)}
          </h1>

          <p>
            {student.exam} • Exam Date:{" "}
            {student.examDate}
          </p>

          <div className="progress-box">
            <h2>
              {subjectProgress}% Complete
            </h2>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${subjectProgress}%`,
                }}
              ></div>
            </div>

            <p>
              {completedCount} / {chapters.length}{" "}
              chapters completed
            </p>
          </div>

          <p className="status-hint">
            Tap a chapter to change its status:
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
                    {getStatusText(status)}
                  </span>
                </button>
              );
            })}
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
