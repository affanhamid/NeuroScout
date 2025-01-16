"use client";

import { DashboardHeader } from "@/components/ui/DashboardHeader";
import { DashboardSidebar } from "@/components/ui/DashboardSidebar";

export default function DashboardPage() {
  const user = {
    name: "John Doe",
    role: "User",
    avatar: "/path-to-avatar", // Optional
  };

  const players = [
    { id: "1", name: "Alice", position: "Forward", ageGroup: "U12" },
    { id: "2", name: "Bob", position: "Midfielder", ageGroup: "U11" },
  ];

  const handleLogout = () => {
    // Logout logic
    console.log("Logged out");
  };

  const handleFilterChange = (filters) => {
    console.log("Filters updated:", filters);
  };

  const handleSortChange = (sortBy) => {
    console.log("Sorted by:", sortBy);
  };

  return (
    <div>
      <DashboardHeader user={user} onLogout={handleLogout} />
      <div style={{ display: "flex", height: "100vh" }}>
        <DashboardSidebar
          players={players}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
          <h1>Main Dashboard</h1>
          <p>Welcome to the main dashboard page.</p>
        </main>
      </div>
    </div>
  );
}
