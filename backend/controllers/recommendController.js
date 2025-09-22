const Internship = require("../models/Internship");

// Skill matcher for array or string
const explainMatch = (userSkills, jobSkills) => {
  const u = Array.isArray(userSkills)
    ? userSkills.map((s) => s.trim().toLowerCase())
    : (userSkills || "").split(",").map((s) => s.trim().toLowerCase());
  const j = Array.isArray(jobSkills)
    ? jobSkills.map((s) => s.trim().toLowerCase())
    : (jobSkills || "").split(",").map((s) => s.trim().toLowerCase());
  return j.filter((skill) => u.includes(skill));
};

exports.getRecommendations = async (req, res) => {
  const { skills, education, sectors, location } = req.body;

  try {
    const internships = await Internship.find(); // fetch all
    res.json(
      internships
        .map((job) => {
          const matched = explainMatch(skills || [], job.skills_required || []);
          return {
            ...job._doc,
            matched_skills: matched,
            score: matched.length,
            // Always send skills_required as array
            skills_required: Array.isArray(job.skills_required)
              ? job.skills_required
              : job.skills_required
              ? [job.skills_required]
              : [],
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
