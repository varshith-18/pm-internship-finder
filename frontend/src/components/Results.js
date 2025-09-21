import React, { useEffect, useState } from "react";
import { getRecommendations } from "../api/recommendApi";


function Results({ profile }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (!profile) return;
      setLoading(true);
      try {
        const res = await getRecommendations(profile);
        setResults(res);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setResults([]);
        alert("Failed to fetch internship recommendations");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [profile]);

  return (
    <div className="step-container">
      <h2>Recommended Internships</h2>

      {loading ? (
        <p>Loading recommendations...</p>
      ) : results.length === 0 ? (
        <p>No internships matched your profile.</p>
      ) : (
        results.map((r, i) => (
          <div key={i} className="result-card">
            <h4>{r.title} ({r.sector})</h4>
            <p><strong>Location:</strong> {r.location}</p>
            <p><strong>Skills Required:</strong> {r.skills_required}</p>
            <p><strong>Matched Skills:</strong> {r.matched_skills.join(", ")}</p>
            <p><strong>Score:</strong> {r.score}</p>
            <p>{r.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Results;
