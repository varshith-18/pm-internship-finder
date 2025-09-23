import React, { useState } from "react";

function NotificationBell({ notifications }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="relative"
        onClick={() => setOpen(!open)}
        aria-label="Notifications"
      >
        <span className="material-icons text-2xl">notifications</span>
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
            {notifications.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10">
          <ul>
            {notifications.map((note, idx) => (
              <li key={idx} className="p-2 border-b last:border-b-0 text-sm">
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
