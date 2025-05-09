"use client";

import React from "react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // Import useRouter and usePathname from next/navigation
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  PieChart,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  collapsed: boolean;
}

const SidebarItem = ({
  icon,
  label,
  active,
  href,
  collapsed,
}: SidebarItemProps) => {
  return (
    <button
      className={`w-full flex items-center gap-4 px-2 py-2 rounded-md ${
        active ? "bg-gray-100" : "hover:bg-gray-50"
      } transition-colors`}
    >
      <a href={href} className="flex items-center gap-4 w-full">
        {icon}
        {!collapsed && <span>{label}</span>}
      </a>
    </button>
  );
};

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter(); // Get the router instance
  const currentPath = usePathname(); // Get the current pathname

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    {
      icon: <LayoutDashboard className="h-5 w-5" />,
      label: "Dashboard",
      href: "/admin/dashboard",
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "Users",
      href: "/admin/users",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      label: "Colleges",
      href: "/admin/colleges",
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      label: "Analytics",
      href: "/analytics",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messages",
      href: "/messages",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div
      className={`flex flex-col h-screen bg-white border-r border-gray-200 p-2 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between mb-8 px-2 pt-4">
        {!collapsed && <h2 className="text-xl font-bold">Dashboard</h2>}
        <button
          onClick={toggleCollapse}
          className="h-8 w-8 rounded-md hover:bg-gray-100 flex items-center justify-center"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="space-y-2 flex-1">
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            label={item.label}
            active={currentPath === item.href} // Dynamically set active based on current path
            href={item.href}
            collapsed={collapsed}
          />
        ))}
      </div>

      <div className="border-t border-gray-200 pt-2 mt-auto">
        <SidebarItem
          icon={<LogOut className="h-5 w-5 text-red-500" />}
          label="Logout"
          href="/logout"
          active={currentPath === "/logout"} // Highlight logout if active
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}

export default Sidebar;