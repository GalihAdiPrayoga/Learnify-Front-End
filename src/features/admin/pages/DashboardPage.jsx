import React from "react";

function AdminDashboard({ name }) {
  const stats = [
    { label: "Total Users", value: "1,234", icon: "👥" },
    { label: "Total Courses", value: "45", icon: "📚" },
    { label: "Active Enrollments", value: "2,567", icon: "✏️" },
    { label: "Completion Rate", value: "78%", icon: "✓" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-2">{stat.icon}</div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
