"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useFinanceStore } from "@/store/useFinanceStore";

type Transaction = {
  id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
};

export default function Charts() {
  const transactions = useFinanceStore((s) => s.transactions) as Transaction[];

  if (!transactions.length) {
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
        No data available. Add some transactions.
      </p>
    );
  }

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const lineData = sortedTransactions.reduce<
    { date: string; balance: number }[]
  >((acc, curr) => {
    const lastBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
    const newBalance =
      curr.type === "income"
        ? lastBalance + curr.amount
        : lastBalance - curr.amount;

    acc.push({ date: curr.date, balance: newBalance });
    return acc;
  }, []);

  const expenseMap: Record<string, number> = {};
  sortedTransactions.forEach((t) => {
    if (t.type === "expense") {
      expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
    }
  });

  const expenseData = Object.entries(expenseMap).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#6366F1", "#22C55E", "#EF4444", "#F59E0B", "#06B6D4"];

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {/* Line Chart */}
      <div className="glass-card hover-lift p-6">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
          Balance Trend
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis
              dataKey="date"
              tickFormatter={(date: string) =>
                new Date(date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })
              }
            />
            <Tooltip
              formatter={(value) =>
                typeof value === "number"
                  ? `₹${value.toLocaleString("en-IN")}`
                  : value
              }
            />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#6366F1"
              strokeWidth={2}
              dot={{ r: 3 }}
              isAnimationActive
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="glass-card hover-lift p-6">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">
          Expense Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={expenseData} dataKey="value" nameKey="name" label>
              {expenseData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) =>
                typeof value === "number"
                  ? `₹${value.toLocaleString("en-IN")}`
                  : value
              }
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
