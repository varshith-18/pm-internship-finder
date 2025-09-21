const Internship = require("../models/Internship");

// Simple skill matcher
const explainMatch = (userSkills, jobSkills) => {
  const u = userSkills.split(",").map(s => s.trim().toLowerCase());
  const j = jobSkills.split(",").map(s => s.trim().toLowerCase());
  return j.filter(skill => u.includes(skill));
};

exports.getRecommendations = async (req, res) => {
  const { skills, education, sectors, location } = req.body;

  try {
    const internships = await Internship.find(); // fetch all
    const results = internships.map(job => {
      const matched = explainMatch(skills || "", job.skills_required || "");
      return {
        ...job._doc,
        matched_skills: matched,
        score: matched.length
      };
    }).sort((a,b) => b.score - a.score).slice(0,10);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
