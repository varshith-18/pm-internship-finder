import React from "react";

function InternshipFilters({ filters, setFilters }) {
  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Search by title or company"
        className="border p-2 rounded w-full"
        value={filters.search}
        onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
      />
      <select
        className="border p-2 rounded w-full"
        value={filters.location}
        onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
      >
        <option value="">All Locations</option>
        {/* Add dynamic location options here */}
      </select>
      <select
        className="border p-2 rounded w-full"
        value={filters.sector}
        onChange={e => setFilters(f => ({ ...f, sector: e.target.value }))}
      >
        <option value="">All Sectors</option>
        {/* Add dynamic sector options here */}
      </select>
      <select
        className="border p-2 rounded w-full"
        value={filters.type}
        onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}
      >
        <option value="">All Types</option>
        <option value="Remote">Remote</option>
        <option value="On-site">On-site</option>
      </select>
    </div>
  );
}

export default InternshipFilters;
