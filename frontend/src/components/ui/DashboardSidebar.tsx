"use client";

import React, { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Select from "@radix-ui/react-select";
import * as Checkbox from "@radix-ui/react-checkbox";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  UserGroupIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

interface Player {
  id: string;
  name: string;
  position: string;
  ageGroup: string;
}

interface FilterChangeEvent {
  positions: string[];
  ageGroups: string[];
}

interface DashboardSidebarProps {
  players: Player[];
  onFilterChange: (filters: FilterChangeEvent) => void;
  onSortChange: (sortBy: string) => void;
}

export const DashboardSidebar = ({
  players,
  onFilterChange,
  onSortChange
}: DashboardSidebarProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
  const ageGroups = ["U9", "U10", "U11", "U12", "U13"];

  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedageGroups, setSelectedageGroups] = useState<string[]>([]);

  const handlePositionChange = (position: string, checked: boolean) => {
    const updated = checked
      ? [...selectedPositions, position]
      : selectedPositions.filter((p) => p !== position);
    setSelectedPositions(updated);
    onFilterChange({ positions: updated, ageGroups: selectedageGroups });
  };

  const handleageGroupChange = (ageGroup: string, checked: boolean) => {
    const updated = checked
      ? [...selectedageGroups, ageGroup]
      : selectedageGroups.filter((t) => t !== ageGroup);
    setSelectedageGroups(updated);
    onFilterChange({ positions: selectedPositions, ageGroups: updated });
  };

  return (
    <aside className="w-64 bg-black border-r border-gray-800 h-full overflow-y-auto">
      <div className="p-4 space-y-6">
        {/* Filters */}
        <Collapsible.Root open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <Collapsible.Trigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-300 bg-gray-900 rounded-lg hover:bg-gray-800">
            <div className="flex items-center space-x-2">
              <FunnelIcon className="h-4 w-4" />
              <span>Filters</span>
            </div>
            {isFilterOpen ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </Collapsible.Trigger>

          <Collapsible.Content className="mt-3 space-y-4">
            {/* Position Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                <span>Position</span>
              </h4>
              {positions.map((position) => (
                <div
                  key={position}
                  className="flex items-center space-x-2 py-1"
                >
                  <Checkbox.Root
                    className="flex h-4 w-4 items-center justify-center rounded border border-gray-600 bg-gray-900 hover:bg-gray-800 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    checked={selectedPositions.includes(position)}
                    onCheckedChange={(checked) =>
                      handlePositionChange(position, checked as boolean)
                    }
                  >
                    <Checkbox.Indicator>
                      <CheckIcon className="h-3 w-3 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label className="text-sm text-gray-400">{position}</label>
                </div>
              ))}
            </div>

            {/* Age Group Filters */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
                <span>Age Group</span>
              </h4>
              {ageGroups.map((ageGroup) => (
                <div
                  key={ageGroup}
                  className="flex items-center space-x-2 py-1"
                >
                  <Checkbox.Root
                    className="flex h-4 w-4 items-center justify-center rounded border border-gray-600 bg-gray-900 hover:bg-gray-800 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    checked={selectedageGroups.includes(ageGroup)}
                    onCheckedChange={(checked) =>
                      handleageGroupChange(ageGroup, checked as boolean)
                    }
                  >
                    <Checkbox.Indicator>
                      <CheckIcon className="h-3 w-3 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <label className="text-sm text-gray-400">{ageGroup}</label>
                </div>
              ))}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>

        {/* Sort */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2 flex items-center space-x-2">
            <ArrowsUpDownIcon className="h-4 w-4" />
            <span>Sort By</span>
          </h4>
          <Select.Root onValueChange={onSortChange}>
            <Select.Trigger className="inline-flex items-center justify-between w-full px-3 py-2 text-sm text-gray-300 rounded-lg bg-gray-900 hover:bg-gray-800">
              <Select.Value placeholder="Select metric..." />
              <Select.Icon>
                <ChevronDownIcon className="h-4 w-4" />
              </Select.Icon>
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="overflow-hidden bg-gray-900 rounded-lg shadow-lg border border-gray-700">
                <Select.Viewport className="p-1">
                  {["overallScore", "decisionMaking", "spatialAwareness"].map(
                    (value) => (
                      <Select.Item
                        key={value}
                        value={value}
                        className="relative text-sm text-gray-300 px-2 py-1.5 outline-none cursor-default hover:bg-gray-800 rounded"
                      >
                        <Select.ItemText>
                          {value === "overallScore"
                            ? "Overall Score"
                            : value === "decisionMaking"
                              ? "Decision Making"
                              : "Spatial Awareness"}
                        </Select.ItemText>
                        <Select.ItemIndicator>
                          <CheckIcon className="h-4 w-4 text-gray-300 absolute right-2 top-1/2 -translate-y-1/2" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    )
                  )}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>

        {/* Player List */}
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center space-x-2">
            <UserGroupIcon className="h-4 w-4" />
            <span>Players</span>
          </h4>
          <div className="space-y-2">
            {players
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((player) => (
                <div
                  key={player.id}
                  className="p-3 bg-gray-900 rounded-lg hover:bg-gray-800 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-sm font-medium text-gray-300">
                        {player.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {player.position} • {player.ageGroup}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
