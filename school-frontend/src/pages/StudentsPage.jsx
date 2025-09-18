import React, { useEffect, useState } from "react";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://backend-schoolapp.onrender.com/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setStudents(data);
        }
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students</h2>
      {students.length === 0 ? <p>No students found.</p> : (
        <ul>{students.map((s, idx) => <li key={idx}>{s.name}</li>)}</ul>
      )}
    </div>
  );
}

export default StudentsPage;