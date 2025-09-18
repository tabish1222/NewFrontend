import React, { useEffect, useState } from "react";

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://backend-schoolapp.onrender.com/teachers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setTeachers(data);
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Teachers</h2>
      {teachers.length === 0 ? <p>No teachers found.</p> : (
        <ul>{teachers.map((t, idx) => <li key={idx}>{t.name}</li>)}</ul>
      )}
    </div>
  );
}

export default TeachersPage;