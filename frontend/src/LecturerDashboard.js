import { useState, useEffect } from "react";

function LecturerDashboard() {
  const [studentId, setStudentId] = useState("");
  const [module, setModule] = useState("");
  const [score, setScore] = useState("");
  const [grades, setGrades] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Fetch grades
  const fetchGrades = async () => {
    const res = await fetch("http://localhost:5000/api/grades", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();
    setGrades(data);
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  // 🔹 Add grade
  const handleAdd = async () => {
    await fetch("http://localhost:5000/api/grades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ studentId, module, score })
    });

    alert("Grade added");
    fetchGrades(); // refresh list
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lecturer Dashboard 👨‍🏫</h2>

      {/* Add Grade Form */}
      <h3>Add Grade</h3>

      <input
        placeholder="Student ID"
        onChange={(e) => setStudentId(e.target.value)}
      /><br /><br />

      <input
        placeholder="Module"
        onChange={(e) => setModule(e.target.value)}
      /><br /><br />

      <input
        placeholder="Score"
        type="number"
        onChange={(e) => setScore(e.target.value)}
      /><br /><br />

      <button onClick={handleAdd}>Add Grade</button>

      <hr />

      {/* View Grades */}
      <h3>All Grades</h3>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student</th>
            <th>Module</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {grades.map((g) => (
            <tr key={g._id}>
              <td>{g.studentId}</td>
              <td>{g.module}</td>
              <td>{g.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LecturerDashboard;