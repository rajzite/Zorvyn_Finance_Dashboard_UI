"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, BarChart3, Menu } from "lucide-react";
import { useFinanceStore } from "@/store/useFinanceStore";
import "../App.css";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  const location = useLocation();
  const pathname = location.pathname;

  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Transactions", path: "/transactions", icon: Receipt },
    { name: "Insights", path: "/insights", icon: BarChart3 },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-[#020617] dark:to-[#020617]">
      
      {/* Mobile toggle button */}
      <button
        className="hamburger-btn absolute top-4 left-4 md:hidden p-2 rounded-md bg-primary text-white z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu size={20} />
      </button>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="overlay md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 flex flex-col md:flex-row justify-between p-6
          bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-900/80 dark:to-slate-800/60
          backdrop-blur-xl
          border-r md:border-r-0 md:border-b border-white/10
          shadow-[0_8px_30px_rgba(0,0,0,0.08)]
          transform transition-transform duration-300
          ${sidebarOpen ? "open" : ""}
        `}
      >
        <div>
          <h1 className="text-2xl font-bold mb-8 md:mb-0 tracking-tight text-gray-900 dark:text-gray-100">
            💰 Finance
          </h1>

          <nav className="flex flex-col md:flex-row gap-1.5 md:gap-4">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    group flex items-center gap-3 px-4 py-3 rounded-lg
                    text-sm font-medium transition-all duration-200
                    ${isActive
                      ? "bg-gradient-to-r from-primary/25 to-primary/10 text-primary shadow-inner"
                      : "text-gray-600 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-white/10"
                    }
                  `}
                >
                  <item.icon
                    size={18}
                    className={`transition-transform ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <p className="text-xs text-gray-400 mt-8 md:mt-0 tracking-wide">
          © 2026 Finance
        </p>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header
  className="h-16 flex items-center justify-between px-8
    bg-gradient-to-r from-white/70 to-white/50 dark:from-slate-800/70 dark:to-slate-700/50
    backdrop-blur-lg border-b border-white/10 shadow-sm"
>
  <h2 className="text-lg font-semibold tracking-tight capitalize text-gray-900 dark:text-gray-100">
    {pathname.slice(1) || "dashboard"}
  </h2>

  <div className="flex items-center gap-6">
    {/* Role Switch */}
    <div className="select-wrapper">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "admin" | "viewer")}
        className="dashboard-select"
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>
    </div>

    {/* Theme Toggle */}
    <button
      onClick={() => setDark(!dark)}
      className="theme-toggle"
    >
      <div
        className={`theme-toggle-circle ${dark ? "moon translate-x-full" : "sun translate-x-0"}`}
      >
        {dark ? "🌙" : "☀️"}
      </div>
    </button>
  </div>
</header>


        {/* Page content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
