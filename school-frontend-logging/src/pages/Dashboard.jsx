import React, { useEffect, useState } from "react";
import API from "../api/api.js";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log("📥 Fetching dashboard data...");
      try {
        const [studentRes, teacherRes] = await Promise.all([
          API.get("/students"),
          API.get("/teachers"),
        ]);
        console.log("✅ Students fetched:", studentRes.data);
        console.log("✅ Teachers fetched:", teacherRes.data);
        setStudents(studentRes.data);
        setTeachers(teacherRes.data);
      } catch (err) {
        console.error("❌ Failed to fetch dashboard data:", err);
        alert("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <h3>Students</h3>
      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.name} - Class {s.class}</li>
        ))}
      </ul>

      <h3>Teachers</h3>
      <ul>
        {teachers.map((t) => (
          <li key={t.id}>{t.name} - Teaches {t.subject}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
