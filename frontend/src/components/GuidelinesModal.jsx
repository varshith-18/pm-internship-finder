import React from "react";

function GuidelinesModal({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border">
        <h2 className="text-2xl font-bold mb-4 text-indigo-700">Guidelines</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 text-base">
          <li>Only 3 internships can be applied at once.</li>
          <li>Complete your profile for better recommendations.</li>
          <li>Be truthful with your details.</li>
        </ul>
        <div className="mt-8 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default GuidelinesModal;
