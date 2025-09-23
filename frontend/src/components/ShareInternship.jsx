import React from "react";

function ShareInternship({ internship }) {
  const handleShare = () => {
    const shareText = `Check out this internship: ${internship.title} at ${internship.location}`;
    if (navigator.share) {
      navigator.share({ title: internship.title, text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert("Internship details copied to clipboard!");
    }
  };

  return (
    <button
      className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      onClick={handleShare}
    >
      Share
    </button>
  );
}

export default ShareInternship;
