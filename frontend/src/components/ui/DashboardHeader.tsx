import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightStartOnRectangleIcon,
  BoltIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/2.png";

interface User {
  name: string;
  role: string;
  avatar?: string;
}

interface DashboardHeaderProps {
  user: User;
  onLogout: () => void;
}

export const DashboardHeader = ({ user, onLogout }: DashboardHeaderProps) => {
  return (
    <NavigationMenu.Root className="flex items-center justify-between px-6 py-4 bg-black border-b border-gray-800">
      {/* Logo */}
      <div className="flex items-center">
        <div className="flex-1">
          <Link href="/">
            <Image src={logo} alt="logo" className="w-24" />
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search players or metrics..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-2 hover:bg-gray-800 rounded-full relative bg-gray-900">
              <BellIcon className="h-6 w-6 text-gray-500" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="bg-gray-900 rounded-lg shadow-lg p-2 min-w-[200px] border border-gray-700">
              <DropdownMenu.Item className="text-sm px-2 py-1.5 outline-none cursor-default hover:bg-gray-800 rounded flex items-center space-x-2 text-gray-100">
                <BoltIcon className="h-4 w-4 text-gray-300" />
                <span>New analysis ready</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item className="text-sm px-2 py-1.5 outline-none cursor-default hover:bg-gray-800 rounded flex items-center space-x-2 text-gray-100">
                <DocumentTextIcon className="h-4 w-4 text-gray-300" />
                <span>Reports updated</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* User Profile */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center space-x-5 bg-gray-900 hover:bg-gray-800">
              <UserCircleIcon className="h-8 w-8 text-gray-500" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-100">{user.name}</p>
                <p className="text-xs text-gray-100">{user.role}</p>
              </div>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="bg-gray-900 rounded-lg shadow-lg p-2 min-w-[200px] border border-gray-700">
              <DropdownMenu.Item className="text-sm px-2 py-1.5 outline-none cursor-default hover:bg-gray-800 rounded flex items-center space-x-2 text-gray-100">
                <Cog6ToothIcon className="h-4 w-4 text-gray-400" />
                <span>Profile Settings</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-gray-700 my-1" />
              <DropdownMenu.Item
                className="text-sm px-2 py-1.5 outline-none cursor-default hover:bg-gray-800 rounded text-red-400 flex items-center space-x-2"
                onSelect={onLogout}
              >
                <ArrowRightStartOnRectangleIcon className="h-4 w-4" />
                <span>Logout</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </NavigationMenu.Root>
  );
};

