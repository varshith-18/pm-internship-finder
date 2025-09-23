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

        const fallback = [];
        const tempSorted = (profile.locations || []).map(() => []);

        res.forEach((r) => {
          const locIndex = (profile.locations || []).findIndex(
            (l) => r.location.toLowerCase().includes(l.toLowerCase())
          );
          if (locIndex !== -1) tempSorted[locIndex].push(r);
          else fallback.push(r);
        });

        setResults(tempSorted.flat().concat(fallback));
      } catch (err) {
        console.error(err);
        alert("Failed to fetch recommendations");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [profile]);

  return (
    <div className="step-container p-6">
      <h2 className="text-xl font-bold mb-4">Recommended Internships</h2>

      {loading ? (
        <p>Loading recommendations...</p>
      ) : results.length === 0 ? (
        <p>No internships matched your profile.</p>
      ) : (
        <>
          <p className="mb-2 text-gray-600">{results.length} internships found</p>
          <div className="grid gap-4">
            {results.map((r, idx) => (
              <div
                key={r.id ? r.id : `${r.title}-${r.location}-${idx}`}
                className="border p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <h4 className="font-bold text-lg">{r.title} ({r.sector})</h4>
                <p><strong>Location:</strong> {r.location}</p>
                <p>
                  <strong>Skills Required:</strong>{" "}
                  {Array.isArray(r.skills_required) ? r.skills_required.join(", ") : r.skills_required}
                </p>
                <p><strong>Matched Skills:</strong> {r.matched_skills.join(", ")}</p>
                <p><strong>Score:</strong> {r.score}</p>
                <p className="text-gray-700 mt-2">{r.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Results;
