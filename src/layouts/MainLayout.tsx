"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Receipt, BarChart3 } from "lucide-react";
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

      {/* Sidebar */}
<aside
  className="w-64 flex flex-col justify-between p-6
    bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-900/80 dark:to-slate-800/60
    backdrop-blur-xl
    border-r border-white/10
    shadow-[0_8px_30px_rgba(0,0,0,0.08)]
    rounded-r-2xl"
>
  <div>
    <h1 className="text-2xl font-bold mb-8 tracking-tight text-gray-900 dark:text-gray-100">
      💰 Finance
    </h1>

    <nav className="flex flex-col gap-1.5">
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

  <p className="text-xs text-gray-400 mt-8 tracking-wide">
    © 2026 Finance
  </p>
</aside>


      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header
  className="h-16 flex items-center justify-between px-8
    bg-gradient-to-r from-white/70 to-white/50 dark:from-slate-800/70 dark:to-slate-700/50
    backdrop-blur-lg
    border-b border-white/10
    shadow-sm"
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
        className="custom-select"
      >
        <option value="admin">Admin</option>
        <option value="viewer">Viewer</option>
      </select>
    </div>

    {/* Theme Toggle */}
    <button
      onClick={() => setDark(!dark)}
      className="relative w-12 h-6 rounded-full
        bg-gradient-to-r from-slate-300 to-slate-400
        dark:from-slate-700 dark:to-slate-600
        transition-all duration-300 ease-out"
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md
          transition-transform duration-300 ease-out
          ${dark ? "translate-x-6" : "translate-x-1"}`}
      >
        <div className="absolute inset-0 flex items-center justify-center text-xs">
          {dark ? "🌙" : "☀️"}
        </div>
      </div>
    </button>
  </div>
</header>


        <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}
