"use client";

import { DashboardHeader } from "@/components/ui/DashboardHeader";
import { DashboardSidebar } from "@/components/ui/DashboardSidebar";

export default function AdminDashboardPage() {
  const user = {
    name: "Admin User",
    role: "Admin",
    avatar: "/path-to-avatar", // Optional
  };

  const players = [
    { id: "1", name: "Charlie", position: "Defender", ageGroup: "U10" },
    { id: "2", name: "Dana", position: "Goalkeeper", ageGroup: "U9" },
  ];

  const handleLogout = () => {
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
          <h1>Admin Dashboard</h1>
          <p>This page is for admin and manager roles only.</p>
        </main>
      </div>
    </div>
  );
}
