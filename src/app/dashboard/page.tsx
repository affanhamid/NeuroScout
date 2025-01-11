"use client";
import React, { useState, useMemo } from 'react';
import { DashboardHeader } from '@/components/ui/DashboardHeader';
import { DashboardSidebar } from '@/components/ui/DashboardSidebar';

interface User {
  name: string;
  role: string;
}

interface Player {
  id: string;
  name: string;
  position: string;
  ageGroup: string;
}

interface Filters {
  positions: string[];
  ageGroups: string[];
}

interface FilterChangeEvent {
  positions: string[];
  ageGroups: string[];
}

export default function Page() {
  // Mock user data
  const user: User = {
    name: "John Doe",
    role: "Academy Manager",
  };

  // Mock players data
  const players: Player[] = [
    {
      id: "1",
      name: "Marcus Smith",
      position: "Forward",
      ageGroup: "U9",
    },
    {
      id: "2",
      name: "James Wilson",
      position: "Midfielder",
      ageGroup: "U11",
    },
    {
      id: "3",
      name: "Tom Brown",
      position: "Defender",
      ageGroup: "U13",
    },
    {
      id: "4",
      name: "David Lee",
      position: "Goalkeeper",
      ageGroup: "U11",
    },
    {
      id: "5",
      name: "Michael Chen",
      position: "Forward",
      ageGroup: "U12",
    }
  ];

  const [filters, setFilters] = useState<Filters>({
    positions: [],
    ageGroups: []
  });
  const [sortBy, setSortBy] = useState<string>('');

  const filteredAndSortedPlayers = useMemo(() => {
    let result = [...players];

    // Apply position filter
    if (filters.positions.length > 0) {
      result = result.filter(player => 
        filters.positions.includes(player.position)
      );
    }

    // Apply age group filter
    if (filters.ageGroups.length > 0) {
      result = result.filter(player => 
        filters.ageGroups.includes(player.ageGroup)
      );
    }

    // Apply sorting
    if (sortBy) {
      result = result.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'position':
            return a.position.localeCompare(b.position);
          case 'ageGroup':
            return a.ageGroup.localeCompare(b.ageGroup);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [players, filters, sortBy]);

  // Handler functions
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  const handleFilterChange = (newFilters: FilterChangeEvent) => {
    setFilters({
      positions: newFilters.positions,
      ageGroups: newFilters.ageGroups
    });
    console.log("Filters changed:", newFilters);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    console.log("Sort changed:", newSortBy);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <DashboardHeader
        user={user}
        onLogout={handleLogout}
      />
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar
          players={filteredAndSortedPlayers}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
        />
        <div className="flex-1 overflow-auto bg-gray-950">
          <div className="max-w-7xl mx-auto">
            <div className="relative p-6">
              <div className="absolute -left-85 top-5 text-gray-300">
                {filteredAndSortedPlayers.length === 0 ? (
                  <p>No players match the selected filters</p>
                ) : (
                  <p>{filteredAndSortedPlayers.length} players found</p>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-100 text-center">
                Welcome back, {user.name}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}