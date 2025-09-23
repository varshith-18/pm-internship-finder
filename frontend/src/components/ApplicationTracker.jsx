import React from "react";

function ApplicationTracker({ applications, updateStatus }) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-2">Application Tracker</h3>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Internship</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, idx) => (
            <tr key={app.id || idx}>
              <td className="p-2">{app.title}</td>
              <td className="p-2">{app.status}</td>
              <td className="p-2">
                <select
                  value={app.status}
                  onChange={e => updateStatus(app.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ApplicationTracker;
