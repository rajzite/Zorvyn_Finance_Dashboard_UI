import { useFinanceStore } from "@/store/useFinanceStore";

export default function Insights() {
  const transactions = useFinanceStore((s) => s.transactions);

  if (!transactions.length) {
    return (
      <div className="glass-card p-6 text-center text-gray-400">
        No data available for insights
      </div>
    );
  }

  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");

  // Category breakdown
  const categoryMap: Record<string, number> = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });
  const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

  // Savings rate
  const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);
  const totalIncome = income.reduce((a, b) => a + b.amount, 0);
  const savingsRate =
    totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;

  return (
    <div className="glass-card hover-lift p-6 rounded-2xl space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Insights
      </h3>

      {/* Top Category */}
      <p className="text-sm text-gray-700 dark:text-gray-300">
        You are spending the most on{" "}
        <span className="text-primary font-bold">
          {topCategory?.[0] || "N/A"}
        </span>{" "}
        (₹ {topCategory?.[1]?.toLocaleString("en-IN") || 0})
      </p>

      {/* Savings Rate */}
      <p
        className={`text-sm font-semibold ${
          savingsRate > 40 ? "text-green-500" : "text-red-500"
        }`}
      >
        Savings Rate: {savingsRate.toFixed(1)}%
      </p>

      {/* Observation */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {savingsRate > 40
          ? "Great savings habit 🚀"
          : "Try reducing expenses ⚠️"}
      </p>
    </div>
  );
}
