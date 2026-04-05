import { useFinanceStore } from "@/store/useFinanceStore";

export default function Insights() {
  const transactions = useFinanceStore((s) => s.transactions);

  const expenses = transactions.filter((t) => t.type === "expense");

  const categoryMap: Record<string, number> = {};

  expenses.forEach((t) => {
    categoryMap[t.category] =
      (categoryMap[t.category] || 0) + t.amount;
  });

  const topCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="bg-glass backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-soft mt-6">
      <h3 className="text-lg font-semibold mb-4">Insights</h3>

      {topCategory ? (
        <p>
          You are spending the most on{" "}
          <span className="text-primary font-bold">
            {topCategory[0]}
          </span>{" "}
          (₹ {topCategory[1]})
        </p>
      ) : (
        <p className="text-gray-500">No insights available</p>
      )}
    </div>
  );
}