import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useFinanceStore } from "@/store/useFinanceStore";

type Props = {
  children: ReactNode;
};

export default function MainLayout({ children }: Props) {
  // Zustand store
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  // Dark mode state
  const [dark, setDark] = useState(true);

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="flex h-screen bg-background text-text dark:bg-[#020617] dark:text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-glass backdrop-blur-md border-r border-white/10 p-6">
        <h1 className="text-xl font-bold mb-6">Finance</h1>

        <nav className="space-y-3">
          <p className="text-primary font-medium">Dashboard</p>
          <p className="cursor-pointer hover:text-primary">Transactions</p>
          <p className="cursor-pointer hover:text-primary">Insights</p>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <header className="h-16 bg-card dark:bg-slate-900 flex items-center justify-between px-6 shadow-soft">
          <h2 className="text-lg font-semibold">Dashboard</h2>

          <div className="flex items-center gap-4">

            {/* Role Selector */}
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "viewer")}
              className="bg-primary text-white px-3 py-1 rounded-xl"
            >
              <option value="admin">Admin</option>
              <option value="viewer">Viewer</option>
            </select>

            {/* Theme Toggle */}
            <button
              onClick={() => setDark(!dark)}
              className="px-3 py-1 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              {dark ? "🌞 Light" : "🌙 Dark"}
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}